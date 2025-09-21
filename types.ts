
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
