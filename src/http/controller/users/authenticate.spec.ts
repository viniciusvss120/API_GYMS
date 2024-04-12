import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve conseguir autenticar um usuario", async () => {
    await request(app.server).post("/users").send({
      nome: "Vinicius Silva",
      email: "viniciusvss120@gmail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "viniciusvss120@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
