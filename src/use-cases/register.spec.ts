/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "./resgister";
// import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
// import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists-error";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Registro de caso de uso", () => {
  let useRepository: InMemoryUsersRepository
  let sut: RegisterUseCase
  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(useRepository)
  })
  it("A senha do usuário deve ser um hash quando se cadastrar na aplicação", async () => {

    const { user } = await sut.execute({
      nome: "Vinicius Souza",
      email: "vini@gmail.com",
      password: "123456",
    });

    // const isPasswordCorrectlyHashed = await compare( "123456", user.password_hash )

    expect(user.id).toEqual(expect.any(String))
  });

  it("Não deve ser possível se cadastrar com o mesmo e-mail duas vezes", async () => {

    const email = "teste@gmail.com"

    await sut.execute({
      nome: "Vinicius Souza",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        nome: "Vinicius Souza",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  });
});
