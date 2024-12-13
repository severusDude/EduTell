export type CourseType = {
  category_id: number;
  created_at: string;
  description: string;
  difficulty: string;
  duration: number;
  image_url?: string;
  is_published: false;
  price: number;
  slug: string;
  title: string;
  updated_at: string;
  user_id: string;
};

export type ChapterType = {
  description: string;
  is_published: boolean;
  position: number;
  title: string;
  subchapters: SubChapterType[];
};

export type SubChapterType = {
  description: string;
  is_published: boolean;
  position: number;
  title: string;
};
