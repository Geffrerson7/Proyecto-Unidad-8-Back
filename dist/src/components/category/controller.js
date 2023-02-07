"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getOne = exports.findAll = exports.store = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
const store = async (req, res) => {
    try {
        const { max_storage_temperature, min_storage_temperature } = req.body;
        if (max_storage_temperature < min_storage_temperature) {
            return res
                .status(400)
                .json({ ok: false, message: "Max temp can't be lower than min temp" });
        }
        const category = await datasource_1.default.category.create({ data: req.body });
        return res
            .status(201)
            .json({ ok: true, body: category, message: "Category created successfully" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, message: error });
    }
};
exports.store = store;
const findAll = async (_req, res) => {
    try {
        const categories = await datasource_1.default.category.findMany();
        return res
            .status(200)
            .json({ ok: true, body: categories });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.findAll = findAll;
const getOne = async (req, res) => {
    try {
        const idCategory = Number(req.params.idCategory);
        const category = await datasource_1.default.category.findUnique({
            where: {
                id: idCategory,
            },
        });
        if (!category) {
            return res
                .status(400)
                .json({ ok: false, message: "Category not found" });
        }
        return res
            .status(200)
            .json({ ok: true, body: category, message: "Category found" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.getOne = getOne;
const update = async (req, res) => {
    try {
        const { max_storage_temperature, min_storage_temperature } = req.body;
        const idCategory = Number(req.params.idCategory);
        const category = await datasource_1.default.category.findUnique({
            where: {
                id: idCategory,
            },
        });
        if (!category) {
            return res
                .status(400)
                .json({ ok: false, message: "Category not found" });
        }
        if (max_storage_temperature && !min_storage_temperature && max_storage_temperature < category.min_storage_temperature) {
            return res
                .status(400)
                .json({ ok: false, message: "Max temp can't be lower than min temp" });
        }
        if (min_storage_temperature && !max_storage_temperature && min_storage_temperature > category.max_storage_temperature) {
            return res
                .status(400)
                .json({ ok: false, message: "Min temp can't be upper than max temp" });
        }
        if (max_storage_temperature && min_storage_temperature && min_storage_temperature > max_storage_temperature) {
            return res
                .status(400)
                .json({ ok: false, message: "Max temp can't be lower than min temp" });
        }
        const categoryUpdated = await datasource_1.default.category.update({
            where: { id: idCategory },
            data: req.body,
        });
        return res
            .status(200)
            .json({ ok: true, body: categoryUpdated, message: "Category updated successfully" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const idCategory = Number(req.params.idCategory);
        const category = await datasource_1.default.category.findUnique({
            where: {
                id: idCategory,
            },
        });
        if (!category) {
            return res
                .status(400)
                .json({ ok: false, message: "Category not found" });
        }
        await datasource_1.default.category.delete({
            where: { id: idCategory },
        });
        return res
            .status(200)
            .json({ ok: true, body: "", message: "Deleted" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ ok: false, body: error, message: "Server Error" });
    }
};
exports.remove = remove;
//# sourceMappingURL=controller.js.map