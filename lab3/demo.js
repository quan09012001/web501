// function * swimming (number) {
//     yield number;
//     yield number + 2
//     yield number +5
// }
// let s = swimming(10)
// console.log (s.next())

// console.log (s.next())

// console.log (s.next())


// function* getCountdownIterator (number) {
//     let i;
//     for (i=number; i>= 1; i--){
//         yield i;
//     }
// }

// console.log ([...getCountdownIterator(9)]);


// YÊU CẦU: VIẾT LẠI NÀY SỬ DỤNG GENERATOR FUNCTION


// const obj = {
//     blog: "Frontend",
//     categories: ["ReactJS", "JavaScript", "TypeScript"],
//     isFrontEndBlog: true,
// };

// obj [Symbol.iterator] = function () {
//     let i= 0;
//     let values = Object.values(this);

//     return {
//         next: () => {
//             return {
//                 values: values[i++],
//                 done: i > values.length,
//             };
//         },
//     };
// };    


const obj = {
    blog: "Frontend",
    categories: ["ReactJc", "JavaScript", "TypeScript"],
    isFrontEndBlog: true,

    *[Symbol.iterator](){
        const values = Object.values(this);

        for (let index = 0; index <values.length; index++) {
            const element = values[index];

            yield element;
        }
    },
};
for (const a of obj) {
    console.log (e);
}