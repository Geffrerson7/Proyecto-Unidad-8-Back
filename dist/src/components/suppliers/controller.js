"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.updateSupplier = exports.deleteSupplier = exports.findAll = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const store = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        await datasource_1.default.supplier.create({
            data: {
                name: data.name,
                description: data.description,
                contact_number: data.contact_number,
                email: data.email,
                address: data.address,
            },
        });
        res.status(201).json({ ok: true, body: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
};
exports.store = store;
const findAll = async (_req, res) => {
    try {
        const data = await datasource_1.default.supplier.findMany();
        res.status(201).json({ ok: true, body: data });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.findAll = findAll;
const deleteSupplier = async (req, res) => {
    try {
        const idSupplier = Number(req.params.idSupplier);
        const supplierDeleted = await datasource_1.default.supplier.delete({
            where: {
                id: idSupplier
            }
        });
        res.status(201).json({ ok: true, body: "Supplier deleted!" });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.deleteSupplier = deleteSupplier;
const updateSupplier = async (req, res) => {
    try {
        const idSupplier = Number(req.params.idSupplier);
        const data = req.body;
        const supplierUpdated = await datasource_1.default.supplier.update({
            where: {
                id: idSupplier
            },
            data: data
        });
        res.status(201).json({ ok: true, body: supplierUpdated });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.updateSupplier = updateSupplier;
const findById = async (req, res) => {
    try {
        const data = req.body;
        await datasource_1.default.supplier;
        res.status(201).json({ ok: true, body: data });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.findById = findById;
//# sourceMappingURL=controller.js.map