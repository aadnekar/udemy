//! Iterator and Generator Tutorial

//* Iterator Example
console.log("***** Iterator Example *****")
function nameIterator(names) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < names.length ?
      { value: names[nextIndex++], done: false } :
      { done: true };
    }
  };
}

// Create an array of names
const namesArr = ['Jack', 'Jill', 'John'];
// Init iterator and pass in the names array
const names = nameIterator(namesArr);

console.log(names.next().value); // Value of Jack
console.log(names.next());
console.log(names.next());
console.log(names.next()); // Done is true, no value

console.log("***** END OF Iterator Example *****")

//* Generator Example
console.log("***** Generator Example ***** ")
function* sayNames() {
  yield 'Jack';
  yield 'Jill';
  yield 'John';
}

const name = sayNames();

console.log(name.next());
console.log(name.next());
console.log(name.next());
console.log(name.next());
console.log("***** END OF Generator Example *****")


// ID Creator
console.log("***** Example use Generator ID generator *****")
function* createIds() {
  let index = 1;

  while(true) {
    yield index++;
  }
}

const generator = createIds();

for (let i=0; i < 10; i++) {
  console.log(generator.next().value);
}

console.log("***** END OF Example use Generator ID generator *****")