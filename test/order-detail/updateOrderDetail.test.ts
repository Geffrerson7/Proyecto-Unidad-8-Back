const request = require("supertest")
import { app } from "../../src/app";

describe('order-detail', () => {
  it('It should update a order-detail',async () => {
      const update_order = {
        order_id:2,
        product_id:2,
        quantity:2
      }
  
      const result = await request(app)
        .put('/api/v1/order-detail/update/5')
        .send(update_order)
        .expect(200)
  
        expect(result.body.ok).toBe(true);
        expect(result.body.data).toBeInstanceOf(Array);
        expect(result.body.message).toEqual("Order detail updated!")
      
    });
  
});