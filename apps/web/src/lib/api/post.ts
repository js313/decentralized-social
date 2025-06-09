import api from "../api";

export async function getPostById(postId: string) {
  const res = await api.get(`/posts/${postId}`);
  return res.data;
}

export async function addComment(postId: string, content: string) {
  const res = await api.post(`/posts/${postId}/comment`, { content });
  return res.data;
}

export async function likePost(postId: string) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}

export async function createPost(payload: { content: string }) {
  const res = await api.post("/posts", payload);
  return res.data;
}
