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
exports.getTopPosts = exports.getAllPosts = exports.createPost = void 0;
const index_1 = __importDefault(require("../database/index"));
const post_model_1 = require("../database/post.model");
function createPost(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, user_id } = input;
            if (!title || !user_id) {
                throw new Error('Title and user_id are required');
            }
            const createPost = yield index_1.default.one(post_model_1.createPostQuery, [title, user_id]);
            return createPost;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createPost = createPost;
// get all posts
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getAllPosts = yield index_1.default.any(post_model_1.getAllPostsQuery);
            return getAllPosts;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getAllPosts = getAllPosts;
// get top posts
function getTopPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getTopPosts = yield index_1.default.any(post_model_1.topPosts);
            return getTopPosts;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.getTopPosts = getTopPosts;
