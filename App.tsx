import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import Header from './components/Header';
import { PROGRAM_DATA } from './constants';
import type { VideoLink } from './types';

const App: React.FC = () => {
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoLink | null>(null);

  const handleSelectVideo = (video: VideoLink) => {
    setSelectedVideo(video);
  };

  const handleProgramChange = (index: number) => {
    setSelectedProgramIndex(index);
    setSelectedYearIndex(0);
    setSelectedSubjectIndex(0);
    setSelectedVideo(null);
  };
  
  const handleYearChange = (index: number) => {
    setSelectedYearIndex(index);
    setSelectedSubjectIndex(0);
    setSelectedVideo(null);
  };

  const handleSubjectChange = (index: number) => {
    setSelectedSubjectIndex(index);
    setSelectedVideo(null);
  };

  const selectedProgram = PROGRAM_DATA[selectedProgramIndex];
  const selectedYear = selectedProgram?.years[selectedYearIndex];
  const selectedSubject = selectedYear?.subjects[selectedSubjectIndex];

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-100 text-gray-900">
      <Sidebar
        chapters={selectedSubject?.chapters ?? []}
        selectedVideo={selectedVideo}
        onSelectVideo={handleSelectVideo}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          programs={PROGRAM_DATA}
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

export default App;
