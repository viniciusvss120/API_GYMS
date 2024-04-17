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
    // Acima vemos que nesse método recebemos, de dentro da interface CheckinUseCaseRequest, os dados que precisamos pra fazer o check-in e retornamos uma Promise contendo as informações de check-in.

    // Aqui estamos vendo se a academia existe.
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    // Aqui utilizamos uma função para validar se a academia em que buscamos fica a 100m do usuário
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

    // Aqui verificamos se o usuário já fez o check-in
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
  
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    // Caso o usuário não tenha feito o check-in, fazemos um novo check-in
    const checkin = await this.checkInsRepository.create({
      gym_id: gymId,
      user_Id: userId,
    });

    return {
      checkin,
    };
  }
}
