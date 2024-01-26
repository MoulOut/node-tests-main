import { describe, expect, it } from '@jest/globals';
import db from '../../db/dbconfig.js';

describe('Testing configDB', () => {
  it('should test the connection with db', async () => {
    const authorMock = {
      nome: 'Alice',
      nacionalidade: 'Brasileiro',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const savedAuthor = await db('autores')
      .insert(authorMock)
      .then((returned) => db('autores')
        .where('id', returned[0]))
      .then((selectedAuthor) => selectedAuthor[0]);

    expect(savedAuthor.nome).toBe(authorMock.nome);

    await db('autores').where({ id: savedAuthor.id }).del();
  });
});
