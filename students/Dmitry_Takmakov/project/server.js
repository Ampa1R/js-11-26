'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const serverLogger = require('./server_logger');
const app = express();

app.use(express.static('./static'));
app.use(express.json());
app.use(cors());

app.get('/api/products', (req, res) => {
    fs.readFile('./products.json', 'utf-8', (error, rawData) => {
        if (error) {
            console.log('Error reading products.json', error);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.get('/api/basket', (req, res) => {
    fs.readFile('./basket_items.json', 'utf-8', (error, rawData) => {
        if (error) {
            console.log('Error reading products.json', error);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.post('/api/basket', (req, res) => {
    fs.readFile('./basket_items.json', 'utf-8', (error, rawData) => {
        if (error) {
            console.log('Error reading basket_items.json', error);
            res.status(500).send('Server error');
            return;
        }

        let basket = JSON.parse(rawData);

        let item = req.body;
        
        let id = basket.findIndex((basketItem) => basketItem.product_id === item.product_id);
        if (id > -1) {
            basket[id].quantity += 1;
        } else {
            basket.push(item);
            basket[basket.length - 1].quantity = 1;
        }

        fs.writeFile('./basket_items.json', JSON.stringify(basket), (error) => {
            if (error) {
                console.log('Error writing basket_items.json', error);
                res.status(500).send('Server error');
                return;
            }
            serverLogger('ADD', item.product_id);

            res.json({ success: true });
        });

    });
});

app.delete('/api/basket/:product_id', (req, res) => {
    fs.readFile('./basket_items.json', 'utf-8', (error, rawData) => {
        if (error) {
            console.log('Error reading basket_items.json', error);
            res.status(500).send('Server error');
            return;
        }

        let basket = JSON.parse(rawData);

        let id = parseInt(req.params.product_id);
        
        basket = basket.filter((basketItem) => basketItem.product_id !== parseInt(id));

        fs.writeFile('./basket_items.json', JSON.stringify(basket), (error) => {
            if (error) {
                console.log('Error writing basket_items.json', error);
                res.status(500).send('Server error');
                return;
            }
            serverLogger('DELETE', id);

            res.json({ success: true });
        });

    });
});

app.listen(3500, () => {
    console.log('http://localhost:3500/');
});