"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.getOne = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const store = async (req, res) => {
    try {
        const data = req.body;
        await datasource_1.default.orderDetails.create({
            data: {
                quantity: data.quantity,
                product: { connect: { id: data.product_id } },
                order: { connect: { id: data.order_id } },
            }
        });
        res.status(201).json({
            ok: true,
            body: data,
            message: "Order detail created successfully"
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: "Server Error" });
    }
};
exports.store = store;
const getOne = async (req, res) => {
    try {
        const idOrder = Number(req.params.idOrder);
        const orderDetail = await datasource_1.default.orderDetails.findMany({
            where: {
                order_id: idOrder,
            },
            include: {
                product: true,
            },
        });
        res.json({ ok: true, data: orderDetail, message: "All the products of the order were obtained" });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.getOne = getOne;
const updateOne = async (req, res) => {
    try {
        const data = req.body;
        const idOrder = Number(req.params.idOrder);
        await datasource_1.default.orderDetails.updateMany({
            where: {
                order_id: idOrder,
                id: data.orderDetail_id
            },
            data: {
                product_id: data.product_id,
                quantity: data.quantity
            }
        });
        const updateOrderDetail = await datasource_1.default.orderDetails.findMany({
            where: {
                order_id: idOrder,
                id: data.orderDetail_id
            },
        });
        res.json({ ok: true, data: updateOrderDetail, message: "Order detail updated!" });
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.updateOne = updateOne;
//# sourceMappingURL=controller.js.map