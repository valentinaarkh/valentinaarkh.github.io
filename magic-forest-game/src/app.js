import $ from "jquery";
import Slick from "slick-carousel";
import Character from "./characters.js";
import getRandomInt from "./random.js";
import wizard_name from "./wizard_name.js";
import vocabulary from "./vocabulary.js";
import generateTranslation from "./translation_task.js";
import generateExercise from "./arithmetic_task.js";
import {generateHealth, decreaseHealth} from "./health.js";
import {openScore, stringifyScore, parseScore, insertScore, generateScore} from "./score.js" ;

//First page animation
$(".character_carousel").slick({
    autoplay: false,
    infinite: true,
});

//Set LocalStorage values
localStorage.setItem("current_name", "");
localStorage.setItem("current_email", "");
if ( !localStorage.score ){
  localStorage.setItem("score","");
}

let arr = [];
arr.push({name:"AAA", score_number: 10},{name:"BBB", score_number: 9},{name:"BBB", score_number: 8},{name:"BBB", score_number: 7},{name:"BBB", score_number: 6},{name:"BBB", score_number: 5},{name:"BBB", score_number: 4},{name:"BBB", score_number: 3});

localStorage.score = stringifyScore(arr);

insertScore();

let form = document.querySelector("form.registration");
form.addEventListener("submit", submitForm );

let game_settings = {
  round: 1,
  playerName: "",
  playerEmail: "",
  playerScore: 0,
  heroNumber: 1,
  gameBg: getRandomInt(1,4),
}

game_settings.playerScore = 0;
game_settings.playerName = "Hello";

generateScore(game_settings);

let app = function(){

  game_settings.playerName = localStorage.current_name;
  game_settings.playerEmail = localStorage.current_email;
  let character_name = document.querySelector(".hero_name");
  character_name.textContent = game_settings.playerName;

  let character_number = document.querySelector(".slick-active .slide");
  game_settings.heroNumber = character_number.dataset.character || 1;

  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let hero;
  let wizard;

  startRound(canvas);

  let start_time = performance.now();

  //Make animation through request animation frame
  let requestId = requestAnimationFrame(function animate(){
    ctx.clearRect(0,0,1200,600);
    let current_time = performance.now();
    let delta = current_time-start_time;
    if (delta >= 1000 ){
      start_time = current_time;
    }
    wizard.render(ctx,delta);
    hero.render(ctx, delta);

    if (hero.max_walk[0] != undefined && hero.position[0] > hero.max_walk[0] || hero.position[1]> hero.max_walk[1]){
      if ( hero.position[0] >= 1300 ){
        startRound(canvas);
      }else{
        hero = new Character(game_settings.heroNumber, "stand", "hero",[0,415]);
        wizard = new Character(1, "stand", "wizard", [1100,415]);
      }
    }
    if (wizard.max_walk[0] != undefined && wizard.position[0] < wizard.max_walk[0] || wizard.position[1] < wizard.max_walk[1]){
      wizard = new Character(1, "stand", "wizard",[1100,415] )
    }
    requestAnimationFrame(animate);
  });

  let spell_wrapper = document.querySelector(".spell_wrapper");
  let tasks = document.querySelectorAll(".spell_icon");
  tasks.forEach(function(elem){
    elem.addEventListener("click", chooseTask);
  });

  // Check tasks Event Listeners
  let check_translation = document.querySelectorAll(".check_translation");
  let check_number = document.querySelector(".check_number");
  check_translation.forEach(function(elem){
    elem.addEventListener("click", checkTranslation);
  });
  check_number.addEventListener("click", checkArithmetic);
  let task_field = document.querySelector(".task_field");

  // Button next round Event Listener
  let button_next_round = document.querySelector(".button_next_round");
  button_next_round.addEventListener("click", openNextRound);


  //Inner functions

  function openNextRound(){
    let win = document.querySelector(".win_round");
    win.classList.remove("answer_visible");
    let max_walk = [1300,415];
    hero = new Character(game_settings.heroNumber, "walk", "hero", [0,415], max_walk);
  }

  function chooseTask(){
    this.classList.add("active");
    tasks.forEach(function(elem){
      elem.classList.add("opacity");
    });
    this.classList.remove("opacity");

    let task_wrapper = document.querySelector(".task_wrapper"+this.dataset.task);
    showTask(task_field, task_wrapper,spell_wrapper);

    if (this.dataset.task == 1){
      generateExercise();
    }else if(this.dataset.task ==2){
      generateTranslation("russian");
    }else{
      generateTranslation("english");
    }

    setTimeout(function(){
      tasks.forEach( elem => {
        elem.classList.remove("opacity");
      });
    },2000);
  }

  function checkTranslation(){
    let button = this;
    button.dataset.click--;
    button.setAttribute("disabled","disabled");
    let task_number = document.querySelector(".task_wrapper.active").dataset.taskwrapper;
    if (task_number == 2){
      let key = document.querySelector(".task_wrapper2 .first_word").dataset.key;
      let translation = document.querySelector(".russian_translation_input");
      if ( key == translation.value.toLowerCase().trim()){
        highlightRight(translation, button, key);
      }else{
        highLightFalse(translation, button, key, task_number);
      }
      setTimeout(function(){
        button.removeAttribute("disabled");
      },4000);
    }else if (task_number == 3){
      let key = document.querySelector(".task_wrapper3 .first_word").dataset.key;
      let value = vocabulary[key];
      let translation = document.querySelector(".english_translation_input");
      for (var i = 0; i < value.length; i++) {
        if ( value[i] == translation.value.toLowerCase().trim() ){
          highlightRight(translation, button, key);
          setTimeout(function(){
            button.removeAttribute("disabled");
          },4000);
          return;
        }else{
          highLightFalse(translation, button, key, task_number);
          setTimeout(function(){
            button.removeAttribute("disabled");
          },4000);
        }
      }
    }
  }

  function checkArithmetic(){
    let button = this;
    button.dataset.click--;
    button.setAttribute("disabled", "disabled");
    let number = document.querySelector(".second_number");
    if ( number.value == number.dataset.number){
      highlightRight(number, button);
    }else{
      highLightFalse(number, button, number.dataset.number);
    }
    setTimeout(function(){
      button.removeAttribute("disabled");
    },4000);
  }

  function highlightRight(translation, button){
    let right = document.querySelector(".right_answer");
    translation.style.background = "lightgreen";
    translation.classList.add("scale_animation");
    setTimeout(function(){
      right.classList.add("answer_visible");
    },300);
    returnToGame(task_field, right);
    setTimeout(function(){
      translation.style.background = "transparent";
      translation.classList.remove("scale_animation");
      translation.value = "";
      button.dataset.click = 2;
      hero = new Character(game_settings.heroNumber, "attak", "hero", [0,415]);
    },5000);
    setTimeout(function(){
      wizard = new Character(1, "hurt", "wizard", [1070,400]);
      hero = new Character(game_settings.heroNumber, "stand", "hero", [10,415])
    },7000);
    setTimeout(function(){
      let attak_result = decreaseHealth("wizard",game_settings.round);
      if ( attak_result == "wizard_dead" ){
        wizard = new Character (1, "die", "wizard", [1080,415]);
        winRound(game_settings_round);
      }else{
        wizard = new Character(1, "stand", "wizard", [1100,415]);
        hero = new Character (game_settings.heroNumber, "stand", "hero", [0, 415]);
        showSpellChoise(spell_wrapper);
      }
    },9000);
  }

  function winRound(round){
    if ( round == 10 ){
      let win_game = docuemnt.querySelector(".win_text");
      win_game.classList.add("answer_visible");
      finishGame();
    }else{
      let win = document.querySelector(".win_round");
      let round_number = document.querySelector(".win_round .round_number");
      round_number.textContent = game_settings.round+" раунд";
      win.classList.add("answer_visible");
      game_settings.round++;
      game_settings.playerScore++;
    }
  }

  function highLightFalse(translation,click,key, task){
    let false_second = document.querySelector(".false_second");
    let false_first = document.querySelector(".false_first");
    let wizard_attak = document.querySelector(".wizard_attak");
    let miss = document.querySelector(".wizard_miss");

    wizard_attak.classList.remove("wizard_attak_visible");
    miss.classList.remove("wizard_miss_visible");
    if ( click.dataset.click == 0 ){
      setTimeout(function(){
        false_second.classList.add("answer_visible");
        if ( task == 3 ){
          false_second.textContent = "Неверно:( Правильный ответ '"+vocabulary[key][0]+"'";
        }else{
          false_second.textContent = "Неверно:( Правильный ответ '"+key+"'";
        }
      },300);
      returnToGame(task_field, false_second);
      click.dataset.click = 2;
      setTimeout(function(){
        wizard_attak.classList.add("wizard_attak_visible");
      },3000);
      setTimeout(function(){
        wizard = new Character (1, "attak", "wizard", [1000, 400]);
      },5000);
      let wizard_attak_result = wizardAttak();
      setTimeout(function(){
        if ( wizard_attak_result == "miss"){
          miss.classList.add("wizard_miss_visible");
          wizard = new Character (1, "stand", "wizard", [1100, 415]);
          showSpellChoise(spell_wrapper);
          return;
        }else{
          hero = new Character(game_settings.heroNumber, "hurt", "hero", [0,415]);
          wizard = new Character (1, "stand", "wizard", [1100, 415]);
          setTimeout(function(){
            let attak_result = decreaseHealth("hero",game_settings.round);
            hero = new Character (game_settings.heroNumber, "stand", "hero", [0, 415]);
            if ( attak_result == "hero_dead" ){
              hero = new Character(game_settings.heroNumber, "die", "hero", [0,415]);
              let lose = document.querySelector(".lose_game");
              lose.classList.add("answer_visible");
              finishGame();
            }else{
              showSpellChoise(spell_wrapper);
            }
          },2000);
        }
      },7000);
    }else{
      setTimeout(function(){
        false_first.classList.add("answer_visible");
      },500);
      setTimeout(function(){
        false_first.classList.remove("answer_visible");
      },3000);
    }
    translation.style.background = "#e3c2bd";
    translation.classList.add("shake_animation");
    setTimeout(function(){
      translation.style.background = "transparent";
      translation.classList.remove("shake_animation");
      translation.value = "";
      false_second.classList.remove("answer_visible");
    },3000);
  }

  function startRound(canvas){
      generateHealth();
      game_settings.gameBg = getRandomInt(1,4);

      canvas.style.backgroundImage ="url('img/main_bg"+game_settings.gameBg+".png')";

      let round_container = document.querySelector(".round_container");
      round_container.classList.add("round_container_visible");
      let round = document.querySelector(".round");
      round.textContent = game_settings.round;

      //Generate hero and Wizzard
      let hero_max_walk = [0,415];
      let wizard_max_walk = [1100,415];
      hero = new Character(game_settings.heroNumber, "walk", "hero", [-100,415], hero_max_walk);
      wizard = new Character(1, "stand", "wizard", [1100,415]);

      generateWizardName();

      let spell_wrapper = document.querySelector(".spell_wrapper");
      showSpellChoise(spell_wrapper);

      setTimeout(function(){
        round_container.classList.remove("round_container_visible");
      },10000);
  }
};

//Define sections and main wrappers
let start = document.querySelector("button.start");
start.addEventListener("click", startGame);
let section_start = document.querySelector(".start_game");
let section_game = document.querySelector(".game_field");
let score_wrapper = document.querySelector(".score");


//Define buttons

let button_score = document.querySelector(".button_score");
button_score.addEventListener("click", openScore);

let button_finish = document.querySelector("button.finish_game");
 button_finish.addEventListener("click", openMainMenu);

//Outer Functions

function wizardAttak(){
  let arr_of_wizard_attak = ["miss", "miss", "miss", "attak", "attak", "attak", "attak", "attak", "attak", "attak"];

  return arr_of_wizard_attak[getRandomInt(0,10)];
}

function returnToGame(task_field, phrase){
  let task_wrapper = document.querySelectorAll(".task_wrapper");
  setTimeout(function(){
    task_field.classList.remove("active");
    task_wrapper.forEach(elem => elem.classList.remove("active"));
    phrase.classList.remove("answer_visible");
  }, 3000);
};

function generateWizardName(){
  let wizard_name_contaier = document.querySelector(".wizard_name");
  let first_word = wizard_name["first"];
  let second_word = wizard_name["second"];
  let third_word = wizard_name["third"];
  wizard_name_contaier.textContent = first_word[getRandomInt(0, first_word.length-1)]+" "+second_word[getRandomInt(0, second_word.length-1)]+" "+third_word[getRandomInt(0, third_word.length-1)];
}

function showSpellChoise(spell_wrapper){
  setTimeout(function(){
    spell_wrapper.classList.remove("opacity");
  }, 5000);
}

function showTask(task_field, task_wrapper, spell_wrapper){
  setTimeout(function(){
      task_field.classList.add("active");
      spell_wrapper.classList.add("opacity");
  },1000);
  task_wrapper.classList.add("active");
}

function submitForm(event){
	event.preventDefault();
  let current_name_input = document.getElementById("name");
  let current_email_input = document.getElementById("email");
	let current_name = current_name_input.value;
	let current_email = current_email_input.value;
  current_name_input.classList.add("done");
  current_email_input.classList.add("done");
	localStorage.current_name = current_name;
	localStorage.current_email = current_email;
}

function isReady(){
	if ( localStorage.current_name == "" ){
		alert("Форма не заполнена");
		return false;
	}
	return true;
}

function startGame(){
  if (isReady()){
    section_start.classList.add("hidden");
    section_game.classList.remove("hidden");
    score_wrapper.classList.add("opacity");
    app();
  }
}

 function finishGame(){
   let score_wrapper = document.querySelector(".score");
   setTimeout(function(){
     generateScore(game_settings);
     score_wrapper.classList.remove("opacity");
   },3000);
 }

 function openMainMenu(){
   let score_wrapper = document.querySelector(".score");
   let current_name_input = document.getElementById("name");
   let current_email_input = document.getElementById("email");
   let win_game = document.querySelector(".win_game");

   section_game.classList.add("hidden");
   section_start.classList.remove("hidden");
   score_wrapper.classList.add("opacity");
   win_game.classList.remove("answer_visible");
   document.body.scrollTop = document.documentElement.scrollTop = 0;

   current_name_input.classList.remove("done");
   current_email_input.classList.remove("done");
   current_name_input.value = "";
   current_email_input.value = "";
   localStorage.current_name = "";
   localStorage.current_email = "";
 }
