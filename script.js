document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('dynamic-table');
    const headerRow = document.getElementById('header-row');
    const responseElement = document.getElementById('response');

        fetch('data.json')
        .then(response => response.json())
        .then(data => {
                let n = Object.keys(data).length;
                let m = Object.entries(data[0]).length;
                //console.log(n,m);
                for(let k=1;k<m;k++){
                        const headerCell = document.createElement('th');
                        headerCell.contentEditable = true;
                        headerRow.appendChild(headerCell);
                
                        for (let i = 1; i < table.rows.length; i++) {
                            const newCell = table.rows[i].insertCell();
                            newCell.contentEditable = true;
                
                        } 
                }
                for(let k=1;k<=n;k++){
                    const newRow = table.insertRow();
                    for (let i = 0; i < headerRow.cells.length; i++) {
                        const newCell = newRow.insertCell();
                        newCell.contentEditable = true;
                    }
                }

                   // console.log(Object.entries(data[0])[j][0]);
                   for(let i=0;i<m;i++)
                        table.rows[0].cells[i].appendChild(document.createTextNode(Object.entries(data[0])[i][0]));
                   for(let i=0;i<n;i++){
                        for(let j=0;j<m;j++){
                        table.rows[i+1].cells[j].appendChild(document.createTextNode(Object.entries(data[i])[j][1]));
                        }
                   }
                //console.log(table.rows[0].cells[0]);
        })
        .catch(error => console.error('Eroare la citirea fișierului JSON:', error));


    document.getElementById('add-row').addEventListener('click', function() {
        const newRow = table.insertRow();
        for (let i = 0; i < headerRow.cells.length; i++) {
            const newCell = newRow.insertCell();
            newCell.contentEditable = true;
        }
        //console.log(table.rows[0]);
    });

    document.getElementById('add-column').addEventListener('click', function() {
        const headerCell = document.createElement('th');
        headerCell.contentEditable = true;
        headerRow.appendChild(headerCell);

        for (let i = 1; i < table.rows.length; i++) {
            const newCell = table.rows[i].insertCell();
            newCell.contentEditable = true;

        }
    });

    document.getElementById('delete-row').addEventListener('click', function() {
        if (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
        }
    });

    document.getElementById('delete-column').addEventListener('click', function() {
        if (headerRow.cells.length > 0) {
            const colIndex = headerRow.cells.length - 1;
            headerRow.deleteCell(colIndex);

            for (let i = 1; i < table.rows.length; i++) {
                table.rows[i].deleteCell(colIndex);
            }
        }
    });

    document.getElementById('save-table').addEventListener('click', function() {
        const data = [];
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            const rowData = {};
            for (let j = 0; j < row.cells.length; j++) {
                
                const header = headerRow.cells[j].textContent.trim();
                const cell = row.cells[j].textContent.trim();
                if(cell!="")
                    rowData[header] = cell;
            }
                
                if(rowData!={})
                    data.push(rowData);
        }
        //console.log(Object.entries(data));
        fetch('/reset-json', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            responseElement.textContent = data.message;
        })
        .catch(error => console.error('Eroare:', error));

        fetch('/update-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            responseElement.textContent = data.message;
        })
        .catch(error => console.error('Eroare:', error));
    });

});
