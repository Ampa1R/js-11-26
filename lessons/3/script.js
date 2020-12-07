// callback
/*
let a = 0;

const getData = (path, callback) => {
    setTimeout(() => {
        a++;
        console.log('1st', a);
        callback(a);
    }, 500);
};


getData('https://google.com/some-data-resource', (data) => {
    console.log('1st callback', data);

    getData('https://google.com/another-data-resource', (anotherParams) => {
        console.log('2nd callback', anotherParams);

        getData('https://google.com/another-data-resource', (anotherParams) => {
            console.log('2nd callback', anotherParams);
        });
    });
});
*/

// Promise

// pending ожидаем
// fulfilled 
// rejected 

/*
let a = 0;

const promise = new Promise((resolve, reject) => {
    console.log('Promise created');
    setTimeout(() => {
        a += 5;
        console.log('setTimeout callback called', a);
        if (a < 5) {
            resolve();
        } else {
            reject();
        }
    }, 1500);
});

promise
    .then(() => {
        console.log('Promise resolved');
    })
    .catch(() => {
        console.log('Promise reject caught');
    });
*/


/*
let a = 0;

const getData = (path) => {
    return new Promise((resolve, reject) => {
        console.log('Promise created');
        setTimeout(() => {
            a += 2;
            console.log('setTimeout callback called', a);
            if (a < 5) {
                resolve(a);
            } else {
                reject(a);
            }
        }, 2000);
    });
};

getData('https://google.com/some-data-resource')
    .then(
        (data) => {
            console.log('promise 1 resolved', data);
            return getData('https://google.com/some-data-resource');
        },
        (err) => {
            console.log('promise 1 caught');
            if (err.data) {
                throw new Error('some message');
            }
        }
    )
    .then((anotherData) => {
        console.log('promise 2 resolved', anotherData);
        return getData('https://google.com/some-data-resource');
    })
    .then((anotherData) => {
        console.log('promise 3 resolved', anotherData);
    })
    .catch((err) => {
        console.log('Promise caught', err);
    });

getData('htts://ya.ru')
    .then((data) => {
        console.log('another promise data', data);
    })
*/

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const getData = () => {
    const xhr = new XMLHttpRequest();

    xhr.timeout = 10000;

    xhr.ontimeout = () => {
        console.log('timeout!');
    }

    xhr.onreadystatechange = () => {
        console.log('ready state change', xhr.readyState);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
            } else {
                console.log('Error!', xhr.responseText);
            }
        }
    }

    xhr.open('GET', `${API}/catalogData.json`);

    // xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}
