import { SearchGyms } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const searchRepository = new PrismaGymsRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const useCase = new SearchGyms(searchRepository);

  return useCase;
}
