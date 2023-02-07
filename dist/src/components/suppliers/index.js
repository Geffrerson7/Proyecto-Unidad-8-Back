"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const supplierRouter = (0, express_1.Router)();
supplierRouter.post("/", controller_1.store);
supplierRouter.get("/", controller_1.findAll);
supplierRouter.get("/:idSupplier", controller_1.findById);
supplierRouter.put("/:idSupplier", controller_1.updateSupplier);
supplierRouter.delete("/:idSupplier", controller_1.deleteSupplier);
exports.default = supplierRouter;
//# sourceMappingURL=index.js.map