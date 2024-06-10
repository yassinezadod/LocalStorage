function handleSubmit() {
    const nom = document.getElementById('nom').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const ville = document.getElementById('ville').value;

    const person = {
        name: nom,
        age: age,
        gender: gender,
        city: ville
    };

    // Generate a unique key using timestamp
    const personKey = `person_${new Date().getTime()}`;
    const personString = JSON.stringify(person);
    console.log(personString);
    localStorage.setItem(personKey, personString);

    // Redirect to the tableau.html page
    window.location.href = 'tableau.html';
}

function updateTable() {
    // Find the table body
    const tableBody = document.querySelector('#dataTable tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through all items in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('person_')) {
            const personString = localStorage.getItem(key);
            const person = JSON.parse(personString);

            // Create a new row and cells
            const newRow = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = person.name;
            newRow.appendChild(nameCell);

            const ageCell = document.createElement('td');
            ageCell.textContent = person.age;
            newRow.appendChild(ageCell);

            const genderCell = document.createElement('td');
            genderCell.textContent = person.gender;
            newRow.appendChild(genderCell);

            const cityCell = document.createElement('td');
            cityCell.textContent = person.city;
            newRow.appendChild(cityCell);

            // Append the new row to the table body
            tableBody.appendChild(newRow);

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'btn btn-danger';
            deleteButton.onclick = function() {
                deleteEntry(key);
            };
            deleteCell.appendChild(deleteButton);
            newRow.appendChild(deleteCell);

            // Append the new row to the table body
            tableBody.appendChild(newRow);

        }
    }
}



function deleteEntry(key) {
    // Remove the item from localStorage
    localStorage.removeItem(key);

    // Update the table
    updateTable();
}


function searchByGender(event) {
    if (event.key === 'Enter') {
        const searchValue = document.getElementById('genderSearch').value.toLowerCase();
        const tableRows = document.querySelectorAll('#dataTable tbody tr');
        tableRows.forEach(row => {
            const gender = row.children[2].textContent.toLowerCase();
            if (gender.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
}



function goBack() {
    window.location.href = 'page.html';
}

// Load the data into the table when the page loads
window.onload = updateTable;
