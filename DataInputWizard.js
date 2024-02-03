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
  const yearSelect = document.getElementById('year');
  const currentYear = new Date().getFullYear();

  // Create and append the placeholder option
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
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('vehicleDataForm');
  form.addEventListener('input', () => {
    // Check if all required fields are filled
    const isValid = form.checkValidity();
    document.getElementById('addToTableBtn').disabled = !isValid;
  });
});
