// Parte 1 - Criação do Banco de Dados, Coleção

// Comando para usar o Banco de Dados(Se o BD não existir, ele será criado)
//use biblioteca_fatec; | está comentado para não ficar com erro

// Comando para criar uma coleção (tabela)
db.createCollection("livros");

// Comando para inserir um documento (registro) na coleção(Se a coleção não existir, ela será criada)
db.autores.insertOne({
    nome: "Franz Kafka"
});

db.alunos.insertOne({
    nome: "João Pedro Surita",
    curso: "DSM",
    anoIngresso: 2025,
    ativo: true
});

// Parte 2 - Inserção de Documentos
db.livros.insertOne({
    titulo: "Noites Brancas",
    anoPublicacao: 1848,
    genero: "Romance",
    paginas: 96,
    disponivel: true
});

// Comando para inserir vários documentos (registros) na coleção
db.livros.insertMany([
    {
        titulo: "Crime e Castigo",
        anoPublicacao: 1866,
        genero: "Romance",
        paginas: 544,
        disponivel: true
    },
    {
        titulo: "Os Irmãos Karamázov",
        anoPublicacao: 1880,
        genero: "Romance",
        paginas: 824,
        disponivel: true
    },
    {
        titulo: "O Idiota",
        anoPublicacao: 1869,
        genero: "Romance",
        paginas: 656,
        disponivel: true
    }
]);

db.autores.insertOne({
    nome: "Fiódor Dostoiévski",
    nacionalidade: "Russo",
    livrosPublicados: ["Noites Brancas", "Crime e Castigo", "Os Irmãos Karamázov", "O Idiota"]
});

// Parte 3 - Subdocumentos

// Comando para inserir um documento com um subdocumento
db.livros.insertOne({
    titulo: "A Metamorfose",
    anoPublicacao: 1915,
    genero: "Ficção",
    autor: {
        nome: "Franz Kafka",
        nacionalidade: "Austro-Húngaro"
    },
    paginas: 68,
    disponivel: true
});

// Comando para inserir um documento com um array de subdocumentos
db.livros.insertOne({
    titulo: "Metodologia do Trabalho Científico",
    anoPublicacao: 2017,
    genero: "Educação",
    autores: [
        {
            nome: "Antônio Joaquim Severino",
            nacionalidade: "Brasileiro"
        },
        {
            nome: "Eva Maria Lakatos",
            nacionalidade: "Brasileiro"
        }
    ],
    paginas: 120,
    disponivel: true
});

db.alunos.insertOne({
    nome: "Maria Silva",
    curso: "DSM",
    anoIngresso: 2025,
    ativo: true,
    contatos: {
        email: "mariasilva@email.com",
        telefone: "14999999999"
    }
});

//Parte 4 - Arrays e Estruturas Mais Complexas

// Comando para inserir um documento com um array de strings
db.livros.insertOne({
    titulo: "Carta ao Pai",
    categorias: ["Biografia", "Literatura Estrangeira", "Memórias"],
    palavrasChave: ["Conflito Familiar", "Relacionamento", "Autobiografia", "Existencialismo"]
});

// Criando uma coleção com dois subdocumentos
db.emprestimos.insertOne({
    aluno: {
        nome: "João Pedro Surita",
        curso: "DSM"
    },
    livro: {
        dataEmprestimo: new Date("2026-02-15"),
        dataDevolucao: new Date("2026-03-15"),
        status: "Em andamento"
    }
});

db.emprestimos.insertMany([
    {
        aluno: {
            nome: "Maria Silva",
            curso: "DSM"
        },
        livro: {
            dataEmprestimo: new Date("2026-02-20"),
            dataDevolucao: new Date("2026-03-20"),
            status: "Em andamento"
        }
    },
    {
        aluno: {
            nome: "Carlos Oliveira",
            curso: "DSM"
        },
        livro: {
            dataEmprestimo: new Date("2026-02-25"),
            dataDevolucao: new Date("2026-03-25"),
            status: "Em andamento"
        }
    },
    {
        aluno: {
            nome: "Ana Pereira",
            curso: "DSM"
        },
        livro: {
            dataEmprestimo: new Date("2026-03-01"),
            dataDevolucao: new Date("2026-03-30"),
            status: "Em andamento"
        }
    }
]);

// Parte 5 - Atualizações

// Comando para atualizar um documento na coleção
db.livros.updateOne(
    { titulo: "Noites Brancas" },
    { $set: { disponivel: false } }
);

// Comando para atualizar um documento usando um operador de atualização
db.livros.updateOne(
    { titulo: "A Metamorfose" },
    { $push: { palavrasChave: "Melancolia" } }
);

// Comando para atualizar um documento usando um operador de atualização para incrementar um valor
db.livros.updateOne(
    { titulo: "Carta ao Pai" },
    { $inc : {vezesEmprestado: 5 } }
);

// Comando para atualizar um documento localizando-o por um critério e inserindo um valor em uma lista
db.livros.updateMany(
    { genero: "Romance" },
    { $push: { destaque: true }}
);

// Comando para remover um valor de um array usando o operador $pull
db.livros.updateOne(
    { titulo: "Carta ao Pai"},
    { $pull: { palavrasChave: "Existencialismo" } }
);

// Parte 6 - Remoções

// Comando para remover um documento da coleção
db.emprestimos.deleteOne({
    "aluno.nome": "Carlos Oliveira"
});

// Comando para remover vários documentos da coleção usando um operador lógico
db.livros.deleteMany({
    $or: [
        { paginas: { $lt: 100 } },
        { genero: "Educação" }
    ]
});