let val;

const today  = new Date();
let birthday = new Date('12-21-1995 12:35:01')
birthday = new Date('December 12 1995')
birthday = new Date('12/12/1995')


val = today.getMonth();
val = today.getDate();
val = today.getDay();
val = today.getFullYear();
val = today.getHours();
val = today.getMinutes();
val = today.getSeconds();
val = today.getMilliseconds();
val = today.getTime();

birthday.setMonth(3);
birthday.setDate(16);
birthday.setFullYear(1964); // and so on...

console.log(birthday);