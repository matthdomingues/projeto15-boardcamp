import connection from "../database.js";
import { postGamesSchema } from "../schemas/schema.js";

// listar jogos
export async function getGames(req, res) {
    const { name, offset, limit, order, desc } = req.query;

    try {
        if (name && offset && limit) {
            const filteredGames = await connection.query(`SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id WHERE games.name LIKE ($1) LIMIT ${limit} OFFSET ${offset};`, [`%${name}%`])
            res.send(filteredGames.rows);
        } else if (offset && limit) {
            const limitGames = await connection.query(`SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id LIMIT ${limit} OFFSET ${offset}; `);
            return res.send(limitGames.rows);
        } else if (name) {
            const nameGames = await connection.query('SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id WHERE games.name LIKE ($1);', [`%${name}%`])
            res.send(nameGames.rows);
        } else if (offset) {
            const offsetGames = await connection.query(`SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id OFFSET ${offset}; `);
            return res.send(offsetGames.rows);
        } else if (limit) {
            const limitGames = await connection.query(`SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id LIMIT ${limit}; `);
            return res.send(limitGames.rows);
        } else if (desc && order) {
            const descGames = await connection.query(`SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id ORDER BY ${order} ASC;`)
            return res.send(descGames.rows);
        } else if (order) {
            const ascGames = await connection.query(`SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id ORDER BY ${order} DESC;`)
            return res.send(ascGames.rows);
        } else {
            const allGames = await connection.query('SELECT games.*, categories.id AS "categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games. "categoryId" = categories.id;')
            res.send(allGames.rows);
        };
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// inserir um jogo
export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const validation = postGamesSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error)
        return res
            .status(400)
            .send(validation.error.details.map(detail => detail.message));
    };

    const existingCategory = await connection.query('SELECT * FROM categories WHERE id = ($1)', [categoryId]);
    if (existingCategory.rows.length === 0) { return res.sendStatus(400) };

    const existingName = await connection.query('SELECT * FROM games WHERE name = ($1)', [name]);
    if (existingName.rows.length !== 0) { return res.sendStatus(409) };

    try {
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };

};