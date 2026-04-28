db.cidades_rascunho.aggregate([
    // Passo 1: Desconstrói o array principal "estados"
    {
        $unwind: "$estados"
    },
    // Passo 2: Desconstrói o array "cidades" que está dentro de cada estado
    {
        $unwind: "$estados.cidades"
    },
    // Passo 3: Define a estrutura final (projetando apenas os campos que você quer)
    {
        $project: {
            _id: 0, // 0 remove o _id original. Mude para 1 se quiser mantê-lo.
            nome_cidade: "$estados.cidades",
            estado: "$estados.sigla",
            nome_estado : "$estados.nome" // Nota: usar espaços em chaves JSON pode dar dor de cabeça no futuro. Recomendo usar 'nome_estado'.
        }
    },
    // Passo 4: Grava a estrutura gerada no estágio anterior em uma nova coleção
    {
        $out: "cidades_certo"
    }
]);