class Account {

  //all accounts will start with this
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;

    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  //this is common to both types of transactions
  //amount = amount transacted
  //account = object created with the Account class (stored in a variable)
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {

    if (this.isAllowed()) {
      // //will add or subtract the amount transacted - obsolete
    // this.account.balance += this.value;
    //keep track of the time of transaction
      this.time = new Date();
      //this replaces the earlier adding of this.value to the balance
      //because addTransaction adds it to the array
      //and get balance updates the balance
      this.account.addTransaction(this);
    } else {
      return false;
    }
  }

}

class Deposit extends Transaction {

  //the amount transacted
  get value() {
    return this.amount;
  }

  isAllowed() {
    if (this.amount > 0) {
      return true;
    }
  }
}

class Withdrawal extends Transaction {

  //the amount transacted
  get value() {
    return -this.amount;
  }

  isAllowed() {
    if (this.amount <= this.account.balance) {
      return true;
    }
  }
}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log('Account:', myAccount);
console.log('Starting Balance:', myAccount.balance);
console.log('----');

const t1 = new Deposit(120.00, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log('Updated Balance:', myAccount.balance);
console.log('----');

const t2 = new Withdrawal(50.25, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log('Updated Balance:', myAccount.balance);
console.log('----');

const t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log('Updated Balance:', myAccount.balance);
console.log('----');

console.log('Ending Balance:', myAccount.balance);
