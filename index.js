let tableData = JSON.parse(localStorage.getItem('vehicleData')) || []; //Do not delete, needed for component 1 populate table functionality
let currentEditingIndex = null; //Do not delete, needed for component 1 edit functionality

function setActiveLink(step) {
  var links = document.querySelectorAll('#steps li');
  links.forEach(function (link) {
    if (step == link.getAttribute('id')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
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
