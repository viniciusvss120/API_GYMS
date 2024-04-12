import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve conseguir criar um usuario", async () => {
    const response = await request(app.server).post("/users").send({
      nome: "Vinicius Silva",
      email: "viniciusvss120@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
