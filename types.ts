
export interface VideoLink {
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
