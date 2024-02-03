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
//   const yearSelect = document.getElementById('year');
//   const currentYear = new Date().getFullYear();
//   for (let year = currentYear; year >= currentYear - 100; year--) {
//     const option = document.createElement('option');
//     option.value = year;
//     option.textContent = year;
//     yearSelect.appendChild(option); // This line adds each new option to the select element
//   }
// });

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

// function toggleInputVisibility() {
//   var input = document.getElementById('type');
//   if (input.style.display === 'none' || input.style.display === '') {
//     input.style.display = 'block'; // Show the input
//     input.focus(); // Optionally, immediately focus the input
//   } else {
//     input.style.display = 'none'; // Hide the input
//   }
// }
// function toggleInputVisibility(event) {
//   var input = document.getElementById('type');
//   if (input.style.display === 'none' || input.style.display === '') {
//     input.style.display = 'block'; // Show the input
//     // Use setTimeout to ensure the focus call happens after the current call stack clears
//     setTimeout(() => input.focus(), 0);
//   } else {
//     input.style.display = 'none';
//   }

//   // Optional: Prevent event from bubbling up
//   if (event) {
//     event.stopPropagation();
//   }
// }
