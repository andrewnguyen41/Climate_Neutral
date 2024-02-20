// // Retrieve the data from localStorage
var vehicleData = JSON.parse(localStorage.getItem('vehicleData'));

if (vehicleData) {
    var formattedDataContainer = document.getElementById('formattedDataContainer');

    // Function to generate dropdown options based on the provided conditions
function generateGreenOptions(type, flexFuel, fuelType) {
    let greenOptions = [];

    // Check conditions and assign options accordingly
    if (type === 'Car' && flexFuel === 'Yes' && fuelType === 'Gasoline') {
        greenOptions = ['Replace w/ EV Vehicle', 'E85 Ethanol Usage'];
    }
    if (type === 'Car' && flexFuel === 'No' && fuelType === 'Gasoline') {
        greenOptions = ['Replace w/ EV Car', 'Replace w/ Biofuel Car E85'];
    }
    if (type === 'Light Duty Truck' && flexFuel === 'No' && fuelType === 'Gasoline') {
        greenOptions = ['Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel Car'];
    }
    if (type === 'Light Duty Truck' && flexFuel === 'Yes' && fuelType === 'Gasoline') {
        greenOptions = ['E85 Biofuel Usage', 'Replace w/ EV Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel Car'];
    }
    if (type === 'Light Duty Truck' && flexFuel === 'No' && fuelType === 'Diesel') {
        greenOptions = ['Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel E85 Car'];
    }
    if (type === 'Light Duty Truck' && flexFuel === 'Yes' && fuelType === 'Diesel') {
        greenOptions = ['B20 Diesel Usage', 'Replace w/ EV Light Duty Truck', 'Replace w/ Biofuel E85 Light Duty Truck', 'Right Size to Car', 'Right Size to Biofuel E85 Car'];
    }

    return greenOptions;
}

    // Loop through each row in the vehicleData
    vehicleData.forEach(function(item, index) {
        // Extract required properties and format them into a single string
        var formattedData = `${item.description}-${item.type}-${item.year}-${item.make}-${item.model}`;
        
        // Generate dropdown options based on the formatted data
        const greenOptions = generateGreenOptions(item.type, item.flexFuel, item.fuelType);

        // Create a new row div
        var rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        // Create a column for formatted data
        var formattedDataColumnDiv = document.createElement('div');
        formattedDataColumnDiv.classList.add('column');
        var formattedDataLabel = document.createElement('label');
        formattedDataLabel.setAttribute('for', 'dropdown');
        formattedDataLabel.textContent = formattedData;
        formattedDataColumnDiv.appendChild(formattedDataLabel);

        // Create a column for dropdown
        var dropdownColumnDiv = document.createElement('div');
        dropdownColumnDiv.classList.add('column');
        var dropdownSelect = document.createElement('select');
        dropdownSelect.setAttribute('id', `dropdown${index + 1}`);

        // Append dropdown options
        greenOptions.forEach(option => {
            var optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            dropdownSelect.appendChild(optionElement);
        });

        dropdownColumnDiv.appendChild(dropdownSelect);

        // Append the columns to the row
        rowDiv.appendChild(formattedDataColumnDiv);
        rowDiv.appendChild(dropdownColumnDiv);

        // Append the row to the container
        formattedDataContainer.appendChild(rowDiv);
    });
} 
else {
    console.log('No vehicle data found in localStorage.');
}
