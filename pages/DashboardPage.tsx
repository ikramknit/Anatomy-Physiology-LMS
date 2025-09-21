
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';
import Header from '../components/Header';
import type { Program, VideoLink, Student, ActivityLog } from '../types';

type CurrentUser = {
  role: 'student' | 'admin' | 'guest';
  user?: Student | { id: string; email: string };
};

interface DashboardPageProps {
  programs: Program[];
  currentUser: CurrentUser;
  onNavigate: (path: string) => void;
  onLogActivity: (logData: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ programs, currentUser, onNavigate, onLogActivity }) => {
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoLink | null>(null);
  const [watchState, setWatchState] = useState<{ video: VideoLink; chapterId: number; startTime: number } | null>(null);

  const logWatchDuration = () => {
    if (watchState && currentUser.role === 'student' && currentUser.user) {
      const durationWatched = Math.round((Date.now() - watchState.startTime) / 1000);
      if (durationWatched > 0) {
          const student = currentUser.user as Student;
          const program = programs[selectedProgramIndex];
          const year = program?.years[selectedYearIndex];
          const subject = year?.subjects[selectedSubjectIndex];

          if (student && program && year && subject) {
              onLogActivity({
                  studentId: student.id,
                  programId: program.id,
                  yearId: year.id,
                  subjectId: subject.id,
                  chapterId: watchState.chapterId,
                  videoId: watchState.video.id,
                  durationWatched: durationWatched,
              });
          }
      }
    }
  };

  useEffect(() => {
    // This effect handles logging when the user navigates away or the component unmounts.
    window.addEventListener('beforeunload', logWatchDuration);
    
    return () => {
        logWatchDuration();
        window.removeEventListener('beforeunload', logWatchDuration);
    };
  }, [watchState]); // Re-bind if watchState changes to capture the latest state

  const handleSelectVideo = (video: VideoLink, chapterId: number) => {
    logWatchDuration(); // Log duration for the previous video before starting the new one
    setSelectedVideo(video);
    setWatchState({ video, chapterId, startTime: Date.now() }); // Start timer for the new video
  };

  const handleProgramChange = (index: number) => {
    logWatchDuration();
    setWatchState(null);
    setSelectedProgramIndex(index);
    setSelectedYearIndex(0);
    setSelectedSubjectIndex(0);
    setSelectedVideo(null);
  };
  
  const handleYearChange = (index: number) => {
    logWatchDuration();
    setWatchState(null);
    setSelectedYearIndex(index);
    setSelectedSubjectIndex(0);
    setSelectedVideo(null);
  };

  const handleSubjectChange = (index: number) => {
    logWatchDuration();
    setWatchState(null);
    setSelectedSubjectIndex(index);
    setSelectedVideo(null);
  };

  if (currentUser.role !== 'student') {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)] text-center">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
          <p className="mt-2 text-gray-600">Please log in as a student to view the courses.</p>
          <button
            onClick={() => onNavigate('#login')}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const selectedProgram = programs[selectedProgramIndex];
  const selectedYear = selectedProgram?.years[selectedYearIndex];
  const selectedSubject = selectedYear?.subjects[selectedSubjectIndex];

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)] font-sans bg-gray-100 text-gray-900 -m-4 sm:-m-6 lg:-m-8">
      <Sidebar
        chapters={selectedSubject?.chapters ?? []}
        selectedVideo={selectedVideo}
        onSelectVideo={handleSelectVideo}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          programs={programs}
          selectedProgramIndex={selectedProgramIndex}
          selectedYearIndex={selectedYearIndex}
          selectedSubjectIndex={selectedSubjectIndex}
          onProgramChange={handleProgramChange}
          onYearChange={handleYearChange}
          onSubjectChange={handleSubjectChange}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <VideoPlayer video={selectedVideo} />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;