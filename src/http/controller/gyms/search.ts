import { makeSearchGymsUseCase } from "@/use-cases/factory/make-search-gyms";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGyms = z.object({
    query: z.string(),
    page: z.coerce.number().default(1),
  });

  const { query, page } = searchGyms.parse(request.query);

  const gymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await gymsUseCase.execute({ query, page });

  return reply.status(200).send({
    gyms,
  });
}
