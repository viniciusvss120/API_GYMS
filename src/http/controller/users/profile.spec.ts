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

  it("deve conseguir acessar o perfil do usuario", async () => {
    // Cria o usuário
    await request(app.server).post("/users").send({
      nome: "Vinicius Silva",
      email: "viniciusvss120@gmail.com",
      password: "123456",
    });

    // Loga o usuário
    const authenticate = await request(app.server).post("/sessions").send({
      email: "viniciusvss120@gmail.com",
      password: "123456",
    });

    const { token } = authenticate.body;

    // Acessa o perfil do usuário
    const response = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: "viniciusvss120@gmail.com",
      }),
    );
  });
});
