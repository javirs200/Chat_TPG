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
      const res = await request(index.server).post("/users/login").set('Content-type', 'application/json').send({ email:'fordrsmax@gmail.com', password:'1234' });
      expect(res.statusCode).toBe(200);
    });

    //tiene que fallar a proposito
    it("intento login con mala contraseña , should be 404", async () => { 
      const res = await request(index.server).post("/users/login").set('Content-type', 'application/json').send({ email:'fordrsmax@gmail.com', password:'adsd1234' });
      expect(res.statusCode).toBe(404);//404 not found -> no hay usuario con esas credenciales
    });

    //tiene que fallar a proposito
    it("intento login con usuario no registrado , should be 404", async () => { 
      const res = await request(index.server).post("/users/login").set('Content-type', 'application/json').send({ email:'b@b.com', password:'1234' });
      expect(res.statusCode).toBe(404);//404 not found -> no hay usuario con esas credenciales
    });

    //tiene que fallar a proposito
    it("should singup confimation error", async () => {
      const res = await request(index.server).post("/users/signup").set('Content-type', 'application/json').send( { name:'javi' , email:'fordrsmax@gmail.com', password:'12123' } );
      expect(res.statusCode).toBe(400);
    });
  });