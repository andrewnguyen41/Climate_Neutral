function initPage() {
    // Function to calculate EV Emissions Intensity
    function calculateEVEmissionsIntensity(electricalEfficiency, provincialEmissionsCoefficient) {
        return electricalEfficiency * provincialEmissionsCoefficient;
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
    const electricalEfficiency_EV = 15; // Replace with actual value in kWh/100km
    const provincialEmissionsCoefficient = 80; // Replace with actual value in gCO2e/kWh
    const emissionsIntensity = 200; // Replace with actual value in gCO2e/km
    const annualEmissions = 5000; // Replace with actual value in km

    const eveEmissionsIntensity = calculateEVEmissionsIntensity(electricalEfficiency_EV, provincialEmissionsCoefficient);
    const percentSavings_E85 = 0.79;
    const totalEmissionsSavings_E85 = calculateTotalEmissionsSavings(percentSavings_E85, annualEmissions);
    const newAnnualEmissions_E85 = calculateNewAnnualEmissions(annualEmissions, totalEmissionsSavings_E85);

    console.log("EVE Emissions Intensity (gCO2e/km):", eveEmissionsIntensity);
    console.log("% Savings (E85):", percentSavings_E85 * 100, "%");
    console.log("Total Emissions Savings (E85):", totalEmissionsSavings_E85);
    console.log("New Annual Emissions (E85):", newAnnualEmissions_E85);




    //object to hold data
    var cities = [
        { name: "Honda Accord", population: 842, units: 354, households: 322, tip: "live music capital" },
        { name: "Toyota Corolla", population: 777, units: 291, households: 257, tip: "near Dallas" },
        { name: "Honda Civic", population: 236, units: 95, households: 86, tip: "TX Tech" }
    ];
    //array to hold names of different measures. Must match values in form
    var measures = ["Replacement opt 1", "Replacement opt 2", "Replacement opt 3"];
    // function that writes the data to the chart. Only  need to write name and tip once.
    function writeData() {
        for (var i = 0; i < cities.length; i++) {
            document.getElementById("name" + (i)).innerHTML = cities[i].name;
            document.getElementById("bartext" + (i)).innerHTML = cities[i].population;
            document.getElementById("bar" + (i)).style.width = cities[i].population + "px";
            document.getElementById("bar" + (i)).title = cities[i].tip;
        }
    };
    // this area inserts the Category as a heading and writes the data
    document.getElementById("cat").innerHTML = "<strong>" + measures[0] + "</strong>";
    writeData();
    // function to change based on dropdown
    function selMeasure() {
        var m = document.form1.sel.value;
        if (m == measures[0]) {
            document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
            writeData();

        } // end if
        else if (m == measures[1]) {
            document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
            for (var i = 0; i < 3; i++) {
                document.getElementById("bartext" + (i)).innerHTML = cities[i].households;
                document.getElementById("bar" + (i)).style.width = cities[i].households + "px";

            };
        }
        else if (m == measures[2]) {
            document.getElementById("cat").innerHTML = "<strong>" + m + "</strong>";
            for (var i = 0; i < 3; i++) {
                document.getElementById("bartext" + (i)).innerHTML = cities[i].units;
                document.getElementById("bar" + (i)).style.width = cities[i].units + "px";

            };
        }
    }
    // JQuery function for tool tip
    $(document).ready(function () {
        $("[title]").tooltip();
    });

}

initPage()

function goNextStep() {
    // set localsotrage
    data = {}
    localStorage.setItem('step4', JSON.stringify(data))
    goNext(4)
}


