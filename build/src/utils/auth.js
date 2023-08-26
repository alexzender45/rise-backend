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
exports.authenticationMiddleware = exports.hashPassword = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("config"));
const generateToken = (user) => {
    const payload = { id: user.id, username: user.username, email: user.email };
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.get('jwt_key'), { expiresIn: '1h' });
    return token;
};
exports.generateToken = generateToken;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return yield bcryptjs_1.default.hash(password, salt);
    });
}
exports.hashPassword = hashPassword;
function authenticationMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.trim();
    const tokenData = token.split(' ')[1];
    if (!token)
        return res.status(401).send('Access denied. No token provided.');
    //   decode the token to get its data
    const decodedData = jsonwebtoken_1.default.verify(tokenData, config_1.default.get('jwt_key'));
    //   set the user id in the request
    req.body.user_id = decodedData.id;
    next();
}
exports.authenticationMiddleware = authenticationMiddleware;
