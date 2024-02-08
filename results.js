document.addEventListener("DOMContentLoaded", function() {
    var canvas1 = document.getElementById("Total Emissions By Vehicle");
    var ctx1 = canvas1.getContext("2d");

    var canvas2 = document.getElementById("Emissions Intensity By Vehicle");
    var ctx2 = canvas2.getContext("2d");

    var data1 = [
        { label: "Vehicle 1", value: 150 },
        { label: "Vehicle 2", value: 120 },
        { label: "Vehicle 3", value: 100 },
        { label: "Vehicle 4", value: 90 }
    ];

    var data2 = [
        { label: "Vehicle 1", value: 100 },
        { label: "Vehicle 2", value: 80 },
        { label: "Vehicle 3", value: 150 },
        { label: "Vehicle 4", value: 120 }
    ];

    var barWidth = 30;
    var startX1 = 90;
    var startY1 = 30;
    var startX2 = 90;
    var startY2 = 30;

    data1.forEach(function(item) {
        ctx1.fillStyle = "#0c1c81"; 
        ctx1.fillRect(startX1, startY1, item.value, barWidth);

        ctx1.fillStyle = "#007FFF"; 
        ctx1.font = "14px Arial";
        ctx1.fillText(item.label, 10, startY1 + barWidth / 2);


        startY1 += 50; 
    });

    data2.forEach(function(item) {
        ctx2.fillStyle = "#26B170"; 
        ctx2.fillRect(startX2, startY2, item.value, barWidth);

        ctx2.fillStyle = "#007FFF"; 
        ctx2.font = "14px Arial";
        ctx2.fillText(item.label, 10, startY2 + barWidth / 2);

        startY2 += 50; 
    });
});
