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
      const res = await request(index.app).get("/users/logout");
      expect(res.statusCode).toBe(200);
    });
  });