"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getOne = exports.findAll = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const store = async (req, res) => {
    try {
        const data = req.body;
        const client_valid = await datasource_1.default.client.findUnique({
            where: { document_id: data.document_id },
        });
        if (client_valid) {
            res.status(400).json({ ok: false, message: "Client already saved" });
        }
        else {
            const client = await datasource_1.default.client.create({ data });
            res.status(201).json({
                ok: true,
                body: client,
                message: "Client created successfully",
            });
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.store = store;
const findAll = async (_req, res) => {
    try {
        const clients = await datasource_1.default.client.findMany();
        res.json({ ok: true, body: clients });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.findAll = findAll;
const getOne = async (req, res) => {
    try {
        const idClient = Number(req.params.idClient);
        const client = await datasource_1.default.client.findUnique({
            where: {
                id: idClient,
            },
        });
        res.json({ ok: true, body: client, message: "Client found" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const id = Number(req.params.idClient);
        const client = await datasource_1.default.client.update({
            where: { id },
            data: req.body,
        });
        res.json({
            ok: true,
            body: client,
            message: "Client updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const id = Number(req.params.idClient);
        await datasource_1.default.client.delete({
            where: { id },
        });
        res.status(204).json({ ok: true, body: "Client was deleted", message: "Deleted" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.remove = remove;
//# sourceMappingURL=controller.js.map