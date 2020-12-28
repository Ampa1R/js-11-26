const express = require('express');
const cors = require('cors');
const fs = require('fs');
const logger = require('./logger')

const app = express();
app.use(cors());
app.use(express.static('./dist'));
app.use(express.json())


app.get('/api/catalogue', (req, res) => {
    fs.readFile('./goods.json', 'utf-8', (e, rawData) => {
        if (e) {
            console.log('Ошибка чтения goods.json' + e);
            res.status(500).send('Server error');
            return
        }
        return res.send(rawData);
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (e, rawData) => {
        if (e) {
            console.log('Ошибка чтения cart.json' + e);
            return res.status(500).send('Server error');
        }
        return res.send(rawData);
    });
});

app.post('/api/cartAdd', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (e, rawData) => {
        if (e) {
            console.log('Ошибка чтения cart.json' + e);
            res.status(500).send('Server error');
            return
        }

        const cart = JSON.parse(rawData);

        const item = req.body;

        const index = cart.findIndex(cartItem => cartItem.id === item.id);

        if (index > -1) {
            cart[index].quantity += 1;
        } else {
            cart.push({...item, quantity: 1})
        }

        fs.writeFile('./cart.json', JSON.stringify(cart), (e) => {
            if (e) {
                console.log('Ошибка записи cart.json' + e);
                res.status(500).send('Server error');
                return;
            }

            logger('ADD', item.id);


            res.json({success: true});

        });
    });
});


app.get('/api/clearCart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (e, rawData) => {
        if (e) {
            console.log('Ошибка чтения cart.json' + e);
            res.status(500).send('Server error');
            return;
        }

        let cart = JSON.parse(rawData);
        cart = [];

        fs.writeFile('./cart.json', JSON.stringify(cart), (e) => {
            if (e) {
                console.log('Ошибка записи cart.json' + e);
                res.status(500).send('Server error');
                return;
            }

            res.json({success: true});

        });
    });
});


app.delete('/api/deleteItem/:id', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (e, rawData) => {
        if (e) {
            console.log('Ошибка чтения cart.json' + e);
            res.status(500).send('Server error');
            return
        }

        const id = req.params.id;
        let cart = JSON.parse(rawData);

        cart = cart.filter(el => el.is !== id);

        fs.writeFile('./cart.json', JSON.stringify(cart), (e) => {
            if (e) {
                console.log('Ошибка записи cart.json' + e);
                res.status(500).send('Server error');
                return;
            }

            logger('DELETE', id);


            res.json({success: true});

        });
    });
});


app.listen(8080, 'localhost', () => {
    console.log('Server listening at http://localhost:8080');
});

