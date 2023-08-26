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
exports.loginHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("./../utils/logger"));
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUser)(req.body);
            return res.status(200).json(user);
        }
        catch (err) {
            logger_1.default.error(err);
            return res.status(422).send(err.message);
        }
    });
}
exports.createUserHandler = createUserHandler;
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        {
            try {
                const user = yield (0, user_service_1.login)(req.body);
                return res.status(200).json(user);
            }
            catch (err) {
                logger_1.default.error(err);
                return res.status(422).send(err.message);
            }
        }
    });
}
exports.loginHandler = loginHandler;
