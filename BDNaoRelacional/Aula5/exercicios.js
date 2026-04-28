// ---------------------------------------------------------------------------------------------
// EXERCICIO
// ---------------------------------------------------------------------------------------------

// Crie uma coleção de 100 mil documentos e registre o
// tempo de consulta sem índices e depois com índices:

for (let i = 0; i < 100000; i++) {

db.usuarios.insertOne({
    nome: `Usuario${i}`,
    email: `usuario${i}@email.com`,
    idade: Math.floor(Math.random() * 80) + 18
    });
}

// testando sem um indece

db.usuarios.find({ email: "usuario99999@email.com" }).explain("executionStats")
// executionTimeMillis: 59 | Ou seja, o tempo total para achar o email usuario99999@email.com foi de 59 MESMO
// stage: COLLSCAN | aparecerá COLLSCAN (varredura de coleção), o que significa que ele leu todos os documentos.

// -------------------------------------------------------------------------------------------------------------------------

// testando com o indice

// Criando o índice
db.usuarios.createIndex({ email: 1 })

// Buscando novamente
db.usuarios.find({ email: "usuario99999@email.com" }).explain("executionStats")

// executionTimeMillis: 30 | Tivemos uma perda de 29 ms em comparação a consulta sem indice, quase metade do tempo total
// stage: IXSCAN | aparecerá IXSCAN (varredura de índice)