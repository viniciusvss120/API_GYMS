/* eslint-disable prettier/prettier */
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHitoryRequest {
  userId: string;
  page: number
}

type FetchUserCheckInsHitoryResponse = {
  checkIns: CheckIn[];
};

export class FetchUserCheckInsHitory {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({
    userId,
    page
  }: FetchUserCheckInsHitoryRequest): Promise<FetchUserCheckInsHitoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
