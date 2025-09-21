
import React from 'react';
import type { Chapter, VideoLink } from '../types';
import { PlayIcon } from './Icons';

interface SidebarProps {
  chapters: Chapter[];
  selectedVideo: VideoLink | null;
  onSelectVideo: (video: VideoLink, chapterId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chapters, selectedVideo, onSelectVideo }) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Subject Content</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-4">
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="font-semibold text-gray-700 mb-2 px-2">{chapter.id}. {chapter.title}</h3>
              <ul className="space-y-1">
                {chapter.videos.map((video) => {
                  const isSelected = selectedVideo?.id === video.id;
                  return (
                    <li key={video.id}>
                      <button
                        onClick={() => onSelectVideo(video, chapter.id)}
                        className={`w-full text-left flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 ${
                          isSelected
                            ? 'bg-indigo-100 text-indigo-700 font-semibold'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                        aria-current={isSelected ? 'page' : undefined}
                      >
                        <PlayIcon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-indigo-500' : 'text-gray-400'}`} />
                        <span className="text-sm">{video.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 pt-8">
            <p>No content available for this selection.</p>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;