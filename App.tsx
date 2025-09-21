
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import Header from './components/Header';
import { COURSES_DATA } from './constants';
import type { VideoLink } from './types';

const App: React.FC = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoLink | null>(null);

  const handleSelectVideo = (video: VideoLink) => {
    setSelectedVideo(video);
  };

  const handleCourseChange = (index: number) => {
    setSelectedCourseIndex(index);
    setSelectedVideo(null); // Reset video when subject changes
  };
  
  const selectedCourse = COURSES_DATA[selectedCourseIndex];

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-slate-50 text-slate-900">
      <Sidebar
        chapters={selectedCourse.chapters}
        selectedVideo={selectedVideo}
        onSelectVideo={handleSelectVideo}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          courses={COURSES_DATA}
          selectedCourseIndex={selectedCourseIndex}
          onCourseChange={handleCourseChange}
        />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <VideoPlayer video={selectedVideo} />
        </div>
      </main>
    </div>
  );
};

export default App;
