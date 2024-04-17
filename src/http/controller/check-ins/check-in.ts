import { makeCheckInUseCase } from "@/use-cases/factory/make-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CheckIns(request: FastifyRequest, reply: FastifyReply) {
  // Aqui estamos recebendo e tipando o ID da academia
  const gymsIdCheckIn = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckIns = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = gymsIdCheckIn.parse(request.params);
  const { latitude, longitude } = createCheckIns.parse(request.body);

  // Aqui chamamos essa função pois, ela retorna o caso de uso, onde vamos fazer toda a operação para criar um check-in, neste cso em questão
  const checkInUseCase = makeCheckInUseCase();

  // Aqui passamos os dados que o caso de uso precisa para consegui fazer o check-in
  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
