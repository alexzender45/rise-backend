"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = require("../src/service/post.service");
const post_model_1 = require("../src/database/post.model");
jest.mock('../src/database/index', () => {
    return {
        one: jest.fn(),
        any: jest.fn()
    };
});
const db = __importStar(require("../src/database/index"));
describe('Post Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should throw an error if title or user_id is missing in createPost', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, post_service_1.createPost)({ title: '', user_id: '1' })).rejects.toThrow('Title and user_id are required');
    }));
    it('should create a post successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        db.one.mockResolvedValue({ id: '1', title: 'title', user_id: '1' });
        const post = yield (0, post_service_1.createPost)({ title: 'title', user_id: '1' });
        expect(post).toEqual({ id: '1', title: 'title', user_id: '1' });
        expect(db.one).toHaveBeenCalledWith(post_model_1.createPostQuery, ['title', '1']);
    }));
    it('should fetch all posts', () => __awaiter(void 0, void 0, void 0, function* () {
        db.any.mockResolvedValue([{ id: '1', title: 'title', user_id: '1' }]);
        const posts = yield (0, post_service_1.getAllPosts)();
        expect(posts).toEqual([{ id: '1', title: 'title', user_id: '1' }]);
        expect(db.any).toHaveBeenCalledWith(post_model_1.getAllPostsQuery);
    }));
    it('should fetch top posts', () => __awaiter(void 0, void 0, void 0, function* () {
        db.any.mockResolvedValue([{ id: '1', title: 'title', user_id: '1' }]);
        const top_posts = yield (0, post_service_1.getTopPosts)();
        expect(top_posts).toEqual([{ id: '1', title: 'title', user_id: '1' }]);
        expect(db.any).toHaveBeenCalledWith(post_model_1.topPosts);
    }));
    it('should propagate the error if any database operation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        db.one.mockRejectedValue(new Error('Database error'));
        yield expect((0, post_service_1.createPost)({ title: 'title', user_id: '1' })).rejects.toThrow('Database error');
    }));
});
