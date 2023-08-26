"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailQuery = exports.createUserQuery = void 0;
exports.createUserQuery = `
    INSERT INTO users(
        email,
        username,
        password
         )
    VALUES ($1, $2, $3)
    RETURNING *
`;
exports.getUserByEmailQuery = `
    SELECT * FROM users WHERE email = $1
`;
