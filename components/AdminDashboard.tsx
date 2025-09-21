import React, { useState, useEffect } from 'react';
import { useData } from '../context/AppProviders';
import type { Course, Subject, VideoLink } from '../types';
import Header from './Header';
import { PencilIcon, TrashIcon, PlusIcon, ChevronLeftIcon, SpinnerIcon } from './Icons';
import Modal from './Modal';

type View = 'courses' | 'subjects' | 'videos';
type ModalState = 
    | { type: 'course', data?: Course }
    | { type: 'subject', data?: Subject }
    | { type: 'video', data?: VideoLink }
    | { type: 'subject-from-html' }
    | null;


const AdminDashboard: React.FC = () => {
    const { courses, addCourse, updateCourse, deleteCourse, updateSubject, deleteSubject, updateVideo, deleteVideo, addSubjectWithVideosFromHTML } = useData();

    const [view, setView] = useState<View>('courses');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    
    const [modalState, setModalState] = useState<ModalState>(null);
    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        if (modalState && 'data' in modalState && modalState.data) {
            setFormData(modalState.data);
        } else {
            setFormData({});
        }
    }, [modalState]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSave = async () => {
        if (!modalState) return;
        setIsSaving(true);
        setError('');
        try {
            switch (modalState.type) {
                case 'course':
                    modalState.data ? updateCourse(formData) : addCourse(formData);
                    break;
                case 'subject':
                    if (selectedCourse && modalState.data) {
                        updateSubject(selectedCourse.id, formData);
                    }
                    break;
                case 'video':
                     if (selectedCourse && selectedSubject && modalState.data) {
                        updateVideo(selectedCourse.id, selectedSubject.id, formData);
                    }
                    break;
                case 'subject-from-html':
                    if (selectedCourse && formData.htmlContent) {
                       await addSubjectWithVideosFromHTML(selectedCourse.id, formData.htmlContent);
                    }
                    break;
            }
            setModalState(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const renderCourses = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Courses</h2>
                <button onClick={() => setModalState({ type: 'course' })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700">
                    <PlusIcon className="w-5 h-5"/> Add Course
                </button>
            </div>
             {courses.length === 0 ? (
                <div className="text-center py-12 px-6 bg-white rounded-lg border border-dashed">
                    <h3 className="text-lg font-medium text-slate-800">No Courses Found</h3>
                    <p className="text-slate-500 mt-1">Get started by adding your first course.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map(course => (
                        <div key={course.id} className="p-4 bg-white border rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold">{course.name}</h3>
                            <p className="text-sm text-slate-600 mt-1 h-10 overflow-hidden">{course.description}</p>
                            <div className="flex gap-2 mt-4 pt-4 border-t">
                                <button onClick={() => { setSelectedCourse(course); setView('subjects'); }} className="px-3 py-1 text-sm font-medium text-white bg-slate-700 rounded-md hover:bg-slate-800 w-full">Manage Subjects</button>
                                <button onClick={() => setModalState({ type: 'course', data: course })} className="p-2 text-slate-500 hover:text-sky-600"><PencilIcon className="w-5 h-5"/></button>
                                <button onClick={() => { if(confirm(`Are you sure you want to delete the course "${course.name}"?`)) deleteCourse(course.id)}} className="p-2 text-slate-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    
    const renderSubjects = () => {
        if (!selectedCourse) return null;
        return (
            <div>
                 <div className="flex justify-between items-center mb-6">
                    <div>
                        <button onClick={() => setView('courses')} className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                           <ChevronLeftIcon className="w-4 h-4" /> Back to Courses
                        </button>
                        <h2 className="text-2xl font-bold text-slate-800">Subjects for "{selectedCourse.name}"</h2>
                    </div>
                    <button onClick={() => setModalState({ type: 'subject-from-html' })} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700">
                        <PlusIcon className="w-5 h-5"/> Add Subject from HTML
                    </button>
                </div>
                <div className="space-y-3">
                   {selectedCourse.subjects.map(subject => (
                       <div key={subject.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                           <h3 className="font-medium">{subject.title}</h3>
                           <div className="flex items-center gap-2">
                                <button onClick={() => { setSelectedSubject(subject); setView('videos'); }} className="px-3 py-1 text-sm font-medium text-white bg-slate-700 rounded-md hover:bg-slate-800">Manage Videos</button>
                                <button onClick={() => setModalState({ type: 'subject', data: subject })} className="p-2 text-slate-500 hover:text-sky-600"><PencilIcon className="w-5 h-5"/></button>
                                <button onClick={() => { if(confirm(`Are you sure you want to delete the subject "${subject.title}"?`)) deleteSubject(selectedCourse.id, subject.id) }} className="p-2 text-slate-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                           </div>
                       </div>
                   ))}
                </div>
            </div>
        );
    }

     const renderVideos = () => {
        if (!selectedCourse || !selectedSubject) return null;
        return (
            <div>
                 <div className="flex justify-between items-center mb-6">
                    <div>
                        <button onClick={() => setView('subjects')} className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                           <ChevronLeftIcon className="w-4 h-4" /> Back to Subjects
                        </button>
                        <h2 className="text-2xl font-bold text-slate-800">Videos for "{selectedSubject.title}"</h2>
                    </div>
                </div>
                <div className="space-y-3">
                   {selectedSubject.videos.map(video => (
                       <div key={video.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                           <div>
                               <h3 className="font-medium">{video.title}</h3>
                               <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 hover:underline truncate max-w-xs block">{video.url}</a>
                           </div>
                           <div className="flex items-center gap-2">
                                <button onClick={() => setModalState({ type: 'video', data: video })} className="p-2 text-slate-500 hover:text-sky-600"><PencilIcon className="w-5 h-5"/></button>
                                <button onClick={() => deleteVideo(selectedCourse.id, selectedSubject.id, video.id)} className="p-2 text-slate-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                           </div>
                       </div>
                   ))}
                </div>
            </div>
        );
    }
    
    const getModalTitle = () => {
        if (!modalState) return '';
        if(modalState.type === 'subject-from-html') return 'Add Subject from HTML';
        if (modalState && 'data' in modalState && modalState.data) {
             return `Edit ${modalState.type}`;
        }
        return `Add ${modalState.type}`;
    }

    const renderModalContent = () => {
        if (!modalState) return null;
        switch(modalState.type) {
            case 'course': return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Course Name</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Description</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleInputChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
                    </div>
                </div>
            );
            case 'subject': return (
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Subject Title</label>
                    <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
                </div>
            );
            case 'video': return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Video Title</label>
                        <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">YouTube URL</label>
                        <input type="text" name="url" value={formData.url || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
                    </div>
                </div>
            );
            case 'subject-from-html': return (
                <div>
                    <label htmlFor="htmlContent" className="block text-sm font-medium text-slate-700">Paste HTML with Links</label>
                    <textarea 
                        id="htmlContent"
                        name="htmlContent" 
                        value={formData.htmlContent || ''} 
                        onChange={handleInputChange} 
                        rows={12} 
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 font-mono text-sm"
                        placeholder={'<ol>\n  <li><a href="https://youtube.com/watch?v=...">Video 1 Title</a></li>\n  <li><a href="https://youtube.com/watch?v=...">Video 2 Title</a></li>\n</ol>'}
                    />
                    <p className="mt-2 text-xs text-slate-500">
                        AI will generate a subject title based on the content. Each link (<code>&lt;a href="..."&gt;</code>) will be added as a video.
                    </p>
                </div>
            );
        }
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <Header courseName="Admin Dashboard" />
            <main className="p-4 sm:p-6 lg:p-8">
                {view === 'courses' && renderCourses()}
                {view === 'subjects' && renderSubjects()}
                {view === 'videos' && renderVideos()}
            </main>
            {modalState && (
                <Modal 
                    title={getModalTitle()} 
                    onClose={() => setModalState(null)} 
                    onSave={handleSave}
                    isSaving={isSaving}
                    error={error}
                >
                   {renderModalContent()}
                </Modal>
            )}
        </div>
    );
};

export default AdminDashboard;