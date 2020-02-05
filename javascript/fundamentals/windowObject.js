// window.console.log("Hello World!");

// Prompt
// const input = prompt();
// alert(input);

// Confirm
// if(confirm('Are you sure')){
//     console.log('Yes');
// } else {
//     console.log('No');
// }


let val;

// outer height and width
val = window.outerHeight;
val = window.outerWidth;
// inner height and width
val = window.innerHeight;
val = window.innerWidth;

// Scroll points
val = window.scrollY;
val = window.scrollX;

// Location Object
val = window.location;
val = window.location.hostname;
val = window.location.port;
val = window.location.href;
val = window.location.search;

// Redirct
// window.location.href = 'http://google.com' // --> Will redirect to google on reload
// Reload
// window.location.reload();


// History Object
window.history.go(-1); // Takes us to the previous page visited
val = window.history.length;

// Navigator Object
val = window.navigator;
val = window.navigator.appName;

console.log(val);