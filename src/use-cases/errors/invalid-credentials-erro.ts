// Aqui estamos criando e exportando uma classe que estende a classe Error, onde passamos a mensagem de erro.

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials.");
  }
}
