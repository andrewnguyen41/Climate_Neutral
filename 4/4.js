
var arr = []

function initPage() {
    const emissionData = JSON.parse(localStorage.getItem("step3"))
    const vehicleData = JSON.parse(localStorage.getItem("vehicleData"))
    // Function to calculate EV Emissions Intensity
    function calculateEVEmissionsIntensity(electricalEfficiency, provincialElectricityEmissionsCoefficient) {
        return electricalEfficiency * provincialElectricityEmissionsCoefficient;
    }

    // Function to calculate % Savings based on EV replacement
    function calculatePercentSavings(emissionsIntensity, eveEmissionsIntensity) {
        return (emissionsIntensity - eveEmissionsIntensity) / emissionsIntensity;
    }

    // Function to calculate Total Emissions Savings
    function calculateTotalEmissionsSavings(percentSavings, annualEmissions) {
        return percentSavings * annualEmissions;
    }

    // Function to calculate New Annual Emissions
    function calculateNewAnnualEmissions(annualEmissions, totalEmissionsSavings) {
        return annualEmissions - totalEmissionsSavings;
    }



    const table = document.getElementById("table");
    var tlEmissionSavings = 0;
    var totalSavings = 0
    
    vehicleData.forEach((item,index)=>{

            const electricalEfficiency_EV = 0.89; // Replace with actual value in kWh/100km
            const provincialElectricityEmissionsCoefficient = 30; // Replace with actual value in gCO2e/kWh
            
            const emissionsIntensity = emissionData[index].emissionsIntensityValue ? emissionData[index].emissionsIntensityValue : 200; // Replace with actual value in gCO2e/km
            const annualEmissions = emissionData[index].annualEmissionsValue ? emissionData[index].annualEmissionsValue : 5000; // Replace with actual value in km

            const eveEmissionsIntensity = calculateEVEmissionsIntensity(electricalEfficiency_EV, provincialElectricityEmissionsCoefficient);
            const percentSavings = calculatePercentSavings(emissionsIntensity,eveEmissionsIntensity);
            const totalEmissionsSavings = calculateTotalEmissionsSavings(percentSavings, annualEmissions);
            const newAnnualEmissions = calculateNewAnnualEmissions(annualEmissions, totalEmissionsSavings);

            arr.push({
                  eveEmissionsIntensity,
                  annualEmissions,
                  percentSavings,
                  totalEmissionsSavings
            })

            tlEmissionSavings+= totalEmissionsSavings;
            totalSavings+= percentSavings;

        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
              
              // Create a text node with the property value
        const text1 = document.createTextNode(item.description);
              
              // Append the text node to the cell
        cell1.appendChild(text1);
              
              // Append the cell to the row
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
              
              // Create a text node with the property value
        const text2 = document.createTextNode(item.fuelType);
              
              // Append the text node to the cell
        cell2.appendChild(text2);
              
              // Append the cell to the row
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
              
              // Create a text node with the property value
        const text3 = document.createTextNode(totalEmissionsSavings);
              
              // Append the text node to the cell
        cell3.appendChild(text3);
              
              // Append the cell to the row
        row.appendChild(cell3);

        const cell4 = document.createElement('td');
              
              // Create a text node with the property value
        const text4 = document.createTextNode(percentSavings + "%");
              
              // Append the text node to the cell
        cell4.appendChild(text4);
              
              // Append the cell to the row
        row.appendChild(cell4);

        // Append the row to the table
        table.appendChild(row);          
          
    })

    document.getElementById("totalEmission").innerText = tlEmissionSavings/emissionData.length;
    document.getElementById("savings").innerText = totalSavings/emissionData.length + "%";

}

initPage()

function goNextStep() {
    // set localsotrage
    const data = arr;
    localStorage.setItem('step4', JSON.stringify(data))
    goNext(4)
}


