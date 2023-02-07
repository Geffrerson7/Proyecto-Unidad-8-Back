"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = exports.OrderDetailRouter = exports.userRouter = exports.OrderRouter = exports.ClientRouter = exports.SupplierRouter = exports.ProductRouter = void 0;
var products_1 = require("./products");
Object.defineProperty(exports, "ProductRouter", { enumerable: true, get: function () { return __importDefault(products_1).default; } });
var suppliers_1 = require("./suppliers");
Object.defineProperty(exports, "SupplierRouter", { enumerable: true, get: function () { return __importDefault(suppliers_1).default; } });
var clients_1 = require("./clients");
Object.defineProperty(exports, "ClientRouter", { enumerable: true, get: function () { return __importDefault(clients_1).default; } });
var orders_1 = require("./orders");
Object.defineProperty(exports, "OrderRouter", { enumerable: true, get: function () { return __importDefault(orders_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var order_detail_1 = require("./order-detail");
Object.defineProperty(exports, "OrderDetailRouter", { enumerable: true, get: function () { return __importDefault(order_detail_1).default; } });
var category_1 = require("./category");
Object.defineProperty(exports, "categoryRouter", { enumerable: true, get: function () { return __importDefault(category_1).default; } });
//# sourceMappingURL=index.js.map