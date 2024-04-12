import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-erro";
import { makeAuthenticateUseCase } from "@/use-cases/factory/make-authenticate-use-case";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  // Definindo o tipos dos dados que vamos receber
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  // validando os dados que recebemos
  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );
    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
