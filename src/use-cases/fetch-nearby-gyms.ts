/* eslint-disable prettier/prettier */
import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number
}

type FetchNearbyGymsUseCaseResponse = {
  gyms: Gym[];
};

export class FetchNearbyGyms {
  constructor(
    private gymsRepository: GymsRepository,
  ) { }

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
        latitude: userLatitude,
        longitude: userLongitude,
      }
    )

    return {
      gyms,
    }
  }
}
