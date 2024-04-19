/* eslint-disable prettier/prettier */
import { FastifyRequest, FastifyReply } from "fastify";

// Esse controller serve para quando o usuário perder sua autenticação,
export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  // Aqui vamos utilizar o jwtVerify para validar se o usuário está autenticado olhando o refreshToken, mas, vamos olhar no cookie e não dos headers. 
  await req.jwtVerify({ onlyCookie: true })

  const { role } = req.user
  // Caso for constato o refreshToken e o mesmo for valido, vamos criar um novo token e logo em seguido o refreshToken

  const token = await reply.jwtSign(
    {role},
    {
      sign: {
        sub: req.user.sub,
      },
    },
  );

  // Uma boa estratégia seria salvar o refreshToken no banco de dados, assim, caso for necesario invalidar a autenticação do usuário, é só informar no banco.
  const refreshToken = await reply.jwtSign(
    {role},
    {
      sign: {
        sub: req.user.sub,
        expiresIn: "7d",
      },
    },
  );
  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({
       token 
    });

}
