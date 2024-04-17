import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/use-cases/utils-case/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-Ins (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve conseguir criar um check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Vue Gym",
        latitude: -10.4393255,
        longitude: -62.4716607,
      },
    });
    console.log(gym);
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-in`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -10.4393255,
        longitude: -62.4716607,
      });

    expect(response.statusCode).toEqual(201);
  });
});
