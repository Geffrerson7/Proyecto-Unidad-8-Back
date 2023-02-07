const request = require("supertest")
import { app } from "../../src/app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe('category', () => {
  it('should return a category object',async () => {
    
    const category = await prisma.category.findUnique({
      where: {
        id: 2,
      },
    });
    const expectedResponse = {
      ok: true, 
      body: category, 
      message: "Category found"
    };

    const result = await request(app)
      .get('/api/v1/categories/2/')
      .expect(200)

      expect(result.body).toEqual(expectedResponse)
    
  });

  it('should return: category not found',async () => {
    
    const expectedResponse = {
      ok: false,
      message: "Category not found"
    };

    const result = await request(app)
      .get('/api/v1/categories/200/')
      .expect(400)

      expect(result.body).toEqual(expectedResponse)
    
  });
  
});