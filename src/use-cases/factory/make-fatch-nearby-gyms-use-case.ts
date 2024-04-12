import { FetchNearbyGyms } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase() {
  // Aqui estamos instaciando uma classe que contém os métodos do prisma para manipular o banco de dados.
  const fetchNearbyRepository = new PrismaGymsRepository();
  // Essa classe recebe a ORM que vai operar na aplicação
  const useCase = new FetchNearbyGyms(fetchNearbyRepository);

  return useCase;
}
