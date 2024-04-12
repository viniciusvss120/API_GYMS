import { makeGetUserMatricsUseCase } from "@/use-cases/factory/make-get-user-metrics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsUseCase = makeGetUserMatricsUseCase();

  const { checkInsCount } = await metricsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    checkInsCount,
  });
}
