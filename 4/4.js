
var arr = []

const province = {
      "British Columbia":10,
      "Alberta":10,
      "Saskatchewan":10,
      "Manitoba":10,
      "Ontario":30,
      "Quebec":10,
      "New Brunswick":10,
      "Nova Scotia":10,
      "Prince Edward Island":10,
      "Newfoundland and Labrador":10,
      "Yukon":10,
      "Northwest Territories":10,
      "Nunavut":10,
}

function initPage() {
    const emissionData = JSON.parse(localStorage.getItem("step3"))
    const vehicleData = JSON.parse(localStorage.getItem("vehicleData"))
    const provincialCoefficientData = JSON.parse(localStorage.getItem("provincialEmmisionsCoefficientData"))
    // Function to calculate EV Emissions Intensity
    function calculateEVEmissionsIntensity(electricalEfficiency, provincialElectricityEmissionsCoefficient) {
        return electricalEfficiency * provincialElectricityEmissionsCoefficient;
    }

    // Function to calculate % Savings based on EV replacement
    function calculatePercentSavings(emissionsIntensity, eveEmissionsIntensity) {
        return Math.abs(emissionsIntensity - eveEmissionsIntensity) / emissionsIntensity;
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

    var savedGreenOptions = JSON.parse(localStorage.getItem('savedGreenOptions')) || {};
    console.log("savedGreenOptions.keyValuePairs", savedGreenOptions.keyValuePairs);

//     const keyValuePairsLength = savedGreenOptions.keyValuePairs.length;
//     console.log("keyValuePairsLength", keyValuePairsLength);
var keyArray = [];
for (var key in savedGreenOptions.keyValuePairs) {
      if (savedGreenOptions.keyValuePairs.hasOwnProperty(key)) {
        var value = savedGreenOptions.keyValuePairs[key];
      //   console.log("Key: " + key + ", Value: " + value);
        keyArray.push(key);
      }
    }


    var count = 0;
    vehicleData.forEach((item,index)=>{
      // console.log("index", index);
      // const keyValuePair = savedGreenOptions.keyValuePairs[index];
      const keyValuePair = keyArray[index];

     // const key = keyValuePair ? keyValuePair[0] : null;
      // console.log("key", keyValuePair);

            const fuel_efficiency = item['annualFuel'] / item['annualVKT']
            console.log(fuel_efficiency)
            const electricalEfficiency_EV = fuel_efficiency * 0.89; // Replace with actual value in kWh/100km
            const provincialElectricityEmissionsCoefficient = province[provincialCoefficientData.province]; // Replace with actual value in gCO2e/kWh
            
            const emissionsIntensity = emissionData[index].emissionsIntensityValue; // Replace with actual value in gCO2e/km
            const annualEmissions = emissionData[index].annualEmissionsValue; // Replace with actual value in km

            console.log("electric :",electricalEfficiency_EV)

            const eveEmissionsIntensity = calculateEVEmissionsIntensity(electricalEfficiency_EV, provincialElectricityEmissionsCoefficient);//not clear and hardcoded for only ontario
            console.log(emissionsIntensity,eveEmissionsIntensity)
            const percentSavings = calculatePercentSavings(emissionsIntensity,eveEmissionsIntensity) *100;
            const totalEmissionsSavings = calculateTotalEmissionsSavings(percentSavings, annualEmissions);
            const newAnnualEmissions = calculateNewAnnualEmissions(annualEmissions, totalEmissionsSavings);
            
            
            if(keyValuePair) {  //Push only if green option is applied
                  console.log("inserting", keyValuePair);
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
      //   const text1 = document.createTextNode(item.description);

        const text1 = document.createTextNode(keyValuePair);

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
        const text3 = document.createTextNode(totalEmissionsSavings.toFixed(2));
              
              // Append the text node to the cell
        cell3.appendChild(text3);
              
              // Append the cell to the row
        row.appendChild(cell3);

        const cell4 = document.createElement('td');
              
              // Create a text node with the property value
        const text4 = document.createTextNode(percentSavings.toFixed(2) + "%");
              
              // Append the text node to the cell
        cell4.appendChild(text4);
              
              // Append the cell to the row
        row.appendChild(cell4);

        // Append the row to the table
        table.appendChild(row); 
        count = count +1;
}         
          
    })

    console.log(count)

    document.getElementById("totalEmission").innerText = (tlEmissionSavings/count).toFixed(2) + " TCO2e";
    document.getElementById("savings").innerText = (totalSavings/count).toFixed(2) + "%";

}

initPage()

function goNextStep() {
    // set localsotrage
    const data = arr;
    localStorage.setItem('step4', JSON.stringify(data))
    goNext(4)
}


