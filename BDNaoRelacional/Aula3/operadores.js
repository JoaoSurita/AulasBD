// Base de dados de exemplo

db.produtos.insertMany(
    [ // [] - colchetes abrem um array para inserir varios itens a tabela produto
        //item 1
        {
            "_id": 1,
            "nome": "Notebook Dell",
            "categoria": "Eletrônicos",
            "preco": 4500,
            "estoque": 15,
            "avaliacao": 4.7
        },


        //item 3
        {
            "_id": 2,
            "nome": "Notebook Dell",
            "categoria": "Eletrônicos",
            "preco": 4500,
            "estoque": 15,
            "avaliacao": 4.7
        },

        //item 2
        {
            "_id": 3,
            "nome": "Smartphone Samsung",
            "categoria": "Eletrônicos",
            "preco": 2500,
            "estoque": 30,
            "avaliacao": 4.5
        }
    ])


//-------------------------------------------
//          Operadores de comparação
//-------------------------------------------
/*  $eq                   (igual a)

– Este operador retorna documentos cujo valor de um campo específico
seja igual ao valor informado. */

db.produtos.find({ "preco": { "$eq": 2500 } })

/* Este comando retornará o produto "Smartphone Samsung", pois seu
preço é exatamente 2500. */

//-------------------------------------------------------------------------------------------

/*  $ne                   (diferente de)
– Retorna documentos cujo valor de um campo seja diferente do valor
especificado.  */

db.produtos.find({ "preco": { "$ne": 4500 } })

/*  Aqui, serão retornados todos os produtos exceto o "Notebook Dell", pois
seu preço é 4500.  */

//-------------------------------------------------------------------------------------------

/*  $gt                   (maior que)
– Retorna documentos cujo valor de um campo seja maior que o
especificado.  */

db.produtos.find({ "preco": { "$gt": 2000 } })

/*  Este comando retornará tanto o "Notebook Dell" quanto o "Smartphone
Samsung", pois seus preços são superiores a 2000.  */

//-------------------------------------------------------------------------------------------

/*  $lt                   (menor que)
– Retorna documentos cujo valor de um campo seja menor que o
especificado.  */

db.produtos.find({ "preco": { "$lt": 3000 } })

/*  Retornará os produtos "Smartphone Samsung" e "Cadeira Gamer".  */

//--------------------------------------------------------------------------------------------

/*  $gte e $lte           (maior ou igual / menor ou igual)
– São variações dos operadores anteriores, incluindo valores iguais ao
limite definido.  */

db.produtos.find({ "preco": { "$gte": 1000, "$lte": 3000 } })

/*  Retornará todos os produtos com preço entre 1000 e 3000, incluindo
esses valores.  */


//-------------------------------------------
//          Operadores Lógicos
//-------------------------------------------

/*  $and
O operador $and exige que todas as condições especificadas sejam verdadeiras.  */

db.produtos.find({
    "$and": [
        { "categoria": "Eletrônicos" },
        { "preco": { "$gt": 3000 } }
    ]
})

/*  Isso retornará apenas o "Notebook Dell", pois ele pertence à categoria "Eletrônicos"
e tem preço maior que 3000.  */

//--------------------------------------------------------------------------------------------

/*  $or
– O operador $or retorna documentos que satisfaçam pelo menos uma das condições
especificadas.  */

db.produtos.find({
    "$or": [
        { "categoria": "Eletrônicos" },
        { "preco": { "$gt": 4000 } }
    ]
})

/*  Aqui, qualquer produto da categoria "Eletrônicos" ou que tenha preço superior a 4000 será
retornado.  */

//--------------------------------------------------------------------------------------------

/* $not
– Este operador nega uma condição específica.  */

db.produtos.find({
    "preco": {
        "$not": { "$gt": 3000 }
    }
})

/*  Isso retornará todos os produtos cujo preço não seja maior que 3000.  */

//--------------------------------------------------------------------------------------------

/*  $nor
O operador $nor é o oposto de $or, excluindo documentos que satisfaçam qualquer uma
das condições listadas.  */

db.produtos.find({
    "$nor": [
        { "categoria": "Eletrônicos" },
        { "preco": { "$gt": 4000 } }
    ]
})

/*  Serão retornados apenas produtos que não sejam da categoria "Eletrônicos" e que tenham
preço inferior ou igual a 4000. (porque $gt faz com que busque os produtos com valor 
superior a 4000, logo o contrario disso seria o inferior a 4000)  */


//-------------------------------------------
//          Operadores de Elemento
//-------------------------------------------

/* $exists
Verifica se um campo está presente ou não em um documento. */

db.produtos.find(
    { "avaliacao": { "$exists": true }}
)

/* Retorna todos os produtos que possuem o campo avaliacao. */

//-------------------------------------------------------------------------------------------

/*  $type
Filtra documentos com base no tipo de dado armazenado em um
campo.  */

db.produtos.find(
    { "preco": { "$type": "double" } }
)

/*  Retorna todos os documentos onde o campo preco seja do tipo
double.  */

//-------------------------------------------------------------------------------------------