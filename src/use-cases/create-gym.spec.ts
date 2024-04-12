/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
// import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
// import { compare } from "bcryptjs";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymrUseCase } from "./create-gym";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Create Gym Use Case", () => {
  let gymRepository: InMemoryGymsRepository
  let sut: CreateGymrUseCase
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymrUseCase(gymRepository)
  })
  it("should be able to create gym", async () => {

    const { gym } = await sut.execute({
     title: "JavaScript Gym",
     description: null,
     phone: null,
     latitude: -10.4393255,
     longitude:-62.4716607,
    });

    // const isPasswordCorrectlyHashed = await compare( "123456", user.password_hash )

    expect(gym.id).toEqual(expect.any(String))
  });
});
