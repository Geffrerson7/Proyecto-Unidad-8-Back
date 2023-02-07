"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app_1 = require("../../src/app");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
describe("order", () => {
    it("should return a list of objects", async () => {
        const orders = await prisma.order.findMany();
        const expectedResponse = {
            ok: true,
            body: orders
        };
        const result = await request(app_1.app).get("/api/v1/orders/").expect(200);
        expect(result.body).toEqual(expectedResponse);
    });
});
//# sourceMappingURL=listOrders.test.js.map