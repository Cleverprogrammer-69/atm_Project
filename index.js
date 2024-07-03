import inquirer from "inquirer";
async function main() {
    let balance = 20000; // Initial balance
    const user = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: "Enter userId here:",
        },
        {
            type: "number",
            name: "userPin",
            message: "Enter your pin here:",
        },
        {
            type: "list",
            name: "accountType",
            choices: ["Saving", "Current"],
            message: "Please select your account type:",
        },
    ]);
    let continueTransactions = true;
    while (continueTransactions) {
        const transaction = await inquirer.prompt([
            {
                type: "list",
                name: "transactionType",
                choices: ["Deposit", "Withdraw"],
                message: "Please select transaction type",
            },
            {
                type: "number",
                name: "amount",
                message: "Please enter the amount",
            },
        ]);
        if (transaction.transactionType === "Deposit") {
            balance += transaction.amount;
        }
        if (transaction.transactionType === "Withdraw") {
            if (balance >= transaction.amount) {
                balance -= transaction.amount;
            }
            else {
                console.log("Your withdraw request exceeds the limits of your account");
            }
        }
        console.log(`Updated balance: ${balance}`);
        const { exitOrContinue } = await inquirer.prompt([
            {
                type: "list",
                name: "exitOrContinue",
                message: "Do you want to exit or continue?",
                choices: ["Y", "N"],
            },
        ]);
        if (exitOrContinue === "Y") {
            continueTransactions = false;
        }
    }
}
main();
