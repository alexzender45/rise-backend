import { Request, Response } from "express";
import { 
  createComment
 } from "../service/comment.service";
import log from "./../utils/logger";

export async function createCommentHandler(
  req: Request,
  res: Response
) {
  try {
    console.log(req.body)
    const comment = await createComment(req.body);
    return res.status(200).json(comment);
  } catch (err: any) {
    log.error(err);
    return res.status(422).json(err.message);
  }
}
