-- Mostra todos os bancos
SHOW TABLES;

SELECT * FROM city; 

SELECT city, last_update FROM city;

-- Criando filtros (=, <>, <, >, <=, >=)
SELECT title, length FROM film
WHERE length > 70; 

SELECT title FROM film WHERE title = 'Academy Dinosaur';

-- Operadores lógicos (AND, OR) 
SELECT title , length FROM film
WHERE length >= 70 AND length <= 100;

SELECT title , length FROM film
WHERE length < 70 OR length = 100;

-- Operadores especiais (BETWEEN, IN, LIKE) 
SELECT title , length FROM film
WHERE length BETWEEN 70 AND 100;

SELECT * FROM sakila.payment
WHERE payment_date BETWEEN '2005-07-01' AND '2005-07-30';

SELECT * FROM sakila.payment
WHERE payment_id IN (1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100);

SELECT * FROM film
WHERE title LIKE "%ACADEMY%";

SELECT * FROM film
WHERE title LIKE "%ACADEMY";

SELECT * FROM film
WHERE title LIKE "ACADEMY%";

-- Encontra Luisas e Luizas no BD
SELECT * FROM clientes
WHERE nome LIKE 'Lui_a';
-- Encontra calças e calcas, inclusive calsas 
SELECT * FROM produtos
WHERE nome LIKE 'cal_ca';