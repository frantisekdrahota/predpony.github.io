document.getElementById('prevodPredpon').addEventListener('submit', function (e) {
    e.preventDefault();

    var inputValue = parseFloat(document.getElementById('value').value);
    var zPredpony = document.getElementById('zPredpony').value;
    var doPredpony = document.getElementById('doPredpony').value;
    const prefixes = {
        'yokto': -24, 
        'zepto': -21, 
        'atto': -18, 
        'femto': -15, 
        'piko': -12,
        'nano': -9, 
        'mikro': -6, 
        'mili': -3, 
        ' ': 0,
        'kilo': 3, 
        'mega': 6, 
        'giga': 9, 
        'tera': 12,
        'peta': 15, 
        'exa': 18, 
        'zetta': 21, 
        'yotta': 24,
    };
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

    var koeficient = inputValue;
    if (koeficient > 0) {
        while (koeficient >= 10) {
            if (koeficient >= 10) {
                koeficient /= 10;
                y += 1;
            } else {
                break;
            }
        }
    } else {
        while (koeficient <= -10) {
            if (koeficient <= -10) {
                koeficient /= 10;
                y += 1;
            } else {
                break;
            }
        }
    }

    var matematickyZapis = result + y;

    if (matematickyZapis !== 0) {
        document.getElementById('vysledek').innerHTML =
            inputValue + ' ' + zPredpony + ' je rovno ' + koeficient + " × 10<sup>" + matematickyZapis + '</sup> ' + doPredpony;
    } else {
        document.getElementById('vysledek').innerHTML =
            inputValue + ' ' + zPredpony + ' je rovno ' + koeficient + " " + doPredpony;
    }
});