let tableData = JSON.parse(localStorage.getItem('vehicleData')) || []; //Do not delete, needed for component 1 populate table functionality
let currentEditingIndex = null; //Do not delete, needed for component 1 edit functionality

function showSuccessToast(message, timeout = 3000) {
  const toast = document.createElement('div');
  toast.classList.add('toast', 'toast-success');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, timeout); // Display the toast for 1.5 seconds
}

function showErrorToast(message, timeout = 3000) {
  const toast = document.createElement('div');
  toast.classList.add('toast', 'toast-error');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, timeout); // Display the toast for 1.5 seconds
}

function setActiveLink(step) {
  var links = document.querySelectorAll('#steps li');
  links.forEach(function (link, index) {
    if (step == link.getAttribute('id')) {
      link.classList.add('active');
      link.classList.remove('completed');
    } else if (parseInt(step) > index + 1) {
      link.classList.add('completed');
      link.classList.remove('active');
    } else {
      link.classList.remove('active', 'completed');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Load home page by default
  loadPage('1');

  // // Add event listeners to navigation links
  // document.querySelectorAll('nav li').forEach(function(link) {
  //     link.addEventListener('click', function(event) {
  //         event.preventDefault();
  //         // Load the page corresponding to the link's href
  //         loadPage(link.getAttribute('id').substring(1));
  //     });
  // });
});

function getJsFilePathByStep(step) {
  return '/' + step + '/' + step + '.js';
}

function loadPage(step) {
  // Fetch the HTML content of the page
  setActiveLink(step);
  fetch('/' + step + '/' + step + '.html')
    .then((response) => response.text())
    .then((html) => {
      // Replace the content of the main section with the loaded HTML
      document.getElementById('mainContent').innerHTML = html;
      var script = document.createElement('script');
      script.src = getJsFilePathByStep(step);
      document.head.appendChild(script);

      history.pushState({ page: step }, document.title, '#' + step);
    })
    .catch((error) => console.error('Error loading page:', error));
}

function removeCurrScript(currStep) {
  var scriptToRemove = document.querySelector(
    'script[src="' + getJsFilePathByStep(currStep) + '"]'
  );
  if (scriptToRemove) {
    // Remove the script element from the document head
    document.head.removeChild(scriptToRemove);
  } else {
    console.log('Script not found in document head.');
  }
}

function goNext(currStep) {
  removeCurrScript(currStep);
  loadPage(currStep + 1);
}

function goBack(currStep) {
  removeCurrScript(currStep);
  loadPage(currStep - 1);
}

// Initial call to set active link based on current hash
setActiveLink();

// Listen for hashchange event to update active link dynamically
// window.addEventListener('hashchange', setActiveLink);
// window.addEventListener(
//     "hashchange",
//     () => {
//       console.log("The hash has changed!");
//     },
//     false,
//   );


// Get all image containers
const imageContainers = document.querySelectorAll('.image-container');
let currentIndex = 0;

// Function to show next image
function showNextImage() {
    // Hide current image
    imageContainers[currentIndex].style.display = 'none';
    // Increment index or reset to 0 if at the end
    currentIndex = (currentIndex + 1) % imageContainers.length;
    // Show next image
    imageContainers[currentIndex].style.display = 'block';
}

// Show first image initially
imageContainers[currentIndex].style.display = 'block';

// Set interval to switch images every 10 seconds
setInterval(showNextImage, 10000);
