import { loadHeaderFooter ,getUserValue } from './utils.mjs';
loadHeaderFooter();

// get user value
const user = getUserValue();


// get url parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const url = 'http://localhost:3008/manager/' + id;
const managerUrl = 'http://localhost:3008/manager/';
console.log(url);

const main = document.querySelector('main');

while (main.firstChild) {
    main.removeChild(main.firstChild);
}

fetch(url, { method: 'GET' })
.then(response => response.json())
.then(record => {
    console.log(record);
    const div = document.createElement('div');
    const p = document.createElement('p');
    for (const key in record[0]) {
        p.textContent = key + ': ' + record[key];
        main.appendChild(p);
    }   
    // main.appendChild(div);
});                                                                                                                                                               