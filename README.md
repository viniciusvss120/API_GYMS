# App

GymPass style app.

<!-- Os requisitos funcionais dizem o que o usuário pode fazer dentro da nossa aplicação -->
## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-in realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu hitórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possivel o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível cadastrar uma academia;

<!-- As regras de negócio também diz o que o usário pode fazer na nossa aplicação, mas com algumas regras, por exemplo, o usuário só pode editar os dados que ele criou. -->
## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode se validado até 20 min após criado
- [x] O check-in só pode ser validado por administradores;
- [x] A acadmia só pode ser cadastrada por administradores;

<!-- O requisitos não-funcionais envolve mais a parte técnica da aplicação, como , qual Banco de dados usar, quais tecnologias usar, quais métodos ou mediadas utilizar. -->
## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (Json Web TOken)