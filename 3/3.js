

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
  
  function initPage() {
    const annualFuelConsumption = [100, 500, 500, 500]; 
    const annualVehicleKilometersTraveled = [30, 200, 350, 100]; 
    const fuelEmissionsCoefficient = 2.5; 
  
    const canvas1 = document.getElementById("TotalEmissionsByVehicle");
    const context1 = canvas1.getContext("2d");
  
    const canvas2 = document.getElementById("EmissionsIntensityByVehicle");
    const context2 = canvas2.getContext("2d");
  
    const barWidth = 30;
    let startX1 = 90;
    let startY1 = 30;
    let startX2 = 90;
    let startY2 = 30;
  
    for (let i = 0; i < annualFuelConsumption.length; i++) {
        const vehicleCalculator = new VehicleCalculator(annualFuelConsumption[i], annualVehicleKilometersTraveled[i], fuelEmissionsCoefficient);
  
        const annualEmissionsValue = vehicleCalculator.calculateAnnualEmissions();
        const emissionsIntensityValue = vehicleCalculator.calculateEmissionsIntensity();
  
        context1.fillStyle = "#0c1c81";
        context1.fillRect(startX1, startY1, annualEmissionsValue, barWidth);
  
        context1.fillStyle = "#007FFF";
        context1.font = "14px Arial";
        context1.fillText("Vehicle " + (i + 1), 10, startY1 + barWidth / 2);
  
        startY1 += 45;
  
        context2.fillStyle = "#26B170";
        context2.fillRect(startX2, startY2, emissionsIntensityValue, barWidth);
  
        context2.fillStyle = "#007FFF";
        context2.font = "14px Arial";
        context2.fillText("Vehicle " + (i + 1), 10, startY2 + barWidth / 2);
  
        startY2 += 45;
    }
  }
  
  initPage();
  
  function goNextStep() {
    const data = {};
    localStorage.setItem('step3', JSON.stringify(data));
    goNext(3);
  }
  