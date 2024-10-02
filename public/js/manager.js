import { loadHeaderFooter ,getUserValue } from './utils.mjs';
loadHeaderFooter();

// get user value
const user = getUserValue();

// get url parameters
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const url = 'http://localhost:3008/manager/' + id;
const managerUrl = 'http://localhost:3008/manager/';
const checklistUrl = 'http://localhost:3008/checklist/';
// console.log(url);

const main = document.querySelector('main');

while (main.firstChild) {
    main.removeChild(main.firstChild);
}

fetch(url, { method: 'GET' })
.then(response => response.json())
.then(record => {
    // console.log(record);
    
    // Details
    const section = document.createElement('section');
    section.classList.add('details');
    const h2 = document.createElement('h2');
    h2.textContent = 'Details';
    section.appendChild(h2);

    const fieldList = ['AUDIT_ID', 'AUDIT_MANAGER_ID', 'STANDARD', 'SUBJECT', 'SCHEDULED_DATE', 'LEAD_AUDITOR', 'AUDITEE1', 'QUESTION', 'OBSERVATION', 'REFERENCE'];
    for (const key in record[0]) {
        if (!fieldList.includes(key)) {
            continue;
        }
        const p = document.createElement('p');
        // if the last 4 =='DATE' then format the date
        if (key.slice(-4) == 'DATE') {
            p.textContent = key + ': ' + new Date(record[0][key]).toLocaleDateString();
        } else {
            p.textContent = key + ': ' + record[0][key];
        }
        section.appendChild(p);
    }   
    main.appendChild(section);

    // Checklist
    const sectionChecklist = document.createElement('section');
    sectionChecklist.classList.add('checklist');
    const h3 = document.createElement('h3');
    h3.textContent = 'Checklist';
    sectionChecklist.appendChild(h3);
    main.appendChild(sectionChecklist);

    
    // Checklist button
    const btnChecklist = document.createElement('button');
    btnChecklist.textContent = 'Add Checklist';
    btnChecklist.classList.add('btn');
    btnChecklist.classList.add('btn-primary');
    sectionChecklist.appendChild(btnChecklist);
    btnChecklist.addEventListener('click', () => {
        window.location.href = 'checklist.html?id=' + id;
    });

    fetch(checklistUrl + id, { method: 'GET' })
    .then(response => response.json())
    .then(records => {
        console.log(records);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        let checklistFields = ['CHECKLIST_ID', 'STANDARD', 'QUESTION', 'OBSERVATION', 'REFERENCE'];
        
        for (const key in record[0]) {
            if (checklistFields.includes(key)) {
                const th = document.createElement('th');
                th.textContent = key;
                thead.appendChild(th);
            }
        }
        table.appendChild(thead);

        table.appendChild(tbody);
        sectionChecklist.appendChild(table);
    });
    main.appendChild(sectionChecklist);


});                                                                                                                                                               