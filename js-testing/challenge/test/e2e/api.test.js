const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/api");

describe("API Suite test", () => {
  describe("/cars", () => {
    it("should be able to request cars and return HTTP status 200", async () => {
      const response = await request(app).get("/cars");

      expect(response.statusCode).to.be.equal(200);
    });
  });
});
