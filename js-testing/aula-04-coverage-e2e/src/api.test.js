const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const { deepStrictEqual, ok } = require("assert");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should be able to request the contact page and return HTTP status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should be able to request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      deepStrictEqual(response.text, "Hello World!");
    });
  });

  describe("/login", () => {
    it("should be able to login successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Davys", password: "123" })
        .expect(200);

      deepStrictEqual(response.text, "Logging has succeeded!");
    });

    it("should be able to return HTTP Status 401 when users have invalid credentials ", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "DavysWrong", password: "1234" })
        .expect(401);

      ok(response.unauthorized);
      deepStrictEqual(response.text, "Logging failed!");
    });
  });
});
