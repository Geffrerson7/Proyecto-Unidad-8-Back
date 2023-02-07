"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const productRouter = (0, express_1.Router)();
productRouter.post("/", controller_1.store);
productRouter.get("/", controller_1.findAll);
productRouter.get("/:id", controller_1.get_product_by_id);
productRouter.put("/:id", controller_1.update_product);
productRouter.delete("/:id", controller_1.delete_product_by_id);
exports.default = productRouter;
//# sourceMappingURL=index.js.map