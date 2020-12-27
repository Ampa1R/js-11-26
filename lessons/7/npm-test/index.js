const express = require('express');
const app = express();

app.use(express.static('./dist'));

app.get('/catalog', (request, response) => {
    console.log('/catalog handler');
    response.send('some data');
});

app.get('/basket/:id', (request, response) => { // wildcards
    response.send(`request handled with param id: ${request.params.id}`);
});

app.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});
