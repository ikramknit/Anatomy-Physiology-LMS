export interface VideoLink {
  id: string;
  title: string;
  url: string;
  videoId: string;
}

export interface Subject { // Renamed from Chapter
  id: string;
  title: string;
  videos: VideoLink[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
}
