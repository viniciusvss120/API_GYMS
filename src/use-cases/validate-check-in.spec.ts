/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { ValidateCheckinUseCase } from "./validate-check-in";
import { ResourceNotFound } from "./errors/resource-not-found-error";

// Os teste unitarios servem para testar determinadas funcionalidades da aplicação e não precisa consultar banco de dados ou bibliotecas externas
describe("Check-in Use Case", () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let sut: ValidateCheckinUseCase
  beforeEach(async () => {
    // Para os testes unitários, não vamos usar uma base de dados real, vamos salvar dados em memória.
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckinUseCase(checkInsRepository)


    // await gymsRepository.create({
    //   id: "gym-01",
    //   title: "JavaScript Gym",
    //   description: "",
    //   phone: "",
    //   latitude: -10.4429214,
    //   longitude: -62.4716607
    // })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to validate the check-in", async () => {
    // vi.setSystemTime(new Date(2024, 2, 27, 8, 0, 0))
    const createdCheckin = await checkInsRepository.create({
      gym_id: "gym-01",
      user_Id: "user-01"
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckin.id
    });


    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect( () =>
      sut.execute({
        checkInId: "inexistente-check-in-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it("shou not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 3, 1, 13, 40))
    const createdCheckin = await checkInsRepository.create({
      gym_id: "gym-01",
      user_Id: "user-01"
    })
    
    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    expect(() => sut.execute({
      checkInId: createdCheckin.id
    })).rejects.toBeInstanceOf(Error)
  })
})
