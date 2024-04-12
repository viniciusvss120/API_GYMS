/* eslint-disable prettier/prettier */
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFound } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "./utils-case/get-distance-between-coordinats";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check_ins-error";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number
}

type CheckinUseCaseResponse = {
  checkin: CheckIn;
};

export class CheckinUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) { }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
    console.log(userId)
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }
    const checkin = await this.checkInsRepository.create({
      gym_id: gymId,
      user_Id: userId,
    });

    return {
      checkin,
    };
  }
}
