/* eslint-disable prefer-const */
import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/use-cases/utils-case/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Validate Check-Ins (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve conseguir validar um check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();
    const gym = await prisma.gym.create({
      data: {
        title: "Vue Gym",
        latitude: -10.4393255,
        longitude: -62.4716607,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_Id: user.id,
      },
    });
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/gyms`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
