/* eslint-disable prettier/prettier */
import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve conseguir gerar um refreshToken para o usuario", async () => {
    await request(app.server).post("/users").send({
      nome: "Vinicius Silva",
      email: "viniciusvss120@gmail.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "viniciusvss120@gmail.com",
      password: "123456",
    });

    // Aqui estamos pegando o valor do Cookie do authenticare
    const cookies = authResponse.get("Set-Cookie") ?? [];
  
    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken=")
    ])
  });
});
