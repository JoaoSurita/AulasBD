SELECT `clientes`.`id_cliente`,
    `clientes`.`nome`,
    `clientes`.`cpf`,
    `clientes`.`email`,
    `clientes`.`telefone`,
    `clientes`.`logradouro`,
    `clientes`.`criado_em`,
    `clientes`.`alterado_em`,
    `clientes`.`deletado_em`
FROM `levelup_games`.`clientes`;

-- LIMPA A TABELA E ZERA OS CONTADORES DE AUTO INCREMENTO 
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE clientes;
SET FOREIGN_KEY_CHECKS = 1;

-- U -> Update = UPDATE -> ALtera os dados da tabela 
UPDATE generos SET 
nome = 'Ficção' 
WHERE id_genero = 4;

UPDATE clientes SET nome = "Deodoro da Fonseca", email = "deodoro@gmail.com", telefone = "(14)9999-9999" WHERE id_cliente = 2;

-- D -> Delete = DELETE ou UPDATE -> Delete ou marca como deletado os dados presentes na tabela 
-- DELETE FÍSICO : Remove completamente os dados da tabela: 
SELECT * FROM clientes WHERE id_cliente = 10;
DELETE FROM clientes WHERE id_cliente = 10;

-- DELEÇÃO LÓGICA : Utiliza um campo para avisar que o registro foi "DELETADO"
-- Essa abordagem apesar de ser mais indicada, OBRIGA a utilizar WHERE em todos os SELECTs

-- Obrigatório igual a linha 33
SELECT * FROM clientes WHERE deletado_em IS NULL;
UPDATE clientes SET deletado_em = NOW() WHERE id_cliente = 11; 
SELECT * FROM clientes WHERE deletado_em IS NOT NULL;

-- CRUD em SQL 
USE levelup_games;
-- C -> Create = INSERT -> Insere os dados em uma tabela
INSERT INTO tabela (campo1, campo2, campo3)
	VALUES (valor1, 'valor2', 'YYYY-mm-dd');
    
INSERT INTO generos (nome) VALUES ('Fic');    

INSERT INTO generos (nome) VALUES ('RPG'), ('Mundo Aberto');

INSERT INTO clientes (id_cliente, nome, cpf, email, telefone, logradouro, criado_em, alterado_em, deletado_em)
	VALUES(NULL, 'Lucas Eduardo Pereira da Cruz', '111.111.111-01', 'lucascruzjau@gmail.com', '(14)9 8999-9999', 'Rua Jardim Norte', NOW(), NOW(), NULL);

-- R -> Read = SELECT -> Visualiza os dados presentes na tabela
-- Mostra todos os campos e todos os dados de uma tabela
SELECT * FROM generos; 

SELECT nome, deletado_em FROM generos;

SELECT * FROM clientes; 