"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.port,
    saltWorkFactor: process.env.saltWorkFactor,
    host: process.env.host,
    user_db: process.env.user_db,
    password: process.env.password,
    database: process.env.database,
    jwt_key: process.env.jwt_key,
    db_url: process.env.db_url
};
