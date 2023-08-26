import { Request, Response } from "express";
import { 
  createUser,
  login
 } from "../service/user.service";
import log from "./../utils/logger";

export async function createUserHandler(
  req: Request,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).json(user);
  } catch (err: any) {
    log.error(err);
    return res.status(422).send(err.message);
  }
}

export async function loginHandler(
  req: Request,
  res: Response
): Promise<any> {
{
  try {
    const user = await login(req.body)
    return res.status(200).json(user);
  } catch (err: any) {
    log.error(err);
    return res.status(422).send(err.message);
  }
}
}
