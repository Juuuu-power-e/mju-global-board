export type PostCategory =
  | "NOTICE"
  | "KOREAN_CENTER"
  | "EXCHANGE_OFFICE"
  | "UNDERGRAD_OFFICE"
  | "ADMISSION_OFFICE";

export interface Post {
  id: number;
  category: PostCategory;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
