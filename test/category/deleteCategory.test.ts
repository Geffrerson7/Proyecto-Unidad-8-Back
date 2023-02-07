const request = require("supertest")
import { app } from "../../src/app";

describe('category', () => {

  it('should return: category not found',async () => {
    
    const expectedResponse = {
      ok: false,
      message: "Category not found"
    };

    const result = await request(app)
      .delete('/api/v1/categories/20/')
      .expect(400)

      expect(result.body).toEqual(expectedResponse)
    
  });

  // it('should return: Deleted',async () => {
    
  //   const expectedResponse = {
  //     ok: true, 
  //     body: "", 
  //     message: "Deleted"
  //   };

  //   const result = await request(app)
  //     .delete('/api/v1/categories/14/')
  //     .expect(200)

  //     expect(result.body).toEqual(expectedResponse)
    
  // });
  
});