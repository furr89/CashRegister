const billAmount = new Map([
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.10],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
]);

function checkCashRegister(price, cash, cid) {
    
    let targetChange = cash - price;
    let returnedChange = 0;

    // Initialise sum of cid and change for output
    let sumOfcid = 0;
    const change = [];
    const cidCopy = [];

    let currentChange = targetChange;
    for (const i in cid.reverse()) {

        // Make a copy of the original cid while already in the loop
        cidCopy.unshift([cid[i][0], cid[i][1]]);

        //Initialise a current bill
        let currentBill = [];
        currentBill = [cid[i][0], 0];

        if ((currentChange - billAmount.get(cid[i][0])) >= 0) {

            //while loop condition: as long as there are bills left in the cid (for the particular type) keep looping
            while (cid[i][1] > 0) {

                // If the bill will be returing more than required, break
                if ((currentChange - billAmount.get(cid[i][0])) < 0) {
                    break;
                }
                else {

                    // Add the amount returned 
                    currentBill[1] += billAmount.get(cid[i][0]);

                    // Substract from the cid and substract from the current change
                    cid[i][1] -= billAmount.get(cid[i][0]);
                    currentChange -= billAmount.get(cid[i][0]);

                    // Handles the extra decimal points being added
                    cid[i][1] = cid[i][1].toFixed(2);
                    currentChange = currentChange.toFixed(2);
                }

            }

            // Handles decimal points and adds current bill to total amount of returned change
            currentBill[1] = +currentBill[1].toFixed(2);
            returnedChange += currentBill[1];

            returnedChange = +returnedChange.toFixed(2);
            change.push(currentBill);
        }
        
        sumOfcid += parseFloat(cid[i][1]);

        // Stop the loop if the required change has been met 
        if (currentChange == 0) { break; } 
        
    }
    
    // If required change has been returned but the cid is empty
    if (returnedChange == targetChange && sumOfcid <= 0) {

        console.log("CLOSED");
        console.table(cidCopy);
        return {status: "CLOSED", change: cidCopy};
    }

    // If required change has been returned and there is cash left in the cid
    else if (returnedChange == targetChange && sumOfcid > 0) {

        console.log("OPEN");
        console.table(change);
        return {status: "OPEN", change: change};
    }

    // If exact change cannot be returned or there is not enough in cid
    else {
        console.log("INSUFFICIENT_FUNDS");
        console.table([]);
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

}


// Should return {status: "OPEN", change: [["QUARTER", 0.5]]}.
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 

// Should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 

// Should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 

// Should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 

// Should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
