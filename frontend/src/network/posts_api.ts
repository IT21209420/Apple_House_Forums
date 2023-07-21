import { Post } from "../models/post";

async function dataFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errMessage = errorBody.error;
    throw Error(errMessage);
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await dataFetch("/api/posts", {
    method: "GET",
  });
  return res.json();
}
export interface PostInput {
  title: string;
  text?: string;
}

export async function createPost(post: PostInput): Promise<Post> {
  const response = await dataFetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
}

export async function deletePost(postId: string) {
  await dataFetch("/api/posts/" + postId, { method: "DELETE" });
}
