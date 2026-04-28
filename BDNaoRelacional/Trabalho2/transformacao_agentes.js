db.pessoas_rascunho.aggregate([
    {
        $project: {
            _id: 0,
            nome: 1,
            matricula: {
                $floor: {
                    $multiply: [{ $rand: {} }, 100]
                }
            },
            contratacao: {
                $add: [
                    new Date("2020-01-01"),
                    { $multiply: [{ $rand: {} }, (new Date() - new Date("2020-01-01"))] }
                ]
            }
        }
    },
    { $limit: 5 },
    { $out: "agente" }
]);


