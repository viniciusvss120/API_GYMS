import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMatricsUseCase } from "../get-user-metrics";

export function makeGetUserMatricsUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const checkInsRepository = new PrismaCheckInsRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const useCase = new GetUserMatricsUseCase(checkInsRepository);

  return useCase;
}
