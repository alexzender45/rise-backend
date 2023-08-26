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
exports.createCommentHandler = void 0;
const comment_service_1 = require("../service/comment.service");
const logger_1 = __importDefault(require("./../utils/logger"));
function createCommentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const comment = yield (0, comment_service_1.createComment)(req.body);
            return res.status(200).json(comment);
        }
        catch (err) {
            logger_1.default.error(err);
            return res.status(422).json(err.message);
        }
    });
}
exports.createCommentHandler = createCommentHandler;
