import connection from "../database.js";

// listar jogos
export async function getGames(req, res) {
    const { name } = req.query;

    if (!name) {
        try {
            const allGames = await connection.query('SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id;')
            res.send(allGames.rows);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        };
    } else {
        try {
            const filteredGames = await connection.query('SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id WHERE games.name LIKE ($1)', [name])
            res.send(filteredGames.rows);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        };
    }
};

// inserir um jogo
export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    if (!name) { return res.sendStatus(400) }
    if ((stockTotal || pricePerDay) <= 0) { return res.sendStatus(400) }

    const existingCategory = await connection.query('SELECT games.categoryId FROM games WHERE categoryId = ($1)', [categoryId]);
    if (existingCategory) { return res.sendStatus(400) };

    const existingName = await connection.query('SELECT games.name FROM games WHERE name = ($1)', [name]);
    if (existingName) { return res.sendStatus(409) };

    try {
        const games = await connection.query('INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay]);
        if (games) { return res.sendStatus(201) };
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };

};