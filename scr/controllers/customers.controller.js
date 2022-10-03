import connection from "../database.js";
import { customerSchema } from "../schemas/schema.js";

// listar clientes
export async function getCustomers(req, res) {
    const { cpf } = req.query;
    console.log(cpf)

    try {

        if (cpf) {
            const filteredCustomers = await connection.query("SELECT * FROM customers WHERE cpf LIKE ($1)", [cpf]);
            console.log(filteredCustomers.rows);
            return res.send(filteredCustomers.rows)
        }

        const allCustomers = await connection.query('SELECT * FROM customers');
        res.send(allCustomers.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// buscar um cliente pelo id
export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customers = await connection.query('SELECT * FROM customers WHERE id = ($1)', [id]);
        if (customers.rows.length === 0) { return res.sendStatus(404) };
        return res.send(customers.rows[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// inserir um cliente
export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    const validation = customerSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error)
        return res
            .status(400)
            .send(validation.error.details.map(detail => detail.message));
    };

    const existingCPF = await connection.query('SELECT cpf FROM customers WHERE cpf = ($1)', [cpf])
    if (existingCPF.rows.length !== 0) { return res.sendStatus(409) };

    try {
        await connection.query('INSERT INTO customers (name,phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// atualizar um cliente
export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    const validation = customerSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error)
        return res
            .status(400)
            .send(validation.error.details.map(detail => detail.message));
    };

    const existingCPF = await connection.query('SELECT cpf FROM customers WHERE cpf = ($1)', [cpf])
    if (existingCPF.rows.length !== 0) { return res.sendStatus(409) };

    try {
        await connection.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5', [name, phone, cpf, birthday, id]);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };

};