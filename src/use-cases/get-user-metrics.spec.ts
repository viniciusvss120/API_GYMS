/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMatricsUseCase } from "./get-user-metrics";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Fetch User Check-in History Use Case", () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  // let gymsRepository: InMemoryGymsRepository
  let sut: GetUserMatricsUseCase
  beforeEach(async () => {
    // Para os testes unitários, não vamos usar uma base de dados real, vamos salvar dados em memória.
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMatricsUseCase(checkInsRepository)

  })

  it("should be able to get check-in count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_Id: "user-01"
    })
    await checkInsRepository.create({
      gym_id: "gym-02",
      user_Id: "user-01"
    })

    const { checkInsCount } = await sut.execute({
      userId: "user-01"
    })

    expect(checkInsCount).toEqual(2)

  });
});
