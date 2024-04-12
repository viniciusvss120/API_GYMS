import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-alredy-exists-error";
import { makeFactoryUseCase } from "@/use-cases/factory/make-factory-use-case";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  // Definindo o tipos dos dados que vamos receber
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  // validando os dados que recebemos
  const { nome, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeFactoryUseCase();

    await registerUseCase.execute({
      nome,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
  return reply.status(201).send();
}
