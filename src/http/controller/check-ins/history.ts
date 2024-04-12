import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factory/make-fatch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyUser = z.object({
    page: z.coerce.number().default(1),
  });

  const { page } = historyUser.parse(request.query);

  const historyUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await historyUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
