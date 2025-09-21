
import React from 'react';
import type { VideoLink } from '../types';
import { BookOpenIcon } from './Icons';

interface VideoPlayerProps {
  video: VideoLink | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center bg-slate-100 p-8 rounded-lg">
        <BookOpenIcon className="w-24 h-24 text-slate-400 mb-4" />
        <h2 className="text-2xl font-semibold text-slate-700">Welcome to Your Course!</h2>
        <p className="mt-2 text-slate-500 max-w-md">
          Select a video from the course content list on the left to begin your learning journey.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 px-4 sm:px-0">
          Now Playing: {video.title}
        </h3>
      <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
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
