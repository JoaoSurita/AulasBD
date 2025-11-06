-- Cria o banco de dados 
CREATE DATABASE IF NOT EXISTS levelup_games CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- BD que vai ser utilizado!
USE levelup_games;

CREATE TABLE IF NOT EXISTS clientes(
id_cliente BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL, 
cpf VARCHAR(14) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
telefone VARCHAR(30), 
endereco VARCHAR(255) NOT NULL, 
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL
);

ALTER TABLE clientes CHANGE COLUMN endereco logradouro VARCHAR(255) NOT NULL;
SELECT * FROM clientes;

CREATE TABLE IF NOT EXISTS jogos(
id_jogo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL, 
genero VARCHAR(255) NOT NULL, 
descricao TEXT, 
preco_unitario DECIMAL(10,2) NOT NULL,
estoque DECIMAL(10,3) DEFAULT 0,
codigo_barra VARCHAR(50) UNIQUE, 
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL
);

-- ADICIONANDO A COLUNA GENERO_ID PARA RELACIONAMENTO
ALTER TABLE jogos
ADD COLUMN genero_id BIGINT UNSIGNED NOT NULL;
-- ADICIONANDO O RELACIONAMENTO ENTRE JOGOS E GENEROS
ALTER TABLE jogos 
ADD CONSTRAINT fk_jogos_generos
FOREIGN KEY (genero_id) REFERENCES generos(id_genero);

CREATE TABLE IF NOT EXISTS vendas(
id_venda BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
cliente_id BIGINT UNSIGNED NOT NULL,
data_venda DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
forma_pagamento ENUM ('Pix', 'Crédito', 'Débito', 'Dinheiro'), 
observacoes TEXT,
desconto DECIMAL(10,2) DEFAULT 0,
total_venda DECIMAL(10,2) NOT NULL,
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL,

CONSTRAINT fk_vendas_clientes FOREIGN KEY (cliente_id) REFERENCES clientes(id_cliente)
);


CREATE TABLE IF NOT EXISTS generos(
id_genero BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL, 
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL
);



CREATE TABLE IF NOT EXISTS jogos_plataformas(	
id_jogo_plataforma BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
jogo_id BIGINT UNSIGNED NOT NULL,
plataforma_id BIGINT UNSIGNED NOT NULL,
estoque DECIMAL(10,3) DEFAULT 0,
data_lancamento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
total_venda DECIMAL(10,2) NOT NULL, 
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL,

FOREIGN KEY (jogo_id) REFERENCES jogos(id_jogo),
FOREIGN KEY (plataforma_id) REFERENCES plataformas(id_plataforma)
);

CREATE TABLE IF NOT EXISTS vendas_jogos(
id_venda_jogo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
venda_id BIGINT UNSIGNED NOT NULL,
jogo_id BIGINT UNSIGNED NOT NULL,
estoque DECIMAL(10,3) DEFAULT 0,
preco_unitario DECIMAL(10,2) NOT NULL,
total_venda DECIMAL(10,2) NOT NULL, 
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL,

FOREIGN KEY (venda_id) REFERENCES vendas(id_venda),
FOREIGN KEY (jogo_id) REFERENCES jogos(id_jogo)
);