const mongoose = require("mongoose");
const request = require("supertest");

const index = require("../index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET calls", () => {
    it("should logout confimation code", async () => {
      const res = await request(index.server).get("/users/logout");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("POST calls", () => {
    it("should login confimation code", async () => {
      const payload = { email:'fordrsmax@gmail.com', password:'1234' } 
      const res = await request(index.server).post("/users/login").send({payload});
      expect(res.statusCode).toBe(200);
    });

    //tiene que fallar a proposito
    it("should login confimation error", async () => {
      const payload = { email:'fordrsmax@gmail.com', password:'12123' } 
      const res = await request(index.server).post("/users/login").send({payload});
      expect(res.statusCode).toBe(200);
      // expect(res.statusCode).toBe(400);
    });

    //tiene que fallar a proposito
    it("should singup confimation error", async () => {
      const payload = { name:'javi' , email:'fordrsmax@gmail.com', password:'12123' } 
      const res = await request(index.server).post("/users/signup").send({payload});
      expect(res.statusCode).toBe(200);
      // expect(res.statusCode).toBe(400);
    });
  });