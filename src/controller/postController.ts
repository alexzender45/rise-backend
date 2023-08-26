import { Request, Response } from "express";
import { 
  createPost, getAllPosts, getTopPosts
 } from "../service/post.service";
import log from "./../utils/logger";

export async function createPostHandler(
  req: Request,
  res: Response
) {
  try {
    const post = await createPost(req.body);
    return res.status(200).json(post);
  } catch (err: any) {
    log.error(err);
    return res.status(422).json(err.message);
  }
}

// get all posts
export async function getAllPostsHandler(
  req: Request,
  res: Response
): Promise<any> {
{
  try {
    const posts = await getAllPosts()
    return res.status(200).json(posts);
  } catch (err: any) {
    log.error(err);
    return res.status(422).send(err.message);
  }
}
}

// get top posts
export async function getTopPostsHandler(
    req: Request,
    res: Response
):Promise <Response>{
    try  {
        const posts = await getTopPosts()
        return res.status(200).json(posts);
    }
    catch (err: any) {
        log.error(err);
        return res.status(422).send(err.message);
    }
}
