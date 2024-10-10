export interface ArenaBlock {
  id: number;
  title: string;
  created_at: string;
  content: string;
  image: {
    display: {
      url: string;
    };
  } | null;
  source?: {
    url: string;
  };
}

export interface ArenaChannel {
  title: string;
  contents: ArenaBlock[];
}