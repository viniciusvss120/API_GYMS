import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const prismaUserRepository = new PrismaUsersRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

  return authenticateUseCase;
}
