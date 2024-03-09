function initPage() {
  // // Retrieve the data from localStorage
  let vehicleData = JSON.parse(localStorage.getItem('vehicleData'));
  let savedGreenOptions =
    JSON.parse(localStorage.getItem('savedGreenOptions')) || {};

  function adjustLabel(blockId, labelId) {
    let block = document.getElementById(blockId);
    let label = document.getElementById(labelId);
    block.classList.add('active');
    label.classList.add('active');
  }

  function resetLabel(blockId, labelId) {
    let block = document.getElementById(blockId);
    let label = document.getElementById(labelId);
    block.classList.remove('active');
    label.classList.remove('active');
  }

  function updateNextButtonState() {
    const allDropdowns = document.querySelectorAll('#greenOptionsForm select');
    const allSelected = Array.from(allDropdowns).every(
      (select) => select.value
    );
    document.querySelector('.btn-next').disabled = !allSelected;
  }

  if (vehicleData) {
    let formattedDataContainer = document.getElementById('greenOptionsForm');

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
      if (
        type === 'Light Duty Truck' &&
        flexFuel === 'No' &&
        fuelType === 'Gasoline'
      ) {
        greenOptions = [
          'Replace w/ EV Light Duty Truck',
          'Replace w/ Biofuel E85 Light Duty Truck',
          'Right Size to Car',
          'Right Size to Biofuel Car',
        ];
      }
      if (
        type === 'Light Duty Truck' &&
        flexFuel === 'Yes' &&
        fuelType === 'Gasoline'
      ) {
        greenOptions = [
          'E85 Biofuel Usage',
          'Replace w/ EV Light Duty Truck',
          'Right Size to Car',
          'Right Size to Biofuel Car',
        ];
      }
      if (
        type === 'Light Duty Truck' &&
        flexFuel === 'No' &&
        fuelType === 'Diesel'
      ) {
        greenOptions = [
          'Replace w/ EV Light Duty Truck',
          'Replace w/ Biofuel E85 Light Duty Truck',
          'Right Size to Car',
          'Right Size to Biofuel E85 Car',
        ];
      }
      if (
        type === 'Light Duty Truck' &&
        flexFuel === 'Yes' &&
        fuelType === 'Diesel'
      ) {
        greenOptions = [
          'B20 Diesel Usage',
          'Replace w/ EV Light Duty Truck',
          'Replace w/ Biofuel E85 Light Duty Truck',
          'Right Size to Car',
          'Right Size to Biofuel E85 Car',
        ];
      }

      return greenOptions;
    }

    // Loop through each row in the vehicleData
    vehicleData.forEach(function (item, index) {
      const blockId = `greenBlock${index + 1}`;
      const labelId = `greenLabel${index + 1}`;
      const selectId = `greenOptionSelect${index + 1}`;

      // Generate dropdown options based on the formatted data
      const greenOptions = generateGreenOptions(
        item.type,
        item.flexFuel,
        item.fuelType
      );

      // Creating the div block
      const settingsBlock = document.createElement('div');
      settingsBlock.id = blockId;
      settingsBlock.className =
        'options form-field-style height-50-px margin-bottom-10-px white-background';

      // Creating the label
      const label = document.createElement('label');
      label.htmlFor = selectId;
      label.id = labelId;
      label.className = 'label-style';
      label.textContent = `${item.type}-${item.make}-${item.model}-${item.year}-(${item.quantity})`;

      // Creating the select
      const select = document.createElement('select');
      select.name = selectId;
      select.id = selectId;
      select.className = 'remove-field-default-border options-color';

      // Adding the default option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      defaultOption.textContent = 'Select a Green Option *';
      select.appendChild(defaultOption);

      // Adding green options to select
      greenOptions.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
      });

      // Set the select dropdown to the saved option if exists
      if (savedGreenOptions[selectId]) {
        select.value = savedGreenOptions[selectId];
      }

      // Save the selection to localStorage when changed
      select.addEventListener('change', function () {
        savedGreenOptions[selectId] = this.value;
        localStorage.setItem(
          'savedGreenOptions',
          JSON.stringify(savedGreenOptions)
        );
        updateNextButtonState();
        showSuccessToast('Green option saved successfully!', 1500);
      });

      // Adding focus and blur event listeners
      select.addEventListener('focus', () => adjustLabel(blockId, labelId));
      select.addEventListener('blur', () => resetLabel(blockId, labelId));

      settingsBlock.appendChild(label);
      settingsBlock.appendChild(select);

      formattedDataContainer.appendChild(settingsBlock);
    });
    updateNextButtonState();
  } else {
    console.log('No vehicle data found in localStorage.');
  }
}

initPage();

function goNextStep() {
  // set localsotrage
  data = {};
  localStorage.setItem('step2', JSON.stringify(data));
  goNext(2);
}
