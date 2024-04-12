/* eslint-disable prettier/prettier */
import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUserCaseRequest {
  title: string;
  description?: string | null;
  phone: string | null;
  latitude: number;
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymrUseCase {

  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUserCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
    return {
      gym,
    }
  }
}
