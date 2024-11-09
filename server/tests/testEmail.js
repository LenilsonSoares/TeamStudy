const nodemailer = require('nodemailer');

// Criar um transporter usando as credenciais do Mailtrap
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525, // ou 465, 587, 25 dependendo da sua configuração
    auth: {
        user: '3c9cdb5096ceba',  // Seu nome de usuário do Mailtrap
        pass: '14f03fa3854f15'   // Sua senha do Mailtrap
    }
});

// Definir as opções do e-mail
const mailOptions = {
    from: 'seu-email@dominio.com',       // Seu endereço de e-mail
    to: 'destinatario@dominio.com',      // Endereço do destinatário
    subject: 'Testando Mailtrap',        // Assunto do e-mail
    text: 'Olá, este é um e-mail de teste enviado usando Mailtrap!' // Corpo do e-mail
};

// Enviar o e-mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Erro ao enviar e-mail:', error);
    } else {
        console.log('E-mail enviado: ' + info.response);
    }
});