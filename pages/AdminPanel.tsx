
import React, { useState } from 'react';
import type { Program, Subject, Chapter, VideoLink, Year, Student, ActivityLog } from '../types';
import { BookOpenIcon, PencilIcon, TrashIcon, PlusIcon, CheckIcon, XIcon, ClipboardListIcon, UsersIcon, ChartBarIcon } from '../components/Icons';
import { getYouTubeVideoId } from '../constants';

interface AdminPanelProps {
  programs: Program[];
  onUpdatePrograms: (programs: Program[]) => void;
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
  activityLog: ActivityLog[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ programs, onUpdatePrograms, students, onUpdateStudents, activityLog }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Course Management State
  const [newProgramName, setNewProgramName] = useState('');
  const [newYearForProgram, setNewYearForProgram] = useState<{ [programId: number]: string }>({});
  const [newSubjectForYear, setNewSubjectForYear] = useState<{ [yearId: number]: string }>({});
  const [editingProgram, setEditingProgram] = useState<{id: number, name: string} | null>(null);
  const [editingSubject, setEditingSubject] = useState<{id: number, name: string} | null>(null);
  const [managingContentFor, setManagingContentFor] = useState<number | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [editingChapter, setEditingChapter] = useState<{id: number, title: string} | null>(null);
  const [newVideo, setNewVideo] = useState<{ [chapterId: number]: { title: string, url: string } }>({});
  const [editingVideo, setEditingVideo] = useState<VideoLink | null>(null);

  // Student Management State
  const [newStudent, setNewStudent] = useState({ name: '', mobile: '', password: '', programId: programs[0]?.id || 0 });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newPassword, setNewPassword] = useState('');
  
  // Activity Log State
  const [activityFilter, setActivityFilter] = useState<string>('all');


  // --- Course Handlers ---
  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProgramName.trim()) {
      const newProgram = { id: Date.now(), name: newProgramName.trim(), years: [] };
      onUpdatePrograms([...programs, newProgram].sort((a,b) => a.name.localeCompare(b.name)));
      setNewProgramName('');
    }
  };
    const handleDeleteProgram = (programId: number) => {
    if (window.confirm('Are you sure you want to delete this program and all its content?')) {
      onUpdatePrograms(programs.filter(p => p.id !== programId));
    }
  };
  
  const handleEditProgram = (program: Program) => {
    setEditingProgram({id: program.id, name: program.name});
  };

  const handleCancelEditProgram = () => {
    setEditingProgram(null);
  };
  
  const handleSaveProgram = (programId: number) => {
    if (editingProgram && editingProgram.name.trim()) {
      const updatedPrograms = programs.map(p => 
        p.id === programId ? { ...p, name: editingProgram.name.trim() } : p
      );
      onUpdatePrograms(updatedPrograms.sort((a,b) => a.name.localeCompare(b.name)));
      setEditingProgram(null);
    }
  };

  const handleAddYear = (programId: number) => {
    const yearValue = parseInt(newYearForProgram[programId] || '', 10);
    if (!isNaN(yearValue) && yearValue > 0) {
      const updatedPrograms = programs.map(p => {
        if (p.id === programId && !p.years.some(y => y.year === yearValue)) {
          const newYear = { id: Date.now(), year: yearValue, subjects: [] };
          const updatedYears = [...p.years, newYear].sort((a, b) => a.year - b.year);
          return { ...p, years: updatedYears };
        }
        return p;
      });
      onUpdatePrograms(updatedPrograms);
      setNewYearForProgram({ ...newYearForProgram, [programId]: '' });
    }
  };

  const handleDeleteYear = (programId: number, yearId: number) => {
     if (window.confirm('Are you sure you want to delete this year and all its subjects?')) {
        const updatedPrograms = programs.map(p => {
            if (p.id === programId) {
                return { ...p, years: p.years.filter(y => y.id !== yearId) };
            }
            return p;
        });
        onUpdatePrograms(updatedPrograms);
     }
  };

  const handleAddSubject = (programId: number, yearId: number) => {
    const subjectName = newSubjectForYear[yearId] || '';
    if (subjectName.trim()) {
        const updatedPrograms = programs.map(p => {
            if (p.id === programId) {
                const updatedYears = p.years.map(y => {
                    if (y.id === yearId) {
                        const newSubject = { id: Date.now(), name: subjectName.trim(), chapters: [] };
                        const updatedSubjects = [...y.subjects, newSubject].sort((a, b) => a.name.localeCompare(b.name));
                        return { ...y, subjects: updatedSubjects };
                    }
                    return y;
                });
                return { ...p, years: updatedYears };
            }
            return p;
        });
        onUpdatePrograms(updatedPrograms);
        setNewSubjectForYear({ ...newSubjectForYear, [yearId]: '' });
    }
  };
  
  const handleEditSubject = (subject: {id: number, name: string}) => {
    setEditingSubject({id: subject.id, name: subject.name});
    setManagingContentFor(null);
  };

  const handleCancelEditSubject = () => {
    setEditingSubject(null);
  };
  
  const handleSaveSubject = (programId: number, yearId: number, subjectId: number) => {
    if (editingSubject && editingSubject.name.trim()) {
      const updatedPrograms = programs.map(p => {
        if (p.id === programId) {
          const updatedYears = p.years.map(y => {
            if (y.id === yearId) {
              const updatedSubjects = y.subjects.map(s => 
                s.id === subjectId ? { ...s, name: editingSubject.name.trim() } : s
              ).sort((a, b) => a.name.localeCompare(b.name));
              return { ...y, subjects: updatedSubjects };
            }
            return y;
          });
          return { ...p, years: updatedYears };
        }
        return p;
      });
      onUpdatePrograms(updatedPrograms);
      setEditingSubject(null);
    }
  };
  
  const handleDeleteSubject = (programId: number, yearId: number, subjectId: number) => {
    if (window.confirm('Are you sure you want to delete this subject and all its content?')) {
        const updatedPrograms = programs.map(p => {
            if (p.id === programId) {
                const updatedYears = p.years.map(y => {
                    if (y.id === yearId) {
                        return { ...y, subjects: y.subjects.filter(s => s.id !== subjectId) };
                    }
                    return y;
                });
                return { ...p, years: updatedYears };
            }
            return p;
        });
        onUpdatePrograms(updatedPrograms);
    }
  };

  const findSubjectAndContext = (subjectId: number): [Program | undefined, Year | undefined, Subject | undefined] => {
    for (const program of programs) {
        for (const year of program.years) {
            const subject = year.subjects.find(s => s.id === subjectId);
            if (subject) return [program, year, subject];
        }
    }
    return [undefined, undefined, undefined];
  };

  const deepUpdatePrograms = (updateFn: (programsCopy: Program[]) => void) => {
    const programsCopy = JSON.parse(JSON.stringify(programs));
    updateFn(programsCopy);
    onUpdatePrograms(programsCopy);
  };

  const handleAddChapter = (subjectId: number) => {
    if (!newChapterTitle.trim()) return;
    deepUpdatePrograms(programsCopy => {
      const [, , subject] = findSubjectAndContext(subjectId);
      if (subject) {
        subject.chapters.push({ id: Date.now(), title: newChapterTitle.trim(), videos: [] });
        setNewChapterTitle('');
      }
    });
  };

  const handleDeleteChapter = (subjectId: number, chapterId: number) => {
    if (!window.confirm("Are you sure you want to delete this chapter and all its videos?")) return;
    deepUpdatePrograms(programsCopy => {
        const [, , subject] = findSubjectAndContext(subjectId);
        if (subject) {
            subject.chapters = subject.chapters.filter(c => c.id !== chapterId);
        }
    });
  };

  const handleSaveChapter = (subjectId: number) => {
    if (!editingChapter || !editingChapter.title.trim()) return;
    deepUpdatePrograms(programsCopy => {
        const [, , subject] = findSubjectAndContext(subjectId);
        if (subject) {
            const chapter = subject.chapters.find(c => c.id === editingChapter.id);
            if (chapter) {
                chapter.title = editingChapter.title.trim();
                setEditingChapter(null);
            }
        }
    });
  };

  const handleAddVideo = (subjectId: number, chapterId: number) => {
    const videoData = newVideo[chapterId];
    if (!videoData || !videoData.title.trim() || !videoData.url.trim()) return;

    deepUpdatePrograms(programsCopy => {
        const [, , subject] = findSubjectAndContext(subjectId);
        const chapter = subject?.chapters.find(c => c.id === chapterId);
        if (chapter) {
            chapter.videos.push({
                id: Date.now(),
                title: videoData.title.trim(),
                url: videoData.url.trim(),
                videoId: getYouTubeVideoId(videoData.url.trim()),
            });
            setNewVideo({ ...newVideo, [chapterId]: { title: '', url: '' } });
        }
    });
  };

  const handleDeleteVideo = (subjectId: number, chapterId: number, videoId: number) => {
     if (!window.confirm("Are you sure you want to delete this video?")) return;
    deepUpdatePrograms(programsCopy => {
        const [, , subject] = findSubjectAndContext(subjectId);
        const chapter = subject?.chapters.find(c => c.id === chapterId);
        if (chapter) {
            chapter.videos = chapter.videos.filter(v => v.id !== videoId);
        }
    });
  };
  
  const handleSaveVideo = (subjectId: number, chapterId: number) => {
    if (!editingVideo || !editingVideo.title.trim() || !editingVideo.url.trim()) return;
    deepUpdatePrograms(programsCopy => {
        const [, , subject] = findSubjectAndContext(subjectId);
        const chapter = subject?.chapters.find(c => c.id === chapterId);
        if (chapter) {
            const video = chapter.videos.find(v => v.id === editingVideo.id);
            if (video) {
                video.title = editingVideo.title.trim();
                video.url = editingVideo.url.trim();
                video.videoId = getYouTubeVideoId(editingVideo.url.trim());
                setEditingVideo(null);
            }
        }
    });
  };


  // --- Student Handlers ---
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
     if (!newStudent.name.trim()){
        alert("Student name is required.");
        return;
    }
    if (newStudent.mobile.length !== 10 || !/^\d+$/.test(newStudent.mobile)) {
        alert("Mobile number must be 10 digits.");
        return;
    }
    if (newStudent.password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }
    if (students.some(s => s.mobile === newStudent.mobile)) {
        alert("A student with this mobile number already exists.");
        return;
    }
    const newStudentData: Student = { ...newStudent, id: Date.now(), isActive: true };
    onUpdateStudents([...students, newStudentData]);
    setNewStudent({ name: '', mobile: '', password: '', programId: programs[0]?.id || 0 });
  };
  
  const handleDeleteStudent = (studentId: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      onUpdateStudents(students.filter(s => s.id !== studentId));
    }
  };
  
  const handleSaveStudent = () => {
    if (editingStudent) {
      if (!editingStudent.name.trim()) {
        alert("Student name cannot be empty.");
        return;
      }
      if (editingStudent.mobile.length !== 10 || !/^\d+$/.test(editingStudent.mobile)) {
        alert("Mobile number must be 10 digits.");
        return;
      }
      onUpdateStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
      setEditingStudent(null);
    }
  };
  
  const handleToggleStudentStatus = (studentId: number) => {
    onUpdateStudents(students.map(s => s.id === studentId ? { ...s, isActive: !s.isActive } : s));
  };

  const handleResetPassword = () => {
    if (editingStudent && newPassword.length >= 6) {
        if (window.confirm(`Are you sure you want to reset the password for ${editingStudent.name}?`)){
            onUpdateStudents(students.map(s => s.id === editingStudent.id ? { ...s, password: newPassword } : s));
            setNewPassword('');
            setEditingStudent(null);
        }
    } else {
        alert("New password must be at least 6 characters long.");
    }
  };
  
  // --- Data Lookups for Activity Log ---
  const getActivityDetails = (log: ActivityLog) => {
    const student = students.find(s => s.id === log.studentId);
    let program, year, subject, chapter, video;

    program = programs.find(p => p.id === log.programId);
    year = program?.years.find(y => y.id === log.yearId);
    subject = year?.subjects.find(s => s.id === log.subjectId);
    chapter = subject?.chapters.find(c => c.id === log.chapterId);
    video = chapter?.videos.find(v => v.id === log.videoId);

    return {
        studentName: student?.name || 'Unknown Student',
        studentMobile: student?.mobile || 'N/A',
        programName: program?.name || 'Unknown Program',
        subjectName: subject?.name || 'Unknown Subject',
        chapterTitle: chapter?.title || 'Unknown Chapter',
        videoTitle: video?.title || 'Unknown Video',
    };
  };

  const formatDuration = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0s';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  // --- Render Functions ---
  const renderOverview = () => (
    <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-800">Institute At a Glance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-6 rounded-xl">
                <p className="text-sm font-medium text-indigo-600">Total Programs</p>
                <p className="text-3xl font-bold text-indigo-900">{programs.length}</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl">
                <p className="text-sm font-medium text-teal-600">Total Subjects</p>
                <p className="text-3xl font-bold text-teal-900">{programs.reduce((acc, p) => acc + p.years.reduce((yAcc, y) => yAcc + y.subjects.length, 0), 0)}</p>
            </div>
             <div className="bg-amber-50 p-6 rounded-xl">
                <p className="text-sm font-medium text-amber-600">Registered Students</p>
                <p className="text-3xl font-bold text-amber-900">{students.length}</p>
            </div>
        </div>
        
      {programs.map((program) => (
        <div key={program.id} className="border border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-2xl font-semibold text-indigo-700">{program.name}</h2>
          {program.years.length > 0 ? (
            <div className="mt-4 space-y-6">
              {program.years.map((year) => (
                <div key={year.id} className="pl-4 border-l-4 border-indigo-200">
                  <h3 className="text-xl font-medium text-gray-700">Year {year.year}</h3>
                  {year.subjects.length > 0 ? (
                     <ul className="mt-3 space-y-2">
                      {year.subjects.map((subject) => (
                        <li key={subject.id} className="flex items-center space-x-3">
                          <BookOpenIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">{subject.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : ( <p className="mt-2 text-sm text-gray-400 italic">No subjects added.</p> )}
                </div>
              ))}
            </div>
          ) : ( <p className="mt-4 text-sm text-gray-400 italic">No years added.</p> )}
        </div>
      ))}
    </div>
  );

  const renderContentManager = (subject: Subject) => (
    <div className="bg-gray-50 p-4 mt-2 rounded-md space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Manage Content for: <span className="text-indigo-600">{subject.name}</span></h4>
        <div className="space-y-3">
            {subject.chapters.map(chapter => (
                <div key={chapter.id} className="border border-gray-200 bg-white p-3 rounded">
                    {editingChapter?.id === chapter.id ? (
                        <div className="flex items-center gap-2 mb-2">
                             <input type="text" value={editingChapter.title} onChange={e => setEditingChapter({...editingChapter, title: e.target.value})} className="flex-grow form-input" />
                             <button onClick={() => handleSaveChapter(subject.id)} className="p-1 text-green-600 hover:bg-green-100 rounded-full"><CheckIcon className="h-4 w-4"/></button>
                             <button onClick={() => setEditingChapter(null)} className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"><XIcon className="h-4 w-4"/></button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold">{chapter.title}</h5>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setEditingChapter(chapter)} className="p-1 text-blue-500 hover:bg-blue-100 rounded-full"><PencilIcon className="h-4 w-4"/></button>
                                <button onClick={() => handleDeleteChapter(subject.id, chapter.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="h-4 w-4"/></button>
                            </div>
                        </div>
                    )}
                    <div className="pl-4 space-y-2">
                        {chapter.videos.map(video => (
                           <div key={video.id}>
                             {editingVideo?.id === video.id ? (
                                <div className="p-2 border bg-blue-50 rounded space-y-2">
                                    <input type="text" placeholder="Video Title" value={editingVideo.title} onChange={e => setEditingVideo({...editingVideo, title: e.target.value})} className="form-input w-full" />
                                    <input type="text" placeholder="YouTube URL" value={editingVideo.url} onChange={e => setEditingVideo({...editingVideo, url: e.target.value})} className="form-input w-full" />
                                     <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => handleSaveVideo(subject.id, chapter.id)} className="btn-xs btn-green">Save</button>
                                        <button onClick={() => setEditingVideo(null)} className="btn-xs btn-gray">Cancel</button>
                                    </div>
                                </div>
                             ) : (
                                <div className="flex justify-between items-center text-sm">
                                    <p className="text-gray-600">{video.title}</p>
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => setEditingVideo(video)} className="p-1 text-blue-500 hover:bg-blue-100 rounded-full"><PencilIcon className="h-3 w-3"/></button>
                                        <button onClick={() => handleDeleteVideo(subject.id, chapter.id, video.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="h-3 w-3"/></button>
                                    </div>
                                </div>
                             )}
                           </div>
                        ))}
                         <div className="flex items-center gap-2 pt-2">
                            <input type="text" placeholder="Video Title" value={newVideo[chapter.id]?.title || ''} onChange={e => setNewVideo({...newVideo, [chapter.id]: {...(newVideo[chapter.id] || {url: ''}), title: e.target.value}})} className="form-input flex-grow text-sm" />
                            <input type="text" placeholder="YouTube URL" value={newVideo[chapter.id]?.url || ''} onChange={e => setNewVideo({...newVideo, [chapter.id]: {...(newVideo[chapter.id] || {title: ''}), url: e.target.value}})} className="form-input flex-grow text-sm" />
                            <button onClick={() => handleAddVideo(subject.id, chapter.id)} className="p-1.5 rounded-md text-white bg-green-600 hover:bg-green-700"><PlusIcon className="h-4 w-4"/></button>
                         </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="flex items-center gap-2 pt-2">
             <input type="text" value={newChapterTitle} onChange={e => setNewChapterTitle(e.target.value)} placeholder="New Chapter Title" className="form-input flex-grow"/>
             <button onClick={() => handleAddChapter(subject.id)} className="btn-xs btn-blue">Add Chapter</button>
        </div>
    </div>
  );

  const renderManagement = () => (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-lg text-gray-700 mb-2">Add New Program</h3>
        <form onSubmit={handleAddProgram} className="flex items-center gap-2">
          <input type="text" value={newProgramName} onChange={(e) => setNewProgramName(e.target.value)} placeholder="Program Name" className="form-input flex-grow" />
          <button type="submit" className="btn-icon btn-indigo"><PlusIcon className="h-5 w-5"/></button>
        </form>
      </div>
      {programs.map((program) => (
        <div key={program.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            {editingProgram?.id === program.id ? (
              <div className="flex-grow flex items-center gap-2">
                <input type="text" value={editingProgram.name} onChange={(e) => setEditingProgram({...editingProgram, name: e.target.value})} className="form-input flex-grow" />
                <button onClick={() => handleSaveProgram(program.id)} className="btn-icon-sm text-green-600 hover:bg-green-100"><CheckIcon className="h-5 w-5"/></button>
                <button onClick={handleCancelEditProgram} className="btn-icon-sm text-gray-500 hover:bg-gray-100"><XIcon className="h-5 w-5"/></button>
              </div>
            ) : ( <h2 className="text-xl font-semibold text-indigo-700">{program.name}</h2> )}
            <div className="flex items-center gap-2">
               <button onClick={() => handleEditProgram(program)} className="btn-icon-sm text-blue-600 hover:bg-blue-100"><PencilIcon className="h-5 w-5"/></button>
               <button onClick={() => handleDeleteProgram(program.id)} className="btn-icon-sm text-red-600 hover:bg-red-100"><TrashIcon className="h-5 w-5"/></button>
            </div>
          </div>
          {program.years.map((year) => (
            <div key={year.id} className="pl-4 ml-4 border-l-2 border-gray-200 space-y-2">
              <div className="flex items-center justify-between"><h3 className="font-medium text-gray-700">Year {year.year}</h3><button onClick={() => handleDeleteYear(program.id, year.id)} className="btn-icon-xs text-red-500 hover:bg-red-100"><TrashIcon className="h-4 w-4"/></button></div>
               <div className="space-y-2 pl-4">
                {year.subjects.map((subject) => (
                  <div key={subject.id}>
                    <div className="flex items-center justify-between">
                       {editingSubject?.id === subject.id ? (
                        <div className="flex-grow flex items-center gap-2">
                          <input type="text" value={editingSubject.name} onChange={(e) => setEditingSubject({...editingSubject, name: e.target.value})} className="form-input-sm flex-grow"/>
                          <button onClick={() => handleSaveSubject(program.id, year.id, subject.id)} className="btn-icon-xs text-green-600 hover:bg-green-100"><CheckIcon className="h-4 w-4"/></button>
                          <button onClick={handleCancelEditSubject} className="btn-icon-xs text-gray-500 hover:bg-gray-100"><XIcon className="h-4 w-4"/></button>
                        </div>
                      ) : ( <p className="text-sm text-gray-600">{subject.name}</p> )}
                      <div className="flex items-center gap-1">
                        <button onClick={() => setManagingContentFor(managingContentFor === subject.id ? null : subject.id)} className={`btn-icon-xs ${managingContentFor === subject.id ? 'text-indigo-600' : 'text-gray-500'}`}><ClipboardListIcon className="h-4 w-4"/></button>
                        <button onClick={() => handleEditSubject(subject)} className="btn-icon-xs text-blue-500 hover:bg-blue-100"><PencilIcon className="h-4 w-4"/></button>
                        <button onClick={() => handleDeleteSubject(program.id, year.id, subject.id)} className="btn-icon-xs text-red-500 hover:bg-red-100"><TrashIcon className="h-4 w-4"/></button>
                      </div>
                    </div>
                    {managingContentFor === subject.id && renderContentManager(subject)}
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <input type="text" value={newSubjectForYear[year.id] || ''} onChange={(e) => setNewSubjectForYear({ ...newSubjectForYear, [year.id]: e.target.value })} placeholder="New Subject Name" className="form-input-sm flex-grow"/>
                  <button onClick={() => handleAddSubject(program.id, year.id)} className="btn-icon-xs text-white bg-green-600 hover:bg-green-700"><PlusIcon className="h-4 w-4"/></button>
                </div>
              </div>
            </div>
          ))}
          <div className="pl-4 ml-4 flex items-center gap-2 pt-2">
              <input type="number" value={newYearForProgram[program.id] || ''} onChange={(e) => setNewYearForProgram({ ...newYearForProgram, [program.id]: e.target.value })} placeholder="Year" className="form-input-sm w-32"/>
              <button onClick={() => handleAddYear(program.id)} className="btn-xs btn-blue">Add Year</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStudentManagement = () => (
    <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Add New Student</h3>
            <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <input type="text" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} placeholder="Full Name" className="form-input"/>
                <input type="tel" value={newStudent.mobile} onChange={e => setNewStudent({...newStudent, mobile: e.target.value})} placeholder="10-digit Mobile" className="form-input"/>
                <select value={newStudent.programId} onChange={e => setNewStudent({...newStudent, programId: Number(e.target.value)})} className="form-input">
                    {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input type="password" value={newStudent.password} onChange={e => setNewStudent({...newStudent, password: e.target.value})} placeholder="Password (min 6 chars)" className="form-input"/>
                <button type="submit" className="btn btn-indigo justify-center md:col-span-4">Add Student</button>
            </form>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="th">Name</th>
                            <th className="th">Mobile Number</th>
                            <th className="th">Enrolled Course</th>
                            <th className="th">Status</th>
                            <th className="th">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map(student => (
                            <React.Fragment key={student.id}>
                                <tr>
                                    <td className="td">{student.name}</td>
                                    <td className="td">{student.mobile}</td>
                                    <td className="td">{programs.find(p => p.id === student.programId)?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => handleToggleStudentStatus(student.id)} className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {student.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button onClick={() => setEditingStudent(student.id === editingStudent?.id ? null : student)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDeleteStudent(student.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                                {editingStudent?.id === student.id && (
                                     <tr>
                                        <td colSpan={5} className="p-4 bg-indigo-50">
                                            <div className="space-y-4 max-w-lg mx-auto">
                                                 <div>
                                                    <label className="label">Name</label>
                                                    <input type="text" value={editingStudent.name} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} className="form-input mt-1 w-full"/>
                                                 </div>
                                                 <div>
                                                    <label className="label">Mobile Number</label>
                                                    <input type="tel" value={editingStudent.mobile} onChange={e => setEditingStudent({...editingStudent, mobile: e.target.value})} className="form-input mt-1 w-full"/>
                                                 </div>
                                                  <div>
                                                    <label className="label">Enrolled Course</label>
                                                    <select value={editingStudent.programId} onChange={e => setEditingStudent({...editingStudent, programId: Number(e.target.value)})} className="form-input mt-1 w-full">
                                                        {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                    </select>
                                                  </div>
                                                 <div>
                                                    <label className="label">Reset Password</label>
                                                    <div className="flex gap-2 mt-1">
                                                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" className="form-input w-full"/>
                                                        <button onClick={handleResetPassword} className="btn btn-blue whitespace-nowrap">Reset</button>
                                                    </div>
                                                 </div>
                                                 <div className="flex justify-end gap-2">
                                                    <button onClick={() => setEditingStudent(null)} className="btn btn-gray">Cancel</button>
                                                    <button onClick={handleSaveStudent} className="btn btn-green">Save Changes</button>
                                                 </div>
                                            </div>
                                        </td>
                                     </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
  
  const renderStudentActivity = () => {
    const filteredLogs = activityFilter === 'all' 
        ? activityLog 
        : activityLog.filter(log => log.studentId === parseInt(activityFilter));

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="student-filter" className="label">Filter by Student:</label>
                <select id="student-filter" value={activityFilter} onChange={e => setActivityFilter(e.target.value)} className="form-input mt-1 max-w-xs">
                    <option value="all">All Students</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.mobile})</option>)}
                </select>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="th">Student</th>
                                <th className="th">Course</th>
                                <th className="th">Subject</th>
                                <th className="th">Chapter</th>
                                <th className="th">Video Title</th>
                                <th className="th">Duration</th>
                                <th className="th">Time</th>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                            {filteredLogs.map(log => {
                                const details = getActivityDetails(log);
                                return (
                                <tr key={log.id}>
                                    <td className="td">
                                        <div className="font-medium text-gray-900">{details.studentName}</div>
                                        <div className="text-gray-500">{details.studentMobile}</div>
                                    </td>
                                    <td className="td">{details.programName}</td>
                                    <td className="td">{details.subjectName}</td>
                                    <td className="td">{details.chapterTitle}</td>
                                    <td className="td">{details.videoTitle}</td>
                                    <td className="td font-medium text-gray-800">{formatDuration(log.durationWatched)}</td>
                                    <td className="td">{new Date(log.timestamp).toLocaleString()}</td>
                                </tr>
                                )
                            })}
                         </tbody>
                    </table>
                     {filteredLogs.length === 0 && <p className="text-center text-gray-500 py-8">No activity recorded for this filter.</p>}
                </div>
             </div>
        </div>
    )
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <p className="mt-2 text-gray-500">Manage the educational content and student users of the institute.</p>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          <button onClick={() => setActiveTab('overview')} className={`tab-button ${activeTab === 'overview' ? 'tab-active' : ''}`}><BookOpenIcon className="h-5 w-5 mr-2"/>Course Overview</button>
          <button onClick={() => setActiveTab('manage')} className={`tab-button ${activeTab === 'manage' ? 'tab-active' : ''}`}><PencilIcon className="h-5 w-5 mr-2"/>Manage Courses</button>
          <button onClick={() => setActiveTab('students')} className={`tab-button ${activeTab === 'students' ? 'tab-active' : ''}`}><UsersIcon className="h-5 w-5 mr-2"/>Manage Students</button>
          <button onClick={() => setActiveTab('activity')} className={`tab-button ${activeTab === 'activity' ? 'tab-active' : ''}`}><ChartBarIcon className="h-5 w-5 mr-2"/>Student Activity</button>
        </nav>
      </div>

      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'manage' && renderManagement()}
        {activeTab === 'students' && renderStudentManagement()}
        {activeTab === 'activity' && renderStudentActivity()}
      </div>
        <style>{`
          .form-input { @apply appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm; }
          .form-input-sm { @apply appearance-none rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm; }
          .btn { @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white; }
          .btn-indigo { @apply bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500; }
          .btn-blue { @apply bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500; }
          .btn-green { @apply bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500; }
          .btn-gray { @apply bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500; }
          .btn-xs { @apply px-2.5 py-1.5 text-xs; }
          .btn-icon { @apply inline-flex items-center justify-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white; }
          .btn-icon-sm { @apply p-2 rounded-full; }
          .btn-icon-xs { @apply p-1 rounded-full; }
          .tab-button { @apply inline-flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300; }
          .tab-active { @apply border-indigo-500 text-indigo-600; }
          .th { @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider; }
          .td { @apply px-6 py-4 whitespace-nowrap text-sm text-gray-600; }
          .label { @apply text-sm font-medium text-gray-700; }
        `}</style>
    </div>
  );
};

export default AdminPanel;
