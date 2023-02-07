"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/", controller_1.findAll);
userRouter.get("/:idUser", controller_1.getOne);
userRouter.put("/:idUser", controller_1.update);
userRouter.post("/signup", controller_1.signup);
userRouter.post("/login", controller_1.login);
userRouter.delete("/:idUser", controller_1.remove);
exports.default = userRouter;
//# sourceMappingURL=index.js.map