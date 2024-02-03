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

document.addEventListener('DOMContentLoaded', () => {
  // Populate year options
  const yearSelect = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  const placeholderOption = document.createElement('option');
  placeholderOption.textContent = 'YYYY';
  placeholderOption.value = '';
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  yearSelect.appendChild(placeholderOption);

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

    console.log(formData);

    // Insert new row at the end of the table
    const tableBody = document
      .getElementById('vehicleDataTable')
      .getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();

    // Fill the row with captured data
    Object.values(formData).forEach((value, index) => {
      const cell = newRow.insertCell(index);
      cell.textContent = value;
    });

    // Clear form fields after adding data to the table
    form.reset();
    // Manually reset the "Add to Table" button to disabled after form reset
    addToTableBtn.disabled = true;
  });
});
