// forEach()

const fruits = ['Apple', 'Banana', 'Clementine', 'Date', 'Elderberry'];

fruits.forEach(function(fruit){
    console.log(fruit);
});

// can also access index and the array itself, eg...
fruits.forEach(function(fruit, index){
    console.log(`Index ${index}: ${fruit}`);
});

// map()

const users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Sara'},
    {id: 3, name: 'Karen'},
    {id: 4, name: 'Lars'}
];

const ids = users.map(function(user){
    return user.id;
});

console.log(ids);


// For in loop
const user = {
    firstName: 'John',
    lastName: 'Doe',
    age: 35
};

for (let x in user) {
    console.log(`${x}: ${user[x]}`);
};