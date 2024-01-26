import {
  afterEach, beforeEach, describe, it,
} from '@jest/globals';
import supertest from 'supertest';
import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('Testing login route (POST)', () => {
  it('Login must have an email and password to authenticate.', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
    };

    await supertest(server)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."');
  });

  it('O login deve validar se o usuário está cadastrado', async () => {
    const loginMock = {
      email: 'raphael.teste@teste.com.br',
      senha: '123456',
    };
    await supertest(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuário não cadastrado."');
  });

  it('O login deve validar email e senha incorreto', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '12345',
    };
    await supertest(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuário ou senha invalido."');
  });

  it('O login deve validar se está sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '123456',
    };
    const resposta = await supertest(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(201);
    expect(resposta.body.message).toBe('Usuário conectado');
    expect(resposta.body).toHaveProperty('accessToken');
  });
});
