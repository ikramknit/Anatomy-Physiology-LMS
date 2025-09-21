
import React from 'react';
import type { Chapter, VideoLink } from '../types';
import { PlayIcon } from './Icons';

interface SidebarProps {
  chapters: Chapter[];
  selectedVideo: VideoLink | null;
  onSelectVideo: (video: VideoLink) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chapters, selectedVideo, onSelectVideo }) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex-shrink-0">
      <div className="h-full overflow-y-auto">
        <div className="p-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Subject Content</h2>
        </div>
        <nav className="p-4 space-y-4">
          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="font-semibold text-slate-800 mb-2">{chapter.id}. {chapter.title}</h3>
              <ul className="space-y-1">
                {chapter.videos.map((video) => {
                  const isSelected = selectedVideo?.videoId === video.videoId;
                  return (
                    <li key={video.videoId}>
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
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;