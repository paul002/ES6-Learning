'use strict';

var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {

    var monthlyRate = 0;

    if (rate) {

        monthlyRate = rate / 100 / 12;
    }
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
    return { principal: principal, years: years, rate: rate, monthlyPayment: monthlyPayment, monthlyRate: monthlyRate };
};

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;

    var _calculateAmortization = calculateAmortization(principal, years, rate);

    var monthlyPayment = _calculateAmortization.monthlyPayment;
    var monthlyRate = _calculateAmortization.monthlyRate;
    var amortization = _calculateAmortization.amortization;

    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);

    // Template string to output Contents in the Table
    var html = "";
    amortization.forEach(function (year, index) {
        return html += '\n    <tr>\n        <td>' + (index + 1) + '</td>\n        <td class="currency">' + Math.round(year.principalY) + '</td> \n        <td class="stretch">\n            <div class="flex">\n                <div class="bar principal" \n                     style="flex:' + year.principalY + ';-webkit-flex:' + year.principalY + '">\n                </div>\n                <div class="bar interest" \n                     style="flex:' + year.interestY + ';-webkit-flex:' + year.interestY + '">\n                </div>\n            </div>\n        </td>\n        <td class="currency left">' + Math.round(year.interestY) + '</td> \n        <td class="currency">' + Math.round(year.balance) + '</td>\n    </tr>\n';
    });
    document.getElementById("amortization").innerHTML = html;
});

// Amortization Computation (formula)

var calculateAmortization = function calculateAmortization(principal, years, rate) {
    var _calculateMonthlyPayment = calculateMonthlyPayment(principal, years, rate);

    var monthlyRate = _calculateMonthlyPayment.monthlyRate;
    var monthlyPayment = _calculateMonthlyPayment.monthlyPayment;

    var balance = principal;

    var amortization = [];

    for (var y = 0; y < years; y++) {

        var interestY = 0; // interest payment for year Y
        var principalY = 0; // Principal payment for year Y

        for (var m = 0; m < 12; m++) {

            var interestM = balance * monthlyRate; // Interest payment for month
            var principalM = monthlyPayment - interestM; //Principal payment for Month M

            interestY = interestY + interestM;

            principalY = principalY + principalM;

            balance = balance - principalM;
        }

        amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
    }

    return { monthlyPayment: monthlyPayment, monthlyRate: monthlyRate, amortization: amortization };
};
