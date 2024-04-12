/* eslint-disable prettier/prettier */
// import { prisma } from "@/lib/prisma";
import { UsersRepository } from "@/repositories/users-repositorys";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists-error";
import { User } from "@prisma/client";

interface RegisteUserCaseRequest {
  nome: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}
// Aqui é o caso de uso, onde, além de criar o hash da senha do usuário, utilizaremos os métodos presentes na interface (vindas de UserRepository), que por sua vez é utilizado na classe do prisma.
export class RegisterUseCase {
  // Quando instasearmos essa classe, vamos passar, como parâmetro, a classe que contém os métodos que a ORM vai operar nessa classe.
  constructor(private usersRepository: UsersRepository) {}

  async execute({ nome, email, password }: RegisteUserCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    // const prismaUserRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      nome,
      email,
      password_hash,
    });
    return {
      user,
    }
  }
}
