/* eslint-disable prettier/prettier */
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMatricsUseCaseRequest {
  userId: string;
}

type GetUserMatricsUseCaseResponse = {
  checkInsCount: number
};

export class GetUserMatricsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({
    userId,
  }: GetUserMatricsUseCaseRequest): Promise<GetUserMatricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
