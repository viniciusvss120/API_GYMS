import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHitory } from "../fatch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const checkInsRepository = new PrismaCheckInsRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const useCase = new FetchUserCheckInsHitory(checkInsRepository);

  return useCase;
}
