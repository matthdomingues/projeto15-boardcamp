import connection from "../database.js";

export async function getCategories(req, res) {
    const { offset, limit, order, desc } = req.query;


    try {
        if (offset) {
            const offsetCategories = await connection.query(`SELECT * FROM categories OFFSET ${offset} `);
            return res.send(offsetCategories.rows);
        } else if (limit) {
            const limitCategories = await connection.query(`SELECT * FROM categories LIMIT ${limit} `);
            return res.send(limitCategories.rows);
        } else if (offset && limit) {
            const limitCategories = await connection.query(`SELECT * FROM categories LIMIT ${limit} OFFSET ${offset} `);
            return res.send(limitCategories.rows);
        } else if (desc && order) {
            const ascCategories = await connection.query(`SELECT * FROM categories ORDER BY ${order} DESC`);
            return res.send(ascCategories.rows);
        } else if (order) {
            console.log(req.query);
            const descCategories = await connection.query(`SELECT * FROM categories ORDER BY ${order} `);
            return res.send(descCategories.rows);
        } else {
            const categories = await connection.query('SELECT * FROM categories');
            return res.send(categories.rows);
        };
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

        await connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};