"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_product_by_id = exports.update_product = exports.get_product_by_id = exports.findAll = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource/"));
const twilio_1 = __importDefault(require("../../services/twilio"));
// CREATE product
const store = async (req, res) => {
    try {
        const producDtata = await datasource_1.default.product.create({ data: req.body });
        res.status(201).json({
            ok: true,
            body: producDtata,
            message: "Product created successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
};
exports.store = store;
//GET all product
const findAll = async (_req, res) => {
    try {
        const products = await datasource_1.default.product.findMany();
        res.status(200).json({
            ok: true,
            body: products,
            message: "Get all products successfully",
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.findAll = findAll;
// GET product by {ID}
const get_product_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const products = await datasource_1.default.product.findUnique({
            where: { id },
        });
        res.status(200).json({
            ok: "true",
            data: products,
            message: "Get this product according to ID"
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.get_product_by_id = get_product_by_id;
// UPDATE products by {ID}
const update_product = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const products = await datasource_1.default.product.update({
            where: { id },
            data: req.body,
        });
        const checkProductStock = await datasource_1.default.product.findMany({
            where: {
                stock: {
                    lt: req.body.thresshold_value,
                },
            },
        });
        if (checkProductStock.length != 0) {
            (0, twilio_1.default)(checkProductStock);
        }
        return res.status(200).json({
            message: "Product updated successfully",
            data: products,
        });
    }
    catch (error) {
        return res.status(204).json({ ok: false, message: error });
    }
};
exports.update_product = update_product;
//DELETE Track by {ID}
const delete_product_by_id = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await datasource_1.default.product.delete({
            where: { id },
        });
        res.status(200).json({
            ok: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: error,
        });
    }
};
exports.delete_product_by_id = delete_product_by_id;
//# sourceMappingURL=controller.js.map