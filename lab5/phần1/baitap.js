 class Account {

// hàm khởi tạo 
    constructor(accountNo,password, balance, interest,lastDay){
        this.AccountNo= accountNo;
        this.Password = password;
        this.Balance = balance;
        this.Interest = interest;
        this.LastDay = lastDay;
    }
    new (){
        console.log("Creating a new account...");
    }
}
// lớp con 1: FixedAccount
class FixedAccount extends Account{
    constructor(accountNo, password, balance, interest, lastDay, term){
        // gọi constructor của lớp cha
        super(accountNo, password, balance, interest, lastDay);
        this.Term = term;
    }
    //phương thức Display của lớp con fixedAccount
    Display (){
        console.log(`Account No: ${this. AccountNo}`);
        console.log(`Balance: ${this.Balance}`);
        console.log(`Term: ${this.Test}`);
    }
}
//lớp con 2: SavingAccount
class SavingAccount extends Account {
    constructor(accountNo, password, balance, interest, lastDay, miniumValue){
        // gọi constructor của lớp cha
        super(accountNo,password,balance,interest,lastDay);
        this.MiniumValue = miniumValue;
    }
    //phương thức Display của lớp SavingAccount
    Display(){
        console.log(`Account No: ${this.AccountNo}`);
        console.log(`Balance: ${this.Balance}`);
        console.log(`Minium value: ${this.MiniumValue}`);
    }
    // phương thức InteresAmount của lớp con SavingAccount
    InteresAmount(today) {
        const interesAmount = this.Balance * this.Interest * (today - this.LastDay);
        console.log (`Interes Amount: ${interesAmount}`);
    }
}
//lớp Test

class Test {
    constructor(){
        // khởi tạo đối tượng FixedAccount
        const fixedAccount = new FixedAccount ("123456", "pass123", 1000, 0.05, new Date(),12);

        // khởi tạo đối tượng SavingAccount

        const savingAccount = new SavingAccount("78012","pass456", 2000, 0.03, new Date(), 500);

        // gọi phương thức Display của FixedAccount
        fixedAccount.Display();

        //gọi phương thức Display của SavingAccount
        savingAccount.Display();

        // gọi pguongw thức InteresAmount của SavingAccount
        savingAccount.InteresAmount(new Date());

    }
}

// khởi tạo đối tượng Test để thực hiện kiểm tra 
const test = new Test();