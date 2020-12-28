'use strict';

const fs = require('fs');

function serverLog(action, product_id) {
    fs.readFile('./action_log.json', 'utf-8', (error, rawData) => {
        if (error) {
            console.log('Error reading action_log.json', error);
            return;
        }

        let eventList = JSON.parse(rawData);

        let event = {
            action,
            product_id,
            time: (new Date()).toISOString()
        };

        eventList.push(event);

        fs.writeFile('./action_log.json', JSON.stringify(eventList), (error) => {
            if (error) {
                console.log('Error writing action_log.json', error);
                return;
            }
        });
    });
}

module.exports = serverLog;