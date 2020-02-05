// const http = new EasyHTTP;

// // Get Posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(err, posts) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(posts);
//   }
// });

// // Get Single Post
// http.get('https://jsonplaceholder.typicode.com/posts/1', function(err, post) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// Create Data
// const data = {
//   title: 'Custom Post',
//   body: 'This is a custom post'
// };

// // POST post
// http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// Update Post
// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(err, post) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });


// Delete Post
// http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, response) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(response)
//   }
// })

// Part 3 with Fetch with Promises
// Part 4 with Async and Await
const http = new EasyHTTP;
const url = 'http://jsonplaceholder.typicode.com/users'

// // Get Users
// http.get('http://jsonplaceholder.typicode.com/users')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


// // User Data
// const data = {
//   name: 'John Doe',
//   username: 'johndoe',
//   email: 'jdoe@gmail.com'
// }

// // Create Post
// http.post(url, data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


// // New User Data
// const newData = {
//   name: 'John Doe Jr',
//   username: 'johndoejr',
//   email: 'jrdoe@gmail.com'
// }

// // Create Put
// http.put(url + '/1', newData)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));


// Create Delete request
http.delete(url + '/1')
  .then(response => console.log(response))
  .catch(err => console.log(err));
