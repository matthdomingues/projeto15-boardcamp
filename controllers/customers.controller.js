import connection from "../database.js";

// listar clientes

export async function getCustomers(req, res) {

    // - Caso seja passado um parâmetro `cpf` na **query string** da requisição, os clientes devem ser filtrados para retornar somente os com CPF que comecem com a string passada. Exemplo:
    // - Para a rota `/customers?cpf=012`, deve ser retornado uma array somente com os clientes que o CPF comece com "012", como "01234567890", "01221001200", etc

    connection.query('SELECT * FROM customers').then(customers => {
        res.send(customers.rows);
    });
};

// buscar um cliente pelo id

export async function getCustomerById(req, res) {
    const { id } = req.params;

    const customers = await connection.query(`SELECT * FROM customers WHERE id = ${id} `);

    if (!customers) {
        return res.sendStatus(404)
    } else {
        return res.send(customers)
    }

};

// inserir um cliente

export async function postCustomer(req, res) { };

// atualizar um cliente

export async function updateCustomer(req, res) { };