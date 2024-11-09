-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 09/11/2024 às 16:41
-- Versão do servidor: 8.3.0
-- Versão do PHP: 8.1.2-1ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `testestudy`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `Cronogramas`
--

CREATE TABLE `Cronogramas` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Cursos`
--

CREATE TABLE `Cursos` (
  `id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text,
  `duracao` int DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `HistoricoAulas`
--

CREATE TABLE `HistoricoAulas` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `curso_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `HistoricoCursos`
--

CREATE TABLE `HistoricoCursos` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `curso_id` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `progresso` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Planos`
--

CREATE TABLE `Planos` (
  `id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text,
  `preco` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Progresso`
--

CREATE TABLE `Progresso` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `curso_id` int NOT NULL,
  `progresso` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Tarefas`
--

CREATE TABLE `Tarefas` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text,
  `data_inicio` date DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `nome_usuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `nome`, `nome_usuario`, `email`, `senha`, `avatar`, `created_at`) VALUES
(6, 'Lenilson Dias Soares', 'Lenilson Dias Soares', 'lenilsondiassoares@gmail.com', '$2b$10$vnRO7.9VGu8igWsH/lvm8u2m85mEG71kNsqMUdCTFdcbjImAlbBtG', '', '2024-11-09 15:08:15');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `Cronogramas`
--
ALTER TABLE `Cronogramas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `Cursos`
--
ALTER TABLE `Cursos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `HistoricoAulas`
--
ALTER TABLE `HistoricoAulas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Índices de tabela `HistoricoCursos`
--
ALTER TABLE `HistoricoCursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Índices de tabela `Planos`
--
ALTER TABLE `Planos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `Progresso`
--
ALTER TABLE `Progresso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `curso_id` (`curso_id`);

--
-- Índices de tabela `Tarefas`
--
ALTER TABLE `Tarefas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Cronogramas`
--
ALTER TABLE `Cronogramas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Cursos`
--
ALTER TABLE `Cursos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `HistoricoAulas`
--
ALTER TABLE `HistoricoAulas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `HistoricoCursos`
--
ALTER TABLE `HistoricoCursos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Planos`
--
ALTER TABLE `Planos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Progresso`
--
ALTER TABLE `Progresso`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Tarefas`
--
ALTER TABLE `Tarefas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `Cronogramas`
--
ALTER TABLE `Cronogramas`
  ADD CONSTRAINT `Cronogramas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`);

--
-- Restrições para tabelas `HistoricoAulas`
--
ALTER TABLE `HistoricoAulas`
  ADD CONSTRAINT `HistoricoAulas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  ADD CONSTRAINT `HistoricoAulas_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `Cursos` (`id`);

--
-- Restrições para tabelas `HistoricoCursos`
--
ALTER TABLE `HistoricoCursos`
  ADD CONSTRAINT `HistoricoCursos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  ADD CONSTRAINT `HistoricoCursos_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `Cursos` (`id`);

--
-- Restrições para tabelas `Progresso`
--
ALTER TABLE `Progresso`
  ADD CONSTRAINT `Progresso_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  ADD CONSTRAINT `Progresso_ibfk_2` FOREIGN KEY (`curso_id`) REFERENCES `Cursos` (`id`);

--
-- Restrições para tabelas `Tarefas`
--
ALTER TABLE `Tarefas`
  ADD CONSTRAINT `Tarefas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
