export const createCommentQuery = `
    INSERT INTO comments(
        content,
        post_id,
        user_id
         )
    VALUES ($1, $2, $3)
    RETURNING *
`;

export const getAllPostsQuery =  `
SELECT * FROM posts
`;