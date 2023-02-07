"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app_1 = require("../../src/app");
describe('category', () => {
    // it('should store a category',async () => {
    //   const expectedResponse = {
    //     ok: true, 
    //     body: {id: 10, name: "categoria", max_storage_temperature: 30.0, min_storage_temperature: 20.0}, 
    //     message: "Category created successfully"
    //   };
    //   const result = await request(app)
    //     .post('/api/v1/categories/')
    //     .send({name: "categoria", max_storage_temperature: 30.0, min_storage_temperature: 20.0})
    //     .expect(201)
    //     expect(result.body).toEqual(expectedResponse)
    // });
    it('It should return an error due to temperature validation', async () => {
        const expectedResponse = {
            ok: false,
            message: "Max temp can't be lower than min temp"
        };
        const result = await request(app_1.app)
            .post('/api/v1/categories/')
            .send({ name: "categoria", max_storage_temperature: 10.0, min_storage_temperature: 20.0 })
            .expect(400);
        expect(result.body).toEqual(expectedResponse);
    });
    it('It should return a 500 server error.', async () => {
        const result = await request(app_1.app)
            .post('/api/v1/categories/')
            .send({})
            .expect(500);
    });
});
//# sourceMappingURL=createCategory.test.js.map