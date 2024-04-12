/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGyms } from "./fetch-nearby-gyms";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Search gyms Use Case", () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: FetchNearbyGyms
  beforeEach(async () => {
    // Para os testes unitários, não vamos usar uma base de dados real, vamos salvar dados em memória.
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGyms(gymsRepository)

  })

  it("should be able to fetch nearby gyms for gyms", async () => {
    await gymsRepository.create({
      id: "user-01",
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -10.4393255,
      longitude:-62.4716607,
    })
    await gymsRepository.create({
      id: "user-02",
      title: "For Gym",
      description: null,
      phone: null,
      latitude: -10.7218546,
      longitude: -62.2656154,
    })

    const { gyms } = await sut.execute({
      userLatitude: -10.4429214,
      userLongitude: -62.4716607
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym" }),
    ])
  });

});
