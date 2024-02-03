let tableData = JSON.parse(localStorage.getItem('vehicleData')) || [];

const provinceEmmisionsCoeficients = {
  'British Columbia': { marketable: 1966, nonMarketable: 2162 },
  Alberta: { marketable: 1962, nonMarketable: 2109 },
  Saskatchewan: { marketable: 1920, nonMarketable: 2441 },
  Manitoba: { marketable: 1915, nonMarketable: 2401 },
  Ontario: { marketable: 1921, nonMarketable: 2401 },
  Quebec: { marketable: 1926, nonMarketable: null }, // "-" represented as null
  'New Brunswick': { marketable: 1919, nonMarketable: 2401 },
  'Nova Scotia': { marketable: 1919, nonMarketable: 2494 },
  'Prince Edward Island': { marketable: 1919, nonMarketable: null }, // "-" represented as null
  'Newfoundland and Labrador': { marketable: 1919, nonMarketable: 2202 },
  Yukon: { marketable: 1966, nonMarketable: 2401 },
  'Northwest Territories': { marketable: 1966, nonMarketable: 2466 },
  Nunavut: { marketable: 1966, nonMarketable: null }, // "-" represented as null
};

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

// Function to handle file input and initiate processing
function handleFile(file) {
  // Check if the uploaded file is a CSV by type
  if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
    alert('Please upload a CSV file.');
    document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const csvData = parseCSV(text); // parseCSV returns an array of objects
    // Check if adding CSV data exceeds the limit
    if (tableData.length + csvData.length > 15) {
      alert(
        'Adding this CSV data would exceed the maximum allowed entries of 15. Please reduce the number of rows in your CSV file.'
      );
      document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner immediately
      return; // Stop further processing
    }
    // Merge CSV data into tableData, assuming both are arrays of objects
    csvData.forEach((item) => tableData.push(item));
    // Update localStorage with the new combined data
    localStorage.setItem('vehicleData', JSON.stringify(tableData));
    // Repopulate the table with the new data
    populateTable();
    // Update next button visibility after populating the table
    updateNextButtonVisibility();
    // Wait for 1 second before hiding the spinner
    setTimeout(() => {
      document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner
    }, 1000); // 1000 milliseconds = 1 second
  };
  reader.readAsText(file);
}

// Function to parse CSV text into an array of objects
function parseCSV(text) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line);
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    // Start from 1 to skip the header row
    const row = lines[i].split(',');
    const rowData = {
      description: row[0], // Assuming the first column in CSV is not Description but a row number or similar
      make: row[1],
      type: row[2],
      year: row[3],
      model: row[4],
      annualVKT: row[5],
      annualFuel: row[6],
      fuelType: row[7],
      flexFuel: row[8],
      quantity: row[9],
    };
    result.push(rowData);
  }
  return result;
}

// Function to populate the table with data from the CSV
function populateTableWithData(data) {
  const tableBody = document
    .getElementById('vehicleDataTable')
    .getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing table data
  data.forEach((item, index) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = index + 1; // No. column
    Object.values(item).forEach((value) => {
      const cell = row.insertCell();
      cell.textContent = value;
    });
  });
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

function updateNextButtonVisibility() {
  const hasData = tableData.length > 0;
  const storedCoefficient = JSON.parse(
    localStorage.getItem('provincialEmmisionsCoeficientData')
  );
  const settingSelected = !!storedCoefficient && !!storedCoefficient.province;

  // Enable the "Next" button if both conditions are met; otherwise, disable it
  document.getElementById('nextButton').disabled = !(
    hasData && settingSelected
  );
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
    updateNextButtonVisibility();
  };
  deleteCell.appendChild(deleteLink);
}

// Event listener for DOMContentLoaded to setup event listeners for file input
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const dropZone = document.getElementById('dropZone');
  const spinner = document.getElementById('spinner');

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    spinner.removeAttribute('hidden'); // Show the spinner
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]); // Process the first dropped file
    }
  });

  fileInput.addEventListener('change', function () {
    if (this.files.length) {
      spinner.removeAttribute('hidden'); // Show the spinner
      handleFile(this.files[0]); // Process the first selected file
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const provinceSelect = document.getElementById('provinceSelect');
  const storedCoefficient = JSON.parse(
    localStorage.getItem('provincialEmmisionsCoeficientData')
  );

  // Prepopulate the province selection if it exists in localStorage
  if (storedCoefficient) {
    for (const option of provinceSelect.options) {
      if (option.value === storedCoefficient.province) {
        option.selected = true;
        break;
      }
    }
  }

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

  // Call populateTable to populate the table with stored data
  populateTable();
  updateNextButtonVisibility();

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
    updateNextButtonVisibility();

    // Reset the form and disable the button
    form.reset();
    addToTableBtn.disabled = true;
  });

  provinceSelect.addEventListener('change', function () {
    const selectedProvince = this.value;
    const coefficients = provinceEmmisionsCoeficients[selectedProvince];

    // Assuming you want to store more than just the coefficient, for reselection
    localStorage.setItem(
      'provincialEmmisionsCoeficientData',
      JSON.stringify({
        province: selectedProvince,
        marketable: coefficients?.marketable,
      })
    );
    updateNextButtonVisibility(); // Update next button visibility upon changing the setting
  });
});
