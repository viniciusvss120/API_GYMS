import { CreateGymrUseCase } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymsUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const createRepository = new PrismaGymsRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const useCase = new CreateGymrUseCase(createRepository);

  return useCase;
}
