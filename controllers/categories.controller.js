import connection from "../database.js";

export async function getCategories(req, res) {

    try {
        const categories = await connection.query('SELECT * FROM categories');
        res.send(categories.rows);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };

};

export async function postCategories(req, res) {
    const { name } = req.body;

    if (!name) { return res.sendStatus(400) }

    // name não pode ser um nome de categoria já existente ⇒ nesse caso deve retornar status 409

    try {
        await connection.query('INSERT INTO categories (nome) VALUES ($name);', [name]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };

};