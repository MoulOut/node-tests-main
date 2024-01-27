import { describe, expect, it } from '@jest/globals';
import AluguelLivroService from '../../services/aluguelLivroService.js';

const aluguelLivroService = new AluguelLivroService();

describe('Testando AluguelLivroService', () => {
  it('Retornar a data de devolução do livro validando a quantidade de dias alugados', async () => {
    const borrowData = new Date('2024-01-22');
    const borrowedDays = 5;
    const devolutionDataMock = new Date('2024-01-27');

    const devolutionData = await aluguelLivroService.calcularDataDevoluçao(
      borrowData,
      borrowedDays,
    );

    expect(devolutionData).toStrictEqual(devolutionDataMock);
  });
});
