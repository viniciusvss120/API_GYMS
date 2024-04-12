import { makeFetchNearbyGymsUseCase } from "@/use-cases/factory/make-fatch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGyms = z.object({
    latitude: z.number().refine((value) => {
      return value <= 90;
    }),
    longitude: z.number().refine((value) => {
      return value <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGyms.parse(request.query);

  const nearbyUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await nearbyUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
