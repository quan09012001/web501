// class Animal{
// // propertu
//     // constructor(){
//     //     this.name = ' ';
//     //     this.color = ' ';
//     // }
//     // var name;
//     // var color;
//     constructor(name,color){
//     this.name =name;
//     this.color = color;
//     }




//      Eat (){

//     }
// }

// // let meo1 = new Animal();
// // console.log(meo1.name);
// // console.log(meo1.color);

// let meo = new Animal('lisa', 'yellow');
// console.log (meo.name);
// console.log(meo.color);


// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
//     speak() {
//         console.log(this.name + 'makes a noise.');
//     }
// }
  
// class Dog extends Animal {
//     speak(){
//         console.log(this.name ='barks');
//     }
// }

// var d = new Dog ('Mitzie');
// d.speak();



<!doctype html>
<script>

  function Clock({ template }) {
  
    let timer;
  
    function render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    this.stop = function() {
      clearInterval(timer);
    };
  
    this.start = function() {
      render();
      timer = setInterval(render, 1000);
    };
  
  }
  
  let clock = new Clock({template: 'h:m:s'});
  clock.start();

</script>

</html>