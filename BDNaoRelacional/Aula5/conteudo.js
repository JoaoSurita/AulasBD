//--------------------------------------------------------------------------------
// CRIANDO ÍNDICES SIMPLES (Usando apenas um campo)
//--------------------------------------------------------------------------------

// Criar um índice em um único campo
db.usuarios.createIndex({ email: 1 })

// Buscas pelo campo email serão muito mais rápidas:
db.usuarios.find({ email: "eduardo1227edu@email.com" })

//--------------------------------------------------------------------------------
// ÍNDICES COMPOSTOS (Usando mais de um campo)
//--------------------------------------------------------------------------------

// Criando um indice composto para nome e idade
db.usuarios.createIndex(
    { nome: 1, idade: -1}
)
// Este índice ajuda buscas ordenadas pelo nome em ordem crescente e idade em ordem decrescente.

// essa consulta usara o indice:
db.usuarios.find (
    { nome: "Eduardo"} // buscara nomes de "a" até "e" até encontrar o usuario "Eduardo"
).sort(
    {idade : -1} // ordenara todos os usuarios Eduardo em ordem decrescente
)

//--------------------------------------------------------------------------------
// ÍNDICES EM ARRAYS
//--------------------------------------------------------------------------------
 
// ÍNDICES PARA BUSCA RÁPIDA EM ARRAYS
// Criar um índice para um array:
db.pedidos.createIndex(
    { itens : 1 }
)

// exemplo:    -------------------------------------------------------------------
db.usuarios.insertOne({
    "_id": 101,
    "cliente": "Marcos Silva",
    "itens": ["monitor", "teclado", "mouse"]
    }
)

db.pedidos.createIndex({ itens: 1 })
db.pedidos.find({ itens: "teclado" }) // ao inves do banco rodar todos pedidos 
// da loja, ele vai direto na letra "T" vê teclado e tras o resultado

//--------------------------------------------------------------------------------
// ÍNDICES EM CAMPOS TEXTUAIS
//--------------------------------------------------------------------------------

// Se precisamos buscar palavras em campos de texto, o índice textual é útil.

db.produtos.createIndex(
    { descrição: "text" } // Agora podemos buscar palavras dentro desse campo:
)

db.produtos.find(
    { $text: { $serach: "teclado" } } // Retorna todos os produtos cuja descricao contém "teclado".
)

//--------------------------------------------------------------------------------
// ÍNDICES GEOESPACIAIS
//--------------------------------------------------------------------------------

// Criar um índice geoespacial:
db.locais.createIndex(
    { localizacao: "2dsphare" }
)

// exemplo: 
db.local.insertOne({
    "nome": "Pizzaria do Bairro",
    "localizacao": {
    "coordinates": [-46.6333, -23.5505] // a ordem das coordenadas é sempre [Longitude, Latitude].
  }
}
)

db.restaurantes.createIndex({ localizacao: "2dsphere" })

db.restaurantes.find({
  localizacao: {
    $near: {
      $geometry: {
         coordinates: [-46.6350, -23.5520] // Sua posição atual
      },
      $maxDistance: 2000 // Distância em metros
    }
  }
})

//--------------------------------------------------------------------------------
// QUANTO ESPAÇO UM ÍNDICE OCUPA?
//--------------------------------------------------------------------------------

// Se quisermos ver o espaço total ocupado pelos índices de uma coleção, usamos:
db.usuarios.totalIndexSize()
 /* Saída: 5242880
    Significa que os índices ocupam 5MB (5242880 bytes) na
    coleção usuarios. */

//--------------------------------------------------------------------------------
// DETALHANDO O ESPAÇO USADO POR ÍNDICES DE UMA COLEÇÃO
//--------------------------------------------------------------------------------

db.usuarios.stats().indexSizes
// Saída esperada:

"_id_": 4096000,
"email_1": 1146880,
"nome_1_idade_1": 2293760

//--------------------------------------------------------------------------------
// COMO SABER SE UM ÍNDICE ESTÁ SENDO USADO?
//--------------------------------------------------------------------------------

// Podemos analisar como uma consulta está sendo processada com
.explain("executionStats")

//Exemplo sem índice:
db.usuarios.find(
    { email: "eduardo1227edu@email.com" }
).explain("executionStats")

// Se totalKeysExamined for 0 e totalDocsExamined for o total de documentos 
// da coleção, significa que a consulta não está usando um índice.

// Exemplo com índice:
db.usuarios.find(
    { email: "eduardo1227edu@email.com" }
).hint(
    { email: 1 }
).explain("executionStats")

// Se totalKeysExamined for baixo e totalDocsExamined também, significa que o
// índice foi utilizado com sucesso.

//--------------------------------------------------------------------------------

// EXEMPLO DE USO DO HINT()

// Crie os índices:
db.pedidos.createIndex(
    { email: 1 

    })
    db.pedidos.createIndex(
        { cliente: 1, status: 1 }
    )
    
    // Consulta:
    db.pedidos.find(
        { email: "eduardo1227edu@email.com"}
    ).explain("executionStats")
    
    // Forçando o uso do índice cliente_1_status_1, podemos usar .hint():
    db.pedidos.find(
        { email: "eduardo1227edu@email.com" }
    ).hint(
        { cliente: 1, status: 1 }
    ).explain("executionStats")

//--------------------------------------------------------------------------------
// REMOVENDO UM ÍNDICE 
//--------------------------------------------------------------------------------
    
// Se um índice não estiver sendo usado, podemos removê-lo para economizar espaço:
db.usuarios.dropIndex("email_1")
    
// Para listar os índices existentes de uma coleção:
db.usuarios.getIndexes() 

//--------------------------------------------------------------------------------
// AVALIANDO O DESEMPENHO DE CONSULTAS
//--------------------------------------------------------------------------------
// COMO USAR .EXPLAIN()?
// Se buscarmos por um campo sem um índice, o MongoDB faz um full collection scan 
// (varredura completa):
db.usuarios.find({ email:
"eduardo1227edu@email.com"
}).explain("executionStats")


// SAÍDA MÉTODO .EXPLAIN()
{
    "executionStats": {
    "totalKeysExamined": 0,
    "totalDocsExamined": 100000,
    "executionTimeMillis": 235
    }
}

/*Explicação:
    – totalKeysExamined: 0 → Nenhum índice foi usado.
    – totalDocsExamined: 100000 → Todos os 100.000 documentos foram analisados.
    – executionTimeMillis: 235 → Levou 235ms, um tempo relativamente alto.*/


//--------------------------------------------------------------------------------

// TESTANDO O MESMO EXEMPLO, AGORA USANDO ÍNDICE
// Criação do Índice:
db.usuarios.createIndex({ email: 1 })

// Agora, executamos .explain("executionStats") novamente:
db.usuarios.find({ email: "eduardo1227edu@email.com"
}).explain("executionStats")

// MUDANÇA APÓS O USO DE ÍNDICES

{
    "executionStats": {
    "totalKeysExamined": 1,
    "totalDocsExamined": 1,
    "executionTimeMillis": 2
    }
}

/* Explicação:
    – totalKeysExamined: 1 → O MongoDB encontrou o email pesquisado usando o índice.
    – totalDocsExamined: 1 → Apenas 1 documento foi lido, e não 100.000 como antes.
    – executionTimeMillis: 2 → A consulta agora leva apenas 2ms, uma melhora drástica! */