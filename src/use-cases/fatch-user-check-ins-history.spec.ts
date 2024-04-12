/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHitory } from "./fatch-user-check-ins-history";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Fetch User Check-in History Use Case", () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  // let gymsRepository: InMemoryGymsRepository
  let sut: FetchUserCheckInsHitory
  beforeEach(async () => {
    // Para os testes unitários, não vamos usar uma base de dados real, vamos salvar dados em memória.
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHitory(checkInsRepository)

  })

  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_Id: "user-01"
    })
    await checkInsRepository.create({
      gym_id: "gym-02",
      user_Id: "user-01"
    })
    
    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: "gym-01"}),
      expect.objectContaining({gym_id: "gym-02"})
    ])
  });


  it("should be able to fetch paginated check-in history", async () => {
    for(let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_Id: "user-01"
      })
    }
    
    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: "gym-21"}),
      expect.objectContaining({gym_id: "gym-22"})
    ])
  });
});
