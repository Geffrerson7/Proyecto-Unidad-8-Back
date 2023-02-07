"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.login = exports.signup = exports.getOne = exports.findAll = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const datasource_1 = __importDefault(require("../../datasource"));
const authenticate_1 = require("../authenticate");
const secret_key = process.env.SECRET_KEY || 'Alguna llave secreta';
const findAll = async (req, res) => {
    try {
        if ((0, authenticate_1.verify_authentication)(req, secret_key)) {
            const users = await datasource_1.default.user.findMany();
            res.status(200).json({
                ok: true,
                data: users,
            });
        }
        else {
            res.status(400).json({ ok: false, message: 'Authentication failed' });
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.findAll = findAll;
const getOne = async (req, res) => {
    try {
        const idUser = Number(req.params.idUser);
        const user = await datasource_1.default.user.findUnique({
            where: {
                id: idUser,
            },
        });
        res.json({ ok: true, body: user, message: "User found" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.getOne = getOne;
const signup = async (req, res) => {
    try {
        const data = req.body;
        data.last_session = data.last_session || null;
        const encrypted_password = await bcrypt_1.default.hash(data.password, 10);
        const new_user = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: encrypted_password,
            last_session: new Date(data.last_session),
        };
        const user = await datasource_1.default.user.create({ data: new_user });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret_key, {
            expiresIn: 86400
        });
        res.status(201).json({ ok: true, message: "User created successfully", data: user, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await datasource_1.default.user.findUnique({ where: { email: email } });
        if (user == null) {
            res.status(400).json({ ok: false, message: "Incorrect email" });
        }
        else {
            const is_valid = await bcrypt_1.default.compare(password, user.password);
            if (is_valid) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret_key, {
                    expiresIn: 86400
                });
                res.status(201).json({ ok: true, message: "Login succesful", data: user, token: token });
            }
            else {
                res.status(400).json({ ok: false, message: "Incorrect password" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.login = login;
const update = async (req, res) => {
    try {
        const id = Number(req.params.idUser);
        const user = await datasource_1.default.user.update({
            where: { id },
            data: req.body,
        });
        res.json({
            ok: true,
            body: user,
            message: "User updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const id = Number(req.params.idUser);
        await datasource_1.default.user.delete({
            where: { id },
        });
        res.status(204).json({ ok: true, body: "", message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.remove = remove;
//# sourceMappingURL=controller.js.map