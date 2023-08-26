"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopPostsHandler = exports.getAllPostsHandler = exports.createPostHandler = void 0;
const post_service_1 = require("../service/post.service");
const logger_1 = __importDefault(require("./../utils/logger"));
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield (0, post_service_1.createPost)(req.body);
            return res.status(200).json(post);
        }
        catch (err) {
            logger_1.default.error(err);
            return res.status(422).json(err.message);
        }
    });
}
exports.createPostHandler = createPostHandler;
// get all posts
function getAllPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        {
            try {
                const posts = yield (0, post_service_1.getAllPosts)();
                return res.status(200).json(posts);
            }
            catch (err) {
                logger_1.default.error(err);
                return res.status(422).send(err.message);
            }
        }
    });
}
exports.getAllPostsHandler = getAllPostsHandler;
// get top posts
function getTopPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield (0, post_service_1.getTopPosts)();
            return res.status(200).json(posts);
        }
        catch (err) {
            logger_1.default.error(err);
            return res.status(422).send(err.message);
        }
    });
}
exports.getTopPostsHandler = getTopPostsHandler;
