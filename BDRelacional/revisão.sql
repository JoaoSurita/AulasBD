-- Apaga o BD para garantir que a estrutura será a da versão final do SQL. 
DROP DATABASE IF EXISTS loja_revisao;

-- Cria o BD com charset correto 
CREATE DATABASE IF NOT EXISTS loja_revisao CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- EXTREMAMENTE IMPORTANTE! TEM QUE AVISAR QUAL BD VAI UTILIZAR DAQUI EM DIANTE NO SQL 
USE loja_revisao;

-- Tabela clientes 
CREATE TABLE IF NOT EXISTS clientes(
id_cliente BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
-- Além de obrigatório o E-mail, DEVE SER ÚNICO	
email VARCHAR(255) NOT NULL UNIQUE,
cpf VARCHAR(14) NOT NULL UNIQUE, 
telefone VARCHAR(30),
-- Demais campos do cliente...
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL
);

CREATE TABLE IF NOT EXISTS produtos(
id_produto BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL, 
descricao TEXT,
preco_unitario DECIMAL(10,2) NOT NULL,
estoque DECIMAL(10,3) DEFAULT 0,
codigo_barras VARCHAR(50) UNIQUE,
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL
);


CREATE TABLE IF NOT EXISTS vendas(
id_venda BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
cliente_id BIGINT UNSIGNED NOT NULL,
data_venda DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
forma_pagamento ENUM('Dinheiro', 'Crédito', 'Débito', 'Pix'),
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

CREATE TABLE itens_vendas(
id_venda_produto BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
venda_id BIGINT UNSIGNED NOT NULL,
produto_id BIGINT UNSIGNED NOT NULL,
quantidade DECIMAL(10,3) NOT NULL,
preco_unitario DECIMAL(10,2) NOT NULL,
desconto DECIMAL(10,2) DEFAULT 0,
-- Registo de LOG 
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
-- Somente o MySQL possui o ON UPDATE
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
-- EM CAMPOS DATA/HORA é importante confirmar que ele aceita como null 
deletado_em DATETIME NULL,

FOREIGN KEY (produto_id) REFERENCES produtos(id_produto),
FOREIGN KEY (venda_id) REFERENCES vendas(id_venda)
);

-- MODIFICAÇÕES ESTRUTURAIS 

-- Altere o nome de clientes para usuarios
ALTER TABLE clientes RENAME TO usuarios; 

-- Atualize o nome do campo de chave primária da tabela clientes para refletir o novo nome
ALTER TABLE usuarios CHANGE COLUMN id_cliente id_usuario BIGINT UNSIGNED NOT NULL AUTO_INCREMENT;

-- Ver a tabela do BD
DESCRIBE loja_revisao.usuarios;

-- Atualize o nome de qualquer chave estrangeira que esteja relacionada à tabela clientes para refletir essa mudança.
DESCRIBE loja_revisao.vendas;
-- Primeiro remove a chave estrangeira 
ALTER TABLE vendas DROP FOREIGN KEY fk_vendas_clientes;

-- Altera a coluna 
ALTER TABLE vendas CHANGE COLUMN cliente_id usuario_id BIGINT UNSIGNED NOT NULL;

-- Altera novamente o relacionamento 
ALTER TABLE vendas
	ADD CONSTRAINT fk_vendas_usuarios
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario);
    
-- ADIÇÃO E MODIFICAÇÃO DE CAMPOS 
-- Adicione um campo chamado ativo em cada tabela, inicialmente do tipo TINYINT.    
ALTER TABLE vendas ADD COLUMN ativo TINYINT NOT NULL DEFAULT 1;
-- Adicionar os demais campos mas tabelas 

-- Altere o tipo do campo ativo para CHAR(1) em todas as tabelas.
ALTER TABLE vendas MODIFY COLUMN ativo CHAR(1) NOT NULL DEFAULT 'S';
-- Alterar os demais campos nas tabelas 

-- Gerenciamento de Acesso
-- Crie um usuário no SGBD com o seu nome próprio.
CREATE USER IF NOT EXISTS 'lucas'@'%' IDENTIFIED BY 'Senha Super Segura';
-- Conceda a esse usuário permissões de CRUD (Create, Read, Update, Delete) para todas as tabelas do banco de dados criado
GRANT SELECT, INSERT, UPDATE, DELETE ON loja_revisao.* TO 'lucas'@'%';

-- Aplica os privilégios 
FLUSH PRIVILEGES 