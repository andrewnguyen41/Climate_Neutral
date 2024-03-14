
function initPage() {
  class VehicleCalculator {
    constructor(annualFuelConsumption, annualVehicleKilometersTraveled, fuelEmissionsCoefficient) {
        this.annualFuelConsumption = annualFuelConsumption;
        this.annualVehicleKilometersTraveled = annualVehicleKilometersTraveled;
        this.fuelEmissionsCoefficient = fuelEmissionsCoefficient;
    }
     
    calculateFuelEfficiency() {
        if (this.annualVehicleKilometersTraveled === 0) return Infinity;
        return this.annualFuelConsumption / this.annualVehicleKilometersTraveled;
    }
  
    calculateAnnualEmissions() {
        return this.annualFuelConsumption * this.fuelEmissionsCoefficient;
    }
  
    calculateEmissionsIntensity() {
        if (this.annualVehicleKilometersTraveled === 0) return Infinity;
        return this.calculateAnnualEmissions() / this.annualVehicleKilometersTraveled;
    }
  }
  // Retrieve the vehicle data from localStorage
  arr = [];
  var vehicleData = JSON.parse(localStorage.getItem('vehicleData'));

  if (!vehicleData) {
    console.log('No vehicle data found in localStorage.');
    return; 
  }

  const canvas1 = document.getElementById("TotalEmissionsByVehicle");
  const ctx1 = canvas1.getContext("2d");

  const canvas2 = document.getElementById("EmissionsIntensityByVehicle");
  const ctx2 = canvas2.getContext("2d");

  const barWidth = 30;
  let startX1 = 90;
  let startY1 = 30;
  let startX2 = 90;
  let startY2 = 30;

  vehicleData.forEach(function(vehicle, i) {
      let fuelEmissionsCoefficient;

      if (vehicle.fuelType === "Gasoline") {
        fuelEmissionsCoefficient = 2299;
      } else if (vehicle.fuelType === "E10 Gasoline") {
        fuelEmissionsCoefficient = 2071;
      } else if (vehicle.fuelType === "Diesel") {
        fuelEmissionsCoefficient = 2730;
      } else {
        fuelEmissionsCoefficient = 0;
      }

      let quantity = vehicle.quantity;
      console.log("Q"+quantity);
      const vehicleCalculator = new VehicleCalculator(vehicle.annualFuel, vehicle.annualVKT, fuelEmissionsCoefficient);
      
      const annualEmissionsValue = (vehicleCalculator.calculateAnnualEmissions()) * quantity;
      console.log("AE"+annualEmissionsValue*quantity);
      const emissionsIntensityValue = (vehicleCalculator.calculateEmissionsIntensity()) * quantity;
      console.log("EI"+emissionsIntensityValue*quantity);

      arr.push({
        annualEmissionsValue,
        emissionsIntensityValue,
      });
      
      ctx1.fillStyle = "#0c1c81";
      ctx1.fillRect(startX1, startY1, (annualEmissionsValue/1000)*0.2, barWidth);

      ctx1.fillStyle = "#007FFF";
      ctx1.font = "14px Arial";
      //ctx1.fillText(vehicle.make +"               "+annualEmissionsValue.toFixed(2), 10,startY1 + barWidth / 2);
      ctx1.fillText(vehicle.make , 10,startY1 + barWidth / 2);
      //console.log(vehicle.make);

      startY1 += 45;

      ctx2.fillStyle = "#26B170";
      ctx2.fillRect(startX2, startY2, (emissionsIntensityValue/1000)*60, barWidth);

      ctx2.fillStyle = "#007FFF";
      ctx2.font = "14px Arial";
      //ctx2.fillText(vehicle.make+"                "+emissionsIntensityValue.toFixed(2), 10, startY2 + barWidth / 2);
      ctx2.fillText(vehicle.make, 10, startY2 + barWidth / 2);

      startY2 += 45;
  });
}

initPage();

function goNextStep() {
  const data = arr;
  localStorage.setItem('step3', JSON.stringify(data));
  goNext(3);
} 