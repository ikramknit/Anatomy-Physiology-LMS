import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import type { Course, Subject, VideoLink } from '../types';
import { INITIAL_COURSES } from '../initialData';
import { GoogleGenAI } from "@google/genai";

// --- AUTH CONTEXT ---
interface User {
    email: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => boolean;
    logout: () => void;
    isLoginView: boolean;
    showLoginView: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// --- DATA CONTEXT ---
interface DataContextType {
    courses: Course[];
    // Course actions
    addCourse: (course: Omit<Course, 'id' | 'subjects'>) => void;
    updateCourse: (course: Pick<Course, 'id' | 'name' | 'description'>) => void;
    deleteCourse: (courseId: string) => void;
    // Subject actions
    updateSubject: (courseId: string, subject: Pick<Subject, 'id' | 'title'>) => void;
    deleteSubject: (courseId: string, subjectId: string) => void;
    addSubjectWithVideosFromHTML: (courseId: string, htmlContent: string) => Promise<void>;
    // Video actions
    updateVideo: (courseId: string, subjectId: string, video: Pick<VideoLink, 'id' | 'title' | 'url'>) => void;
    deleteVideo: (courseId: string, subjectId: string, videoId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};


// --- PROVIDER COMPONENT ---
export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoginView, setIsLoginView] = useState(false);
    const [courses, setCourses] = useState<Course[]>(() => {
        try {
            const savedCourses = localStorage.getItem('lms-courses');
            return savedCourses ? JSON.parse(savedCourses) : INITIAL_COURSES;
        } catch (error) {
            return INITIAL_COURSES;
        }
    });

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

    const saveData = (newCourses: Course[]) => {
        setCourses(newCourses);
        localStorage.setItem('lms-courses', JSON.stringify(newCourses));
    }

    const getYouTubeVideoId = (url: string): string => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop() || '';
        } catch (error) {
            console.error('Invalid URL:', url);
            return '';
        }
    };

    const authValue = useMemo(() => ({
        user,
        isLoginView,
        showLoginView: setIsLoginView,
        login: (email: string, pass: string) => {
            if (email.toLowerCase() === 'ikram.knit@gmail.com' && pass === 'ikram@123') {
                setUser({ email, role: 'admin' });
                setIsLoginView(false);
                return true;
            }
            return false;
        },
        logout: () => {
            setUser(null);
            setIsLoginView(false);
        },
    }), [user, isLoginView]);

    const dataValue = useMemo(() => {
        
        const addSubjectWithVideosFromHTML = async (courseId: string, htmlContent: string) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            const links = Array.from(doc.querySelectorAll('a'));
            const videos = links
                .map(link => ({ title: link.textContent?.trim() || 'Untitled', url: link.href }))
                .filter(v => v.url);

            if (videos.length === 0) {
                throw new Error("No links found in the provided HTML.");
            }
            
            const textContentForPrompt = doc.body.textContent?.trim().replace(/\s+/g, ' ') || '';
            
            const prompt = `Based on the following list of video topics, generate a concise and descriptive subject title. The title should be between 3 and 7 words. Do not add any prefix like "Title:". Topics:\n\n"${textContentForPrompt}"`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            const generatedTitle = response.text.trim().replace(/^"|"$/g, ''); // Remove quotes from response

            const newVideos: VideoLink[] = videos.map(video => ({
                id: crypto.randomUUID(),
                title: video.title,
                url: video.url,
                videoId: getYouTubeVideoId(video.url)
            }));

            const newSubject: Subject = {
                id: crypto.randomUUID(),
                title: generatedTitle || 'New Subject',
                videos: newVideos
            };

            const newCourses = courses.map(c => 
                c.id === courseId 
                ? { ...c, subjects: [...c.subjects, newSubject] } 
                : c
            );
            saveData(newCourses);
        };

        return {
            courses,
            addCourse: (course) => {
                const newCourse: Course = { ...course, id: crypto.randomUUID(), subjects: [] };
                saveData([...courses, newCourse]);
            },
            updateCourse: (updatedCourse) => {
                const newCourses = courses.map(c => c.id === updatedCourse.id ? { ...c, ...updatedCourse } : c);
                saveData(newCourses);
            },
            deleteCourse: (courseId) => {
                saveData(courses.filter(c => c.id !== courseId));
            },
            addSubjectWithVideosFromHTML,
            updateSubject: (courseId, updatedSubject) => {
                const newCourses = courses.map(c => {
                    if (c.id === courseId) {
                        return { ...c, subjects: c.subjects.map(s => s.id === updatedSubject.id ? { ...s, ...updatedSubject } : s) };
                    }
                    return c;
                });
                saveData(newCourses);
            },
            deleteSubject: (courseId, subjectId) => {
                const newCourses = courses.map(c => {
                    if (c.id === courseId) {
                        return { ...c, subjects: c.subjects.filter(s => s.id !== subjectId) };
                    }
                    return c;
                });
                saveData(newCourses);
            },
            updateVideo: (courseId, subjectId, updatedVideo) => {
                const newCourses = courses.map(c => {
                    if (c.id === courseId) {
                        return { ...c, subjects: c.subjects.map(s => {
                            if (s.id === subjectId) {
                                return { ...s, videos: s.videos.map(v => v.id === updatedVideo.id ? { ...v, ...updatedVideo, videoId: getYouTubeVideoId(updatedVideo.url) } : v)};
                            }
                            return s;
                        })};
                    }
                    return c;
                });
                saveData(newCourses);
            },
            deleteVideo: (courseId, subjectId, videoId) => {
                const newCourses = courses.map(c => {
                    if (c.id === courseId) {
                        return { ...c, subjects: c.subjects.map(s => {
                            if (s.id === subjectId) {
                                return { ...s, videos: s.videos.filter(v => v.id !== videoId) };
                            }
                            return s;
                        })};
                    }
                    return c;
                });
                saveData(newCourses);
            },
        }
    }, [courses]);

    return (
        <AuthContext.Provider value={authValue}>
            <DataContext.Provider value={dataValue}>
                {children}
            </DataContext.Provider>
        </AuthContext.Provider>
    );
};