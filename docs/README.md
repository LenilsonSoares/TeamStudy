# TeamStudy - Documentação de Projeto 🎓📚

![TeamStudy Logo](https://via.placeholder.com/150)

## Descrição 🚀

**TeamStudy** é uma aplicação web desenvolvida para otimizar o gerenciamento de estudos em equipe. A aplicação permite que os usuários se cadastrem, façam login e organizem suas atividades de estudo de maneira eficiente e colaborativa. A plataforma visa proporcionar um ambiente de aprendizagem colaborativa, melhorando a produtividade de estudantes que buscam atingir suas metas educacionais de forma organizada e sistemática.

## Tecnologias Utilizadas 🛠️

Este projeto utiliza uma stack moderna para garantir performance, segurança e escalabilidade. Abaixo estão as principais tecnologias e bibliotecas utilizadas:

- **Node.js**: Ambiente de execução JavaScript no lado do servidor. 🌐
- **Express.js**: Framework minimalista para criação de APIs RESTful. 🔥
- **MySQL**: Banco de dados relacional utilizado para armazenar dados persistentes. 🗃️
- **bcrypt**: Biblioteca para criptografia de senhas. 🔒
- **jsonwebtoken (JWT)**: Mecanismo de autenticação e autorização com tokens. 🛡️
- **express-validator**: Biblioteca para validação de entradas nas rotas da API. ✅
- **dotenv**: Gerenciamento de variáveis de ambiente para segurança e flexibilidade da aplicação. 🌱

## Pré-requisitos ⚙️

Certifique-se de que as seguintes ferramentas estão instaladas em sua máquina antes de iniciar a instalação do projeto:

- **Node.js**: Ambiente necessário para executar o código JavaScript no servidor. [Baixar Node.js](https://nodejs.org/) 🌍
- **MySQL**: Banco de dados relacional. [Baixar MySQL](https://dev.mysql.com/downloads/installer/) 💾

## Instruções de Instalação 🔧

### Passo 1: Clonando o Repositório

Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/teamstudy.git
cd teamstudy
Passo 2: Instalando as Dependências
Instale as dependências do servidor no diretório server:

bash
Copiar código
cd server
npm install
Passo 3: Configuração do Banco de Dados
Crie o banco de dados no MySQL:
sql
Copiar código
CREATE DATABASE testestudy;
USE testestudy;
Crie a tabela de usuários:
sql
Copiar código
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Passo 4: Configuração do Ambiente
Crie o arquivo .env na pasta server e configure as variáveis de ambiente necessárias:

env
Copiar código
DB_HOST=db4free.net
DB_USER=teamunex
DB_PASS=12345678
DB_NAME=testestudy
JWT_SECRET=sua_chave_secreta
Passo 5: Iniciando o Servidor
Execute o servidor com o comando abaixo:

bash
Copiar código
node server.js
Agora, a aplicação estará disponível no endereço http://localhost:5000 🌐.

Estrutura do Projeto 📁
A estrutura de diretórios do projeto é organizada da seguinte forma:

bash
Copiar código
teamstudy/                     # Raiz do projeto
project/
├── client/
│   ├── Cadastro/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── main.js
│   ├── Cronograma/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── main.js
│   ├── Cursos/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── main.js
│   ├── Dashboard/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── main.js
│   ├── Entrar/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── main.js
│   ├── Home/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── main.js
│   ├── Perfil/
│   │   ├── public/
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── main.js
├── server/
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   ├── utils/
│   │   ├── errorHandler.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── Procfile
Rotas da API 🌍
Autenticação 🔐
Registrar Usuário 📝
URL: /api/auth/register
Método: POST
Corpo da Requisição:
json
Copiar código
{
    "name": "Nome do Usuário",
    "email": "usuario@example.com",
    "password": "senha_segura"
}
Login de Usuário 🔑
URL: /api/auth/login
Método: POST
Corpo da Requisição:
json
Copiar código
{
    "email": "usuario@example.com",
    "password": "senha_segura"
}
Usuários 👤
Obter Usuário Autenticado 👀
URL: /api/users/me
Método: GET
Cabeçalhos:
x-auth-token: token_jwt_obtido_no_login
Manutenção e Operações ⚙️
Atualização de Dependências 🔄
Para atualizar as dependências do projeto, execute o comando:

bash
Copiar código
npm update
Executando Testes ✅
Para rodar os testes unitários e de integração, execute:

bash
Copiar código
npm test
Logs e Monitoramento 📊
Para monitorar o servidor, utilize ferramentas como pm2 ou forever para garantir que a aplicação esteja sempre em execução.

Instalar pm2 🚀
bash
Copiar código
npm install pm2 -g
Iniciar o Servidor com pm2 🔥
bash
Copiar código
pm2 start server.js
Verificar Logs com pm2 📈
bash
Copiar código
pm2 logs
Contribuição 💡
Se você deseja contribuir para o projeto, siga os passos abaixo:

Faça um fork do repositório 🍴.

Crie uma nova branch para sua feature:

bash
Copiar código
git checkout -b feature/nova-feature
Realize as alterações necessárias e faça um commit:

bash
Copiar código
git commit -am 'Adiciona nova feature'
Envie as alterações para o seu fork:

bash
Copiar código
git push origin feature/nova-feature
Abra um Pull Request para o repositório principal. 🎉

Licença 📜
Este projeto está licenciado sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.

<img alt="GitHub" src="https://img.shields.io/github/license/seu-usuario/teamstudy"> <img alt="GitHub issues" src="https://img.shields.io/github/issues/seu-usuario/teamstudy"> <img alt="GitHub forks" src="https://img.shields.io/github/forks/seu-usuario/teamstudy"> <img alt="GitHub stars" src="https://img.shields.io/github/stars/seu-usuario/teamstudy"> <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/seu-usuario/teamstudy">
Conclusão 🎯
Esta documentação fornece uma visão detalhada e bem estruturada do TeamStudy, permitindo que novos desenvolvedores ou colaboradores possam entender rapidamente a arquitetura e os fluxos do projeto. Se houverem dúvidas ou sugestões, sinta-se à vontade para abrir uma issue ou contribuir diretamente. 🚀

