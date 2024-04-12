import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const userRepository = new PrismaUsersRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const useCase = new GetUserProfileUseCase(userRepository);

  return useCase;
}
