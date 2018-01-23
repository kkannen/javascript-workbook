
//Write a JavaScript program to display the current day and time.
function findTheDate(){
  return Date();
}
findTheDate();


//Write a JavaScript program to convert a number to a string.

function numberToString(num){
  return num.toString();
}
numberToString(15)


//Write a JavaScript program to convert a string to the number.
function stringToNumber(str){
  return Number(str);
}


// Write a JavaScript program that takes in different data and identifies datatype

function findDataType(datum){
  return typeof datum;
}

findDataType("poo")


//Write a JavaScript program that adds 2 numbers together.

function sumOfTwoNumbers(num1, num2){
  return num1 + num2;
}

sumOfTwoNumbers(5, 7)


//Write a JavaScript program that runs only when 2 things are true.

function areBothThingsTrue(arg1, arg2){
  if (arg1 && arg2) {
    return "both arguments are true"
  } else {
    return "no no no"
  }
}

areBothThingsTrue(true, 1)
areBothThingsTrue(true, 0)
areBothThingsTrue(false, 0)


//Write a JavaScript program that runs when 1 of 2 things are true.

function isOneStatementTrue (arg1, arg2){
  if (arg1 || arg2){
    return "at least one of the arguments is true"
  }  else {
    return "neither is true"
  }
}

isOneStatementTrue(true, false)
isOneStatementTrue(false, false)


//Write a JavaScript program that runs when both things are not true.

function bothAreFalse(arg1, arg2) {
  if (!arg1 && !arg2){
    return "congrats, both are false"
  } else {
    return "at least one of these is true"
  }
}

bothAreFalse(0, 0)
bothAreFalse(1, 0)
