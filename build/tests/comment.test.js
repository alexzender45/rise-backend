"use strict";
// Mock the db module and its functions
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
// Import your dependencies
const index_1 = __importDefault(require("../src/database/index"));
const comment_service_1 = require("../src/service/comment.service");
const comment_model_1 = require("../src/database/comment.model");
jest.mock('../src/database/index', () => {
    return {
        one: jest.fn(),
        // other methods, if any
    };
});
// Test suite
describe('createComment', () => {
    // Reset all mock implementations after each test
    afterEach(() => {
        jest.resetAllMocks();
    });
    // Test cases
    it('should throw an error if content is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, comment_service_1.createComment)({ content: '', user_id: '1', post_id: '1' })).rejects.toThrow('Content, user_id and post_id are required');
    }));
    it('should throw an error if user_id is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, comment_service_1.createComment)({ content: 'content', user_id: '', post_id: '1' })).rejects.toThrow('Content, user_id and post_id are required');
    }));
    it('should throw an error if post_id is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, comment_service_1.createComment)({ content: 'content', user_id: '1', post_id: '' })).rejects.toThrow('Content, user_id and post_id are required');
    }));
    it('should create a comment if all required fields are present', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the db.one function
        index_1.default.one.mockResolvedValue({ id: '2', content: 'content', user_id: '1', post_id: '1' });
        const comment = yield (0, comment_service_1.createComment)({ content: 'content', user_id: '1', post_id: '1' });
        expect(comment).toEqual({ id: '2', content: 'content', user_id: '1', post_id: '1' });
        expect(index_1.default.one).toHaveBeenCalledWith(comment_model_1.createCommentQuery, ['content', '1', '1']);
    }));
    it('should propagate the error if the database operation fails', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the db.one function to throw an error
        index_1.default.one.mockRejectedValue(new Error('Database error'));
        yield expect((0, comment_service_1.createComment)({ content: 'content', user_id: '1', post_id: '1' })).rejects.toThrow('Database error');
    }));
});
