const request = require("supertest")
import { app } from "../../src/app";
import prisma from "../../src/datasource";

describe('Order-Detail', () => {
  it('should return a order-list object',async () => {
    
    const result = await request(app)
      .get('/api/v1/order-detail/1/')
      .expect(200)

      expect(result.body.ok).toBe(true);
      expect(result.body.data).toBeInstanceOf(Array);
      expect(result.body.message).toEqual("All the products of the order were obtained")
    
  });

  it('should return a empty list becuase Order-lis not exist',async () => {
    
    const result = await request(app)
      .get('/api/v1/order-detail/20/')
      .expect(200)
    
      expect(result.body.ok).toBe(true);
      expect(result.body.data).toEqual([]);
      expect(result.body.message).toEqual("All the products of the order were obtained")
  });
  
});