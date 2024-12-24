// Function to calculate the total, updated tip, and rounded total
function calculateTotalWithRoundingAddedToTip(billAmount, taxAmount, tipPercentage) {
    // Validate tip percentage
    if (isNaN(tipPercentage) || tipPercentage <= 0) {
        alert("Please enter a valid tip percentage.");
        return null;
    }

    // Step 1: Calculate the tip based on the bill amount only
    let tip = billAmount * (tipPercentage / 100);

    // Step 2: Calculate the preliminary total (bill + tax + tip)
    let preliminaryTotal = billAmount + taxAmount + tip;

    // Step 3: Round up to the next whole number
    let roundedTotal = Math.ceil(preliminaryTotal);

    // Step 4: Add the rounding difference to the tip amount
    let roundingDifference = roundedTotal - preliminaryTotal;
    let updatedTip = tip + roundingDifference;

    return { roundedTotal, updatedTip, preliminaryTotal, tip };
}

// Handle form submission or custom tip change
document.getElementById("calculate-button").addEventListener("click", function() {
    let billAmount = parseFloat(document.getElementById("bill-amount-input").value);
    let taxAmount = parseFloat(document.getElementById("tax-amount-input").value);
    let tipPercentage = parseFloat(document.getElementById("tip-percentage").value);

    // Validate inputs for bill and tax
    if (isNaN(billAmount) || isNaN(taxAmount)) {
        alert("Please enter valid numeric values for bill and tax.");
        return;
    }

    // Handle custom tip
    if (document.getElementById("tip-percentage").value === "") {
        // Custom tip
        let customTip = parseFloat(document.getElementById("custom-tip").value);
        if (isNaN(customTip) || customTip <= 0) {
            alert("Please enter a valid custom tip percentage.");
            return;
        }
        tipPercentage = customTip;  // Update tipPercentage with custom input
    }

    // Call the calculation function
    let result = calculateTotalWithRoundingAddedToTip(billAmount, taxAmount, tipPercentage);
    if (result) {
        // Update Bill Amount and Breakdown
        document.getElementById("bill-amount").innerText = `$${(billAmount + taxAmount).toFixed(2)}`; // Bill Amount + Tax with $
        document.getElementById("bill-breakdown").innerText = `Bill: $${billAmount.toFixed(2)} + Tax: $${taxAmount.toFixed(2)}`; // Breakdown: (Bill + Tax)

        // Update Updated Tip, Rounded Total, and Tip Percentage
        document.getElementById("updated-tip").innerText = `$${result.updatedTip.toFixed(2)}`;
        document.getElementById("updated-tip-breakdown").innerText = `Original Tip: $${result.tip.toFixed(2)}`; // Original tip without rounding

        // Update Tip Percentage breakdown (actual percentage)
        let actualTipPercentage = (result.updatedTip / billAmount) * 100;
        document.getElementById("tip-percentage-display").innerText = `${tipPercentage}%`; // Display chosen percentage
        document.getElementById("tip-percentage-breakdown").innerText = `Actual Tip Percentage: ${actualTipPercentage.toFixed(2)}%`; // Actual percentage

        // Update Rounded Total and Breakdown
        document.getElementById("rounded-total").innerText = `$${result.roundedTotal}`;
        document.getElementById("rounded-total-breakdown").innerText = `Total without rounding: $${result.preliminaryTotal.toFixed(2)}`; // Total without rounding
    }
});

// Show custom tip input field when "Custom" option is selected
document.getElementById("tip-percentage").addEventListener("change", function() {
    let customTipField = document.getElementById("custom-tip");
    if (this.value === "") {
        customTipField.style.display = "block"; // Show custom tip input
    } else {
        customTipField.style.display = "none"; // Hide custom tip input
    }
});
