import vocabulary from "./vocabulary.js";
import getRandomInt from "./random.js";

let arr_of_keys = Object.keys(vocabulary);

function generateTranslation(type){
  let random_number = getRandomInt(0,arr_of_keys.length);
  let key = arr_of_keys[random_number];
  if (type == "english"){
    let first_word = document.querySelector(".task_wrapper3 .first_word");
    first_word.textContent = key;
    first_word.setAttribute("data-key", key);
  }else if(type == "russian"){
    let first_word = document.querySelector(".task_wrapper2 .first_word");
    let value = vocabulary[key];
    first_word.textContent = value[getRandomInt(0,value.length)];
    first_word.setAttribute("data-key", key);
  }
}

export default generateTranslation;
