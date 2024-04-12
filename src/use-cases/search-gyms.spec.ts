/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGyms } from "./search-gyms";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Search gyms Use Case", () => {
  let gymsRepository: InMemoryGymsRepository;
  // let gymsRepository: InMemoryGymsRepository
  let sut: SearchGyms
  beforeEach(async () => {
    // Para os testes unitários, não vamos usar uma base de dados real, vamos salvar dados em memória.
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGyms(gymsRepository)

  })

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      id: "user-01",
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -10.4393255,
      longitude:-62.4716607,
    })
    await gymsRepository.create({
      id: "user-02",
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -10.4393255,
      longitude:-62.4716607,
    })
    
    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({title: "JavaScript Gym"}),
    ])
  });


  it("should be able to fetch paginated gym search", async () => {
    for(let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -10.4393255,
        longitude:-62.4716607,
      })
    }
    
    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title: "JavaScript Gym 21"}),
      expect.objectContaining({title: "JavaScript Gym 22"}),
    ])
  });
});
