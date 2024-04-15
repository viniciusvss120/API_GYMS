/* eslint-disable prettier/prettier */
import {Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsRequest {
  query: string;
  page: number
}

type SearchGymsResponse = {
  gyms: Gym[];
};

export class SearchGyms {
  constructor(
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    query,
    page
  }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.seacherMany(query, page)

    return {
      gyms,
    }
  }
}
