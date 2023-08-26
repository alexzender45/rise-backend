import db from '../database/index'
import { createCommentQuery } from '../database/comment.model';

export async function createComment(
  input:
    {
      content: string,
      user_id: string,
      post_id: string
    }
): Promise<any[]> {
  try {
    const {
     content,
     user_id,
     post_id
    } = input;
    if(!content || !user_id || !post_id){
        throw new Error('Content, user_id and post_id are required');
    }
    const createComment = await db.one(
      createCommentQuery,
      [content, post_id, user_id]
    );
    return createComment
  } catch (error: any) {
    throw new Error(error);
  }
}



