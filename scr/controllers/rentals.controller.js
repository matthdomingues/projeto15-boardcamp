import dayjs from "dayjs";
import connection from "../database.js";

// listar aluguéis
export async function getRentals(req, res) {
    const { customerId, gameId, offset, limit, order, desc, status } = req.query;

    try {
        if (customerId) {
            const listRentals = await connection.query('SELECT * FROM rentals WHERE "customerId" = $1;', [customerId]);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName"games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );
                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (gameId) {
            const listRentals = await connection.query('SELECT * FROM games WHERE "gameId" = $1', [gameId]);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName"games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );
                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (offset && limit) {
            const listRentals = await connection.query(`SELECT * FROM rentals LIMIT ${limit} OFFSET ${offset};`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName"games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );
                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (offset) {
            const listRentals = await connection.query(`SELECT * FROM rentals OFFSET ${offset};`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName"games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );
                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (limit) {
            const listRentals = await connection.query(`SELECT * FROM rentals LIMIT ${limit};`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName"games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );
                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (desc && order) {
            const listRentals = await connection.query(`SELECT * FROM rentals ORDER BY ${order} DESC;`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );

                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (order) {
            const listRentals = await connection.query(`SELECT * FROM rentals ORDER BY ${order};`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );

                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (status === "open") {
            const listRentals = await connection.query(`SELECT * FROM rentals WHERE "returnDate" IS NULL;`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );

                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else if (status === "closed") {
            const listRentals = await connection.query(`SELECT * FROM rentals WHERE "returnDate" IS NOT NULL;`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );

                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        } else {
            const listRentals = await connection.query(`SELECT * FROM rentals;`);

            for (let i = 0; i < listRentals.rows.length; i++) {
                const customer = await connection.query(
                    "SELECT id, name FROM customers WHERE id = $1",
                    [listRentals.rows[i].customerId]
                );

                const game = await connection.query(
                    `SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1;`,
                    [listRentals.rows[i].gameId]
                );

                listRentals.rows[i] = {
                    ...listRentals.rows[i],
                    customer: customer.rows[0],
                    game: game.rows[0],
                };
            };
            return res.send(listRentals.rows);
        };
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// inserir um aluguel
export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const existingCustomer = await connection.query('SELECT * FROM customers WHERE id = ($1)', [customerId]);
        if (existingCustomer.rows.length === 0) return res.sendStatus(400);

        const existingGame = await connection.query('SELECT * FROM games WHERE id = ($1)', [gameId]);
        if (existingGame.rows.length === 0) return res.sendStatus(400);

        if (daysRented <= 0) return res.sendStatus(400);

        const returnDate = null;
        const delayFee = null;
        const rentDate = dayjs().format("YYYY-MM-DD");
        const originalPrice = daysRented * existingGame.rows[0].pricePerDay;

        const availableGame = await connection.query(`SELECT "returnDate" FROM rentals WHERE "gameId" = $1`, [gameId]);

        availableGame.rows.map((value) => {
            if (value.returnDate === null) {
                existingGame.rows[0].stockTotal--;
            }
        });

        if (existingGame.rows[0].stockTotal > 0) {
            await connection.query('INSERT INTO rentals ("customerId","gameId","daysRented", "rentDate", "originalPrice","returnDate","delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]);
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// finalizar aluguel
export async function returnRentals(req, res) {
    const { id } = req.params;

    try {
        const rent = await connection.query('SELECT * FROM rentals WHERE id = ($1)', [id]);
        console.log(rent.rows)

        if (rent.rows.length === 0) { return res.sendStatus(400) }
        if (rent.rows[0].returnDate !== null) { return res.sendStatus(400) };

        const rentDate = new Date(rent.rows[0].rentDate);
        const returnDate = new Date(dayjs().format("YYYY-MM-DD"));

        const rentalDate = Math.abs(returnDate.getTime() - rentDate.getTime());
        const diffDays = Math.ceil(rentalDate / (1000 * 3600 * 24));

        let penalty = 0;
        if (diffDays > rent.rows[0].daysRented) {
            penalty =
                (diffDays - rent.rows[0].daysRented) *
                (rent.rows[0].originalPrice / rent.rows[0].daysRented);
        };

        await connection.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3', [returnDate, penalty, id])
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// apagar aluguel
export async function deleteRentals(req, res) {
    const { id } = req.params;

    try {
        const rental = await connection.query('SELECT * FROM rentals WHERE id = ($1)', [id]);

        if (rental.rows.length === 0) return res.sendStatus(404);
        if (rental.rows.returnDate === null) return res.sendStatus(400);

        await connection.query('DELETE from rentals WHERE id = ($1)', [id]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};