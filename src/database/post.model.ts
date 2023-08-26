export const createPostQuery = `
    INSERT INTO posts(
        title,
        user_id
         )
    VALUES ($1, $2)
    RETURNING *
`;

export const getAllPostsQuery =  `
SELECT * FROM posts
`;

export const topPosts = `
WITH PostCounts AS (
    SELECT user_id, COUNT(*) as postCount
    FROM posts
    GROUP BY user_id
  ),
  LatestComments AS (
    SELECT comments.user_id, comments.content, 
           RANK() OVER (PARTITION BY comments.user_id ORDER BY comments.createdat DESC) as rank
    FROM comments
    JOIN posts ON comments.post_id = posts.id
  )
  SELECT u.id, u.username, COALESCE(pc.postCount, 0) as postCount, lc.content AS latestComment
  FROM users u
  LEFT JOIN PostCounts pc ON u.id = pc.user_id
  LEFT JOIN LatestComments lc ON u.id = lc.user_id AND lc.rank = 1
  ORDER BY COALESCE(pc.postCount, 0) DESC
  LIMIT 3;
  
  `