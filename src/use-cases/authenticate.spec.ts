/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
// import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
// import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-erro";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Autenticação de caso de uso", () => {
  let useRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase
  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(useRepository)
  })

  it("deve ser possível cadastrar e autenticar o usuário", async () => {

    await useRepository.create({
      nome: "Vinicius Souza",
      email: "vini@gmail.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      email: "vini@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String))
  });

  it("não deve ser possível cadastrar e autenticar o usuário com email repetidos", async () => {

    expect(() =>
      sut.execute({
        email: "vini@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it("não deve ser possível cadastrar e autenticar o usuário com password incorreto", async () => {

    await useRepository.create({
      nome: "Vinicius Souza",
      email: "vini@gmail.com",
      password_hash: await hash("123456", 6),
    })

    expect(() =>
      sut.execute({
        email: "vini@gmail.com",
        password: "12345526",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});
