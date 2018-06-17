let health = {
  1: 50,
  2: 25,
  3: 25,
  4: 25,
  5: 20,
  6: 20,
  7: 20,
  8: 10,
  9: 10,
  10: 5
};

let hero_health_count = document.querySelector(".hero_health_count");
let wizard_health_count = document.querySelector(".wizard_health_count");
let hero_health = document.querySelector(".hero_health");
let wizard_health = document.querySelector(".wizard_health");

function generateHealth(){
  wizard_health_count.textContent = 100;
  hero_health_count.textContent = 100;
  hero_health.style.width = "100%";
  wizard_health.style.width = "100%";
}


function decreaseHealth(name, round){
  if (name == "hero"){
    let current_health = document.querySelector(".hero_health_count").textContent;
    let result_health = current_health - health[round];
    hero_health_count.textContent = result_health;
    hero_health.style.width = result_health+"%";
    if ( result_health <= 0 ){
      return "hero_dead";
    }
  }else{
    let current_health = document.querySelector(".wizard_health_count").textContent;
    let result_health = current_health - health[round];
    wizard_health_count.textContent = result_health;
    wizard_health.style.width = result_health+"%";
    if ( result_health <= 0 ){
      return "wizard_dead";
    }
  }
}

export {generateHealth, decreaseHealth};
