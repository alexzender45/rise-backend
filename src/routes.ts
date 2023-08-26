import { Express, Request, Response } from 'express';
import { createUserHandler, loginHandler } from './controller/userController';
import { createPostHandler, getAllPostsHandler, getTopPostsHandler } from './controller/postController';
import { createCommentHandler } from './controller/commentController';
import { authenticationMiddleware } from './utils/auth';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post("/api/create", createUserHandler);
    app.post("/api/login", loginHandler);
    app.post("/api/post", authenticationMiddleware, createPostHandler);
    app.get("/api/posts", authenticationMiddleware, getAllPostsHandler);
    app.post("/api/comment", authenticationMiddleware, createCommentHandler);
    app.get("/api/top-posts", authenticationMiddleware, getTopPostsHandler);
}

export default routes;