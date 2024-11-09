## Documentação Completa do Projeto TeamStudy

### 1. Plano de Ação

#### 1.1. Definição do Projeto
O projeto TeamStudy é uma plataforma de gerenciamento de estudos que permite aos usuários criar cronogramas, acompanhar o progresso dos cursos, gerenciar tarefas e acessar planos de estudo personalizados. O sistema também oferece funcionalidades de recuperação de senha e autenticação de usuários.

#### 1.2. Equipe
- **Front End**: Prototipação, design, desenvolvimento da interface do usuário.
- **Back End**: Modelagem, banco de dados, desenvolvimento da lógica do servidor.
- **Qualidade de Software**: Teste de software, garantia de qualidade.
- **Documentação**: Plano de ação, requisitos, tutorial do sistema.

#### 1.3. Metas
- **Semana 1**: Definir a estrutura do banco de dados e implementar a funcionalidade de cadastro de usuários.
- **Semana 2**: Implementar a funcionalidade de login de usuários e recuperação de senha.
- **Semana 3**: Criar as rotas e controladores para gerenciamento de cronogramas, cursos, tarefas e planos de estudo.
- **Semana 4**: Implementar a funcionalidade de acompanhamento de progresso dos cursos.
- **Semana 5**: Criar a interface do usuário para todas as funcionalidades.
- **Semana 6**: Testar todas as funcionalidades implementadas.
- **Semana 7**: Documentar o código e criar uma documentação detalhada do projeto.
- **Semana 8**: Realizar uma revisão de código e otimizar o sistema.

### 2. Modelagem e Banco de Dados

#### 2.1. Estrutura do Banco de Dados

```sql
-- Estrutura para tabela `Cronogramas`
CREATE TABLE `Cronogramas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `Cronogramas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Estrutura para tabela `Cursos`
CREATE TABLE `Cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text,
  `duracao` int DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Estrutura para tabela `HistoricoAulas`
CREATE TABLE `HistoricoAulas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `curso_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `HistoricoAulas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `HistoricoAulas_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `Cursos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Estrutura para tabela `HistoricoCursos`
CREATE TABLE `HistoricoCursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `curso_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `progresso` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `HistoricoCursos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `HistoricoCursos_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `Cursos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Estrutura para tabela `Planos`
CREATE TABLE `Planos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) DEFAULT NULL,
  `usuario_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_planos_usuarios` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Estrutura para tabela `Progresso`
CREATE TABLE `Progresso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `curso_id` int NOT NULL,
  `progresso` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `curso_id` (`curso_id`),
  CONSTRAINT `Progresso_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `Progresso_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `Cursos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Estrutura para tabela `Tarefas`
CREATE TABLE `Tarefas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `Tarefas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Estrutura para tabela `Usuarios`
CREATE TABLE `Usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `nome_usuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserção de dados na tabela `Usuarios`
INSERT INTO `Usuarios` (`id`, `nome`, `nome_usuario`, `email`, `senha`, `avatar`, `created_at`) VALUES
(6, 'Lenilson Dias Soares', 'Lenilson Dias Soares', 'lenilsondiassoares@gmail.com', '$2b$10$vnRO7.9VGu8igWsH/lvm8u2m85mEG71kNsqMUdCTFdcbjImAlbBtG', '', '2024-11-09 15:08:15');
```

### 3. Documentos de Testes de Software

#### 3.1. Testes de Unidade

##### Teste de Cadastro de Usuário

```javascript
const request = require('supertest');
const app = require('../server');

describe('User Registration API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nome: 'Test User',
                nome_usuario: 'testuser',
                email: 'testuser@example.com',
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });
});
```

##### Teste de Login de Usuário

```javascript
const request = require('supertest');
const app = require('../server');

describe('User Login API', () => {
    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
```

##### Teste de Recuperação de Senha

```javascript
const request = require('supertest');
const app = require('../server');

describe('Password Recovery API', () => {
    it('should send a password recovery email', async () => {
        const res = await request(app)
            .post('/api/auth/recover')
            .send({
                email: 'testuser@example.com'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'E-mail de recuperação enviado com sucesso');
    });
});
```

### 4. Tutorial do Sistema

#### 4.1. Cadastro de Usuário

1. Acesse a página de cadastro em `http://localhost:3000/cadastro`.
2. Preencha o formulário com seu nome, nome de usuário, e-mail e senha.
3. Clique no botão "Cadastrar-se".
4. Você será redirecionado para a página de login.

#### 4.2. Login de Usuário

1. Acesse a página de login em `http://localhost:3000/entrar`.
2. Preencha o formulário com seu e-mail e senha.
3. Clique no botão "Entrar".
4. Você será redirecionado para a página inicial do usuário.

#### 4.3. Recuperação de Senha

1. Acesse a página de recuperação de senha em `http://localhost:3000/recuperar-senha`.
2. Preencha o formulário com seu e-mail cadastrado.
3. Clique no botão "Enviar".
4. Você receberá um e-mail com um link para redefinir sua senha.

#### 4.4. Gerenciamento de Cronogramas

1. Acesse a página de cronogramas em `http://localhost:3000/cronogramas`.
2. Clique no botão "Criar Cronograma".
3. Preencha o formulário com o título, descrição, data de início e data de fim.
4. Clique no botão "Salvar".
5. O cronograma será exibido na lista de cronogramas.

#### 4.5. Gerenciamento de Cursos

1. Acesse a página de cursos em `http://localhost:3000/cursos`.
2. Clique no botão "Criar Curso".
3. Preencha o formulário com o nome, descrição, duração e imagem.
4. Clique no botão "Salvar".
5. O curso será exibido na lista de cursos.

#### 4.6. Gerenciamento de Tarefas

1. Acesse a página de tarefas em `http://localhost:3000/tarefas`.
2. Clique no botão "Criar Tarefa".
3. Preencha o formulário com o título, descrição, data de início, data de fim e status.
4. Clique no botão "Salvar".
5. A tarefa será exibida na lista de tarefas.

#### 4.7. Gerenciamento de Planos de Estudo

1. Acesse a página de planos de estudo em `http://localhost:3000/planos`.
2. Clique no botão "Criar Plano de Estudo".
3. Preencha o formulário com o nome, descrição, preço e usuário.
4. Clique no botão "Salvar".
5. O plano de estudo será exibido na lista de planos de estudo.

#### 4.8. Acompanhamento de Progresso

1. Acesse a página de progresso em `http://localhost:3000/progresso`.
2. Os dados de progresso dos cursos serão exibidos automaticamente.

### 5. Ata de Reunião

#### Data: [Data da Reunião]
#### Participantes: [Nomes dos Participantes]

#### Discussões Ocorridas:
- Definição da estrutura do banco de dados.
- Implementação das funcionalidades de cadastro, login e recuperação de senha.
- Criação das rotas e controladores para gerenciamento de cronogramas, cursos, tarefas e planos de estudo.
- Implementação da funcionalidade de acompanhamento de progresso dos cursos.

#### Metas Cumpridas:
- Estrutura do banco de dados definida e criada.
- Funcionalidade de cadastro de usuários implementada.
- Funcionalidade de login de usuários implementada.
- Funcionalidade de recuperação de senha implementada.
- Rotas e controladores para gerenciamento de cronogramas, cursos, tarefas e planos de estudo criados.
- Funcionalidade de acompanhamento de progresso dos cursos implementada.

#### Dificuldades Encontradas:
- Problemas na configuração inicial do banco de dados.
- Erros ao tentar criar novas entradas no banco de dados devido a chaves estrangeiras não configuradas corretamente.
- Dificuldades na implementação da funcionalidade de recuperação de senha.

#### Responsáveis:
- Definição da Estrutura do Banco de Dados: [Nome do Responsável]
- Implementação do Cadastro de Usuários: [Nome do Responsável]
- Implementação do Login de Usuários: [Nome do Responsável]
- Implementação da Recuperação de Senha: [Nome do Responsável]
- Criação das Rotas e Controladores: [Nome do Responsável]
- Implementação da Funcionalidade de Acompanhamento de Progresso: [Nome do Responsável]

#### Metas para a Próxima Semana:
- Testar todas as funcionalidades implementadas para garantir que estão funcionando corretamente.
- Melhorar a interface do usuário para tornar o sistema mais intuitivo.
- Documentar o código e criar uma documentação detalhada do projeto.
- Realizar uma revisão de código para identificar e corrigir possíveis bugs.
- Coletar feedback dos usuários para identificar áreas de melhoria e novas funcionalidades a serem implementadas.

---

Este documento fornece uma visão detalhada do projeto TeamStudy, incluindo plano de ação, modelagem e banco de dados, documentos de testes de software, tutorial do sistema e ata de reunião. Certifique-se de ajustar as informações conforme necessário para refletir o progresso real do seu projeto e as 