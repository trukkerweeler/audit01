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

    const fieldList = ['AUDIT_ID', 'AUDIT_MANAGER_ID', 'STANDARD', 'SUBJECT', 'SCHEDULED_DATE', 'LEAD_AUDITOR', 'AUDITEE1'];
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
    btnChecklist.textContent = 'Add Question';
    btnChecklist.classList.add('btn');
    btnChecklist.classList.add('btn-primary');
    btnChecklist.id = 'btnAddQust';
    sectionChecklist.appendChild(btnChecklist);
    // btnChecklist.addEventListener('click', () => {
    //     window.location.href = 'checklist.html?id=' + id;
    // });

    fetch(managerUrl + id, { method: 'GET' })
    .then(response => response.json())
    .then(records => {
        // console.log(records);    
        
        let checklistFields = ['CHECKLIST_ID', 'STANDARD', 'QUESTION', 'OBSERVATION', 'REFERENCE'];
        
        for (const row in records) {
            // console.log(records[row]);
            // for every row we want a div
            const rowdiv = document.createElement('div');
            rowdiv.classList.add('rowdiv');
            
            for (const key in records[row]) {
                // console.log(key);
                if (checklistFields.includes(key)) {
                    const divcklst = document.createElement('div');
                    // console.log(key);
                    // divcklst.classList.add('checklist');
                    switch (key) {
                        case 'CHECKLIST_ID':
                            const pcklst = document.createElement('p');
                            pcklst.id = 'checklist_id';
                            pcklst.classList.add('chkdet');
                            pcklst.textContent = "Checklist Id: " + records[row][key];
                            rowdiv.appendChild(pcklst);
                            break;
                        case 'STANDARD':
                            const scklst = document.createElement('p');
                            scklst.id = 'standard';
                            scklst.classList.add('chkdet');
                            scklst.textContent = "Standard: " + records[row][key];
                            rowdiv.appendChild(scklst);
                            break;
                        case 'QUESTION':
                            const qcklst = document.createElement('p');
                            qcklst.id = 'question';
                            qcklst.textContent = key + ': ' + records[row][key];
                            rowdiv.appendChild(qcklst);
                            break;
                        case 'OBSERVATION':
                            const ocklst = document.createElement('p');
                            ocklst.id = 'observation';
                            // Set to zls if null
                            if (records[row][key] == null) {
                                records[row][key] = '';
                            }
                            ocklst.textContent = key + ': ' + records[row][key];
                            rowdiv.appendChild(ocklst);
                            break;
                        case 'REFERENCE':
                            const rcklst = document.createElement('p');
                            rcklst.id = 'reference';
                            rcklst.classList.add('chkdet');
                            // Set to zls if null
                            if (records[row][key] == null) {
                                records[row][key] = '';
                            }
                            rcklst.textContent = "Ref." + ': ' + records[row][key];
                            rowdiv.appendChild(rcklst);
                            break;
                        default:
                            // break;
                            continue;
                            
                        }

                        // console.log(divcklst);
                        divcklst.textContent = key + ': ' + records[row][key];
                        // divChecklistRow.appendChild(divcklst);
                    }
            }
            sectionChecklist.appendChild(rowdiv);
        }
    });
    // sectionChecklist.appendChild(divChecklistRow);
    main.appendChild(sectionChecklist);
    
    const btnAddQust = document.getElementById('btnAddQust');
    btnAddQust.addEventListener('click', async (e) => {
        // prevent default
        e.preventDefault();
        // get the dialog from the html
        const addQdialog = document.querySelector('#addquestion');
        // show the dialog
        addQdialog.showModal();
    });
});