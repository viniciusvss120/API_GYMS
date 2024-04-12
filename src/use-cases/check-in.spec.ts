/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { CheckinUseCase } from "./checkin";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Autenticação de caso de uso", () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckinUseCase
  beforeEach(async () => {
    // Para os testes unitários, não vamos usar uma base de dados real, vamos salvar dados em memória.
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkInsRepository, gymsRepository)

    // Aqui estamos cadastrando uma academia antes de cada teste ser execultado
    // gymsRepository.items.push({
    //   id: "gym-01",
    //   title: "JavaScript Gym",
    //   description: "",
    //   phone: "",
    //   latitude: new Decimal(0),
    //   longitude: new Decimal(0)
    // })

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -10.4429214,
      longitude: -62.4716607
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2024, 2, 27, 8, 0, 0))
    const { checkin } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.4429214,
      userLongitude: -62.4716607
    });

    console.log(checkin.created_at)
    expect(checkin.id).toEqual(expect.any(String))
  });

  it("should not be able to check in twice in the same day", async () => {
    // Na linha abaixo, utilizando o vi do vitest, usamos o método setSystemTime e passamos um new Date para garantir que os check-ins estão sendo criados na mesma da.
    vi.setSystemTime(new Date(2024, 2, 27, 8, 0, 0))
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.4429214,
      userLongitude: -62.4716607
    });

    await expect(() => sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.4429214,
      userLongitude: -62.4716607
    })).rejects.toBeInstanceOf(Error)
  });

  it("should not be able to check in twice but in different day", async () => {
    vi.setSystemTime(new Date(2024, 2, 30, 8, 0, 0))
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.4429214,
      userLongitude: -62.4716607
    });

    vi.setSystemTime(new Date(2024, 2, 21, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.4429214,
      userLongitude: -62.4716607
    })

    expect(checkin.id).toEqual(expect.any(String))
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(- 10.4393255),
      longitude: new Decimal(-62.4716607)
    })

    await expect(() => sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: -10.4429214,
      userLongitude: -62.4826489
    })).rejects.toBeInstanceOf(Error)
  });
});
