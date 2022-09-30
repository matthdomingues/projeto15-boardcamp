import { Router } from "express";

import { getCustomerById, getCustomers, postCustomer, updateCustomer, } from "../controllers/customers.controller";

const customersRouter = Router();

customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);
customersRouter.post('/customers', postCustomer);
customersRouter.put('/customers/:id', updateCustomer);

export default customersRouter;