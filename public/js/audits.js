import { loadHeaderFooter } from './utils.mjs';
loadHeaderFooter();
const skippers = ['ASST_AUDITOR1','ASST_AUDITOR2','ASST_AUDITOR3', 'AUDITEE2', 'AUDITEE_FUNCTION', 'ENTITY_ID', 'MODIFIED_BY', 'MODIFIED_DATE', 'CREATE_BY', 'CREATED_DATE'];

const url = 'http://localhost:3008/audit';

function getRecords () {
    const main = document.querySelector('main');
    
    fetch(url, { method: 'GET' })

    .then(response => response.json())
    .then(records => {
        // console.log(records);
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const header = document.createElement('tr');
        const td = document.createElement('td');
        
        for (let key in records[0]) {
            if (!skippers.includes(key)){
            const th = document.createElement('th');
            th.textContent = key;
            header.appendChild(th);
            }
        }
        thead.appendChild(header);

        for (let record of records) {
            const tr = document.createElement('tr');
            for (let key in record) {
                const td = document.createElement('td');
                if (!skippers.includes(key)) {
                    if (key !== null) {
                        if (key.substring(key.length - 4) === 'DATE' && key.length > 0 && record[key] !== null) {
                            td.textContent = record[key].slice(0,10);
                        } else {
                            if (key == 'AUDIT_MANAGER_ID') {
                                td.innerHTML = `<a href="http://localhost:3008/audit.html?id=${record[key]}">${record[key]}</a>`;
                            } else {
                                td.textContent = record[key];
                            }
                        }
                    } else {
                        td.textContent = record[key];
                    }
                    tr.appendChild(td);
                }
        }
            tbody.appendChild(tr);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        main.appendChild(table);
    })
}

getRecords();

const modal = document.getElementById('dialogaddaudit');
const btnaddaudit = document.querySelector('#btnaddaudit');
btnaddaudit.addEventListener('click', (event) => {
    event.preventDefault();
    modal.showModal();
});