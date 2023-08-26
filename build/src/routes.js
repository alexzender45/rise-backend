"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./controller/userController");
const postController_1 = require("./controller/postController");
const commentController_1 = require("./controller/commentController");
const auth_1 = require("./utils/auth");
function routes(app) {
    app.get('/healthcheck', (req, res) => {
        res.sendStatus(200);
    });
    app.post("/api/create", userController_1.createUserHandler);
    app.post("/api/login", userController_1.loginHandler);
    app.post("/api/post", auth_1.authenticationMiddleware, postController_1.createPostHandler);
    app.get("/api/posts", auth_1.authenticationMiddleware, postController_1.getAllPostsHandler);
    app.post("/api/comment", auth_1.authenticationMiddleware, commentController_1.createCommentHandler);
    app.get("/api/top-posts", auth_1.authenticationMiddleware, postController_1.getTopPostsHandler);
}
exports.default = routes;
