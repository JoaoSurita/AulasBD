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

-- Apelidos
SELECT
	aluguel.rental_id AS id_aluguel,
    aluguel.rental_date AS data_aluguel,
    aluguel.inventory_id AS inventario_id,
    aluguel.customer_id AS cliente_id,
    customer.first_name,
    customer.last_name,
    aluguel.return_date AS data_devolucao,
    aluguel.staff_id AS funcionario_id,
    aluguel.last_update AS 'Última Atualização'
FROM rental AS aluguel

-- Aqui vai a especificação de como o relacionamento acontece
-- Se utilizarmos apelido, temos que aplicar ele em tudo!!
INNER JOIN customer ON customer.customer_id = aluguel.customer_id
INNER JOIN staff ON staff.staff_id = aluguel.staff_id
INNER JOIN inventory ON inventory.inventory_id = aluguel.inventory_id;

-- Relacionamento com relacionamento

SELECT * 
FROM rental
INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id
INNER JOIN film ON film.film_id = inventory.film_id
INNER JOIN language ON language.language_id = film.language_id;
-- INNER JOIN category ON category.category_id = film.category_id;

-- Problema N:M
-- Neste tipo de relacionamento o resultado virá repetido
-- Vamos utilizar o ORDER BY para visualização
SELECT
film.film_id,
film.title,
category.category_id,
category.name
FROM film
INNER JOIN film_category ON film_category.film_id = film.film_id
INNER JOIN category ON category.category_id = film_category.category_id
ORDER BY title, name ASC;

INSERT INTO film_category VALUES (1, 8, NOW());

-- Ordenação e limite
-- ORDER BY pode ordenar ASC = Crescente e DESK que é decrescente
-- O select abaixo apresenta os pagamentos do maior para o menor

SELECT * FROM payment
ORDER BY amount DESC, payment_date ASC;

-- Podemos usar apelidos ou "posição" do critério no SELECT
SELECT p.payment_id, c.first_name, c.last_name, amount AS total_pago, payment_date
FROM payment p
INNER JOIN customer c ON c.customer_id = p.customer_id
ORDER BY 2 ASC, total_pago DESC;

-- Podemos limitar a quantidade de retorno com LIMIT
SELECT * FROM film
LIMIT 10;

-- OFFSET é utilizado para paginação de resultados
SELECT * FROM film
LIMIT 10 OFFSET 10;

-- FUNÇÕES
-- COUNT conta todos os registros e retorna o número 
SELECT COUNT(*) FROM film;

-- GROUP BY para auxiliar na contagem
-- Ele é utilizado somente com funções de agregação (Junção de dados)
SELECT COUNT(film.film_id) AS "QTDE", category.name
FROM film
INNER JOIN film_category ON film_category.film_id = film.film_id
INNER JOIN category ON category.category_id = film_category.category_id
WHERE film.title LIKE "%AC%"
-- Agrupa as categorias antes de fazer o SELECT e ordenar
GROUP BY category.category_id
ORDER BY title, name ASC;
