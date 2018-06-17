import getRandomInt from "./random.js";

let arr_to_multiple = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100];
let operations = ["+","-","*","/"];

function generateExercise(){
  let first_number = document.querySelector(".first_number");
  let second_number = document.querySelector(".second_number");
  let third_number = document.querySelector(".third_number");
  let sign = document.querySelector(".sign");
  let first = getRandomInt(1,500);
  let operation = operations[getRandomInt(0,operations.length)];
  let second;

  if ( operation == "*"){
    second = arr_to_multiple[getRandomInt(0,arr_to_multiple.length)];
  }else if( operation == "-" ){
    second = getRandomInt(1,first);
  }else if ( operation == "/" ){
    do {
      second = getRandomInt(1,500);
    }while ( first % second != 0);
  }else{
    second = getRandomInt(1,500);
  }

  let third;
  switch(operation){
    case "+":
      third = first+second;
      break;
    case "-":
      third = first-second;
      break;
    case "*":
      third = first * second;
      break;
    case "/":
      third = first / second;
      break;
  }

  first_number.textContent = first;
  sign.textContent = operation;
  second_number.setAttribute("data-number", second);
  third_number.textContent = third;

}

export default generateExercise;
