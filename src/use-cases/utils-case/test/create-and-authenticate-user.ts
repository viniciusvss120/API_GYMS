/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  // Cria o usuário
  const user = await prisma.user.create({
    data: {
      nome: "Vinicius Silva Souza",
      email: "viniciusvss120@gmail.com",
      role: isAdmin ? "ADMIN" : "MEMBER",
      password_hash: await hash("123456", 6),
    },
  });
  // await request(app.server).post("/users").send({
  //   nome: "Vinicius Silva",
  //   email: "viniciusvss120@gmail.com",
  //   password: "123456",
  // });
  // Loga o usuário
  const authenticate = await request(app.server).post("/sessions").send({
    email: "viniciusvss120@gmail.com",
    password: "123456",
  });

  const { token } = authenticate.body;
  return {
    token,
    user,
  };
}
