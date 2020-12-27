const LOG_FILE = "./stats.json";
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.static('./dist'));
app.use(express.json());
app.use(cors());

app.get('/api/catalog', (req, res) => {
    fs.readFile('./catalog.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read catalog.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.get('/api/basket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }
        res.send(rawData);
    });
});

app.post('/api/addToBasket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        const basket = JSON.parse(rawData);

        const item = req.body;
        log("addToBasket", req, item);
        const index = basket.findIndex((basketItem) => basketItem.id === item.id);
        if (index > -1) {
            basket[index].quantity += 1;
        } else {
            basket.push({ ...item, quantity: 1 });
        }

        fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Write basket.json error!', err);
                res.status(500).send('Server error');
                return;
            }
            res.json({ success: true });
        });

    });
});
app.post('/api/removeFromBasket', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, rawData) => {
        if (err) {
            console.log('Read basket.json error!', err);
            res.status(500).send('Server error');
            return;
        }

        var basket = JSON.parse(rawData);

        const item = req.body;
        
        basket = basket.filter((basketItem) => basketItem.id !== parseInt(item.id));

        log("removeFromBasket", req, item);
        fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Write basket.json error!', err);
                res.status(500).send('Server error');
                return;
            }
            res.json({ success: true });
        });

    });
});
// addToBasket
// removeFromBasket

function log(action,req, data)
{
    let logData = [];
    if (fs.existsSync(LOG_FILE))
    {
        logData = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
    }
    
    var newDate = new Date();

    logData.push({ dateTime:newDate,  action:action, url:req.url, data:data });
    fs.writeFile(LOG_FILE, JSON.stringify(logData, null, ' '), (err) => {
        if (err) {
            console.log(`Write ${LOG_FILE} error!`, err);
            //res.status(500).send('Server error');
            return;
        }
        //res.json({ success: true });
    });    
}

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
