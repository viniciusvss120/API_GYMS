import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { UsersRepository } from "../users-repositorys";

// Essa classe representa um repositório Patters, pois, nessa classe estamos utilizando o Prisma para se comunicar com o banco de dados.

// A aplicação está sendo pensada de forma que ela funcione com camadas independentes, não dempendendo de uma determinada ferramenta, por exemplo, se quiser usar outra ORM (nessa aplicação), mudariamos apenas o repositório Patters. Vele lembrar que temos que alterar, também, a forma de se conectar com o banco, esse repositórios são as query para manipular o banco.
export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
