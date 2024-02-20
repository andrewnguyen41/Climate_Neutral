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

// Function to parse CSV text into an array of objects
function parseCSV(text) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line);

  // Check header for expected column names
  const header = lines[0].split(',');
  const expectedHeaders = [
    'Description',
    'Make',
    'Type',
    'Year',
    'Model',
    'Annual VKT',
    'Annual Fuel',
    'Fuel Type',
    'Flex Fuel',
    'Quantity',
  ];
  if (!header.every((column, index) => column === expectedHeaders[index])) {
    showErrorToast(
      'CSV headers does not match the expected format. Please download the template and compare the headers to the uploaded file.',
      8000
    );
    document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner
    return null; // Return an empty array or handle error appropriately
  }

  // Pre-validate all rows before adding to tableData
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    const yearPattern = /^\d{4}$/; // Regex for YYYY format
    const typeOptions = ['Light Duty Truck', 'Car'];
    const fuelTypeOptions = ['Diesel', 'Gasoline', 'E10 Gasoline'];
    const flexFuelOptions = ['Yes', 'No'];

    // Basic data type and constraint checks
    if (
      !typeOptions.includes(row[2]) ||
      !yearPattern.test(row[3]) ||
      isNaN(row[5]) ||
      row[5] < 1 || // VKT
      isNaN(row[6]) ||
      row[6] < 1 || // Annual Fuel
      !fuelTypeOptions.includes(row[7]) ||
      !flexFuelOptions.includes(row[8]) ||
      isNaN(row[9]) ||
      row[9] < 1 ||
      row[9] > 100 // Quantity with max 100 check
    ) {
      showErrorToast(
        `Invalid data found in row ${
          i + 1
        }. Please correct the data and try again.`,
        8000
      );
      document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner
      return null; // Return null to indicate an error
    }
  }

  // If validation passes, proceed to add rows to tableData
  const result = lines.slice(1).map((line) => {
    const row = line.split(',');
    return {
      description: row[0],
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
  });
  return result; // Return the validated and formatted data
}

// Function to handle file input and initiate processing
function handleFile(file) {
  // Check if the uploaded file is a CSV by type
  if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
    showErrorToast('Please upload a CSV file.');
    document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const csvData = parseCSV(text); // parseCSV returns an array of objects

    // Check if adding CSV data exceeds the limit
    if (tableData.length + csvData.length > 15) {
      showErrorToast(
        'Adding this CSV data would exceed the maximum allowed entries of 15. Please reduce the number of rows in your CSV file.',
        8000
      );
      document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner immediately
      return; // Stop further processing
    }

    csvData.forEach((item) => tableData.push(item)); // Merge CSV data into tableData, assuming both are arrays of objects
    localStorage.setItem('vehicleData', JSON.stringify(tableData)); // Update localStorage with the new combined data

    populateTable(); // Populate the table with the data in local storage
    updateNextButtonVisibility(); // Update next button visibility after populating the table

    // Wait for 1 second before hiding the spinner and showing success message
    setTimeout(() => {
      document.getElementById('spinner').setAttribute('hidden', ''); // Hide the spinner
      showSuccessToast('CSV uploaded successfully!');
      document.getElementById('vehicleDataTable').scrollIntoView({
        behavior: 'smooth',
      });
    }, 1000); // 1000 milliseconds = 1 second
  };
  reader.readAsText(file);
}

// Function to add row data and delete link
function addRowData(row, data, index) {
  let cell = row.insertCell(0);
  cell.textContent = index + 1; // Row number

  Object.values(data).forEach((value, index) => {
    cell = row.insertCell(index + 1); // Offset by 1 for row number
    cell.textContent = value;
  });

  // Add edit action
  const editCell = row.insertCell(-1);
  const editLink = document.createElement('a');
  editLink.href = '#';
  editLink.textContent = 'edit';
  editLink.style.color = '#2c71f0';
  editLink.onmouseover = () => (editLink.style.color = 'purple');
  editLink.onmouseout = () => (editLink.style.color = '#2c71f0');
  editLink.onclick = (e) => {
    e.preventDefault(); // Prevent the default anchor action
    editRow(index, e); // Pass the event object to your edit function
  };
  editCell.appendChild(editLink);

  // Add delete action
  const deleteCell = row.insertCell(-1); // Last cell for delete action
  const deleteLink = document.createElement('a');
  deleteLink.href = '#';
  deleteLink.textContent = 'del';
  deleteLink.style.color = '#2c71f0';
  deleteLink.onmouseover = () => (deleteLink.style.color = 'red');
  deleteLink.onmouseout = () => (deleteLink.style.color = '#2c71f0');
  deleteLink.onclick = (e) => {
    e.preventDefault();
    const deleteID = row.rowIndex;
    const rowIndex = row.rowIndex - 1;
    tableData.splice(rowIndex, 1); // Update tableData array
    localStorage.setItem('vehicleData', JSON.stringify(tableData)); // Update localStorage
    populateTable(); // Populate the table with the data in local storage
    showSuccessToast(`Success! Entry ${deleteID} deleted.`);
    updateNextButtonVisibility(); // Update next button visibility after populating the table
  };
  deleteCell.appendChild(deleteLink);
}

function editRow(index, e) {
  // Prevent default action
  e.preventDefault();

  // Retrieve the data for the row to be edited
  const rowData = tableData[index];

  console.log(rowData);

  // Populate the form fields with the row data
  document.getElementById('description').value = rowData.description;
  document.getElementById('make').value = rowData.make;
  document.getElementById('type').value = rowData.type;
  document.getElementById('year').value = rowData.year;
  document.getElementById('model').value = rowData.model;
  document.getElementById('annualVKT').value = rowData.annualVKT;
  document.getElementById('annualFuel').value = rowData.annualFuel;
  document.getElementById('fuelType').value = rowData.fuelType;
  document.getElementById('flexFuel').value = rowData.flexFuel;
  document.getElementById('quantity').value = rowData.quantity;

  // Update the button to indicate an update action
  const addToTableBtn = document.getElementById('addToTableBtn');
  addToTableBtn.textContent = 'Update Entry';
  // Trigger the form's input event to check form validity
  document.getElementById('vehicleDataForm').dispatchEvent(new Event('input'));
  // Set the global variable to the current index
  currentEditingIndex = index;
  // Smoothly scroll to the form section
  document.getElementById('vehicleDataForm').scrollIntoView({
    behavior: 'smooth',
  });
}

// Function to update the Next buttons visibility
function updateNextButtonVisibility() {
  const hasData = tableData.length > 0;
  const storedCoefficient = JSON.parse(
    localStorage.getItem('provincialEmmisionsCoefficientData')
  );
  const settingSelected = !!storedCoefficient && !!storedCoefficient.province;
  // Enable the "Next" button if both conditions are met; otherwise, disable it
  document.getElementById('nextButton').disabled = !(
    hasData && settingSelected
  );
}

// Function for handling the csv upload and download
function csvSection() {
  const csvTemplateContent = `Description,Make,Type,Year,Model,Annual VKT,Annual Fuel,Fuel Type,Flex Fuel,Quantity,\nString,String,String ('Car' or 'Light Duty Truck'),Date (YYYY),String,Number (min: 1),Number (min: 1),String ('Diesel' or 'Gasoline' or 'E10 Gasoline'),String ('Yes' or 'No'),Number (min: 1 | max: 100),The csv validation is case sensitive so please ensure the entered values follow the casing of the samples provided as well as: format - data type - minimum and maximum values. NOTE: Please delete this row (2nd row) before uploading the csv.`;
  const fileInput = document.getElementById('fileInput');
  const dropZone = document.getElementById('dropZone');
  const spinner = document.getElementById('spinner');

  // Setup download link
  document
    .getElementById('downloadCsvTemplate')
    .addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default action

      // Logic to download the CSV template
      const blob = new Blob([csvTemplateContent], {
        type: 'text/csv;charset=utf-8;',
      });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'vehicle_data_template.csv');
      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    });

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
}

// Function for handling the setting for the provincial emissions
function settingsSection() {
  const provinceEmissionsCoefficients = {
    'British Columbia': { consumptionIntensity: 15.0 },
    Alberta: { consumptionIntensity: 540.0 },
    Saskatchewan: { consumptionIntensity: 730.0 },
    Manitoba: { consumptionIntensity: 2.0 },
    Ontario: { consumptionIntensity: 30.0 },
    Quebec: { consumptionIntensity: 1.7 },
    'New Brunswick': { consumptionIntensity: 300.0 },
    'Nova Scotia': { consumptionIntensity: 690.0 },
    'Prince Edward Island': { consumptionIntensity: 300.0 },
    'Newfoundland and Labrador': {
      consumptionIntensity: 17.0,
    },
    Yukon: { consumptionIntensity: 80.0 },
    'Northwest Territories': {
      consumptionIntensity: 170.0,
    },
    Nunavut: { consumptionIntensity: 840.0 },
  };

  const provinceSelect = document.getElementById('provinceSelect');
  const storedCoefficient = JSON.parse(
    localStorage.getItem('provincialEmmisionsCoefficientData')
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

  provinceSelect.addEventListener('change', function () {
    const selectedProvince = this.value;
    const coefficients = provinceEmissionsCoefficients[selectedProvince];

    // Assuming you want to store more than just the coefficient, for reselection
    localStorage.setItem(
      'provincialEmmisionsCoefficientData',
      JSON.stringify({
        province: selectedProvince,
        consumptionIntensity: coefficients?.consumptionIntensity,
      })
    );

    showSuccessToast('Province settings saved successfully!', 1500);

    updateNextButtonVisibility(); // Update next button visibility after changing the setting
  });
}

// Function for handling the form validations and input
function formSection() {
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

  populateTable(); // Populate the table with the data in local storage
  updateNextButtonVisibility(); // Update next button visibility after populating the table

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
      showErrorToast('Maximum of 15 entries reached!');
      return;
    }

    // Capture form data
    const formData = {
      description: document.getElementById('description').value,
      make: document.getElementById('make').value,
      type: document.getElementById('type').value,
      year: document.getElementById('year').value,
      model: document.getElementById('model').value,
      annualVKT: document.getElementById('annualVKT').value,
      annualFuel: document.getElementById('annualFuel').value,
      fuelType: document.getElementById('fuelType').value,
      flexFuel: document.getElementById('flexFuel').value,
      quantity: document.getElementById('quantity').value,
    };

    // Add the captured data to the tableData array and localStorage
    if (currentEditingIndex !== null) {
      tableData[currentEditingIndex] = formData; // Update the existing row in tableData
      showSuccessToast('Success! Edited entry updated in the table.', 4000);
    } else {
      tableData.push(formData);
      showSuccessToast('Success! Entry saved to table.');
    }

    localStorage.setItem('vehicleData', JSON.stringify(tableData));
    populateTable(); // Populate the table with the data in local storage
    updateNextButtonVisibility(); // Update next button visibility after populating the table

    // Reset the form and disable the button
    form.reset();
    addToTableBtn.textContent = 'Add to Table';
    currentEditingIndex = null; // Reset the editing index
    addToTableBtn.disabled = true;
    document.getElementById('vehicleDataTable').scrollIntoView({
      behavior: 'smooth',
    });
  });
}

function initPage() {
  csvSection();
  formSection();
  settingsSection();
}

initPage();

function goNextStep() {
  goNext(1);
}
