/*
Create a new file called loops.js in the /04week folder of your workbook.
Complete each of the following exercises.
*/

/*for loop
  Use a for loop to console.log each item in the array carsInReverse.*/
const carsInReverse = ['honda', 'toyota', 'bmw',' jeep', 'ford', 'tesla']

for (let x = 0; x < carsInReverse.length; x++){
  console.log(carsInReverse[x])
}

//or the forEach way for practice
carsInReverse.forEach((car) =>{
  console.log(car)
})

/*
for...in loop
  Create an object (an array with keys and values) called persons with the following data:
  firstName: "Jane"
  lastName: "Doe"
  birthDate: "Jan 5, 1925"
  gender: "female"
  Use a for...in loop to console.log each key.
  Then use a for...in loop and if state to console.log the value associated with the key birthDate.
*/

const persons = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
}
for (key in persons) {
  console.log(key)
}

for (let key in persons){
  if (key === 'birthDate'){
    console.log(persons[key])
  }
}

/*
while loop
  Use a for loop to console.log the numbers 1 to 1000.
*/
let num = 1
while (num < 1001){
  console.log(num);
  num ++;
}

/*
do...while loop
  Use a do...while loop to console.log the numbers from 1 to 1000.
*/

num2 = 1
do {
  console.log (num2);
  num2 ++;
} while (num2 < 1001)

/*
When is a for loop better than a while loop?
    How is the readability of the code affected?

For loops are good when you know(ish) how many iterations you need. and because incremental variables can be good?
for loops have a lot of syntax and are obnoxious to read i guess while loops pretty much read like english
*/

/*
What is the difference between a for loop and a for...in loop?
for loops allow you to use an incremental counter
*/

/*
What is the difference between a while loop and a do...while loop?
while loops test a condition before running code, so code will not run if condition is false.
do while loops test the condition after running the code, so even if condition is false, the code will be run at least once.
*/
