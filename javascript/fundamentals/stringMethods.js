const firstName = 'William';
const lastName = 'Johnson';
const age = 36;
const str = 'Hello there my name is Ådne'

let val;

val = firstName + lastName;

// Concatenate
val = firstName + ' ' + lastName;

// Append
val = 'Ådne ';
val += 'Karstad';

val = 'Hello, my name is ' + firstName + ' and I am ' + age;

// Escaping
val = 'That\'s awesome, I can\'t wait.';

// Length
val = firstName.length;

// Concat()
val = firstName.concat(' ', lastName,': ', age);

// Change case
val = firstName.toUpperCase();
val = firstName.toLowerCase();

// Indexing
val = firstName[2];

// indexOf()
val = firstName.indexOf('l'); // returns 2
val = firstName.lastIndexOf('l'); // returns 3

// charAt()
val = firstName.charAt(2); // returns "l"
// get last char
val = firstName.charAt(firstName.length - 1);

// substring()
val = firstName.substring(0,4);

// slice()
val = firstName.slice(0,4);
val = firstName.slice(-3); // starts at the back

// split()
val =  str.split(' ');

// replace()
val = str.replace('Ådne', 'Miguel');

// includes() --> true | false
val = str.includes('Ådne'); // true
val = str.includes('foo'); // false


console.log(val);