function openChooseSection(){
	button_choose_cards.classList.add('hidden');
	button_score.classList.add("hidden");
	button_new_game.classList.remove("hidden");
	button_back.classList.remove("hidden");
	section_rules.classList.add('hidden');
	section_settings.classList.remove('hidden');
	section_score.classList.remove("score_visible");
}

function returnBackToRules(){
	button_back.classList.add("hidden");
	button_new_game.classList.add("hidden");
	button_choose_cards.classList.remove("hidden");
	button_score.classList.remove("hidden")
	section_rules.classList.remove("hidden");
	section_settings.classList.add("hidden");
	section_game.classList.add("hidden");
}

function showScore(){
	section_score.classList.toggle("score_visible");
	congrats.classList.remove("congrats_visible");
}

function startGame(){
	if ( isReady()){
		button_new_game.classList.add("hidden");
		button_back.classList.add("hidden");
		button_score.classList.remove("hidden");
		button_finish.classList.remove("hidden");
		section_settings.classList.add('hidden');
		section_game.classList.remove("hidden");
		minutes.innerHTML = 0;
		seconds.innerHTML = "0"+0;
		sec = 1;
		startTimer = setInterval(timer,1000);
		generatePlayField();
	}
}

function stopGame(){
	let ask = confirm("Do you really want to return to rules?");
	if ( ask ){
		this.classList.add("hidden");
		button_choose_cards.classList.remove("hidden");
		section_rules.classList.remove("hidden");
		section_game.classList.add("hidden");
		section_score.classList.remove("score_visible");
		congrats.classList.remove("congrats_visible");

		game_difficulty.forEach( function(a){
			a.classList.remove("active");
		});
		card_pattern.forEach( function(a){
			a.classList.remove("active");
		});
		document.querySelector(".first_name").value = "";
		document.querySelector(".last_name").value = "";
		document.querySelector(".email").value = "";
		let check = document.querySelectorAll(".check-icon");
		check.forEach(elem => elem.classList.add("opacity"));
		localStorage.current_difficulty = "";
		localStorage.current_first_name = "";
		localStorage.current_last_name = "";
		localStorage.current_email = "";
		let game_row = document.querySelectorAll(".game_row");
		game_row.forEach( elem => elem.remove() );
		arr_of_id = [];
		cards_count = 0;
	}
}

function choosePattern(event){
	if ( event.target.classList.contains("card")){
		card_pattern.forEach( function(a){
			a.classList.remove("active");
		});
		event.target.classList.add("active");
	}
}

function chooseDifficulty(event){
	if (event.target.parentElement.classList.contains("diff_row")){
		game_difficulty.forEach( function(a){
			a.classList.remove("active");
		});
		event.target.parentElement.classList.add("active");
	}
}

function isReady(){
	let current_pattern_row = document.querySelector(".cards_shirt .card.active");
	if ( current_pattern_row == null ){
		alert("You didn't choose the cards shirt");
		return false;
	}
	let current_difficulty_row = document.querySelector(".diff_row.active");
	if ( current_difficulty_row == null ){
		alert("You didn't choose the difficulty of the game");
		return false;
	}
	if ( localStorage.current_first_name == "" ){
		alert("You didn't submit the form");
		return false;
	}
	return true;
}

function generateCards(pattern, max_cards, icons){
	let card = document.createElement("li");
		card.classList.add("play_card");

		let card_front = document.createElement("div");
		card_front.classList.add("front");
		card_front.classList.add("pattern"+pattern);

		let card_back = document.createElement("div");
		card_back.classList.add("back");

		let icon = document.createElement("i");
		icon.classList.add("fas");
		let random_icon = randomInteger(0,max_cards);
		let random_icon_class = icons[random_icon].match(/\D/g).join("");
		icon.classList.add("fa-"+random_icon_class);
		card.dataset.id = icons[random_icon].match(/\d/g).join("");
		icons.splice(random_icon,1);

		card_back.appendChild(icon);
		card.appendChild(card_front);
		card.appendChild(card_back);
		return card;
}

function generateRows(){
	let game_row = document.createElement("ul");
	game_row.classList.add("game_row");
	return game_row;
}

function generatePlayField(){
	let current_difficulty = document.querySelector(".diff_row.active").dataset.difficulty;
	localStorage.current_difficulty = current_difficulty;
	let current_pattern = document.querySelector(".cards_shirt .card.active").dataset.pattern;
	let current_array_of_icons = array_of_icons.slice(0,current_difficulty);
	let max_card = current_difficulty-1;
	let row_count;
	let cards_count;
	if ( current_difficulty == 8 ){
		row_count = 2;
		cards_count = 4;
	}else if( current_difficulty == 16 ){
		row_count = 4;
		cards_count = 4;
	}else{
		row_count = 3;
		cards_count = 8;
	}
	for ( let i = row_count; i > 0; i--){
		let game_row = generateRows();
		game_row.classList.add("game_row"+current_difficulty);
		for ( let i = cards_count; i > 0; i-- ){
			let card = generateCards(current_pattern, max_card, current_array_of_icons);
			max_card--;
			game_row.appendChild(card);
		}
		game_field.appendChild(game_row);
	}
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}

function submitForm(event){
	event.preventDefault();
	let current_first_name = document.getElementById("first_name").value;
	let current_last_name = document.getElementById("last_name").value;
	let current_email = document.getElementById("email").value;
	localStorage.current_first_name = current_first_name;
	localStorage.current_last_name = current_last_name;
	localStorage.current_email = current_email;
	let check = document.querySelectorAll(".check-icon");
	check.forEach(elem => elem.classList.remove("opacity"));
}

function turnCard(event){
	if ( event.target.classList.contains("front")){
		let current_difficulty = document.querySelectorAll(".play_card").length;
		let current_card = event.target.parentElement;
 		current_card.classList.add("transform");
 		arr_of_id.push(current_card.dataset.id);
 		if ( arr_of_id.length == 2){
 			let active_cards = document.querySelectorAll(".play_card.transform");
 			let active_card_back = document.querySelectorAll(".play_card.transform .back");
 			if ( arr_of_id[0] == arr_of_id[1] ){
 				active_card_back.forEach( elem => setTimeout(function(){
 					elem.classList.add("opacity");
 				}, 500));
	 			active_cards.forEach( elem => setTimeout(function(){
	 				elem.classList.add("is_match");
	 				elem.classList.remove("transform");
	 			},800 ));
	 			cards_count += 2;
	 		}else{
	 			active_cards.forEach( elem => setTimeout(function(){
	 				elem.classList.remove("transform");
	 			}, 500));
	 		}
	 		if ( cards_count == current_difficulty ){
	 			finishGame();
	 		}
	 		arr_of_id = [];
		}	
	} 	
}

function finishGame(){
	clearInterval(startTimer);
	localStorage.current_time = minutes.innerHTML+":"+seconds.innerHTML;
	setTimeout( () => {
		congrats.classList.add("congrats_visible");
	},700 );
	generateScore();
}

function generateScore(){
	let current_difficulty = document.querySelectorAll(".play_card").length;
	let saved_score = parseScore(current_difficulty);
	let current_score_object = {first_name: localStorage.current_first_name, last_name: localStorage.current_last_name, email: localStorage.current_email, time: localStorage.current_time};

	let current_result_wrapper = document.querySelector(".result_wrapper.result"+current_difficulty);
	let current_score = document.querySelectorAll(".result"+current_difficulty+" .result_row");
	let score_time = document.querySelectorAll(".result"+current_difficulty+" .result_row .time");
	let current_time = localStorage.current_time;
	let current_divider = current_time.search(":");
	let current_min = current_time.slice(0,current_divider);
	let current_sec = current_time.slice(current_divider+1);	

	let result_row = document.createElement("li");
	result_row.classList.add("result_row");
	let result_row_wrapper = document.createElement("giv");
	result_row_wrapper.classList.add("result_row_wrapper");
	let name = document.createElement("span");
	name.classList.add("name");
	name.innerHTML = localStorage.current_first_name+" "+localStorage.current_last_name;
	let time = document.createElement("span");
	time.classList.add("time");
	time.innerHTML = localStorage.current_time;
	result_row_wrapper.appendChild(name);
	result_row_wrapper.appendChild(time);
	result_row.appendChild(result_row_wrapper);

	if ( current_score.length == 0 ){
		current_result_wrapper.appendChild(result_row);
		saved_score[1] = current_score_object;
		stringifyScore(saved_score, current_difficulty);
	}else{
		for ( let i = 0; i < score_time.length; i++ ){
			let min_divider = score_time[i].innerHTML.search(":");
			let min = score_time[i].innerHTML.slice(0,min_divider);
			if ( +current_min < +min ){
				current_result_wrapper.insertBefore( result_row, current_score[i] );
				saved_score.splice((i+1),0,current_score_object);
				if ( current_score.length == 10 ){
					current_score[9].remove();
					saved_score.splice(11,1);
				}
				stringifyScore(saved_score, current_difficulty);
				return;
			}
			if ( +current_min == +min ){
				let sec_divider = score_time[i].innerHTML.search(":");
				let sec = score_time[i].innerHTML.slice(sec_divider+1);
				if ( +current_sec <= +sec){
					current_result_wrapper.insertBefore( result_row, current_score[i] );
					saved_score.splice((i+1),0,current_score_object);
					if ( current_score.length == 10 ){
						current_score[9].remove();
						saved_score.splice(11,1);
					}
					stringifyScore(saved_score, current_difficulty);
					return;
				}
			}
		}
		if ( current_score.length == 10 ) return;
		else{
			saved_score.push(current_score_object);
			stringifyScore(saved_score, current_difficulty);
			current_result_wrapper.appendChild(result_row);
			return;
		}	
	}
}

function timer(){
	if ( sec < 10 ){
		seconds.innerHTML = "0"+sec;
	}else{
		seconds.innerHTML = sec;
		if ( seconds.innerHTML == 60 ){
		seconds.innerHTML = "0"+0;
		sec = 0;
		minutes.innerHTML++;
		if ( minutes.innerHTML == 30 ){
			alert ("You exceed the given time!");
			return;
			}
		}
	}
	sec++;
}

function changeResultTabs(){
	tabs.forEach( elem => elem.classList.remove("active") );
 	this.classList.add("active");
 	result.forEach( elem => {
 		elem.classList.add("hidden");
 		elem.classList.remove("fadeIn");
 		if (elem.classList.contains( "result"+this.dataset.tab )){
 			elem.classList.remove("hidden");
 			elem.classList.add("fadeIn");
 		}
 	});
}

function insertScore(score){
	if (score.length <= 1 ){
		return;
	}else{
		let current_difficulty = score[0].difficulty;
		let current_result_wrapper = document.querySelector(".result_wrapper.result"+current_difficulty);	
		for (let i=1; i < score.length; i++){
			let result_row = document.createElement("li");
			result_row.classList.add("result_row");
			let result_row_wrapper = document.createElement("div");
			result_row_wrapper.classList.add("result_row_wrapper");
			let name = document.createElement("span");
			name.classList.add("name");
			name.innerHTML = score[i].first_name+" "+score[i].last_name;
			let time = document.createElement("span");
			time.classList.add("time");
			time.innerHTML = score[i].time;
			result_row_wrapper.appendChild(name);
			result_row_wrapper.appendChild(time);
			result_row.appendChild(result_row_wrapper);
			current_result_wrapper.appendChild(result_row);
		}
	}
}


function parseScore(difficulty){
	let score;
	if ( difficulty == 8 ){
		score = localStorage.score8;
	}else if( difficulty == 16 ){
		score = localStorage.score16;
	}else{
		score = localStorage.score24;
	}
	return JSON.parse(score);
}

function stringifyScore(score, difficulty){
	if ( difficulty == 8 ){
		localStorage.score8 = JSON.stringify(score);
	}else if( difficulty == 16 ){
		localStorage.score16 = JSON.stringify(score);
	}else{
		localStorage.score24 = JSON.stringify(score);
	}
}


//Specify an array of card icons and IDs for them
array_of_icons = ["1bell", "1bell", "2umbrella", "2umbrella", "3paw", "3paw", "4sun", "4sun", "5snowflake", "5snowflake", "6eye", "6eye", "7plane", "7plane", "8paper-plane", "8paper-plane", "9bug", "9bug", "10comment", "10comment", "11comments", "11comments", "12tree", "12tree"];

//Set localStorage properties
localStorage.setItem("current_first_name", "");
localStorage.setItem("current_last_name", "");
localStorage.setItem("current_email", "");
localStorage.setItem("current_difficulty", "");
localStorage.setItem("current_time", "");
if ( localStorage.score8 == undefined ){
	localStorage.setItem("score8", JSON.stringify([{difficulty: 8}]));
}
if ( localStorage.score16 == undefined ){
		localStorage.setItem("score16", JSON.stringify([{difficulty: 16}]));
}
if ( localStorage.score24 == undefined ){
		localStorage.setItem("score24", JSON.stringify([{difficulty: 24}]));
}

//Insert score from localStorage
insertScore(JSON.parse(localStorage.score8));
insertScore(JSON.parse(localStorage.score16));
insertScore(JSON.parse(localStorage.score24));

//Find all buttons and add event listeners to them
let button_choose_cards = document.querySelector("button.choose_cards");
let button_new_game = document.querySelector("button.new_game");
let button_back = document.querySelector("button.return_back");
let button_finish = document.querySelector("button.finish_game");
let button_score = document.querySelector("button.show_score");

button_choose_cards.addEventListener("click", openChooseSection );
button_back.addEventListener("click", returnBackToRules );
button_new_game.addEventListener("click", startGame);
button_score.addEventListener("click", showScore);
button_finish.addEventListener("click", stopGame);

//Find all game sections
let section_rules = document.querySelector("section.rules");
let section_settings = document.querySelector("section.game_settings");
let section_game = document.querySelector("section.game_field");
let section_score = document.querySelector("section.score");
let game_field = document.querySelector(".game_field");

//Add event listener on game field
section_game.addEventListener("click", turnCard);

//Find out choosed card pattenr
let card_pattern_wrapper = document.querySelector(".cards_shirt");
let card_pattern = document.querySelectorAll(".cards_shirt .card");
card_pattern_wrapper.addEventListener("click",choosePattern);

//Find out game diffiulty
let difficulty_wrapper = document.querySelector(".difficulty");
let game_difficulty = document.querySelectorAll(".diff_row");
difficulty_wrapper.addEventListener("click", chooseDifficulty);

//Add event listener on form submission
let form = document.querySelector("form.registration");
form.addEventListener("submit", submitForm );

//Specify useful strat values
let arr_of_id = [];
let cards_count = 0;

//Timer start values
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let sec = 1;

//Start timer
let startTimer;
let result_wrapper = document.querySelector(".result_wrapper");

//Make score tabs active
let tabs = document.querySelectorAll(".tab");
tabs.forEach( elem => elem.addEventListener("click", changeResultTabs));
let result = document.querySelectorAll(".result_wrapper");

//Congratulations
let congrats = document.querySelector(".congrats");

// Add event listener on small devices warn
let close_button = document.querySelector(".close_icon");
close_button.addEventListener("click", warnSmallDevices);

function warnSmallDevices(){
	this.parentElement.classList.add("responsive_hidden");
}

