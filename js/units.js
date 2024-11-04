// JS CODE FOR HANDLING THE CONVERSION OF UNIT
// Here we have functions aiming to update labels, values in the input and results to the unit selected

// ----------------------------------------------------------------------------------------------------------------------------

// 1: UPDATE LABELS AND VALUES IN THE INPUT ACCORDING TO THE UNIT SELECTED

let previousLengthUnit = "";
let previousForceUnit = "";
let currentLengthUnit = document.getElementById("lengthUnitMenu").value;
let currentForceUnit = document.getElementById("forceUnitMenu").value;

function updateUnitOfMeasure() {
    previousLengthUnit = currentLengthUnit;
    previousForceUnit = currentForceUnit;
    currentLengthUnit = document.getElementById("lengthUnitMenu").value;
    currentForceUnit = document.getElementById("forceUnitMenu").value;

    const beamLengthUnit = document.getElementById("beamLengthUnit");
    const inertiaUnit = document.getElementById("inertiaUnit");
    const elasticityUnit = document.getElementById("elasticityUnit");
    const shearUnit = document.getElementById("shearUnit");
    const posMomUnit = document.getElementById("posMomUnit");
    const negMomUnit = document.getElementById("negMomUnit");
    const defUnit = document.getElementById("defUnit");

    beamLengthUnit.textContent = `\\( ${currentLengthUnit} \\)`;
    inertiaUnit.textContent = `\\( ${currentLengthUnit}^4 \\)`;
    elasticityUnit.textContent = `\\( ${currentForceUnit} / ${currentLengthUnit}^2 \\)`;
    shearUnit.textContent = `\\( ${currentForceUnit} \\)`;
    posMomUnit.textContent = `\\( ${currentForceUnit} \\cdot ${currentLengthUnit} \\)`;
    negMomUnit.textContent = `\\( ${currentForceUnit} \\cdot ${currentLengthUnit} \\)`;
    defUnit.textContent = `\\( ${currentLengthUnit} \\)`;

    if (document.getElementById("option").value != "") {
        updateSubmenu()
    }

    MathJax.typesetPromise([beamLengthUnit, inertiaUnit, elasticityUnit, shearUnit, posMomUnit, negMomUnit, defUnit]).catch((err) => console.log(err.message));  // serve per forzare l'utilizzo di latex

    let load  = parseFloat(document.getElementById("input1").value);
    let L = parseFloat(document.getElementById("input2").value);
    let J = parseFloat(document.getElementById("input3").value);
    let E = parseFloat(document.getElementById("input4").value);
    const button = document.getElementById('the_button');
    
    // changing the value inside the input fields according to the unit of measure selected
    handleConversion(load, L, E, J)

    if (!isNaN(load) && !isNaN(L)) {  // se i primi due input non sono vuoti allora ricalcola i risultati con le unità di misura aggiornate
        button.click() ;
    }
}

// ----------------------------------------------------------------------------------------------------------------------------

// 2: HANDLE CONVERSION INSIDE THE INPUT FIELDS

function handleConversion(load, L, E, J) {
    if (!isNaN(load)) {
        const selectedOption = document.getElementById("option").value;  // it stores the type of load assigned
        console.log(selectedOption === "Carico uniforme" || selectedOption === "Carico lineare")
        // Possible options: "Carico uniforme", "Carico lineare", "Forza concentrata", "Coppia concentrata"
        if (selectedOption == "Carico uniforme" || selectedOption === "Carico lineare") { // force / length
            load = forceConversion(load);
            load = lengthConversion(load, 1, false)
        } else if (selectedOption === "Forza concentrata") { // force
            load = forceConversion(load);
        } else if (selectedOption === "Coppia concentrata") { // force * length
            load = forceConversion(load);
            load = lengthConversion(load, 1, true)
        }
        document.getElementById("input1").value = load;
    }
    
    // handling unit of L
    if (!isNaN(L)) {  // check che L non sia vuoto
        L = lengthConversion(L, 1, true)
        document.getElementById("input2").value = L;
    }

    // handling unit of J
    if (!isNaN(J)) {  // check che J non sia vuoto
        J = lengthConversion(J, 4, true)
        document.getElementById("input3").value = J;
    }

    // handling unit of E
    if (!isNaN(E)) {  // check che J non sia vuoto
        // chan
        E = lengthConversion(E, 2, false)
        E = forceConversion(E);
        document.getElementById("input4").value = E;
    }

}

// conversion for forces
function forceConversion(number) {
    if (previousForceUnit === "N") {
        if (currentForceUnit === "daN") {
            number = 1e-1 * number;
        } else if (currentForceUnit === "kN") {
            number = 1e-3 * number;
        } 
    } else if (previousForceUnit === "daN") {
        if (currentForceUnit === "N") {
            number = number * 1e1;
        } else if (currentForceUnit === "kN") {
            number = 1e-2 * number;
        }
    } else if (previousForceUnit === "kN") {
        if (currentForceUnit === "N") {
            number = number * 1e3;
        } else if (currentForceUnit === "daN") {
            number = number * 1e2;
        }
    }
    return autoRound(number)
}

// conversion ratio used for length
// to pass from CM to M use: 1 / MtoCM
// to pass from M^4 to MM^4 use: (MtoMM)**4
const MtoCM = 1e2;
const MtoMM = 1e3;
const CMtoMM = 1e1;

// conversion for lengths
function lengthConversion(number, power, numerator) {
    // number is the number to convert, power is the elevation of the measure (e.g. for m^4 is 4, for mm is 1), 
    // numerator is true if the number to convert is like m or cm, and false if it's like kN / m
    let m_to_cm = (MtoCM)**power;
    let m_to_mm = (MtoMM)**power;
    let cm_to_mm = (CMtoMM)**power;

    if (!numerator) { // need to invert ratios if the unit of length is at the denominator
        m_to_cm = 1 / m_to_cm;
        m_to_mm = 1 / m_to_mm;
        cm_to_mm = 1 / cm_to_mm;
    }

    if (previousLengthUnit === "m") {
        if (currentLengthUnit === "mm") {
            number = m_to_mm * number;
        } else if (currentLengthUnit === "cm") {
            number = m_to_cm * number;
        } 
    } else if (previousLengthUnit === "cm") {
        if (currentLengthUnit === "m") {
            number = number / m_to_cm;
        } else if (currentLengthUnit === "mm") {
            number = cm_to_mm * number;
        }
    } else if (previousLengthUnit === "mm") {
        if (currentLengthUnit === "m") {
            number = number / m_to_mm;
        } else if (currentLengthUnit === "cm") {
            number = number / cm_to_mm;
        }
    }
    return autoRound(number)
}

// needed to prevent using weird numbers like 23.000001 or 0.02566000005
function autoRound(num) {
    // Gestiamo i numeri piccoli per evitare errori di precisione
    if (Math.abs(num) < 1e-10) return 0;

    // Convertiamo il numero in stringa con una precisione di 15 cifre
    let preciseStr = num.toPrecision(15);

    // Rimuoviamo zeri finali inutili e il punto decimale se alla fine
    preciseStr = preciseStr.replace(/(\.\d*?[1-9])0+$/, "$1"); // Zeri decimali
    preciseStr = preciseStr.replace(/\.0+$/, "");              // Rimuove solo ".0" finali

    return parseFloat(preciseStr); // Converte di nuovo in numero
}
    
// ----------------------------------------------------------------------------------------------------------------------------

// 3: FUNCTION USED TO UPDATE LOAD TYPE ACCORDING TO THE CHOICE MADE IN THE SECOND MENU AND THE CURRENT UNIT OF MEASURE

function updateLoad(selectedOption) {
    const dynamicLabel = document.getElementById("dynamicLabel");
    const dynamicUnit = document.getElementById("dynamicUnit");
  
    // Update based on selected option
    if (selectedOption === "Carico uniforme") {
        dynamicLabel.textContent = "Carico distribuito (q):";
        dynamicUnit.textContent = `\\( ${currentForceUnit} / ${currentLengthUnit} \\)`;
    } else if (selectedOption === "Carico lineare") {
        dynamicLabel.textContent = "Carico lineare (q):";
        dynamicUnit.textContent = `\\( ${currentForceUnit} / ${currentLengthUnit} \\)`;
    } else if (selectedOption === "Carico lineare") {
        dynamicLabel.textContent = "Forza concentrata (F):";
        dynamicUnit.textContent = `\\( ${currentForceUnit} \\)`;
    } else if (selectedOption === "Carico lineare") {
        dynamicLabel.textContent = "Coppia concetrata (C):";
        dynamicUnit.textContent = `\\( ${currentForceUnit} \cdot ${currentLengthUnit} \\)`;
    }
        
    MathJax.typesetPromise([dynamicUnit]).catch((err) => console.log(err.message));  // serve per forzare l'utilizzo di latex
}