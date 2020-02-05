// async function myFunc() {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('Hello'), 2000)
//   });

//   const error = false;

//   if(!error) {
//     const res = await promise; // wait until promise is resolved
//     return res;
//   } else {
//     await Promise.reject(new Error('Something went wrong'));
//   }

// }

// myFunc()
//   .then(res => console.log(res))


async function getUsers() {
  // await response of the fetch call
  const response = await fetch('http://jsonplaceholder.typicode.com/users');

  // Only proceed once its resolved
  const data = await response.json();

  // Only proceed once second promise is resolved
  return data;
}

getUsers().then(users => console.log(users));