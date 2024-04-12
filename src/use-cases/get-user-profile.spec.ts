/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
// import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
// import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFound } from "./errors/resource-not-found-error";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Autenticação de caso de uso", () => {
  let useRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase
  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(useRepository)
  })

  it("deve ser possível cadastrar e autenticar o usuário", async () => {

    const createdUser =  await useRepository.create({
      nome: "Vinicius Souza",
      email: "vini@gmail.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.nome).toEqual('Vinicius Souza')
  });

  it("não deve ser possível cadastrar e autenticar o usuário com id repetidos", async () => {

    expect(() =>
      sut.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  });
});
