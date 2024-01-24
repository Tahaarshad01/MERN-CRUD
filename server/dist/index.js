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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("./db/conn.js");
const regis_js_1 = __importDefault(require("./model/regis.js"));
const zod_1 = require("zod");
const common_1 = require("@tahaarshad/common");
const jwtkey = "jwtkey";
const app = (0, express_1.default)();
// to recieve the body data //
app.use(express_1.default.json());
const port = 5000;
app.use((0, cors_1.default)());
//connection// file
app.use(express_1.default.json());
///conneting model///
//insert api///
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, conPassword, mobile, address } = req.body;
    const parsedInput = common_1.signUpInput.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            msg: parsedInput.error,
        });
        return;
    }
    const emailInput = parsedInput.data.email;
    const passwordInput = parsedInput.data.password;
    const saltRound = 10;
    const hashPass = yield bcrypt_1.default.hashSync(password, saltRound);
    const hashConPass = yield bcrypt_1.default.hashSync(conPassword, saltRound);
    const registerData = yield new regis_js_1.default({
        name,
        email,
        password: hashPass,
        conPassword: hashConPass,
        mobile,
        address,
    });
    const registerEmail = yield regis_js_1.default.findOne({ email });
    if (registerEmail) {
        res.send({ message: "Already register with this mail id" });
    }
    else {
        const result = registerData.save();
        res.send({ message: "register Sucessfully", user: result });
    }
}));
app.get("/fetch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield regis_js_1.default.find();
    res.send(result);
}));
////delete api ///
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield regis_js_1.default.deleteOne({ _id: req.params.id });
    res.send(result);
}));
//get particular user details//
app.get("/getDetails/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield regis_js_1.default.findById({ _id: req.params.id });
    res.send(result);
}));
///to Update data ////
app.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield regis_js_1.default.updateOne({ _id: req.params.id }, {
        $set: req.body,
    });
    res.send(result);
}));
//login api //
const signInInput = zod_1.z.object({
    email: zod_1.z.string().min(1).max(20),
    password: zod_1.z.string().min(1).max(15),
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = signInInput.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            msg: parsedInput.error,
        });
        return;
    }
    const emailInput = parsedInput.data.email;
    const passwordInput = parsedInput.data.password;
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = yield regis_js_1.default.findOne({ email: email });
            console.log(user);
            if (user != null) {
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (user.email === email && isMatch) {
                    //////generate token////////
                    const token = jsonwebtoken_1.default.sign({ user }, jwtkey);
                    res.send({ message: "login sucess", user, token });
                }
                else {
                    res.send({ message: "Email and password is not valid" });
                }
            }
            else {
                res.send({ message: "you are not a registerd user" });
            }
        }
        else {
            res.send({ message: "All fields are required" });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Unable to Login" });
    }
}));
app.listen(port, () => {
    console.log(`server running on port ${port}`);
    console.log(`http:localhost:${port}`);
});
