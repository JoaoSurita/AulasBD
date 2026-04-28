// Base de Dados de Exemplo
db.users.insertMany([
    {
        _id: 1,
        username: "João",
        age: 19,
        active: true,
        premium: false,
        hobbies: ["reading", "soccer"],
        tasks: [{ tittle: "Study MongoDB", status: "pending" }]
    },

    {
        _id: 2,
        username: "Maria",
        age: 18,
        active: false,
        premium: true,
        hobbies: ["cooking", "yoga"],
        tasks: [{ tittle: "Complete Project", status: "done" }]
    },

    {
        _id: 3,
        username: "Carlos",
        age: 35,
        active: true,
        premium: false,
        hobbies: ["gaming", "music"],
        tasks: [{ tittle: "Write report", status: "pending" }]
    },
]);

//--------------------------------------------------------------------------------------------------------------
// Atualização de Documentos
//--------------------------------------------------------------------------------------------------------------

// Atualização de Documentos com updateOne()
// Atualiza apenas um documentos que corresponde ao filtro
db.users.updateOne(
    { username: "João" },
    { $set: { age: 20} } // O usuario João antes tinha 19 anos, agora tem 20
);

//--------------------------------------------------------------------------------------------------------------

// Atualização de Documento com Método updateMany()
// Atualiza todos os documentos que correspondam ao filtro.
db.users.updateMany(
    { active: true },
    { $set: { premium: true } } // Todos os Usuarios Ativos agora são premium
);
//--------------------------------------------------------------------------------------------------------------

// Atualização de Documentos com o Método replaceOne()
// Substitui um documento inteiro por um novo:
db.users.replaceOne(
    { username: "Maria" },
    { _id: 2, username: "Maria", Age: 19, active: true, premium: false, hobbies: [] }
);
// Anelize foi completamente substituida e perdeu suas tasks

//--------------------------------------------------------------------------------------------------------------

// Atualização de Documentos com $set
// $set – Define ou altera um campo específico

db.users.updateOne(
    { username: "João" },
    { $set: { premium: true} } // João agora é premium
);

//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $RENAME
// • $rename – Renomeia um campo:

db.users.updateOne(
    { username: "João"},
    { $rename: { "age": "yearsOld"} } // O campo age foi renomeado para yearsOld para “Anelize”.
);

//--------------------------------------------------------------------------------------------------------------
// EXEMPLOS – OPERAÇÕES MATEMÁTICAS
//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $INC
// $inc – Incrementa um valor:

db.users.updateOne(
    { username: "Eduardo"},
    { $inc: {age : 1} }  // A idade de “Eduardo” aumenta em 1.
);

//--------------------------------------------------------------------------------------------------------------


// ATUALIZAÇÃO DE DOCUMENTO COM $MUL
// $mul – Multiplica um valor:

db.users.updateOne(
    { username: "Eduardo" },
    { $mul: { age: 2 } } // ✓ A idade de "Eduardo" dobra.
);

//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $MIN
// • $min

db.users.updateOne(
    { username: "Eduardo"},
    { $min: { age: 23} } // ✓ Se a idade de “joao” for maior que 23, ela é reduzida para 23.
)

//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $MAX
// • $max

db.users.updateOne(
    { username: "Anelize" },
    { $max: { yearsOld: 35 } } //Se a idade de “maria” for menor que 35, ela é aumentada para 35.
)

//--------------------------------------------------------------------------------------------------------------
// EXEMPLOS – OPERAÇÕES EM ARRAYS
//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $PUSH
// • $push – Adiciona um elemento ao array:

db.users.updateOne(
    { username: "João" },
    { $push: { hobbies: "guitar" } }
);

//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $POP
// $pop – Remove o primeiro ou último elemento

db.users.updateOne(
    { username: "Maria" },
    { $pop: { hobbies: -1 } } // Remove o primeiro item do array hobbies de "Maria".
);

//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $ADDTOSET
// $addToSet – Adiciona um item se ele não existir:

db.username.updateOne(
    { username: "João" },
    { $addToSet: { hobbies: "chess" } } // “chess” só será adicionado ao array hobbies se ainda não existir.
);

//--------------------------------------------------------------------------------------------------------------

// ATUALIZAÇÃO DE DOCUMENTO COM $EACH
// $each – Adiciona múltiplos elementos

db.users.updateOne(
    { username: "João" },
    { $push: { hobbies: { $each: [ "coding", "music"] } } }
)

// “coding” e “music” são adicionados a hobbies.

//--------------------------------------------------------------------------------------------------------------