"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostsQuery = exports.createCommentQuery = void 0;
exports.createCommentQuery = `
    INSERT INTO comments(
        content,
        post_id,
        user_id
         )
    VALUES ($1, $2, $3)
    RETURNING *
`;
exports.getAllPostsQuery = `
SELECT * FROM posts
`;
