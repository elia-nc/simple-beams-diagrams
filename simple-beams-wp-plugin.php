<?php
/*
Plugin Name: Simple Beams Diagram
Description: Plugin per il calcolo e la rappresentazione delle sollecitazioni in semplici schemi statici.
Version: 1.0
Author: Not Collapsed
*/

function simple_beams_enqueue_scripts() {
    // Carica CSS e JavaScript del plugin
    wp_enqueue_style('simple-beams-style', plugins_url('style.css', __FILE__));
    wp_enqueue_script('simple-beams-chart', plugins_url('js/chart.js', __FILE__), array(), null, true);
    wp_enqueue_script('simple-beams-computation', plugins_url('js/computation.js', __FILE__), array(), null, true);
    wp_enqueue_script('simple-beams-units', plugins_url('js/units.js', __FILE__), array(), null, true);
    wp_enqueue_script('simple-beams-user-interface', plugins_url('js/user-interface.js', __FILE__), array(), null, true);

    wp_enqueue_script('chart-js', plugins_url('https://cdn.jsdelivr.net/npm/chart.js', __FILE__), array(), null, true);
    wp_enqueue_script('mathjax', plugins_url('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js', __FILE__), array(), null, true);
}
add_action('wp_enqueue_scripts', 'simple_beams_enqueue_scripts');

// Shortcode per visualizzare il convertitore
function simple_beams_shortcode() {
    ob_start();
    ?>

    <!-- AREA IN CUI VA COPIATO IL CODICE HTML -->

    <div class="container">
    <div class="column left-column">
      <img src="" class="column-image" id="dynamicImage">
      <div class="option-menu">
        <form id="groupForm">
          <label for="group">Tipo di trave: </label>
          <select id="group" onchange="updateMenu()">
              <option value="" selected disabled>-- Seleziona trave --</option>
              <option value="simpleBeam">Trave appoggiata</option>
              <option value="fixedBeam">Trave incastrata</option>
              <option value="fixedSimpleBeam">Trave incastro - appoggio</option>
              <option value="cantilever">Trave a mensola</option>
          </select>
        </form>

        <form id="optionForm">
          <label for="option">Tipo di carico: </label>
          <select id="option" disabled onchange="updateSubmenu()">
              <option value="">-- Seleziona carico --</option>
          </select>
        </form>
      </div>
      
      <h3>Input Data</h3>

      <div class="input-group">
        <span class="label" id="dynamicLabel"></span>
        <input type="number" class="input-field" placeholder="Enter number 1" id="input1">
        <span class="unit" id="dynamicUnit"></span>
      </div>
      <div class="input-group">
        <span class="label">Lunghezza (L):</span>
        <input type="number" class="input-field" placeholder="Enter number 2" id="input2">
        <span class="unit" id="beamLengthUnit"></span>
      </div>
      <div class="input-group">
        <span class="label">Momento d'inerzia (J):</span>
        <input type="number" class="input-field" placeholder="Enter number 3" id="input3">
        <span class="unit" id="inertiaUnit"></span>
      </div>
      <div class="input-group">
        <span class="label">Modulo di elasticità (E):</span>
        <input type="number" class="input-field" placeholder="Enter number 4" id="input4">
        <span class="unit" id="elasticityUnit"></span>
      </div>

      <button class="full-width-button" id="the_button" onclick="alertLoadUnassigned()">Calcola</button>

      <form id="unitForm">
        <div class="unit-menu">
          <label>Scegli unità di misura: </label>
          <select id="forceUnitMenu" onchange="updateUnitOfMeasure()">
            <option value="kN" selected>kN</option>
            <option value="daN">daN</option>
            <option value="N">N</option>
          </select>
          <select id="lengthUnitMenu" onchange="updateUnitOfMeasure()">
            <option value="m" selected>m</option>
            <option value="cm">cm</option>
            <option value="mm">mm</option>
          </select>
        </div>
    </form>

      <div class="output-group">
        <h3>Output Data</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: center; line-height: 2;">
          <p class="output">\( T_{max}= \)<span id="Tmax">_____</span> <span id="shearUnit"></span></p>
          <p class="output">\( D_{max}= \)<span id="Dmax">_____</span> <span id="defUnit"></span></p>
          <p class="output">\( M_{max}^{(+)}= \)<span id="Mmax_pos">_____</span> <span id="posMomUnit"></span></p>
          <p class="output">\( M_{max}^{(-)}= \)<span id="Mmax_neg">_____</span> <span id="negMomUnit"></span></p>
        </div>
            
      </div>
    </div>
    
    <div class="column right-column">
      <div id="chartContainer">
        <h3>Diagrammi</h3>
        <div id="chartContainer1">      
          <h4>Taglio (T)</h4>
          <canvas id="Chart1"></canvas>
        </div>
        <div id="chartContainer2">
          <h4>Momento flettente (M)</h4>
          <canvas id="Chart2"></canvas>
        </div>
        <div id="chartContainer3">
          <h4>Deformata (D)</h4>
          <canvas id="Chart3"></canvas>
        </div>
      </div>
    </div>
  </div>
   
    <!-- FINE AREA IN CUI VA COPIATO IL CODICE HTML -->

    <?php
    return ob_get_clean();
}

// il primo argomento è lo shortcode con cui richiamare il plugin, 
// il secondo è la funzione tra quelle definite qua sopra (un plugin può avere più funzioni)
add_shortcode('simple_beams', 'simple_beams_shortcode');
