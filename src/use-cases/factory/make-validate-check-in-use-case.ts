import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckinUseCase } from "../validate-check-in";

export function makeValidateUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const validateRepository = new PrismaCheckInsRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const useCase = new ValidateCheckinUseCase(validateRepository);

  return useCase;
}
