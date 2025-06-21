import api from './axios';
import type { Tag } from './types';

export const getTags = async (): Promise<Tag[]> => {
  const res = await api.get<Tag[]>('/tags');
  return res.data;
};

export const createTag = async (name: string): Promise<Tag> => {
  const res = await api.post<Tag>('/tags', { name });
  return res.data;
};

export const updateTag = async (id: string, name: string): Promise<Tag> => {
  const res = await api.put<Tag>(`/tags/${id}`, { name });
  return res.data;
};

export const deleteTag = async (id: string): Promise<void> => {
  await api.delete(`/tags/${id}`);
};