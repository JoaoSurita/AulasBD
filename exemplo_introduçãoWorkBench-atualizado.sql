SHOW DATABASES;

-- Cria um banco de dados 
CREATE DATABASE IF NOT EXISTS ronan; 

-- Deleta o banco de dados 
DROP DATABASE IF EXISTS lucas;

-- Criar um banco de dados completo!
CREATE DATABASE IF NOT EXISTS aula_180925 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Mostra o script de criação do banco de dados completo, com charset.
SHOW CREATE DATABASE aula_180925;

-- Marca um banco de dados para ser utilizado até que a conexão finalize.
USE aula_180925;

-- Criar uma tabela que impede erro 
CREATE TABLE usuarios (
	id_usuario BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL, 
    cpf VARCHAR(14) UNIQUE,
    email VARCHAR(255) UNIQUE,
    data_nascimento DATE, 
    admin BOOLEAN DEFAULT FALSE,
    salario DECIMAL(10,2), 
    cargo ENUM('Vendedor', 'Supervisor', 'Gerente'),
    senha VARCHAR(255) NOT NULL, 
    -- CAMPOS PARA LOG / AUDITORIA
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletado_em DATETIME NULL
);

-- Busca todos os dados presentes em uma tabela
SELECT * FROM usuarios;

-- Descreve a tabela mostrando seus dados de criação
DESCRIBE usuarios;

-- Adicionando a coluna Genero 
ALTER TABLE usuarios
	-- ENUM por padrão é NOT NULL e não aceita vazio
    --                          0           1           2              3
	ADD COLUMN genero ENUM ('Feminino', 'Masculino', 'Outros', 'Prefiro não declarar');
    
ALTER TABLE usuarios    
	DROP COLUMN genero;    
    
    
-- Adicionando a coluna Genero 
ALTER TABLE usuarios
	-- ENUM por padrão é NOT NULL e não aceita vazio
    --                          0           1           2              3
	ADD COLUMN genero ENUM ('Feminino', 'Masculino', 'Outros', 'Prefiro não declarar')
    AFTER data_nascimento;
    
-- SET não utlizamos porque ele é outra tabela N:M
-- SET permite NULL e a seleção de várias opções.    

-- Troca o tipo do campo na tabela
ALTER TABLE usuarios
		MODIFY COLUMN genero CHAR(1);
        

-- Trocar nome de uma coluna 
ALTER TABLE usuarios
		CHANGE COLUMN nome nome_completo VARCHAR(255) NOT NULL;	
        
        
        
-- CRIANDO TABELA PRODUTO E CATEGORIA (ATIVIDADE PARA TREINAR)
CREATE TABLE IF NOT EXISTS produtos(
id_produto BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL,
quantidade DECIMAL(6,3),
valor DECIMAL(10,2),
validade DATE NOT NULL,
-- LOGS
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletado_em DATETIME NULL,

PRIMARY KEY (id_produto)
);        

CREATE TABLE IF NOT EXISTS categorias(
id_categoria BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL, 
-- LOGS
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletado_em DATETIME NULL,

PRIMARY KEY (id_categoria)
);

CREATE TABLE IF NOT EXISTS produtos_categorias(
produto_id BIGINT UNSIGNED NOT NULL, 
categoria_id BIGINT UNSIGNED NOT NULL,
-- LOGS
criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
alterado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletado_em DATETIME NULL,

-- Cria uma chave primária composta
PRIMARY KEY (produto_id, categoria_id),
FOREIGN KEY (produto_id) REFERENCES produtos(id_produto)
);


-- Add um relacionamento depois da tabela criada 
-- informar o nome do BD no Script é uma boa prática, mas pouco usada para comandos simples 
ALTER TABLE aula_180925.produtos_categorias
	-- Ao fazer com ALTER TABLE é obrigatório informar o nome do relacionamento
	ADD CONSTRAINT fk_produtos_categorias_categorias
    FOREIGN KEY(categoria_id) REFERENCES categorias(id_categoria);
    
    
DROP TABLE produtos;    
DROP TABLE categorias;
DROP TABLE produto_categoria;



-- Apagar uma chave estrangeira
ALTER TABLE 
	DROP CONSTRAINT
    
-- DPS VC APAGA A CHAVE PRIMÁRIA E DEPOIS A COLUNA (TUDO COM DROP).    
    