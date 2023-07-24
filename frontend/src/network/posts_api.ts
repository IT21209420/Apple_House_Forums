import { Post } from "../models/post"; 
import { User } from "../models/user";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
async function dataFetch(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errMessage);
    }else if(response.status === 409){
      throw new ConflictError(errMessage);
    }else{
      throw new Error("Reqest failed! status : " +response.status + "message : " + errMessage);
    }
    throw Error(errMessage);
  }
}

export async function getLoggedUser(): Promise<User> {
  const res = await dataFetch("/api/users", {
    method: "GET",
  });

  return res.json();
}
export interface RegisterCredentials {
  email: string;
  password: string;
}

export async function register(credentils: RegisterCredentials): Promise<User> {
  const response = await dataFetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentils),
  });
  return response.json();
}

export async function login(credentils: RegisterCredentials) {
  const response = await dataFetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentils),
  });
  return response.json();
}

export async function logout() {
  await dataFetch("/api/users/logout", {
    method: "POST",
  });
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await dataFetch("/api/posts", {
    method: "GET",
  });
  return res.json();
}
export async function fetchApprovedPosts(): Promise<Post[]> {
  const res = await dataFetch("/api/posts/getapprovedposts", {
    method: "GET",
  });
  return res.json();
}
export async function fetchToBeApprovedPosts(): Promise<Post[]> {
  const res = await dataFetch("/api/posts/gettobeapprovedposts", {
    method: "GET",
  });
  return res.json();
}


export interface PostInput {
  title?: string;
  text?: string;
  approved?: boolean;
  feedback?:string
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

export async function updatePost(
  postId: string,
  post: PostInput
): Promise<Post> {
  const response = await dataFetch("/api/posts/" + postId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
}
