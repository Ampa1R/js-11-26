const express = require('express');
const fs = require('fs');

const writer = require('./utils/writer.js');
const Basket = require('./service/basket-service.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    // res.send('<h1>Hello</h1> ')
    res.json({a: 100, b: 500});
});


server.get('/catalog', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./src/db/catalog.json', 'utf-8'));
    res.json(data);
});

server.get('/basket', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./src/db/basket.json', 'utf-8'));
    res.json(data);
});

server.post('/basket', (req, res) => {
    let basket = JSON.parse(fs.readFileSync('./src/db/basket.json', 'utf-8'));
    let newBasket = Basket.add(basket, req.body);

    writer('./src/db/basket.json', newBasket)
    .then(status => {
        if(status) {
            res.json({ status: 1 });
        } else {
            res.sendStatus(500);
        }
    });
});

server.put('/basket/:id', (req, res) => {
    let basket = JSON.parse(fs.readFileSync('./src/db/basket.json', 'utf-8'));
    let newBasket = Basket.change(basket, req.params.id, req.body.amount);

    writer('./src/db/basket.json', newBasket)
    .then(status => {
        if(status) {
            res.json({ status: 1 });
        } else {
            res.sendStatus(500);
        }
    });
});

server.delete('/basket/:id', (req, res) => {
    let basket = JSON.parse(fs.readFileSync('./src/db/basket.json', 'utf-8'));
    let newBasket = Basket.delete(basket, req.params.id);

    writer('./src/db/basket.json', newBasket)
    .then(status => {
        if(status) {
            res.json({ status: 1 });
        } else {
            res.sendStatus(500);
        }
    });
});

server.listen(3300, () => { console.log('PORT 3300') });
