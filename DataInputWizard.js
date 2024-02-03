let tableData = JSON.parse(localStorage.getItem('vehicleData')) || [];

function adjustLabel(blockId, labelId) {
  var block = document.getElementById(blockId);
  var label = document.getElementById(labelId);
  block.classList.add('active');
  label.classList.add('active');
}

function resetLabel(blockId, labelId) {
  var block = document.getElementById(blockId);
  var label = document.getElementById(labelId);
  block.classList.remove('active');
  label.classList.remove('active');
}

// Function to populate the table from tableData
function populateTable() {
  const tableBody = document
    .getElementById('vehicleDataTable')
    .getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear the table first
  tableData.forEach((data, index) => {
    const row = tableBody.insertRow();
    addRowData(row, data, index);
  });
}

// Function to add row data and delete link
function addRowData(row, data, index) {
  let cell = row.insertCell(0);
  cell.textContent = index + 1; // Row number

  Object.values(data).forEach((value, index) => {
    cell = row.insertCell(index + 1); // Offset by 1 for row number
    cell.textContent = value;
  });

  // Add delete action
  const deleteCell = row.insertCell(-1); // Last cell for delete action
  const deleteLink = document.createElement('a');
  deleteLink.href = '#';
  deleteLink.textContent = 'del';
  deleteLink.style.color = 'black';
  deleteLink.onmouseover = () => (deleteLink.style.color = 'red');
  deleteLink.onmouseout = () => (deleteLink.style.color = 'black');
  deleteLink.onclick = (e) => {
    e.preventDefault();
    const rowIndex = row.rowIndex - 1;
    tableData.splice(rowIndex, 1); // Update tableData array
    localStorage.setItem('vehicleData', JSON.stringify(tableData)); // Update localStorage
    populateTable(); // Repopulate table
    // return false;
  };
  deleteCell.appendChild(deleteLink);
}

document.addEventListener('DOMContentLoaded', () => {
  // Populate year options
  const yearSelect = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  const placeholderOption = document.createElement('option');
  placeholderOption.textContent = 'YYYY'; // Placeholder text
  placeholderOption.value = ''; // No value
  placeholderOption.disabled = true; // Disable selection of the placeholder
  placeholderOption.selected = true; // Make placeholder the default selected option
  yearSelect.appendChild(placeholderOption);

  // Generate year options dynamically
  for (let year = currentYear; year >= currentYear - 100; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  // Load existing table data from localStorage
  //   const tableData = JSON.parse(localStorage.getItem('vehicleData')) || [];

  // Call populateTable to populate the table with stored data
  populateTable();

  // Enable "Add to Table" button when form is valid
  const form = document.getElementById('vehicleDataForm');
  const addToTableBtn = document.getElementById('addToTableBtn');
  form.addEventListener('input', () => {
    addToTableBtn.disabled = !form.checkValidity();
  });

  // Form submission handler
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Check for maximum of 15 rows
    if (tableData.length >= 15) {
      alert('Maximum of 15 entries reached.');
      return;
    }

    // Capture form data
    const formData = {
      description: document.getElementById('description').value,
      make: document.getElementById('make').value,
      type: document.getElementById('type').value,
      year: document.getElementById('year').value,
      model: document.getElementById('model').value,
      vkt: document.getElementById('vkt').value,
      fuel: document.getElementById('fuel').value,
      fuelType: document.getElementById('fuelType').value,
      flexFuel: document.getElementById('flexFuel').value,
      quantity: document.getElementById('quantity').value,
    };

    // Add the captured data to the tableData array and localStorage
    tableData.push(formData);
    localStorage.setItem('vehicleData', JSON.stringify(tableData));

    // Repopulate the table with the updated data
    populateTable();

    // Reset the form and disable the button
    form.reset();
    addToTableBtn.disabled = true;
  });
});
