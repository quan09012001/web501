// var fs = require('fs');
// var axios = require('axios');

// fs.readFile(
//     './data.json',
//     { encoding: 'utf8'},
//     function(er, data) {
//         console.log('Data loaded from disk', data);

//         axios.get('https://jsonplaceholder.typicode.com/todos/1')
//             .then(function(res) {
//                 console.log('Data downloaded from url', res.data);
//             });
//     }
// );



const fs = require('fs');
const axios = require('axios');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

async function main() {
  try {
    const data = await readFileAsync('./data.json', { encoding: 'utf8' });
    console.log('Data loaded from disk', data);

    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log('Data downloaded from url', res.data);
  } catch (err) {
    console.error(err);
  }
}

main();