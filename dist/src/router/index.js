"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const components_1 = require("../components");
const routes = [
    ["products", components_1.ProductRouter],
    ["clients", components_1.ClientRouter],
    ["orders", components_1.OrderRouter],
    ["users", components_1.userRouter],
    ["suppliers", components_1.SupplierRouter],
    ["order-detail", components_1.OrderDetailRouter],
    ["categories", components_1.categoryRouter],
];
const router = (app) => {
    routes.forEach(([path, controller]) => app.use(`/api/v1/${path}`, controller));
};
exports.router = router;
//# sourceMappingURL=index.js.map