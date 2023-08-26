import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    saltWorkFactor: process.env.saltWorkFactor,
    host: process.env.host,
    user_db: process.env.user_db,
    password: process.env.password,
    database: process.env.database,
    jwt_key: process.env.jwt_key,
    db_url: process.env.db_url
}