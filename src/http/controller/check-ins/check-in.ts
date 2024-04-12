import { makeCheckInUseCase } from "@/use-cases/factory/make-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CheckIns(request: FastifyRequest, reply: FastifyReply) {
  const gymsIdCheckIn = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckIns = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = gymsIdCheckIn.parse(request.params);
  const { latitude, longitude } = createCheckIns.parse(request.body);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(204).send();
}
