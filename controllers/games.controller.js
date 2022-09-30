import connection from "../database.js";

// listar jogos
export async function getGames(req, res) { };

// inserir um jogo
export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    if (!name) { return res.sendStatus(400) }
    if ((stockTotal || pricePerDay) <= 0) { return res.sendStatus(400) }

    // categoryId deve ser um id de categoria existente, senão { return res.sendStatus(400) };
    // name não pode ser um nome de jogo já existente ⇒ nesse caso deve retornar status 409

    connection.query('INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5);'
        , [name, image, stockTotal, categoryId, pricePerDay])
        .then(result => {
            res.sendStatus(201);
        });
};