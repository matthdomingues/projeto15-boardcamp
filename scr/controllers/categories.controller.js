import connection from "../database.js";

export async function getCategories(req, res) {

    try {
        const categories = await connection.query('SELECT * FROM categories');
        return res.send(categories.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export async function postCategories(req, res) {
    const { name } = req.body;

    if (!name) { return res.sendStatus(400) };

    try {
        const exist = await connection.query('SELECT categories.name FROM categories WHERE name = ($1)', [name]);
        if (exist.rows.length !== 0) { return res.sendStatus(409) };

        const insert = await connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};