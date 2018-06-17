function generateScore(game_settings){

    let score_wrapper = document.querySelector(".score_wrapper");
    score_wrapper.innerHTML = "";

    let row = document.createElement("li");
    row.classList.add("score_row");
    let name = document.createElement("span");
    name.classList.add("name");
    let score_number = document.createElement("span");
    score_number.classList.add("score_number");

    let current_score_object = {name: game_settings.playerName, email: game_settings.playerEmail, score_number: game_settings.playerScore};

    let score = parseScore(localStorage.score);
    if ( score.length == 0 ){
      score.push(current_score_object);
    }else{
      if ( current_score_object.score_number < score[score.length-1].score_number ){
        score.push(current_score_object);
      }else{
        for (var i = 0; i < score.length; i++) {
          if ( current_score_object.score_number >= score[i].score_number ){
            score.splice(i,0,current_score_object);
            break;
        }
      }
    }
    if ( score.length > 10 ){
      score.pop();
    }
  }
    localStorage.score = stringifyScore(score);
    insertScore();
}

function insertScore(){
  let score_wrapper = document.querySelector(".score_wrapper");
  let score = parseScore(localStorage.score);

  for (var i = 0; i < score.length; i++) {
    let row = document.createElement("li");
    row.classList.add("score_row");
    let name = document.createElement("span");
    name.classList.add("name");
    name.textContent = score[i].name;
    let score_number = document.createElement("span");
    score_number.classList.add("score_number");
    score_number.textContent = score[i].score_number;
    row.appendChild(name);
    row.appendChild(score_number);
    score_wrapper.appendChild(row)
  }
}

 function parseScore(){
   let score = localStorage.score;
   return JSON.parse(score);
 }

 function stringifyScore(score){
   return JSON.stringify(score);
 }

function openScore(){
  let score_wrapper = document.querySelector(".score");
  score_wrapper.classList.toggle("opacity");
}

export {openScore, stringifyScore, parseScore, insertScore, generateScore};
