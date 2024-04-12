import { makeGetUserProfileUseCase } from "@/use-cases/factory/make-get-user-profile";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  });
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
