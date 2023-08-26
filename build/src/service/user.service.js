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
exports.login = exports.createUser = void 0;
const index_1 = __importDefault(require("../database/index"));
const user_model_1 = require("../database/user.model");
const auth_1 = require("../utils/auth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lodash_1 = __importDefault(require("lodash"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, username } = input;
            const hashedPassword = yield (0, auth_1.hashPassword)(password);
            const user = yield index_1.default.any(user_model_1.getUserByEmailQuery, [email]);
            if (!lodash_1.default.isEmpty(user)) {
                throw new Error('Email already exists');
            }
            const createUser = yield index_1.default.one(user_model_1.createUserQuery, [email, username, hashedPassword]);
            const token = (0, auth_1.generateToken)({
                id: createUser.id,
                email: createUser.email,
                username: createUser.username
            });
            createUser.token = token;
            return createUser;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createUser = createUser;
function login(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = input;
            const user = yield index_1.default.any(user_model_1.getUserByEmailQuery, [email]);
            if (lodash_1.default.isEmpty(user)) {
                throw new Error('Email not found');
            }
            const validPassword = bcryptjs_1.default.compareSync(password, user[0].password);
            if (!validPassword) {
                throw new Error('Password is incorrect');
            }
            const token = (0, auth_1.generateToken)({
                id: user[0].id,
                email: user[0].email,
                username: user[0].username
            });
            user[0].token = token;
            return user[0];
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.login = login;
