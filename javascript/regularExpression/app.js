// let re;
// re = /hello/;
// re = /hello/i; // i = case insensitive
// re = /hello/g; // g = global search

// console.log(re);
// console.log(re.source)

// exec() - Return result in an array or null
// const result = re.exec('Brad hello world')

// console.log(result)
// console.log(result[0])
// console.log(result.index)
// console.log(result.input)

// test() - Returns true or flase
// const result = re.test('Hello'); // --> false due to case sensitive
// console.log(result)


// match()  - Return result array or null
// const str = 'Hello There'
// const result = str.match(re);
// console.log(result)

// search() - Returns index of the first match,
// but if not found returns -1
// const str = 'Ådne Hello there';
// const result = str.search(re);
// console.log(result);

// replace() - Return new string with some or all matches
// of the a pattern
// const str = 'Hello there';
// const newStr = str.replace(re, 'Hi');
// console.log(newStr)


// PART TWO: Metacharacter symbols
let re;
// Literal Characters
re = /hello/;
re = /hello/i;

// MetaCharacter symbols
re = /^h/i        // Must start with
re = /world$/i    // Must end with
re = /^hello$/i;  // Must begin with and end with
re = /h.llo/i;  // . Matches any ONE character
re = /h*llo/i;  // * Matches any character 0 or more
re = /gre?a?y/i; // Optional character
re = /gre?a?y\?/i; // Escape character


// Brackets [] - Character Sets
re = /gr[ae]y/i;        // Must be an a or e, cannot be both.
re = /[GF]ray/;         // Must be an a or e, cannot be both.
re = /[^GF]ray/;        // Match anything except a F or G.
re = /^[GF]ray/;        // Must begin with a G or an F
re = /[A-Z]ray/;        // Match any uppercase letter
re = /[a-z]ray/;        // Match any lowercase letter
re = /[A-Za-z]ray/;     // Match any letter
re = /[0-9]ray/;        // Match any digit

// Braces {} - Quantifiers
re = /Hel{2}o/i;        // Must occur exactly {m} times
re = /Hel{2,4}o/i;      // Must occur m to n number of times {m,n} times
re = /Hel{2,}o/i;      // Must occur at least m amount of times

// Parenthesis () - Grouping
re = /^([0-9]x){3}$/;     // ^Beginning with, and $Ending with [0-9]x 3 times

//String to match
const str = '3x3x3x3x';

// Log results
const result = re.exec(str);
console.log(result)

function reTest(re, str) {
  if(re.test(str)) {
    console.log(`${str} matched ${re.source}`);
  } else {
    console.log(`${str} does NOT match ${re.source}`);
  }
}

reTest(re, str);