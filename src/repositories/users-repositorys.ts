import { Prisma, User } from "@prisma/client";

// Aqui é uma interface onde colocamos os métodos que a classe PrismaUsersRepository vai utilizar.
export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
