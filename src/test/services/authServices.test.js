import { describe, expect, it } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import AuthService from '../../services/authService.js';
import Usuario from '../../models/usuario.js';

const authService = new AuthService();

describe('Testing authService.cadastrar usuario', () => {
  it('User must have a name,email and password', async () => {
    const mockUser = {
      nome: 'Matheus',
      email: 'm@m.com.br',
    };

    const savedUser = authService.cadastrarUsuario(mockUser);

    await expect(savedUser).rejects.toThrowError('A senha de usuário é obrigatória!');
  });

  it('User password must be encrypted before inserting in DB', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoelson@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);
    const senhaIguais = await bcryptjs.compare('senha123', resultado.content.senha);

    expect(senhaIguais).toStrictEqual(true);

    await Usuario.excluir(resultado.content.id);
  });

  it('cant register an user with already existent email', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'teste@gmail.com',
      senha: '123456',
    };

    const usuarioSave = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSave).rejects.toThrowError('O email já esta cadastrado!');
  });

  it('Ao cadastrar um usuário, validar o retorno das informações do usuário', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoanel@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.content).toMatchObject(data);

    await Usuario.excluir(resultado.content.id);
  });
});
