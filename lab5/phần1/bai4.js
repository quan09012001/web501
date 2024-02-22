var person = {
    firstname: "Albert",
    lastname: "Einstenin",
    setLastName: function(ho_lastname){
        this.lastname= ho_lastname;
    },
    setFirstName: function(ten_fristname){
        this.firstname = ten_fristname;
    },
getFullName: function(){
    return this.firstname + " " + this.lastname;
    }
};
person.setLastName('Newton');
person.setFirstName('Issac');
console.log(person.getFullName());