export const createUserQuery = `
    INSERT INTO users(
        email,
        username,
        password
         )
    VALUES ($1, $2, $3)
    RETURNING *
`;

export const getUserByEmailQuery = `
    SELECT * FROM users WHERE email = $1
`;