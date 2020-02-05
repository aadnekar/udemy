const posts = [
  {title: 'Post One', body: 'This is post one'},
  {title: 'Post Two', body: 'This is post Two'}
];

// Asynchronous calls with promises

function createPost(post) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
        posts.push(post);

        const error = false;

        if(error) {
          reject('Error: Something went wrong');
        } else {
        resolve();
        }
      }, 2000);
    });
};


function getPosts() {
  setTimeout(function() {
    let output = '';
    posts.forEach(function(post) {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
};


createPost({title: 'Post Three', body: 'This is post Three'})
.then(getPosts)
.catch(function(err) {
  console.log(err);
});

getPosts();