let calculateMonthlyPayment = (principal, years, rate) => {

    let monthlyRate = 0;

    if (rate) {

        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
};

document.getElementById('calcBtn').addEventListener('click', () => {
    let principal = document.getElementById("principal").value;
    let years = document.getElementById("years").value;
    let rate = document.getElementById("rate").value;
    let {monthlyPayment, monthlyRate, amortization} = calculateAmortization(principal, years, rate);
    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);

// Template string to output Contents in the Table
let html = "";
amortization.forEach((year, index) => html += `
    <tr>
        <td>${index + 1}</td>
        <td class="currency">${Math.round(year.principalY)}</td> 
        <td class="stretch">
            <div class="flex">
                <div class="bar principal" 
                     style="flex:${year.principalY};-webkit-flex:${year.principalY}">
                </div>
                <div class="bar interest" 
                     style="flex:${year.interestY};-webkit-flex:${year.interestY}">
                </div>
            </div>
        </td>
        <td class="currency left">${Math.round(year.interestY)}</td> 
        <td class="currency">${Math.round(year.balance)}</td>
    </tr>
`);

document.getElementById("amortization").innerHTML = html;

});


// Amortization Computation (formula)

let calculateAmortization = (principal, years, rate) => {

    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);

    let balance = principal;

    let amortization = [];

    for (let y = 0; y < years; y++) {

        let interestY = 0; // interest payment for year Y
        let principalY = 0; // Principal payment for year Y

        for (let m = 0; m < 12; m++) {

            let interestM = balance * monthlyRate; // Interest payment for month
            let principalM = monthlyPayment - interestM; //Principal payment for Month M

            interestY = interestY + interestM;

            principalY = principalY + principalM;

            balance = balance - principalM;
        }

        amortization.push({principalY, interestY, balance});
    }

    return {monthlyPayment, monthlyRate, amortization};
};