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

    // Example usage for E85 Flex Fuel Option
    const electricalEfficiency_EV = 0.89; // Replace with actual value in kWh/100km
    const provincialElectricityEmissionsCoefficient = 30; // Replace with actual value in gCO2e/kWh
    // const emissionsIntensity = emissionData ? emissionData.emissionsIntensity : 200; // Replace with actual value in gCO2e/km
    // const annualEmissions = emissionData ? emissionData.annualEmissions : 5000; // Replace with actual value in km
    const emissionsIntensity = 5000; // Replace with actual value in gCO2e/km
    const annualEmissions = 200; // Replace with actual value in km

    const eveEmissionsIntensity = calculateEVEmissionsIntensity(electricalEfficiency_EV, provincialElectricityEmissionsCoefficient);
    const percentSavings = calculatePercentSavings(emissionsIntensity,eveEmissionsIntensity);
    const totalEmissionsSavings = calculateTotalEmissionsSavings(percentSavings, annualEmissions);
    const newAnnualEmissions = calculateNewAnnualEmissions(annualEmissions, totalEmissionsSavings);

    const table = document.getElementById("table");
    
    vehicleData.forEach(item=>{
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
        const text4 = document.createTextNode(percentSavings);
              
              // Append the text node to the cell
        cell4.appendChild(text4);
              
              // Append the cell to the row
        row.appendChild(cell4);

        // Append the row to the table
        table.appendChild(row);          
          
    })


    console.log("EVE Emissions Intensity (gCO2e/km):", eveEmissionsIntensity);
    console.log("% Savings (E85):", percentSavings * 100, "%");
    console.log("Total Emissions Savings (E85):", totalEmissionsSavings);
    console.log("New Annual Emissions (E85):", newAnnualEmissions);




    // //object to hold data
    // var cities = [
    //     { name: "Honda Accord", population: 842, units: 354, households: 322, tip: "live music capital" },
    //     { name: "Toyota Corolla", population: 777, units: 291, households: 257, tip: "near Dallas" },
    //     { name: "Honda Civic", population: 236, units: 95, households: 86, tip: "TX Tech" }
    // ];
    // //array to hold names of different measures. Must match values in form
    // var measures = ["Replacement opt 1", "Replacement opt 2", "Replacement opt 3"];
    // // function that writes the data to the chart. Only  need to write name and tip once.
    // function writeData() {
    //     for (var i = 0; i < cities.length; i++) {
    //         document.getElementById("name" + (i)).innerHTML = cities[i].name;
    //         document.getElementById("bartext" + (i)).innerHTML = cities[i].population;
    //         document.getElementById("bar" + (i)).style.width = cities[i].population + "px";
    //         document.getElementById("bar" + (i)).title = cities[i].tip;
    //     }
    // };
    // // this area inserts the Category as a heading and writes the data
    // document.getElementById("cat").innerHTML = "<strong>" + measures[0] + "</strong>";
    // writeData();
    // // function to change based on dropdown
    // function selMeasure() {
    //     var m = document.form1.sel.value;
    //     if (m == measures[0]) {
    //         document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
    //         writeData();

    //     } // end if
    //     else if (m == measures[1]) {
    //         document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
    //         for (var i = 0; i < 3; i++) {
    //             document.getElementById("bartext" + (i)).innerHTML = cities[i].households;
    //             document.getElementById("bar" + (i)).style.width = cities[i].households + "px";

    //         };
    //     }
    //     else if (m == measures[2]) {
    //         document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
    //         for (var i = 0; i < 3; i++) {
    //             document.getElementById("bartext" + (i)).innerHTML = cities[i].units;
    //             document.getElementById("bar" + (i)).style.width = cities[i].units + "px";

    //         };
    //     }
    // }
    // // JQuery function for tool tip
    // $(document).ready(function () {
    //     $("[title]").tooltip();
    // });

}

initPage()

function goNextStep() {
    // set localsotrage
    data = {}
    localStorage.setItem('step4', JSON.stringify(data))
    goNext(4)
}


