"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app_1 = require("../../src/app");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
describe("category", () => {
    it("should return a order object", async () => {
        const order = await prisma.order.findUnique({
            where: {
                id: 1,
            },
        });
        const expectedResponse = {
            ok: true,
            body: order,
            message: "Order found",
        };
        const result = await request(app_1.app).get("/api/v1/orders/1").expect(200);
        expect(result.body).toEqual(expectedResponse);
    });
});
//# sourceMappingURL=getOneOrder.test.js.map