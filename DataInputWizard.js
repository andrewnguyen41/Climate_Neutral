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

// document.addEventListener('DOMContentLoaded', () => {
//   // Populate year options
//   const yearSelect = document.getElementById('year');
//   const currentYear = new Date().getFullYear();
//   const placeholderOption = document.createElement('option');
//   placeholderOption.textContent = 'YYYY';
//   placeholderOption.value = '';
//   placeholderOption.disabled = true;
//   placeholderOption.selected = true;
//   yearSelect.appendChild(placeholderOption);

//   for (let year = currentYear; year >= currentYear - 100; year--) {
//     const option = document.createElement('option');
//     option.value = year;
//     option.textContent = year;
//     yearSelect.appendChild(option);
//   }

//   // Enable "Add to Table" button when form is valid
//   const form = document.getElementById('vehicleDataForm');
//   const addToTableBtn = document.getElementById('addToTableBtn');
//   form.addEventListener('input', () => {
//     addToTableBtn.disabled = !form.checkValidity();
//   });

//   // Add data to the table on form submission
//   form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Capture form data
//     const formData = {
//       description: document.getElementById('description').value,
//       make: document.getElementById('make').value,
//       type: document.getElementById('type').value,
//       year: document.getElementById('year').value,
//       model: document.getElementById('model').value,
//       vkt: document.getElementById('vkt').value,
//       fuel: document.getElementById('fuel').value,
//       fuelType: document.getElementById('fuelType').value,
//       flexFuel: document.getElementById('flexFuel').value,
//       quantity: document.getElementById('quantity').value,
//     };

//     console.log(formData);

//     // Insert new row at the end of the table
//     const tableBody = document
//       .getElementById('vehicleDataTable')
//       .getElementsByTagName('tbody')[0];
//     const newRow = tableBody.insertRow();

//     // Fill the row with captured data
//     Object.values(formData).forEach((value, index) => {
//       const cell = newRow.insertCell(index);
//       cell.textContent = value;
//     });

//     // Clear form fields after adding data to the table
//     form.reset();
//     // Manually reset the "Add to Table" button to disabled after form reset
//     addToTableBtn.disabled = true;
//   });
// });

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

  // Enable "Add to Table" button when form is valid
  const form = document.getElementById('vehicleDataForm');
  const addToTableBtn = document.getElementById('addToTableBtn');
  form.addEventListener('input', () => {
    addToTableBtn.disabled = !form.checkValidity();
  });

  // Add data to the table on form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const tableBody = document
      .getElementById('vehicleDataTable')
      .getElementsByTagName('tbody')[0];

    // Check for maximum of 15 rows
    if (tableBody.rows.length >= 15) {
      alert('Maximum of 15 entries reached.');
      return;
    }

    const newRow = tableBody.insertRow(-1); // -1 appends the row at the end of the table body
    const rowCount = tableBody.rows.length; // For row numbering

    // Insert row number and delete link as the first and last cells
    let cell = newRow.insertCell(0);
    cell.textContent = rowCount;

    // Capture form data
    const formData = [
      document.getElementById('description').value,
      document.getElementById('make').value,
      document.getElementById('type').value,
      document.getElementById('year').value,
      document.getElementById('model').value,
      document.getElementById('vkt').value,
      document.getElementById('fuel').value,
      document.getElementById('fuelType').value,
      document.getElementById('flexFuel').value,
      document.getElementById('quantity').value,
    ];

    formData.forEach((value, index) => {
      cell = newRow.insertCell(index + 1); // +1 to account for the row number cell
      cell.textContent = value;
    });

    // Recalculate the numbering
    function recalculateRowNumbers(tableBody) {
      // Iterate over all rows in the table body
      Array.from(tableBody.rows).forEach((row, index) => {
        // Assuming the first cell (index 0) contains the row number
        // Update it to the current index + 1 (to start numbering from 1 instead of 0)
        row.cells[0].textContent = index + 1;
      });
    }

    // Add delete action
    cell = newRow.insertCell(-1); // Adds a cell at the end for the delete action
    const deleteLink = document.createElement('a');
    deleteLink.href = '#';
    deleteLink.textContent = 'del';
    deleteLink.style.color = 'black';
    deleteLink.onmouseover = function () {
      this.style.color = 'red';
    };
    deleteLink.onmouseout = function () {
      this.style.color = 'black';
    };
    deleteLink.onclick = function () {
      tableBody.deleteRow(newRow.rowIndex - 1);
      recalculateRowNumbers(tableBody);
      return false;
    };
    cell.appendChild(deleteLink);

    // Optionally, clear the form fields after adding the data to the table
    form.reset();
    // Manually reset the "Add to Table" button to disabled after form reset
    addToTableBtn.disabled = true;
  });
});
