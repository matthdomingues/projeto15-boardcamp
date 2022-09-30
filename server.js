import express from 'express'
import dotenv from 'dotenv'

import categoriesRouter from './routes/categories.router.js';
import gamesRouter from './routes/games.router.js';
import customersRouter from './routes/customers.router.js';
import rentalsRouter from './routes/rentals.router.js';

const server = express();
dotenv.config();
server.use(express.json());

// categories
server.use(categoriesRouter);
// games
server.use(gamesRouter);
// customers
server.use(customersRouter);
// rentals
server.use(rentalsRouter);

server.listen(4000, () => {
    console.log('Server listening on port 4000.');
});