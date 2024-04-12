/* eslint-disable prettier/prettier */
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFound } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface ValidateCheckinUseCaseRequest {
  checkInId: string;

}

type ValidateCheckinUseCaseResponse = {
  checkIn: CheckIn;
};

export class ValidateCheckinUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    checkInId
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    )

    if(distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }
    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    };
  }
}
