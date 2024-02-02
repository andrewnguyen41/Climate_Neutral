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
