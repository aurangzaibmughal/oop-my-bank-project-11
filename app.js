#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful.Remaining balance: $${this.balance}`);
        }
        else {
            console.log(chalk.red("Insufficient Balance.\n"));
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited.
        }
        this.balance += amount;
        console.log(`Desposit of $ ${amount} Successful,Remaining balance: $ ${this.balance}`);
    }
    // Check Balance
    checkBalance() {
        console.log(chalk.yellow(`Current Balance: $ ${this.balance}`));
    }
}
// Customar class
class Customar {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Bank Accounts 
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Create Customers
const customers = [
    new Customar("Ibrahim", "Mughal", "Male", 12, 3182359381, accounts[0]),
    new Customar("Shumaila", "Mughal", "female", 35, 33332359381, accounts[1]),
    new Customar("Aurangzaib", "Mughal", "Male", 45, 33332359381, accounts[2]),
];
// Function to interact with the bank account 
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number: ",
        });
        const Customar = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (Customar) {
            console.log(chalk.blue(`\n\tWelcome, ${Customar.firstName} ${Customar.lastName}\n`));
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Deposit:"
                    });
                    Customar.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        type: "number",
                        name: "amount",
                        message: "Enter the amount to Withdraw?"
                    });
                    Customar.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    Customar.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.green.bold("\n\tExiting the bank program...\n"));
                    console.log(chalk.green.bold("\n\tThankyou for banking with us. Have a nice day!\n"));
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.\n");
        }
    } while (true);
}
service();
