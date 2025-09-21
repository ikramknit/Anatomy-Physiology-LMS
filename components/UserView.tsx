import React, { useState } from 'react';
import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';
import Header from './Header';
import { useData } from '../context/AppProviders';
import type { Subject, VideoLink } from '../types';
import { BookOpenIcon } from './Icons';

const SubjectCard: React.FC<{ subject: Subject; onClick: () => void }> = ({ subject, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left flex flex-col items-start"
  >
    <div className="bg-sky-100 text-sky-600 p-3 rounded-full mb-4">
      <BookOpenIcon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1 flex-1">{subject.title}</h3>
    <p className="text-sm text-slate-500">{subject.videos.length} video(s)</p>
  </button>
);


const UserView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoLink | null>(null);
  const { courses } = useData();

  const course = courses[0];

  if (!course) {
    return (
        <div className="flex flex-col h-screen">
            <Header courseName="Learning Management System" />
            <main className="flex-1 flex items-center justify-center text-center bg-slate-100 p-4">
                <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border">
                    <h2 className="text-2xl font-semibold text-slate-700">No Courses Available</h2>
                    <p className="mt-2 text-slate-500 max-w-md">
                        It looks like no courses have been created yet. Please contact an administrator to add course content.
                    </p>
                </div>
            </main>
        </div>
    );
  }

  // View 1: Subject Grid
  if (!selectedSubject) {
    return (
      <div className="flex flex-col h-screen">
        <Header courseName={course.name} courseDescription={course.description} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Course Subjects</h2>
          {course.subjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {course.subjects.map(subject => (
                <SubjectCard 
                  key={subject.id} 
                  subject={subject} 
                  onClick={() => setSelectedSubject(subject)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-lg border border-dashed">
                <h3 className="text-lg font-medium text-slate-800">No Subjects Found</h3>
                <p className="text-slate-500 mt-1">This course doesn't have any subjects yet.</p>
            </div>
          )}
        </main>
      </div>
    );
  }
  
  // View 2: Video Player and List
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar
        subjectTitle={selectedSubject.title}
        videos={selectedSubject.videos}
        selectedVideo={selectedVideo}
        onSelectVideo={setSelectedVideo}
        onBack={() => {
          setSelectedSubject(null);
          setSelectedVideo(null); // Reset video selection when going back
        }}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header courseName={course.name} courseDescription={course.description} />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <VideoPlayer video={selectedVideo} />
        </div>
      </main>
    </div>
  );
};

export default UserView;