// PLOTTING DATA ELABORATED IN COMPUTATION.JS

// ----------------------------------------------------------------------------------------------------------------------------

// variables initialization
let Chart1; 
let Chart2; 
let Chart3;
let ctx;

// plot shear data in charts
function plotShear(xVal, yVal) {
    // resetting previous charts if existing
    resetChart(Chart1, "Chart1", "chartContainer1");
    // Plotting the data of shear
    ctx = document.getElementById("Chart1").getContext("2d");
    Chart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xVal,
            datasets: [{
                label: 'Taglio (T)',
                data: yVal,
                borderColor: 'rgba(237, 28, 36, 1)',
                borderWidth: 2,
                backgroundColor: 'rgba(237, 28, 36, 0.2)', // Colore trasparente per l'area sottesa
                fill: true, // Abilita il riempimento dell'area
                pointRadius: 0, // Can be adjusted based on preference
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3, 
            plugins: {
                legend: {
                    display: false // Hides the legend
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Taglio: ${tooltipItem.raw.toFixed(2)}`; // Format for tooltip
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Taglio (T)'
                    },
                    grid: {
                        color: (context) => {
                            return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)'; // Highlights zero line
                        },
                        lineWidth: (context) => {
                            return context.tick.value === 0 ? 2 : 1; // Thicker zero line
                        }
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'x'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' // Optional: customize x-axis grid lines if needed
                    },
                }
            }
        }
    });
}

// plot bending moment data in charts
function plotBendingMoment(xVal, yVal) {
    // reset previous chart
    resetChart(Chart2, "Chart2", "chartContainer2");
    // Plotting the data of bending moment
    ctx = document.getElementById("Chart2").getContext("2d");
    Chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xVal,
            datasets: [{
                label: 'Momento flettente (M)',
                data: yVal,
                borderColor: 'rgba(237, 28, 36, 1)',
                borderWidth: 2,
                backgroundColor: 'rgba(237, 28, 36, 0.2)',
                fill: true,
                pointRadius: 0, // Can be adjusted based on preference
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 3, 
            plugins: {
                legend: {
                    display: false // Hides the legend
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Momento flettente: ${tooltipItem.raw.toFixed(2)}`; // Format for tooltip
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    reverse: true, // Invert the y-axis
                    title: {
                        display: true,
                        text: 'Momento flettente (M)'
                    },
                    grid: {
                        color: (context) => {
                            return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)'; // Highlights zero line
                        },
                        lineWidth: (context) => {
                            return context.tick.value === 0 ? 2 : 1; // Thicker zero line
                        }
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'x'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' // Optional: customize x-axis grid lines if needed
                    },
                    
                }
            }
        }
    });
}

// plot deformation shape data in charts
function plotDeformationShape(xVal, yVal) {
    resetChart(Chart3, "Chart3", "chartContainer3");
    // Plotting the data of deformation shape
    ctx = document.getElementById("Chart3").getContext("2d");
    Chart3 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xVal,
            datasets: [{
                label: 'Deformata (D)',
                data: yVal,
                borderColor: 'rgba(19, 118, 230, 1)',
                borderWidth: 3,
                fill: false,
                pointRadius: 0, // Can be adjusted based on preference
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 4, 
            plugins: {
                legend: {
                    display: false // Hides the legend
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            return `Deformata: ${tooltipItem.raw.toExponential(2)}`; // Format for tooltip
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Deformata (D)'
                    },
                    grid: {
                        color: (context) => {
                            return context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)'; // Highlights zero line
                        },
                        lineWidth: (context) => {
                            return context.tick.value === 0 ? 2 : 1; // Thicker zero line
                        }
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: 'x'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' // Optional: customize x-axis grid lines if needed
                    },
                    
                }
            }
        }
    });
}

// Function to reset the chart
function resetChart(chart, chartId, chartContainerId) {
    const chartContainer = document.getElementById(chartContainerId);
    const oldCanvas = document.getElementById(chartId);

    // Destroy the existing chart if it exists
    if (chart) {
        chart.destroy();
        chart = null; // Clear the chart instance reference
    }

    // Remove the old canvas element
    if (oldCanvas) {
        chartContainer.removeChild(oldCanvas);
    }

    // Create and append a new, empty canvas element
    const newCanvas = document.createElement("canvas");
    newCanvas.id = chartId;
    newCanvas.style = "width:80%; height:200px;"
    chartContainer.appendChild(newCanvas);
}