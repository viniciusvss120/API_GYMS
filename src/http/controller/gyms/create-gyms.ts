import { makeCreateGymsUseCase } from "@/use-cases/factory/make-crete-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createGyms(request: FastifyRequest, reply: FastifyReply) {
  const createGyms = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return value <= 90;
    }),
    longitude: z.number().refine((value) => {
      return value <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } = createGyms.parse(
    request.body,
  );

  const gymsUseCase = makeCreateGymsUseCase();

  await gymsUseCase.execute({ title, description, phone, latitude, longitude });

  return reply.status(201).send();
}
