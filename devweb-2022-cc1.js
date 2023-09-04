"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;
let listenerExist = false;

function verif(secretNumber,maxGuesses){
  const value_max = parseInt($maxUsr.value);
  if(nbGuesses <= maxGuesses){
    nbGuesses++;
    const value_user = parseInt($numUsr.value);
    if(value_user > value_max){
      $output.innerHTML += `Le chiffre ${value_user} est plus grand que ${value_max}! Plus que ${maxGuesses - nbGuesses+1} tentatives `+ "<br>";
    }else{
      if(value_user < secretNumber){
        $output.innerHTML += `Le nombre ${value_user} est Trop Petit ! Plus que ${maxGuesses - nbGuesses+1} tentatives `+ "<br>";
      }else if (value_user > secretNumber){
        $output.innerHTML += `Le nombre ${value_user} est Trop Grand ! Plus que ${maxGuesses - nbGuesses+1} tentatives `+ "<br>";
      }else if(value_user === secretNumber){
        $output.innerHTML += `Vous avez trouvez le nombre en ${nbGuesses} tentatives `+ "<br>";
        $guessBtn.disabled = true;
      }
    }
  }else{
    $output.innerHTML += "Vous avez dépasser le nombre d'essais maximum vous avez perdus "+ "<br>";
    $guessBtn.disabled = true;
  }
};

function initialisation(secretnumber,maxGuesses){ // fonction utile dans le cas ou le jeu ce relance au milieu d'une partie deja en cours pour ne pas avoir plusieur listener
  

  $guessBtn.addEventListener("click",function(){
    verif(secretnumber,maxGuesses)
  });

  $numUsr.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
      $guessBtn.click();
    }

  listenerExist = true;

  });
}

function launchGame(_evt) {
  $guessBtn.disabled = false; 

  nbGuesses = 0 ; // je redeclare au cas ou le jeu ce relance au milieu d'une partie
  $output.innerHTML = "" ; // je redeclare au cas ou le jeu ce relance au milieu d'une partie

  $output.innerHTML += `Le jeu a été lancer avec succes nous attendons votre premier choix ` + "<br>";
  secretNumber = parseInt(Math.floor(Math.random() * $maxUsr.value) + 1);
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;

  if(!listenerExist){
    initialisation(secretNumber,maxGuesses);
  }
  
}

$startBtn.addEventListener("click", launchGame);


function addCow(evt) {
  console.debug(evt.clientX, evt.clientY);
  //on gere le scroll
  const x = evt.clientX + window.scrollX;
  const y = evt.clientY + window.scrollY;
  //on créer les images
  var monimage = document.createElement("img");
  monimage.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";

  //on ajoute le style
  monimage.style.position = "absolute";
  monimage.style.left = x + "px";
  monimage.style.top = y + "px";
  monimage.style.width = 30 + "px";

  // et la rotation
  const rotationAngle = Math.random() * 360;

  monimage.style.transform = `rotate(${rotationAngle}deg)`;


  document.body.appendChild(monimage);

}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);
