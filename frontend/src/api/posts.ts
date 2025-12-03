// src/api/posts.ts
import apiClient from "./client";
import type { Post, PostCategory } from "../types/post";

export interface PostCreateRequest {
  category: PostCategory;
  title: string;
  content: string;
}

export interface PostUpdateRequest {
  category: PostCategory;
  title: string;
  content: string;
}

export async function fetchPosts(category?: PostCategory): Promise<Post[]> {
  const params = category ? { category } : undefined;
  const res = await apiClient.get("/posts", { params });
  const data = res.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.content)) {
    return data.content;
  }

  console.warn("알 수 없는 게시글 응답 형태:", data);
  return [];
}

export async function fetchPost(id: number): Promise<Post> {
  const res = await apiClient.get<Post>(`/posts/${id}`);
  return res.data;
}

export async function createPost(payload: PostCreateRequest): Promise<Post> {
  const res = await apiClient.post<Post>("/posts", payload);
  return res.data;
}

export async function updatePost(
  id: number,
  payload: PostUpdateRequest
): Promise<Post> {
  const res = await apiClient.put<Post>(`/posts/${id}`, payload);
  return res.data;
}

export async function deletePost(id: number): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
}
