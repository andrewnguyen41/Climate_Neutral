var vehicles = [];
//var cities = data.slice(0,15)
var cities = [];
//console.log(cities)

var savedGreenOptions =
  JSON.parse(localStorage.getItem('savedGreenOptions')) || {};
var measures = [];
var replacementoption = [];

console.log('savedGreenOptions.keyValuePairs', savedGreenOptions.keyValuePairs);
// Check if savedGreenOptions has the keyValuePairs property
if (savedGreenOptions.keyValuePairs) {
  // Iterate over the keyValuePairs object and push values into the measures array
  Object.keys(savedGreenOptions.keyValuePairs).forEach(function (key) {
    var value = savedGreenOptions.keyValuePairs[key];
    replacementoption.push(key + ' - ' + value);
  });
}

console.log('replacementoption===', replacementoption);
// Populate the dropdown options dynamically
var dropdown = document.querySelector('select[name="sel"]');
//var dropdown = document.querySelector('label[for="greenOptionSelect"]');

// Create and add the initial prompt option
var initialOption = document.createElement('option');
initialOption.textContent = 'Select a replacement option *'; // Set the prompt text
initialOption.value = ''; // Set a blank value or any value that signifies no selection
initialOption.disabled = true; // Make it disabled so it can't be selected
initialOption.selected = true; // Make it selected by default

// Append the initial option to the dropdown
dropdown.appendChild(initialOption);

replacementoption.forEach(function (option) {
  var optionElem = document.createElement('option');
  optionElem.textContent = option;
  optionElem.value = option;
  dropdown.appendChild(optionElem);
});

function writeData() {
  // Get the main div
  let mainDiv = document.getElementById('main');

  // Clear existing elements inside mainDiv
  mainDiv.innerHTML = '';

    // Insert the Category as a heading
    // document.getElementById("cat").innerHTML = "<strong>" + "Replaceable Vehicle Based on Emission Intensity" + "</strong>";
    if(cities.length != 0) {
    // Render the data
    for (let i = 0; i < cities.length; i++) {
        const divWrapper = document.createElement('div');
        divWrapper.style.display = 'flex';
        divWrapper.style.alignItems = 'center';
        divWrapper.style.color = 'white';

        const nameDiv = document.createElement('div');
        nameDiv.id = 'name' + i;
        nameDiv.style.width = '300px';
        nameDiv.style.fontSize = '20px'; // Set the font size
        nameDiv.style.fontWeight = 'bold'; // Set the font weight
        // nameDiv.style.fontStyle = 'italic'; // Set the font style to italic
        nameDiv.style.fontFamily = 'Verdana, sans-serif'; // Change font family to Verdana

    nameDiv.style.color =  '#26b170';
    // nameDiv.style.color = 'white';

    const barDiv = document.createElement('div');
    barDiv.id = 'bar' + i;
    barDiv.className = 'bars';

        // Set the height dynamically
const barHeight = '40px'; // Adjust the height value as needed
barDiv.style.height = barHeight;
// Set rounded corners
const borderRadius = '10px'; // Adjust the border-radius value as needed
barDiv.style.borderRadius = borderRadius;

        const barText = document.createElement('p');
        barText.id = 'bartext' + i;
        barText.className = 'number';
        barText.style.fontSize = '12px'; // Set the font size
        barText.style.fontWeight = 'bold'; // Set the font weight
        barText.style.padding = '10px'; // Add padding of 5 pixels
        barText.style.textAlign = 'center'; // Center the text



    barDiv.appendChild(barText);
    divWrapper.appendChild(nameDiv);
    divWrapper.appendChild(barDiv);
    mainDiv.appendChild(divWrapper);
  }

  // Render the data into the created elements
  for (var i = 0; i < cities.length; i++) {
    document.getElementById('name' + i).innerHTML =
      cities[i].Make + ' ' + cities[i].Model;
    document.getElementById('bartext' + i).innerHTML =
      cities[i]['CO2 emissions (g/km)'];
    document.getElementById('bar' + i).style.width =
      cities[i]['CO2 emissions (g/km)'] + 'px';
    document.getElementById('bar' + i).title =
      cities[i]['CO2 emissions (g/km)'];
  }
} else
    {
        const divWrapper = document.createElement('div');
        divWrapper.style.display = 'flex';
        divWrapper.style.alignItems = 'center';
        divWrapper.style.color = 'white';
        divWrapper.style.width = '300px';
        divWrapper.style.fontSize = '16px'; // Set the font size
// nameDiv.style.fontWeight = 'bold'; // Set the font weight
// nameDiv.style.fontStyle = 'italic'; // Set the font style to italic
        divWrapper.style.fontFamily = 'Verdana, sans-serif'; // Change font family to Verdana


// Insert text content
        const textNode = document.createTextNode('No NA Replacements available ');
        divWrapper.appendChild(textNode);

// Append the divWrapper to your document or another container
// For example:
        mainDiv.appendChild(divWrapper);
    }
  }


// Get the select element
var selectElement = document.getElementById('replacementOptions');
// Function to display a toast message
function showToast(message) {
  // Replace this with your code to display a toast message
  alert(message);
}
// Add event listener for change event
selectElement.addEventListener('change', function () {
  // Check if vehicles array is empty
  if (vehicles.length === 0) {
    // Display a toast message
    showErrorToast(
      'Please upload the replacement options you want to compare with from the Natural Resources Canada website.',
      10000
    );
  }

  // Get the selected option
  var selectedOption = this.options[this.selectedIndex].value;

  console.log('vehicles', vehicles);

  vehiclesCopy = JSON.parse(JSON.stringify(vehicles));

  // Empty the cities array before processing
  cities = [];

  // Filter and process data based on selected option
  if (selectedOption.includes('B20 Diesel Usage')) {
    processOption('D', 10, 'Pickup truck: Standard');
  } else if (selectedOption.includes('Replace w/ EV Vehicle')) {
    processOption('X', 10, 'Mid-size');
  } else if (selectedOption.includes('E85 Ethanol Usage')) {
    processOption('X', 10, 'Compact');
  } else if (selectedOption.includes('Replace w/ EV Car')) {
    processOption('X', 15, 'Mid-size');
  } else if (selectedOption.includes('Replace w/ Biofuel Car E85')) {
    processOption('E', 10, 'Pickup truck: Standard');
  } else if (selectedOption.includes('Replace w/ EV Light Duty Truck')) {
    processOption('X', 10, 'Pickup truck: Standard');
  } else if (
    selectedOption.includes('Replace w/ Biofuel E85 Light Duty Truck')
  ) {
    processOption('E', 15, 'Pickup truck: Standard');
  } else if (selectedOption.includes('Right Size to Car')) {
    processOption('N', 10, 'Pickup truck: Standard');
  } else if (selectedOption.includes('Right Size to Biofuel E85 Car')) {
    processOption('E', 10, 'Pickup truck: Standard');
  } else if (selectedOption.includes('E85 Biofuel Usage')) {
    processOption('E', 10, 'Pickup truck: Standard');
  }
});

// Generic function to filter, sort, and slice data
function processOption(fuelType, topRecords, vehicleClass1, vehicleClass2) {
  console.log('vehicleClass1 , vehicleClass2', vehicleClass1, vehicleClass2);

  // Filter data by fuel type
  // const filteredData = vehiclesCopy.filter(item => item['Fuel type'] === fuelType);
  const filteredData = vehiclesCopy.filter(
    (item) =>
      item['Fuel type'] === fuelType &&
      (item['Vehicle class'] === vehicleClass1 ||
        item['Vehicle class'] === vehicleClass2)
  );

  // Sort filtered data by ascending CO2 emissions
  filteredData.sort(
    (a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']
  );
  console.log('filteredData.length ', filteredData.length);
  // Get the top records or all if less than topRecords
  cities =
    filteredData.length < topRecords
      ? filteredData.slice(0, filteredData.length)
      : filteredData.slice(0, topRecords);

  console.log('cities', cities);

  writeData();
}

function printPage() {
  window.print();
}

function handleClick() {
  alert('You clicked the moving text!');
}

// Function to download CSV file
function downloadCSV() {
  if (cities.length === 0) {
    showErrorToast('Select your replacement option', 8000);
  } else {
    // Extracting the keys from the 0th entry (assuming it's the heading)
    const keys = Object.keys(vehiclesCopy[0]);
    const heading = keys.join(','); // Joining the keys with commas
    // var csvContent = "data:text/csv;charset=utf-8," + convertToCSV(cities);
    // var encodedUri = encodeURI(csvContent);
    // Convert the data to CSV format
    const csvContent = `${heading}\r\n${cities
      .map((item) => keys.map((key) => item[key]).join(','))
      .join('\r\n')}`;

    // Create a data URI for the CSV content
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'NA-ReplacementOptions.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click(); // Trigger the download
  }
}
// Function to convert array of objects to CSV format
function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}
// Event listener for the download button
document.getElementById('downloadBtn').addEventListener('click', downloadCSV);

function selMeasure() {
  startIndex = 15;
  endIndex = 30;
  cities = cities.slice(startIndex, endIndex);
  startIndex += 15;
  endIndex += 15;

  //writeData();
  console.log('Hi');
}

console.log('Before processCSVData, vehicles:', vehicles);
// Function to fetch CSV data asynchronously and populate the vehicles array
function fetchCSVData() {
  return new Promise((resolve, reject) => {
    // Simulate asynchronous operation to fetch CSV data
    setTimeout(() => {
      const csvData = '...'; // fetched CSV data
      const vehicles = parseCSVData(csvData); // Parse CSV data and populate vehicles array
      resolve(vehicles); // Resolve the promise with the populated vehicles array
    }, 1000); // Simulate delay for demonstration purposes (replace with actual asynchronous operation)
  });
}

// Define a function to load CSV data asynchronously
function loadCSVData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
      const csvData = event.target.result;
      resolve(csvData);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}

// Function to process CSV data
function processCSVData(csvData) {
  console.log('inside processCSVData, vehicles:', vehicles);

  // Split CSV data into lines
  const lines = csvData.split('\n');

  // Extract headers and initialize array to hold vehicle data
  const headers = lines[0].split(',');
  // const vehicles = [];

  // Iterate over each line of CSV data
  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const vehicle = {};
      for (let j = 0; j < headers.length; j++) {
        vehicle[headers[j].trim()] = values[j].trim();
      }
      vehicles.push(vehicle);
    }
  }

  // Store vehicle data in local storage
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  console.log('CSV data stored in local storage.', vehicles);
  showSuccessToast('CSV uploaded successfully!');
  // vehiclesCopy = JSON.parse(JSON.stringify(vehicles));

  // Call a function to perform actions that depend on vehicles data
  handleVehicleData(vehicles);
}

function handleVehicleData(vehicles) {
  // Add your code here to perform actions based on the vehicles data
  console.log('Handling vehicle data:', vehicles);
}
// Function to handle file upload
function handleUpload() {
  const fileInput = document.getElementById('csvFileInput');
  const file = fileInput.files[0];
  if (file) {
    // Load CSV data asynchronously
    loadCSVData(file)
      .then((csvData) => {
        processCSVData(csvData); // Process CSV data after it's loaded
      })
      .catch((error) => {
        console.error('Error loading CSV data:', error);
        showErrorToast('Error loading CSV data. Please try again.', 8000);
      });
  } else {
    showErrorToast('Please select a file to upload.', 8000);
  }
}

// JQuery function for tool tip
$(document).ready(function () {
  $('[title]').tooltip();
});

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

