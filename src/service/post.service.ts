import db from '../database/index'
import { createPostQuery, getAllPostsQuery, topPosts } from '../database/post.model';

export async function createPost(
  input:
    {
      title: string,
      user_id: string,
    }
): Promise<any[]> {
  try {
    const {
     title,
     user_id
    } = input;
    if(!title || !user_id){
        throw new Error('Title and user_id are required');
    }
    const createPost = await db.one(
      createPostQuery,
      [title, user_id]
    );
    return createPost
  } catch (error: any) {
    throw new Error(error);
  }
}

// get all posts
export async function getAllPosts(
): Promise<any[]> {
  try {
    const getAllPosts = await db.any(
    getAllPostsQuery
    );
    return getAllPosts
  } catch (error: any) {
    throw new Error(error);
  }
}

// get top posts
export async function getTopPosts(
): Promise<any[]> {
  try {
    const getTopPosts = await db.any(
    topPosts
    );
    return getTopPosts
  } catch (error: any) {
    throw new Error(error);
  }
}



