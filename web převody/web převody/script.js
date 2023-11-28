const prefixes = {
    'yokto': -24, 
    'zepto': -21, 
    'atto': -18, 
    'femto': -15, 
    'piko': -12,
    'nano': -9, 
    'mikro': -6, 
    'mili': -3, 
    '': 0,
    'kilo': 3, 
    'mega': 6, 
    'giga': 9, 
    'tera': 12,
    'peta': 15, 
    'exa': 18, 
    'zetta': 21, 
    'yotta': 24,
};

var koeficient;
var matematickyZapis;
var doPredpony;
var zaokrouhlení;
var pocitadlo = 0;

var pocitadloElement = document.getElementById("pocitadloValue");

document.addEventListener("DOMContentLoaded", function () {
    getRandomPrefixes();
    
});

var buttonElements = document.querySelectorAll(".buttonOdpoved");

function resetButtons() {
    
    for (var i = 0; i < buttonElements.length; i++) {
        buttonElements[i].classList.remove('correct', 'incorrect');
    }
}




for (var i = 0; i < 4; i++) {
    buttonElements[i].addEventListener('click', function (event) {
        event.preventDefault();
        var selectedAnswer = event.target.innerHTML;

        if (selectedAnswer === zaokrouhlení + " × 10<sup>" + matematickyZapis + '</sup> ' + doPredpony) {
            event.target.classList.add('correct');
            getRandomPrefixes();
            pocitadlo += 1;
            updatePocitadloDisplay();
        } else {
            event.target.classList.add('incorrect');
            pocitadlo = 0;
            updatePocitadloDisplay();
        }

        
        
    });
}

function updatePocitadloDisplay() {
    pocitadloElement.innerHTML = pocitadlo;
}




function getRandomPrefixes() {
    updatePocitadloDisplay();
    resetButtons();
    var prefixKeys = Object.keys(prefixes);
    var randomIndex1 = Math.floor(Math.random() * prefixKeys.length);
    var randomIndex2 = Math.floor(Math.random() * prefixKeys.length);
    var num = Math.floor(Math.random() * 99);
    let x = Math.floor((Math.random() * 9));
    x /= 10;
    var prefix1 = prefixKeys[randomIndex1];
    var prefix2 = prefixKeys[randomIndex2];
    var number = (num * 1) + (x * 1);

    var otazkaElement = document.getElementById("otazka");
    otazkaElement.innerHTML = "Převeď: " + number + " " + prefix1 + " do " + prefix2;

    var inputValue = number;
    var zPredpony = prefix1;
    doPredpony = prefix2;
    var result = 0;
    var y = 0;

    while (prefixes[zPredpony] !== undefined && prefixes[doPredpony] !== undefined) {
        if (prefixes[zPredpony] > prefixes[doPredpony]) {
            result += 1;
            prefixes[zPredpony] -= 1;
        } else if (prefixes[zPredpony] < prefixes[doPredpony]) {
            result -= 1;
            prefixes[zPredpony] += 1;
        } else {
            break;
        }
    }

    koeficient = inputValue; 
    if (koeficient > 0) {
        while (koeficient >= 10) {
            koeficient /= 10;
            y += 1;
        }
    } else {
        while (koeficient <= -10) {
            koeficient /= 10;
            y += 1;
        }
    }

    matematickyZapis = result + y;
    zaokrouhlení = inputValue.toString();
    zaokrouhlení = formatNumber(zaokrouhlení);
           
        
    
    var a = zaokrouhlení + " × 10<sup>" + matematickyZapis + '</sup> ' + doPredpony;
    var spatneOdpovedi = a;
    var options = [spatneOdpovedi];

   
    while (options.length < 4) {
        var randomIncorrectAnswer = generateRandomIncorrectAnswer();
        if (!options.includes(randomIncorrectAnswer)) {
            options.push(randomIncorrectAnswer);
        }
    }

    options = promichat(options);

    function generateRandomIncorrectAnswer() {
        var spatnyExponent = Math.floor(Math.random() * 48); 
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        spatnyExponent *= plusOrMinus;
        return zaokrouhlení + " × 10<sup>" + spatnyExponent + '</sup> ' + doPredpony;
    }

    for (var i = 0; i < 4; i++) {
        buttonElements[i].innerHTML = options[i];
    }
}

function promichat(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function formatNumber(inputString) {
    if (inputString) {
        var parts = inputString.split('.');
        if (parts.length !== 2) {
            return inputString;
        }
        var integerPart = parts[0];
        var decimalPart = parts[1];
        
        
        
        var threedigits = integerPart + decimalPart;
       
        
        if (threedigits.includes('-')){
            formattedString = "-" + threedigits[1] + '.' + threedigits.slice(2);
            return formattedString;
        } else {
            var formattedString = threedigits[0] + '.' + threedigits.slice(1);
            return formattedString;
        }
    
        
        
    } 
}
