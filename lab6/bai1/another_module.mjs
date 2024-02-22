// another_module.js

// Import hai hàm từ your_module.js
import { uppercaseString, lowercaseString } from './your_module.mjs';

// Sử dụng các hàm
const exampleString = 'Hello, World!';
const uppercased = uppercaseString(exampleString);
const lowercased = lowercaseString(exampleString);

console.log('Original String:', exampleString);
console.log('Uppercased String:', uppercased);
console.log('Lowercased String:', lowercased);
