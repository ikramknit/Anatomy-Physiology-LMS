import React from 'react';
import type { VideoLink } from '../types';
import { BookOpenIcon } from './Icons';

interface VideoPlayerProps {
  video: VideoLink | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center bg-white p-8 rounded-2xl shadow-lg">
        <div className="p-6 bg-indigo-100 rounded-full mb-6">
          <BookOpenIcon className="w-16 h-16 text-indigo-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Your Course!</h2>
        <p className="mt-2 text-gray-500 max-w-md">
          Select a video from the course content list to begin your learning journey.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 px-4 sm:px-0">
        {video.title}
      </h3>
      <div className="aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
