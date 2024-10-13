export interface ArenaBlock {
  id: number;
  title: string;
  created_at: string;
  content: string;
  content_html: string;
  image: {
    display: {
      url: string;
    };
  } | null;
  source?: {
    url: string;
  };
  position: number;
}

export interface ArenaChannel {
  title: string;
  contents: ArenaBlock[];
}