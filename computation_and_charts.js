// variables initialization
let Chart1; 
let Chart2; 
let Chart3;
let ctx;

// load data in the input for the computation
function getData() {
    const load  = parseFloat(document.getElementById("input1").value);
    const L = parseFloat(document.getElementById("input2").value);
    const J = parseFloat(document.getElementById("input3").value);
    const E = parseFloat(document.getElementById("input4").value);

    // Input validation
    if (isNaN(load) || isNaN(L) || L <= 0) {
        alert("Inserire valori (positivi) almeno per il carico e la lunghezza");
        return;
    }

    // Make the spacing for computing the functions reasonable
    const spacing = L / 100;
    let n = (L.toString().split('.')[1] || []).length; // Number of decimal places
    console.log(n)
    let roundingFactor = Math.pow(10, n + 2);

    return [load, L, E, J, spacing, roundingFactor]
}

// FUNCTIONS FOR PLOTTING THE DATA IN THE CHARTS
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

// -----------------------
// TRAVE APPOGGIATA
// -----------------------
function computeSimpleBeamUniformLoad() {
    // get data with the correct type of load
    const [q, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    // compute shear along the beam
    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        shearForce.push(q * (L - 2 * x) / 2);
    }

    // refresh max shear value
    Tmax = q * L / 2;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        bendingMoment.push(q * (L - x) * x / 2);
    }

    // add max values
    Mmax_pos = q * L**2 / 8;
    Mmax_neg = 0
    document.getElementById("Mmax_pos").innerText = Mmax_pos.toExponential(2);
    document.getElementById("Mmax_neg").innerText = Mmax_neg;

    // plotting bending moment
    plotBendingMoment(x_Values, bendingMoment);

    // -----------------------
    // DEFORMATION SHAPE
    // -----------------------
    x_Values = [];
    const defShape = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-q * x * (x**3 - 2 * L * x**2 + L**3) / (24*E*J));
    }

    // add max values
    freccia = 5 * q * L**4 / (384 * E * J);
    document.getElementById("Dmax").innerText = freccia.toExponential(2);

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

// -----------------------
// TRAVE INCASTRATA
// -----------------------
function computeFixedBeamUniformLoad() {
    // get data with the correct type of load
    const [q, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        shearForce.push(q * (L - 2 * x) / 2);
    }

    // add max values
    Tmax = q * L / 2;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        bendingMoment.push(-(q * L**2 /12) + (q * L * x / 2) - (q * x**2 /2));
    }

    // add max values
    Mmax_pos = q * L**2 / 24;
    Mmax_neg = - q * L**2 / 12;
    document.getElementById("Mmax_pos").innerText = Mmax_pos.toExponential(2);
    document.getElementById("Mmax_neg").innerText = Mmax_neg.toExponential(2);

    // plotting bending moment
    plotBendingMoment(x_Values, bendingMoment);

    // -----------------------
    // DEFORMATION SHAPE
    // -----------------------
    x_Values = [];
    const defShape = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-(q * L**4 / (24 * E * J)) * (x**2 / L**2) * ((L - x)**2 / L**2));
    }

    // add max values
    freccia = q * L**4 / (384 * E * J);
    document.getElementById("Dmax").innerText = freccia.toExponential(2);;

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

// -----------------------
// TRAVE INCASTRO - APPOGGIO
// -----------------------
function computeFixedSimpleBeamUniformLoad() {
    // get data with the correct type of load
    const [q, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        shearForce.push((5 * q * L / 8) - q * x);
    }

    // add max values
    Tmax = 5 * q * L / 8;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        bendingMoment.push(-(q * L**2 / 8) + (5 * q * L * x / 8) - (q * x**2 /2));
    }

    // add max values
    Mmax_pos = 9 * q * L**2 / 128;
    Mmax_neg = - q * L**2 / 8;
    document.getElementById("Mmax_pos").innerText = Mmax_pos.toExponential(2);
    document.getElementById("Mmax_neg").innerText = Mmax_neg.toExponential(2);

    // plotting bending moment
    plotBendingMoment(x_Values, bendingMoment);

    // -----------------------
    // DEFORMATION SHAPE
    // -----------------------
    x_Values = [];
    const defShape = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-(q / (8 * E * J)) * (x**4 / 3 - 5 * L * x**3 / 6 + L**2 * x**2 / 2));
    }

    // add max values
    freccia = (q * L / (8 * E * J)) * (L**4 / 3 - 5 * L * 125 * L**3 / (6 * 512) + L**2 * 25 * L**2 / 128);
    document.getElementById("Dmax").innerText = freccia.toExponential(2);;

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

// -----------------------
// TRAVE A MENSOLA
// -----------------------
function computeCantileverUniformLoad() {
    // get data with the correct type of load
    const [q, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        shearForce.push(q * (L - x));
    }

    // add max values
    Tmax = q * L;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        bendingMoment.push(-q * (L - x)**2 / 2);
    }

    // add max values
    Mmax_pos = 0;
    Mmax_neg = - q * L**2 / 2;
    document.getElementById("Mmax_pos").innerText = Mmax_pos;
    document.getElementById("Mmax_neg").innerText = Mmax_neg.toExponential(2);

    // plotting bending moment
    plotBendingMoment(x_Values, bendingMoment);

    // -----------------------
    // DEFORMATION SHAPE
    // -----------------------
    x_Values = [];
    const defShape = [];

    for (let x = 0; x < L; x += spacing) {
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-(q / (24 * E * J)) * x**2 * (6 * L**2 - 4 * L * x + x**2));
    }
    
    // add max values
    freccia = (q * L**4 / (8 * E * J));
    document.getElementById("Dmax").innerText = freccia.toExponential(2);;

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}