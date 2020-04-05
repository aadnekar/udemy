// // Iterator Example
// function nameIterator(names) {
//     let nextIndex = 0;


//     return {
//         next: function() {
//             return nextIndex < names.length ?
//             { value: names[nextIndex++], done: false } :
//             { done: true}
//         }
//     }
// }

// // Create an array of names
// const namesArray = ['Jack', 'Jill', 'John'];
// // Init iterator and pass in the names array
// const names = nameIterator(namesArray)

// console.log(names.next().value);
// console.log(names.next().value);
// console.log(names.next().value);
// console.log(names.next());

// // TODO  Generator
// function* sayNames() {
//     yield 'Jack';
//     yield 'Jill';
//     yield 'John';
// }

// const name =  sayNames();

// console.log(name.next().value);
// console.log(name.next().value);
// console.log(name.next().value);
// console.log(name.next());


// ID Creator
function* createIDs() {
    let index = 1;

    while(true) {
        yield index++;
    }
}

const gen = createIDs();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);