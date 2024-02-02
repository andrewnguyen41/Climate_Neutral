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
