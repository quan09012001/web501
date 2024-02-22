// var Entity = function (name, delay) {
//     this.name = name;
//     this.delay = delay;
// }
// Entity.prototype.greet = function (){
//     setTimeout(function(){
//         console.log ('xin chào, tên tôi là', this.name);
//     }.bind(this), this.delay);
// }

// var java = new Entity('Java', 5000);
// var cpp = new Entity ('C++, 30');

// java.greet();
// cpp.greet();

const Entity = function (name, delay){
    this.name = name;
    this.delay = delay;
}
Entity.prototype.greet = function (){
    setTimeout(()=>{
        console.log ('Xin chào tên tôi là', this.name);
    }, this.delay);
}

const java = new Entity ('Hân Hân', 5000);
const cpp = new Entity ('Yang Yang', 30);
java.greet();
cpp.greet();


// ---------------------------------------------------- //

var Entity2 = function(name, delay) {
    this.name = name;
    this.delay = delay;
    this.greet = () => {
        setTimeout(()=>{
            console.log('Xin chào, tôi tên là ', this.name);
        }, this.delay);
    };
};