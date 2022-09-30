import connection from "../database.js";

// listar clientes
export async function getCustomers(req, res) {
    const { cpf } = req.query;

    if (!cpf) {
        try {
            const allCustomers = await connection.query('SELECT * FROM customers');
            return res.send(allCustomers.rows);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        };
    } else {
        try {
            const filteredCustomers = await connection.query('SELECT * FROM customers WHERE cpf LIKE ($1)', [cpf]);
            return res.send(filteredCustomers.rows)
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        };
    };

};

// buscar um cliente pelo id
export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const customers = await connection.query('SELECT * FROM customers WHERE id = ($1)', [id]);

        if (!customers) {
            return res.sendStatus(404)
        } else {
            return res.send(customers)
        }

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

// inserir um cliente

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    const existingCPF = await connection.query('SELECT cpf FROM customers WHERE cpf = ($1', [cpf])

    if (!existingCPF) {
        try {
            await connection.query('INSERT INTO categories (name,phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
            return res.sendStatus(201);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    } else {
        return res.sendStatus(409);
    };

    // cpf - string com 11 caracteres numericos
    // phone - string com 10 ou 11 caracteres numericos
    // name - nao pode ser string vazia
    // birthday - data valida
    // senao = erro 400   

};

// atualizar um cliente

export async function updateCustomer(req, res) { };