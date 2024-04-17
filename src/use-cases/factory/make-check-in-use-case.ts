/* eslint-disable prettier/prettier */
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckinUseCase } from "../checkin";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para cada parte da aplicação.
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  // Essa classe recebe a ORM que vai operar na aplicação, ou seja, aqui que faremos as devidas operações no banco
  const useCase = new CheckinUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
