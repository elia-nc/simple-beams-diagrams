// DATA COMPUTATION  
// Functions to compute the results for each type of beam and type of load

// ----------------------------------------------------------------------------------------------------------------------------

// load data in the input for the computation
function getData() {
    const load  = parseFloat(document.getElementById("input1").value);
    const L = parseFloat(document.getElementById("input2").value);
    const J = parseFloat(document.getElementById("input3").value);
    const E = parseFloat(document.getElementById("input4").value);

    // Input validation
    if (isNaN(load) || isNaN(L) || L <= 0) {
        alert("Inserire valori (positivi) almeno per il carico e la lunghezza.");
        return;
    } else if (E <= 0, J <= 0) {
        alert("Inserire valori positivi per E e J, o non inserirne.");
        return;
    }

    // Make the spacing for computing the functions reasonable
    const spacing = L / 100;
    let n = (L.toString().split('.')[1] || []).length; // Number of decimal places
    let roundingFactor = Math.pow(10, n + 2);

    return [load, L, E, J, spacing, roundingFactor]
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
    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-q * x * (x**3 - 2 * L * x**2 + L**3) / (24*E*J));
    }

    // add max values
    freccia = 5 * q * L**4 / (384 * E * J);
    document.getElementById("Dmax").innerText = freccia.toExponential(2);

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

function computeSimpleBeamForce() {
    // get data with the correct type of load
    const [P, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    // compute shear along the beam
    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        if (x < L/2) {
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(P / 2);
        } else if (x > L/2) {
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(- P / 2);
        } else {
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(P / 2);
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(- P / 2);
        }
    }

    console.log(x_Values)
    console.log(shearForce)

    // refresh max shear value
    Tmax = P / 2;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce, true);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        if (x < L/2) {
            bendingMoment.push(P * x / 2);
        } else {
            bendingMoment.push(P* L / 4 - P * (x - L/2) / 2);
        }    
    }

    // add max values
    Mmax_pos = P * L / 4;
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        if (x < L/2) {
            defShape.push(-(P * L**2 * x / (16 * E * J)) * (1 - 4 * x **2 / (3 * L**2)));
        } else {
            defShape.push(-(P * L**2 * (L - x) / (16 * E * J)) * (1 - 4 * (L - x) **2 / (3 * L**2)));
        }
    }

    // add max values
    freccia = P * L**3 / (48 * E * J);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-(q * L**4 / (24 * E * J)) * (x**2 / L**2) * ((L - x)**2 / L**2));
    }

    // add max values
    freccia = q * L**4 / (384 * E * J);
    document.getElementById("Dmax").innerText = freccia.toExponential(2);;

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

function computeFixedBeamForce() {
    // get data with the correct type of load
    const [P, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    // compute shear along the beam
    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        if (x < L/2) {
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(P / 2);
        } else if (x > L/2) {
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(- P / 2);
        } else {
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(P / 2);
            x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
            shearForce.push(- P / 2);
        }
    }

    console.log(x_Values)
    console.log(shearForce)

    // refresh max shear value
    Tmax = P / 2;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce, true);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        if (x < L/2) {
            bendingMoment.push(- P* L / 8 + P * x / 2);
        } else {
            bendingMoment.push(P* L / 8 - P * (x - L/2) / 2);
        }    
    }

    // add max values
    Mmax_pos = P * L / 8;
    Mmax_neg = - P * L / 8
    document.getElementById("Mmax_pos").innerText = Mmax_pos.toExponential(2);
    document.getElementById("Mmax_neg").innerText = Mmax_neg.toExponential(2);

    // plotting bending moment
    plotBendingMoment(x_Values, bendingMoment);

    // -----------------------
    // DEFORMATION SHAPE
    // -----------------------
    x_Values = [];
    const defShape = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        if (x < L/2) {
            defShape.push(-(P * x**2 / (4 * E * J)) * (- x / 3 + L / 4));
        } else {
            defShape.push(-(P * (L - x)**2 / (4 * E * J)) * (- (L - x) / 3 + L / 4));
        }
    }

    // add max values
    freccia = P * L**3 / (192 * E * J);
    document.getElementById("Dmax").innerText = freccia.toExponential(2);

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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
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

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-(q / (24 * E * J)) * x**2 * (6 * L**2 - 4 * L * x + x**2));
    }
    
    // add max values
    freccia = (q * L**4 / (8 * E * J));
    document.getElementById("Dmax").innerText = freccia.toExponential(2);;

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

function computeCantileverForce() {
    // get data with the correct type of load
    const [Q, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        shearForce.push(Q);
    }

    // add max values
    Tmax = Q;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        bendingMoment.push(-Q * (L - x));
    }

    // add max values
    Mmax_pos = 0;
    Mmax_neg = - Q * L;
    document.getElementById("Mmax_pos").innerText = Mmax_pos;
    document.getElementById("Mmax_neg").innerText = Mmax_neg.toExponential(2);

    // plotting bending moment
    plotBendingMoment(x_Values, bendingMoment);

    // -----------------------
    // DEFORMATION SHAPE
    // -----------------------
    x_Values = [];
    const defShape = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(- (Q * L**3 / (2 * E * J)) * ((x**2 / L**2) - (x**3 / (3 * L**3))));
    }
    
    // add max values
    freccia = (Q * L**3 / (3 * E * J));
    document.getElementById("Dmax").innerText = freccia.toExponential(2);;

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

function computeCantileverMoment() {
    // get data with the correct type of load
    const [M, L, E, J, spacing, roundingFactor] = getData();

    // -----------------------
    // SHEAR
    // -----------------------
    let x_Values = [];
    const shearForce = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        shearForce.push(0);
    }

    // add max values
    Tmax = 0;
    document.getElementById("Tmax").innerText = Tmax.toExponential(2);

    // plotting shear
    plotShear(x_Values, shearForce);
    
    // -----------------------
    // BENDING MOMENT
    // -----------------------
    x_Values = [];
    const bendingMoment = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        bendingMoment.push(-M);
    }

    // add max values
    Mmax_pos = 0;
    Mmax_neg = - M;
    document.getElementById("Mmax_pos").innerText = Mmax_pos;
    document.getElementById("Mmax_neg").innerText = Mmax_neg.toExponential(2);

    // plotting bending moment
    plotBendingMoment(x_Values, bendingMoment);

    // -----------------------
    // DEFORMATION SHAPE
    // -----------------------
    x_Values = [];
    const defShape = [];

    for (let x = 0; x <= L; x += spacing) {
        x = autoRound(x);
        x_Values.push(Math.round(x * roundingFactor) / roundingFactor);
        defShape.push(-(M * x**2 / (2 * E * J)));
    }
    
    // add max values
    freccia = (M * L**2 / (2 * E * J));
    document.getElementById("Dmax").innerText = freccia.toExponential(2);;

    // plotting def shape
    plotDeformationShape(x_Values, defShape);
}

