import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
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
  return {
    token,
  };
}
