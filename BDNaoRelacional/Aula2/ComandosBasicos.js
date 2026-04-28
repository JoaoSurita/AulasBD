//---------------------------------------------------
// Comandos Básicos do MongoDb
//---------------------------------------------------
// Se "Banco" não existir, ele será criado assim que um documento for inserido
use Banco

// Exibe os Bancos disponiveis, se um banco estiver vqzio ele não sera listado
show dbs

// Mostra todas as coleçoes de um banco
show collections

// Exclui o bando de dados
db.dropDatabase()

//---------------------------------------------------
// Inserir Documentos
//---------------------------------------------------
// Cria coleções automaticamente quando documetnos são inseridos
db.createCollection("usuarios");

// Inserção de um único documento (insertOne)
db.usuarios.insertOne(
    { nome: "Alice", idade: 25, cidade: "São Paulo" }
);

// Inserção de múltiplos documentos (insertMany)
db.usuarios.insertMany(
    { nome: "Pedro", idade: 22, cidade: "Barra Bonita" },
    { nome: "Maria", idade: 31, cidade: "Jaú" }
);

// Filtrar documentos
db.usuarios.find({ idade: 25 }).pretty(); // Encontra apenas o usuario com 25 anos

db.usuarios.find(
    { cidade: "São Paulo" }, // Procura usuarios na cidade de são paulo
    { nome: 1, _id: 0 } // Retorna apenas o campo >Nome<, excluindo >_id< (1 = true, 0 = false)
);

//---------------------------------------------------
// Atualizar Documentos
//---------------------------------------------------

// Atualiza um unico documento
db.usuarios.updateOne(
    { nome: "Alice" }, // Seleciona o documento em que o nome é alice
    { $set: { idade: 26 } } // Mudou a idade de alice de 25 para 26 anos
);

// Atualiza multiplos documentos
db.usuarios.updateMany(
    { cidade: "São Paulo"}, // Seleciona todos os campos que a cidade é São Paulo
    { $set: { estado: "SP" } } // Agora todos os usuarios de São Paulo tem o campo "Estado" como "SP"
); //Operador $set será estudado posteriormente

// Adiciona um novo Valor a um array dentro do documento
db.usuarios.insertOne(
    { nome: "Alice" },
    { $push: { hobbies: "Leitura" } } // Adiciona "Leitura" no array "hobbies"
); // Operador $push será estudado posteriormente

//---------------------------------------------------
// Remover documentos
// ---------------------------------------------------
// Remoce um unico documento
db.usuarios.deleteOne(
    { nome: "Maria" } // Remove apenas Maria de "usuarios"
)

// Remove varios documentos
db.usuarios.deleteMany(
    { idade: { $lt: 25 }} // remove todos os usuarios com menos de 25 anos
) // o operador "$lt" será estudado posteriormente

// ------------------------------------------------------------------------------------------------------
// Diferente da inserção de daos no modelo relacional, em mongo db podemos armazenas os pedidos
// dentro do próprio cliente, evitando a necessidade de JOIN
// ------------------------------------------------------------------------------------------------------
db.clientes.insertOne({ // Insere um usuário no banco com as seguintes caracteristicas:
    _id : 1,
    nome : "Joao P Surita",
    email : "joaopedrosurita490@gmail.com",
    pedidos : [ // "[]" Faz um array dentro de um documento 
        { id_pedido: 101, produto: "Monitor", valor: 800},
        { id_pedido: 102, produto: "Memória RAM", valor: 400}
    ]
})