import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/use-cases/utils-case/test/create-and-authenticate-user";

describe("Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve conseguir criar uma academia", async () => {
    const { token } = await createAndAuthenticateUser(app);

    // Acessa o perfil do usuário
    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "Some description",
        phone: "69999885544",
        latitude: -10.4393255,
        longitude: -62.4716607,
      });
    console.log(response.body.gyms);
    expect(response.statusCode).toEqual(201);
    // expect(response.body.gyms).toEqual(
    //   expect.objectContaining({
    //     title: "JavaScript Gym",
    //   }),
    // );
  });
});
