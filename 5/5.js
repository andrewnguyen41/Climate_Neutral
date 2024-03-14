//object to hold data
    var cities = [
        { name: "Honda Accord", population: 842, units: 354, households: 322, tip: "live music capital" },
        { name: "Toyota Corolla", population: 777, units: 291, households: 257, tip: "near Dallas" },
        { name: "Honda Civic", population: 236, units: 95, households: 86, tip: "TX Tech" }
    ];
    //array to hold names of different measures. Must match values in form
    // var measures = ["Replacement opt 1", "Replacement opt 2", "Replacement opt 3"];
    // Retrieve the measures array from localStorage
// var savedGreenOptions = JSON.parse(localStorage.getItem('savedGreenOptions')) || {};
// var measures = Object.values(savedGreenOptions);

var savedGreenOptions = JSON.parse(localStorage.getItem('savedGreenOptions')) || {};
var measures = [];

// Create a set to keep track of encountered keys
var encounteredKeys = new Set();

// Object.keys(savedGreenOptions).forEach(function(key) {
//     // Extract the label ID from the key
//     var labelId = key.replace('greenOptionSelect', 'greenLabel');
//     console.log("labelId", labelId);

//     // Check if the labelId exists in savedGreenOptions
//     if (savedGreenOptions[labelId]) {
//         // Check if the key has already been encountered
//         if (!encounteredKeys.has(labelId)) {
//             // If not encountered, add the key to the set and push the labelValue to measures array
//             encounteredKeys.add(labelId);
//             var labelValue = savedGreenOptions[labelId];
//             console.log("labelValue--",labelValue);
//             measures.push(labelValue);
//         }
//     }
// });

console.log("savedGreenOptions.keyValuePairs", savedGreenOptions.keyValuePairs);
// Check if savedGreenOptions has the keyValuePairs property
if (savedGreenOptions.keyValuePairs) {
    // Iterate over the keyValuePairs object and push values into the measures array
    Object.keys(savedGreenOptions.keyValuePairs).forEach(function(key) {
        var value = savedGreenOptions.keyValuePairs[key];
        measures.push(value);
    });
}


console.log("measures1===", measures);
// Populate the dropdown options dynamically
 var dropdown = document.querySelector('select[name="sel"]');
//var dropdown = document.querySelector('label[for="greenOptionSelect"]');
console.log(dropdown);
measures.forEach(function(option) {
  var optionElem = document.createElement('option');
  optionElem.textContent = option;
  optionElem.value = option;
  dropdown.appendChild(optionElem);
});
    // function that writes the data to the chart. Only  need to write name and tip once.
    function writeData() {
        for (var i = 0; i < cities.length; i++) {
            document.getElementById("name" + (i)).innerHTML = cities[i].name;
            document.getElementById("bartext" + (i)).innerHTML = cities[i].population;
            document.getElementById("bar" + (i)).style.width = cities[i].population + "px";
            document.getElementById("bar" + (i)).title = cities[i].tip;
        }
    };
    // this area inserts the Category as a heading and writes the data
    document.getElementById("cat").innerHTML = "<strong>" + measures[0] + "</strong>";
    writeData();
    // function to change based on dropdown
    // function selMeasure() {
    //     var m = document.form1.sel.value;
    //     if (m == measures[0]) {
    //         document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
    //         writeData();

    //     } // end if
    //     else if (m == measures[1]) {
    //         document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
    //         for (var i = 0; i < 3; i++) {
    //             document.getElementById("bartext" + (i)).innerHTML = cities[i].households;
    //             document.getElementById("bar" + (i)).style.width = cities[i].households + "px";

    //         };
    //     }
    //     else if (m == measures[2]) {
    //         document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
    //         for (var i = 0; i < 3; i++) {
    //             document.getElementById("bartext" + (i)).innerHTML = cities[i].units;
    //             document.getElementById("bar" + (i)).style.width = cities[i].units + "px";

    //         };
    //     }
    // }


    // function to change based on dropdown
function selMeasure() {
    var m = document.form1.sel.value;
    var selectedIndex = measures.indexOf(m);

    if (selectedIndex !== -1) {
        document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
        writeData();

        if (selectedIndex === 1) {
            for (var i = 0; i < 3; i++) {
                document.getElementById("bartext" + (i)).innerHTML = cities[i].households;
                document.getElementById("bar" + (i)).style.width = cities[i].households + "px";
            };
        } else if (selectedIndex === 2) {
            for (var i = 0; i < 3; i++) {
                document.getElementById("bartext" + (i)).innerHTML = cities[i].units;
                document.getElementById("bar" + (i)).style.width = cities[i].units + "px";
            };
        }
    }
}

function handleUpload() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            const csvData = event.target.result;
            processCSVData(csvData);
        }
    } else {
        alert('Please select a file to upload.');
    }
}

function processCSVData(csvData) {
    // Split CSV data into lines
    const lines = csvData.split('\n');

    // Extract headers
    const headers = lines[0].split(',');

    // Initialize array to hold vehicle data
    const vehicles = [];

    // Start from index 1 to skip headers
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
}

    // JQuery function for tool tip
    $(document).ready(function () {
        $("[title]").tooltip();
    });