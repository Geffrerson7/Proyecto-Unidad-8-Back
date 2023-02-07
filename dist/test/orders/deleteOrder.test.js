"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/* describe("order", () => {
  it("should return: Deleted", async () => {
    const expectedResponse = {
      ok: false,
      message: "Deleted"
    };
    const result = await request(app).delete("/api/v1/orders/3").expect(500);

    expect(result.body).toEqual(expectedResponse);
  });
}); */
//# sourceMappingURL=deleteOrder.test.js.map