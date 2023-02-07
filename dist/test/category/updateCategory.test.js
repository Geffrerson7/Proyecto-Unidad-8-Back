"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app_1 = require("../../src/app");
describe('category', () => {
    it('It should update a category', async () => {
        const expectedResponse = {
            ok: true,
            body: { id: 5, name: "Bebidas", max_storage_temperature: 25.0, min_storage_temperature: 15.0 },
            message: "Category updated successfully"
        };
        const result = await request(app_1.app)
            .put('/api/v1/categories/5')
            .send({ name: "Bebidas", max_storage_temperature: 25.0, min_storage_temperature: 15.0 })
            .expect(200);
        expect(result.body).toEqual(expectedResponse);
    });
    it(`should return new max temp can't be lower than min temp`, async () => {
        const expectedResponse = {
            ok: false,
            message: "Max temp can't be lower than min temp"
        };
        const result = await request(app_1.app)
            .put('/api/v1/categories/5')
            .send({ max_storage_temperature: 10.0 })
            .expect(400);
        expect(result.body).toEqual(expectedResponse);
    });
    it(`should return new min temp can't be upper than max temp`, async () => {
        const expectedResponse = {
            ok: false,
            message: "Min temp can't be upper than max temp"
        };
        const result = await request(app_1.app)
            .put('/api/v1/categories/5')
            .send({ min_storage_temperature: 30.0 })
            .expect(400);
        expect(result.body).toEqual(expectedResponse);
    });
    it(`should return max temp can't be lower than mmin temp`, async () => {
        const expectedResponse = {
            ok: false,
            message: "Max temp can't be lower than min temp"
        };
        const result = await request(app_1.app)
            .put('/api/v1/categories/5')
            .send({ max_storage_temperature: 15.0, min_storage_temperature: 25.0 })
            .expect(400);
        expect(result.body).toEqual(expectedResponse);
    });
    it('should return: category not found', async () => {
        const expectedResponse = {
            ok: false,
            message: "Category not found"
        };
        const result = await request(app_1.app)
            .get('/api/v1/categories/20/')
            .expect(400);
        expect(result.body).toEqual(expectedResponse);
    });
});
//# sourceMappingURL=updateCategory.test.js.map