const { strict } = require('assert');
const fs = require('fs');

fs.readFile('./catalog.json', 'utf-8', (err, rawData) => {
    if (err) {
        console.log('Read error!', err);
        return;
    }
    const data = JSON.parse(rawData);
    
    data.push({ id: 123459, title: 'Keyboard' });

    fs.writeFile('./catalog.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log('Write error!', err);
            return;
        }
        console.log('writeFile callback');
    });
});
