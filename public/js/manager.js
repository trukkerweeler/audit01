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

    // Checklist row div
    const divChecklistRow = document.createElement('div');
    divChecklistRow.classList.add('checklist-row');

    fetch(managerUrl + id, { method: 'GET' })
    .then(response => response.json())
    .then(records => {
        console.log(records);    
        
        let checklistFields = ['CHECKLIST_ID', 'STANDARD', 'QUESTION', 'OBSERVATION', 'REFERENCE'];
        
        for (const row in records) {
            console.log(records[row]);
            
            for (const key in records[row]) {
                // console.log(key);
                if (checklistFields.includes(key)) {
                    const divcklst = document.createElement('div');
                    // console.log(key);
                    // divcklst.classList.add('checklist');
                    switch (key) {
                        case 'CHECKLIST_ID':
                            divcklst.id = 'checklist_id';
                            divcklst.textContent = key + ': ' + records[row][key];
                            sectionChecklist.appendChild(divcklst);
                            break;
                        case 'STANDARD':
                            divcklst.id = 'standard';
                            divcklst.textContent = key + ': ' + records[row][key];
                            sectionChecklist.appendChild(divcklst);
                            // Add sibling br to divcklst
                            const br = document.createElement('br');
                            divChecklistRow.appendChild(br);
                            break;
                        case 'QUESTION':
                            divcklst.id = 'question';
                            divcklst.textContent = key + ': ' + records[row][key];
                            sectionChecklist.appendChild(divcklst);
                            break;
                        case 'OBSERVATION':
                            divcklst.id = 'observation';
                            divcklst.textContent = key + ': ' + records[row][key];
                            sectionChecklist.appendChild(divcklst);
                            break;
                        case 'REFERENCE':
                            divcklst.id = 'reference';
                            divcklst.textContent = key + ': ' + records[row][key];
                            sectionChecklist.appendChild(divcklst);
                            
                            break;
                        default:
                            // break;
                            continue;
                            
                        }

                        console.log(divcklst);
                        divcklst.textContent = key + ': ' + records[row][key];
                        divChecklistRow.appendChild(divcklst);
                    }
            }
        }
    });
    sectionChecklist.appendChild(divChecklistRow);
    main.appendChild(sectionChecklist);


});                                                                                                                                                               