const request = require("supertest")
import { app } from "../../src/app";

describe('Order-detail', () => {
  // it('should store a order-detail',async () => {
    
  //   const new_order = {
  //     order_id:2,
  //     product_id:2,
  //     quantity:2
  //   }
    
  //   const expectedResponse = {
  //     ok: true,
  //     body: {
  //         order_id: 2,
  //         product_id: 2,
  //         quantity: 2
  //     },
  //     message: "Order detail created successfully"
  // };

  //   const result = await request(app)
  //     .post('/api/v1/order-detail/')
  //     .send(new_order)
  //     .expect(201)

  //     expect(result.body).toEqual(expectedResponse)
    
  // });

  it('It should return a 500 server error becuase order not exist ',async () => {
    const new_order = {
      order_id:3,
      product_id:2,
      quantity:2
    }
    
    const expectedResponse = {
      ok: false, 
      message: "Order not exist" 
    };

    const result = await request(app)
      .post('/api/v1/order-detail/')
      .expect(500)

      // expect(result.body).toEqual(expectedResponse)
    
  });

  it('It should return a 500 server error.',async () => {

    const result = await request(app)
      .post('/api/v1/order-detail/')
      .send({})
      .expect(500)
    
  });
});
