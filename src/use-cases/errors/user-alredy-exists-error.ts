// Aqui estamos criando e exportando uma classe que estende a classe Error, onde passamos a mensagem de erro.

export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists.");
  }
}
