import { makeValidateUseCase } from "@/use-cases/factory/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckIn = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckIn.parse(request.params);

  const validateUseCase = makeValidateUseCase();

  await validateUseCase.execute({ checkInId });

  return reply.status(204).send();
}
