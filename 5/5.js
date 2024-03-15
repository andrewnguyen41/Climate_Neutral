var vehicles = [];

//var cities = data.slice(0,15)
var cities = [];
//console.log(cities)

var savedGreenOptions = JSON.parse(localStorage.getItem('savedGreenOptions')) || {};
var measures = [];
var replacementoption = [];



console.log("savedGreenOptions.keyValuePairs", savedGreenOptions.keyValuePairs);
// Check if savedGreenOptions has the keyValuePairs property
if (savedGreenOptions.keyValuePairs) {
    // Iterate over the keyValuePairs object and push values into the measures array
    Object.keys(savedGreenOptions.keyValuePairs).forEach(function(key) {
        var value = savedGreenOptions.keyValuePairs[key];
        replacementoption.push(key+" - "+value);
    });
}


console.log("replacementoption===", replacementoption);
// Populate the dropdown options dynamically
 var dropdown = document.querySelector('select[name="sel"]');
//var dropdown = document.querySelector('label[for="greenOptionSelect"]');
replacementoption.forEach(function(option) {
  var optionElem = document.createElement('option');
  optionElem.textContent = option;
  optionElem.value = option;
  dropdown.appendChild(optionElem);
});

const mainDiv = document.getElementById('main');
// this area inserts the Category as a heading and writes the data
if(cities.length === 0) {
    console.log("cities is null");
    document.getElementById("cat").innerHTML = "<strong>" + "No data to show for Replaceable Vehicle Based on emission Intensity " + "</strong>";
}
else if(cities.length > 0) {
    console.log("cities is not null");

    document.getElementById("cat").innerHTML = "<strong>" + "Replaceable Vehicle Based on emission Intensity " + "</strong>";
}
    // function that writes the data to the chart. Only  need to write name and tip once.
    function writeData() {
        // document.getElementById("cat").innerHTML = "<strong>" + "Replaceable Vehicle Based on emission Intensity" + "</strong>";

       // Remove all existing elements inside the mainDiv
    mainDiv.innerHTML = '';
   
// this area inserts the Category as a heading and writes the data
   

    for (let i = 0; i < cities.length; i++) {
        const divWrapper = document.createElement('div');
        divWrapper.style.display = 'flex';
        divWrapper.style.alignItems = 'center';
        divWrapper.style.color = 'white';

        const nameDiv = document.createElement('div');
        nameDiv.id = 'name' + i;
        nameDiv.style.width = '300px';
        nameDiv.style.color = '#000';

        const barDiv = document.createElement('div');
        barDiv.id = 'bar' + i;
        barDiv.className = 'bars';

        const barText = document.createElement('p');
        barText.id = 'bartext' + i;
        barText.className = 'number';

        barDiv.appendChild(barText);
        divWrapper.appendChild(nameDiv);
        divWrapper.appendChild(barDiv);
        mainDiv.appendChild(divWrapper);
    }

        for (var i = 0; i < cities.length; i++) {//sUGGESTING 10 REPLACEMENT OPTIONS
            
            document.getElementById("name" + (i)).innerHTML = cities[i].Make + cities[i].Model;
            document.getElementById("bartext" + (i)).innerHTML = cities[i]["CO2 emissions"];
            document.getElementById("bar" + (i)).style.width = cities[i]["CO2 emissions"] + "px";
            document.getElementById("bar" + (i)).title = cities[i]["CO2 emissions (g/km)"];
        }
    };
     //writeData();


    // Get the select element
var selectElement = document.getElementById('replacementOptions');
// Function to display a toast message
function showToast(message) {
    // Replace this with your code to display a toast message
    alert(message);
}
// Add event listener for change event
selectElement.addEventListener('change', function() {

    //   // Check if vehicles array is empty
      if (vehicles.length === 0) {
        // Display a toast message
        //showToast("Please upload  the replacementoptions you want to pick from the Natural REsources Canada website.");
        showErrorToast(
            'Please upload  the replacementoptions you want to compare with from the Natural Resources Canada website.',
            8000
          );
    }
    // Get the selected option
    var selectedOption = this.options[this.selectedIndex].value;

    console.log("vehicles", vehicles);

    vehiclesCopy = JSON.parse(JSON.stringify(vehicles));

    // Check if the selected option contains the sample text
    if (selectedOption.includes("B20 Diesel Usage")) {
        console.log("B20 Diesel Usage-----new");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'D');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
cities = [];
// Get the top 10 records
cities = filteredData.slice(0, 10);

console.log("cities", cities);

writeData();

        // Do something if the selected option contains the sample text
    } else if (selectedOption.includes("Replace w/ EV Vehicle")) {
        console.log("Replace w/ EV Vehicle");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'E');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
cities = [];
// Get the top 10 records
cities = filteredData.slice(0, 10);

console.log("cities", cities);

writeData();
        // Do something if the selected option does not contain the sample text
    }else if (selectedOption.includes("E85 Ethanol Usage")) {
        console.log("E85 Ethanol Usage");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'E');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
cities = [];
// Get the top 10 records
cities = filteredData.slice(0, 10);

console.log("cities", cities);

writeData();
        // Do something if the selected option does not contain the sample text
    }else if (selectedOption.includes("Replace w/ EV Car")) {
        console.log("E85 Ethanol Usage");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'E');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
console.log("filteredData.length" , filteredData.length);

cities = [];
// Get the top 10 records
cities = filteredData.slice(0, 10);

console.log("cities", cities);

writeData();
        // Do something if the selected option does not contain the sample text
    }else if (selectedOption.includes("Replace w/ Biofuel Car E85")) {
        console.log("E85 Ethanol Usage");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'E');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
console.log("filteredData.length" , filteredData.length);

cities = [];
// Get the top 10 records
cities = filteredData.slice(0, 10);

console.log("cities", cities);

writeData();
        // Do something if the selected option does not contain the sample text
    }else if (selectedOption.includes("Replace w/ EV Light Duty Truck")) {
        console.log("E85 Ethanol Usage");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'D');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
cities = [];
// Get the top 10 records
cities = filteredData.slice(0, 10);

console.log("cities", cities);

writeData();
        // Do something if the selected option does not contain the sample text
    }else if (selectedOption.includes("Replace w/ Biofuel E85 Light Duty Truck")) {
        console.log("E85 Ethanol Usage");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'E');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
console.log("filteredData.length" , filteredData.length);

cities = [];
// Get the top 10 records
var len = 10;
if(filteredData.length < len)
    cities = filteredData.slice(0, filteredData.length);
    else
    cities = filteredData.slice(0, len);

console.log("cities", cities);

writeData();
        // Do something if the selected option does not contain the sample text
    }else if (selectedOption.includes("Right Size to Car")) {
        console.log("E85 Ethanol Usage");
        console.log("vehiclesCopy", vehicles);

        // Assuming data contains the CSV data
// Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
const filteredData = vehicles.filter(item => item['Fuel type'] === 'X');

// Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);
cities = [];
// Get the top 10 records
console.log("filteredData.length" , filteredData.length);
cities = filteredData.slice(0, 10);

console.log("cities", cities);

writeData();
        // Do something if the selected option does not contain the sample text
    }
});

function selMeasure() {
  
    startIndex = 15;
    endIndex = 30;
    cities = cities.slice(startIndex,endIndex)
    startIndex += 15;
    endIndex += 15;

    //writeData();
    console.log("Hi")
}
// function calculateReplacementOptions() {
//     // Assuming data contains the CSV data
// // Filter data by fuel type 'D' (assuming it's the column 'Fuel type')
// console.log("vehiclesCopy", vehiclesCopy);
// const filteredData = vehiclesCopy.filter(item => item['Fuel type'] === 'D');

// // Sort filtered data by ascending CO2 emissions (assuming it's the column 'CO2 emissions (g/km)')
// filteredData.sort((a, b) => a['CO2 emissions (g/km)'] - b['CO2 emissions (g/km)']);

// // Get the top 10 records
// const top10 = filteredData.slice(0, 10);

// console.log(top10);

// }
console.log("Before processCSVData, vehicles:", vehicles);
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
// // Function to process CSV data
// function processCSVData(csvData) {
//     console.log("inside processCSVData, vehicles:", vehicles);

//     // Split CSV data into lines
//     const lines = csvData.split('\n');
    
//     // Extract headers and initialize array to hold vehicle data
//     const headers = lines[0].split(',');
//    // const vehicles = [];

//     // Iterate over each line of CSV data
//     for (let i = 1; i < lines.length; i++) {
//         const values = lines[i].split(',');
//         if (values.length === headers.length) {
//             const vehicle = {};
//             for (let j = 0; j < headers.length; j++) {
//                 vehicle[headers[j].trim()] = values[j].trim();
//             }
//             vehicles.push(vehicle);
//         }
//     }

//     // Store vehicle data in local storage
//     localStorage.setItem('vehicles', JSON.stringify(vehicles));
//     console.log('CSV data stored in local storage.', vehicles);
//     showSuccessToast('CSV uploaded successfully!');
//     // vehiclesCopy = JSON.parse(JSON.stringify(vehicles));

//     // Call a function to perform actions that depend on vehicles data
//     handleVehicleData(vehicles);
// }

// // Function to handle actions that depend on vehicles data
// function handleVehicleData(vehicles) {
//     // Add your code here to perform actions based on the vehicles data
//     console.log('Handling vehicle data:', vehicles);
// }

// // Function to handle file upload
// function handleUpload() {
//     const fileInput = document.getElementById('csvFileInput');
//     const file = fileInput.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.readAsText(file);
//         reader.onload = function(event) {
//             const csvData = event.target.result;
//             processCSVData(csvData);
//         }
//     } else {
       
//         showErrorToast(
//             'Please select a file to upload.',
//             8000
//           );
//     }
// }

// Define a function to load CSV data asynchronously
function loadCSVData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            const csvData = event.target.result;
            resolve(csvData);
        };
        reader.onerror = function(error) {
            reject(error);
        };
    });
}

// Function to process CSV data
function processCSVData(csvData) {
    console.log("inside processCSVData, vehicles:", vehicles);

    // Split CSV data into lines
    const lines = csvData.split('\n');
    
    // Extract headers and initialize array to hold vehicle data
    const headers = lines[0].split(',');
   // const vehicles = [];

    // Iterate over each line of CSV data
    for (let i = 1; i < lines.length; i++) {
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
                showErrorToast(
                    'Error loading CSV data. Please try again.',
                    8000
                );
            });
    } else {
        showErrorToast(
            'Please select a file to upload.',
            8000
        );
    }
}


    // JQuery function for tool tip
    $(document).ready(function () {
        $("[title]").tooltip();
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
    