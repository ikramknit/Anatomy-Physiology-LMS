import React from 'react';
import type { VideoLink } from '../types';
import { PlayIcon, ChevronLeftIcon } from './Icons';

interface SidebarProps {
  subjectTitle: string;
  videos: VideoLink[];
  selectedVideo: VideoLink | null;
  onSelectVideo: (video: VideoLink) => void;
  onBack: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ subjectTitle, videos, selectedVideo, onSelectVideo, onBack }) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex-shrink-0">
      <div className="h-full overflow-y-auto">
        <div className="p-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-slate-200">
           <button onClick={onBack} className="flex items-center gap-2 mb-3 text-sm font-medium text-sky-600 hover:text-sky-800">
              <ChevronLeftIcon className="w-4 h-4" /> Back to Subjects
           </button>
          <h2 className="text-xl font-semibold text-slate-900 truncate" title={subjectTitle}>{subjectTitle}</h2>
        </div>
        <nav className="p-4 space-y-4">
          <div>
            <ul className="space-y-1">
              {videos.map((video) => {
                const isSelected = selectedVideo?.id === video.id;
                return (
                  <li key={video.id}>
                    <button
                      onClick={() => onSelectVideo(video)}
                      className={`w-full text-left flex items-center gap-3 p-2 rounded-md transition-colors duration-150 ${
                        isSelected
                          ? 'bg-sky-100 text-sky-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <PlayIcon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-sky-500' : 'text-slate-400'}`} />
                      <span className="text-sm">{video.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;