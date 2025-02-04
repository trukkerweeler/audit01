import { loadHeaderFooter, myport, getUserValue } from './utils.mjs';
loadHeaderFooter();
const port = myport();
const user = await getUserValue();

const btnRecurs = document.querySelector('#btnRecurs');
btnRecurs.addEventListener('click', () => {
    // submit form to API
    const form = document.querySelector('#entryform');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);

    fetch('/api/recur', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // display results
            const results = document.querySelector('#results');
            results.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                const p = document.createElement('p');
                p.textContent = data[i];
                results.appendChild(p);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

