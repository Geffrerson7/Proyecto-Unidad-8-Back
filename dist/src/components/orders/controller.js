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
        const order = await datasource_1.default.order.create({
            data: {
                order_code: data.order_code,
                client: { connect: { id: data.client } },
                order_details: {
                    create: data?.order_detail?.map((c) => ({
                        product: {
                            connect: {
                                id: c.product,
                            },
                        },
                        quantity: c.quantity,
                    })),
                },
            },
        });
        //evento
        res
            .status(201)
            .json({ ok: true, body: order, message: "Order placed successfully" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.store = store;
const findAll = async (_req, res) => {
    try {
        const orders = await datasource_1.default.order.findMany({
            include: {
                client: true,
                order_details: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.json({ ok: true, body: orders });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.findAll = findAll;
const getOne = async (req, res) => {
    try {
        const idOrder = Number(req.params.idOrder);
        const order = await datasource_1.default.order.findUnique({
            where: {
                id: idOrder,
            },
            include: {
                client: {
                    select: {
                        document_id: true,
                    },
                },
                order_details: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.json({ ok: true, body: order, message: "Order found" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const id = Number(req.params.idOrder);
        const order = await datasource_1.default.order.update({
            where: { id },
            data: req.body,
        });
        res.json({
            ok: true,
            body: order,
            message: "Order updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.update = update;
//soft delete
const remove = async (req, res) => {
    try {
        const id = Number(req.params.idOrder);
        const deleteOrderDetails = datasource_1.default.orderDetails.deleteMany({
            where: {
                order_id: id,
            },
        });
        const deleteOrder = datasource_1.default.order.delete({
            where: {
                id,
            },
        });
        const transaction = await datasource_1.default.$transaction([
            deleteOrderDetails,
            deleteOrder,
        ]);
        res.status(204).json({ ok: true, body: "", message: "Deleted" });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.remove = remove;
//# sourceMappingURL=controller.js.map