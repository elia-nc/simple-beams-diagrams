// Define options for each group
const options = {
    simpleBeam: ["Carico uniforme", "Carico concentrato"],
    fixedBeam: ["Carico uniforme", "Carico concentrato"],
    fixedSimpleBeam: ["Carico uniforme", "Carico concentrato"],
    cantilever: ["Carico uniforme"],
};

const groupSelect = document.getElementById('group');
const optionSelect = document.getElementById('option');

// Event listener for the first select element
groupSelect.addEventListener('change', function() {
    // Clear previous options
    optionSelect.innerHTML = '<option value="" disabled selected>-- Seleziona carico --</option>';
    
    // Get the selected group
    const selectedGroup = this.value;

    // Populate the second select based on the selected group
    if (selectedGroup) {
        options[selectedGroup].forEach(option => {
            const newOption = document.createElement('option');
            newOption.value = option;
            newOption.textContent = option;
            optionSelect.appendChild(newOption);
        });
        optionSelect.disabled = false; // Enable the second select
    } else {
        optionSelect.disabled = true; // Disable if no group is selected
    }
});

function alertLoadUnassigned(){
    alert("Tipo di trave o di carico non assegnato.")
}

// function to update the image based on the option selected in the first beam menu
function updateMenu() {
    const selectedGroup = document.getElementById("group").value;
    console.log(selectedGroup)
    const dynamicImage = document.getElementById("dynamicImage");
  
    // Update based on selected option
    if (selectedGroup === "simpleBeam") {
      dynamicImage.src = "./images/SimpleBeam.png";
    } else if (selectedGroup === "fixedBeam") {
      dynamicImage.src = "./images/FixedBeam.png";
    } else if (selectedGroup === "cantilever") {
        dynamicImage.src = "./images/Cantilever.png";
      } else if (selectedGroup === "fixedSimpleBeam") {
        dynamicImage.src = "./images/FixedSimpleBeam.png";
      }

    document.getElementById("the_button").onclick = alertLoadUnassigned;

    const dynamicLabel = document.getElementById("dynamicLabel");
    const dynamicUnit = document.getElementById("dynamicUnit");
    dynamicLabel.textContent = "";
    dynamicUnit.textContent = "";
}

// Function to update the image, label, and unit based on the selected option
// Possible options: "Carico uniforme", "Carico lineare", "Forza concentrata", "Coppia concentrata"
function updateSubmenu() {
    const selectedOption = document.getElementById("option").value;
    const selectedGroup = document.getElementById("group").value;

    const dynamicImage = document.getElementById("dynamicImage");
    const dynamicLabel = document.getElementById("dynamicLabel");
    const dynamicUnit = document.getElementById("dynamicUnit");
  
    // Update based on selected option
    if (selectedOption === "Carico uniforme") {
        dynamicLabel.textContent = "Carico distribuito (q):";
        dynamicUnit.textContent = "\\( kN / m \\)";
    } else if (selectedOption === "Carico lineare") {
        dynamicLabel.textContent = "Carico lineare (q):";
        dynamicUnit.textContent = "\\( kN / m \\)";
    } else if (selectedOption === "Carico lineare") {
        dynamicLabel.textContent = "Forza concentrata (F):";
        dynamicUnit.textContent = "\\( kN \\)";
    } else if (selectedOption === "Carico lineare") {
        dynamicLabel.textContent = "Coppia conncetrata (C):";
        dynamicUnit.textContent = "\\( kN \cdot m \\)";
    }
        
    MathJax.typesetPromise([dynamicUnit]).catch((err) => console.log(err.message));  // serve per forzare l'utilizzo di latex

    if (selectedGroup === "simpleBeam") {
        if (selectedOption === "Carico uniforme") {
            dynamicImage.src = "./images/SimpleBeamUniformLoad.png";
            document.getElementById("the_button").onclick = computeSimpleBeamUniformLoad;
        } else if (selectedOption === "Carico lineare") {
            return
        } else if (selectedOption === "Forza concentrata") {
            return
        } else if (selectedOption === "Coppia conncetrata") {
            return
        }
    } else if (selectedGroup === "fixedBeam") {
        if (selectedOption === "Carico uniforme") {
            dynamicImage.src = "./images/FixedBeamUniformLoad.png";
            document.getElementById("the_button").onclick = computeFixedBeamUniformLoad;
        } else if (selectedOption === "Carico lineare") {
            return
        } else if (selectedOption === "Forza concentrata") {
            return
        } else if (selectedOption === "Coppia conncetrata") {
            return
        }
        
    } else if (selectedGroup === "fixedSimpleBeam") {
        if (selectedOption === "Carico uniforme") {
            dynamicImage.src = "./images/FixedSimpleBeamUniformLoad.png";
            document.getElementById("the_button").onclick = computeFixedSimpleBeamUniformLoad;
        } else if (selectedOption === "Carico lineare") {
            return
        } else if (selectedOption === "Forza concentrata") {
            return
        } else if (selectedOption === "Coppia conncetrata") {
            return
        }
        
    } else if (selectedGroup === "cantilever") {
        if (selectedOption === "Carico uniforme") {
            dynamicImage.src = "./images/CantileverUniformLoad.png";
            document.getElementById("the_button").onclick = computeCantileverUniformLoad;
        } else if (selectedOption === "Carico lineare") {
            return
        } else if (selectedOption === "Forza concentrata") {
            return
        } else if (selectedOption === "Coppia conncetrata") {
            return
        }
        
    }
}