'use strict';

const API_URL = 'http://localhost:3500/api'

const makeRequest = (path, method = 'GET', body = {}) => {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.timeout = 5000;

        xhr.ontimeout = () => {
            if (method == 'GET') {
                console.log(`GET request for ${path} timed out!`);
            } else {
                console.log(`POST request for ${path} timed out!`);
            }
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    console.log('Error!', xhr.responseText);
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open(method, `${API_URL}/${path}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
    });
};

export default makeRequest;