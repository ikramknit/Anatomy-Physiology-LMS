
export interface VideoLink {
  id: number;
  title: string;
  url: string;
  videoId: string;
}

export interface Chapter {
  id: number;
  title: string;
  videos: VideoLink[];
}

export interface Subject {
    id: number;
    name: string;
    chapters: Chapter[];
}

export interface Year {
    id: number;
    year: number;
    subjects: Subject[];
}

export interface Program {
    id: number;
    name: string;
    years: Year[];
}

export interface Student {
    id: number;
    name: string;
    mobile: string;
    password: string;
    isActive: boolean;
    programId: number;
}

export interface ActivityLog {
    id: number;
    studentId: number;
    programId: number;
    yearId: number;
    subjectId: number;
    chapterId: number;
    videoId: number;
    timestamp: number;
    durationWatched: number; // in seconds
}