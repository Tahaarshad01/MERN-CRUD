"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    email: zod_1.z.string().min(1).max(20),
    password: zod_1.z.string().min(1).max(15),
});
exports.signInInput = zod_1.z.object({
    email: zod_1.z.string().min(1).max(20),
    password: zod_1.z.string().min(1).max(15),
});
