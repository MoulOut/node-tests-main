import { describe, expect, it } from '@jest/globals';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const verifyConnection = () => new Promise((resolver, reject) => {
  transporter.verify((error, success) => {
    if (error) {
      reject(error);
    } else {
      resolver(success);
    }
  });
});

describe('Testando disparo de e-mail', () => {
  it('O sistema deve validar se há conexão com o sistema de disparo de e-mail', async () => {
    const isConnected = true;

    const validadeConnection = await verifyConnection();

    expect(validadeConnection).toStrictEqual(isConnected);
  });
});
