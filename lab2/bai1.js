// var li = (obj) => `<li class="text-warning"> ${obj}<li/>`;

// var ul = (arr) => `<li>${arr.map((obj) => li(obj)).join('\n')}</li>`;

// const result = {
//     success: ["max-length", "no-amd", "prefer-arrow-functions"],
//     failure: ["no-var", "var-on-top", "linebreak"],
//     skipped: ["no-extra-semi", "no-dup-keys"]
// };

// function makeList(arr) {
//     return ul(arr.map(item => ({ label: item })));
// }

// const failuresList = makeList(result.failure);
// console.log(failuresList);


const result = {
    success: ["max-length", "no-amd", "prefer-arrow-functions"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["no-extra-semi", "no-dup-keys"]
}
function makeList(arr){
    const failureItems = [];
    for (const element of arr){
        failureItems.push(`<li class='text-warning>${element}</li>`);

    }
    return failureItems;

}
const failureItems = makeList(result.success);
console.log (failureItems.join("\n"));