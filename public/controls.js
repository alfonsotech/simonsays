'use strict'
const playerNotes = []
const simonNotes = []
let strictMode = false
let counter = 0
let gameRunning = true
let currentPosition = 0
let triesRemaining = 3

const startGame = () => {
  if(!gameRunning) {
    gameRunning = true
  }
  disableButtons()
  resetVars()
  simonAddNote()
  simonSays(0, flashSound)
}

const resetVars = () => {
  playerNotes.length = 0
  simonNotes.length = 0
  counter = 0
  currentPosition = 0
  triesRemaining = 3
  document.getElementById('counter-box').innerHTML = Number('000')
}

function simonAddNote() {
  const randomNum = Math.floor((Math.random()*4) + 1)
  const colorObj = {
    1: 'orange',
    2: 'turquoise',
    3: 'lime',
    4: 'purple'
  }
  simonNotes.push(colorObj[randomNum])
  console.log(simonNotes)
  counter = simonNotes.length
  document.getElementById('counter-box').innerHTML = counter
}

function flashSound(iterator) {
  const colorsToSounds = {
    lime: document.getElementById("simonSound1"),
    turquoise: document.getElementById("simonSound2"),
    purple: document.getElementById("simonSound3"),
    orange: document.getElementById("simonSound4")
  }
  if(colorsToSounds[simonNotes[iterator]]){
    colorsToSounds[simonNotes[iterator]].play()
    $('#'+ [simonNotes[iterator]]).effect('highlight', {}, 1000)
  }
}

function simonSays(iterator, callback) {
  console.log("Simon is saying");
  if(iterator < simonNotes.length - 1) {
    setTimeout(() => {
      callback(iterator)
      simonSays(iterator + 1, callback)
    }, 1000)
  } else if (iterator === simonNotes.length -1) {
    setTimeout(() => {
      callback(iterator)
      enableButtons()
    }, 1000)
  }
}

function playerTurn() {
  let wrongNote = playerNotes[currentPosition] !== simonNotes[currentPosition]
  if(playerNotes.length === 20) { // Win condition
    gameRunning = false
    resetVars()
    alert("You win! Press start to play again.")
    disableButtons()
  } else if( wrongNote && (strictMode === false && triesRemaining > 0) ) {
      const errorSoundShort = document.getElementById("errorSoundShort")
      errorSoundShort.volume = 0.1;
      errorSoundShort.play()
      triesRemaining -= 1
      //notify of error and that they have another chance
      setTimeout( () => {
        alert('You made a mistake 😹, you have ' + triesRemaining +  ' tries remaining. Listen closely and try again!');
      }, 500)
      playerNotes.length = 0
      disableButtons()
      simonSays(0, flashSound)
    } else if(wrongNote && (strictMode === true || triesRemaining === 0)) { // Lose condition
      const errorSound = document.getElementById("errorSound")
      errorSound.volume = 0.1;
      errorSound.play()
      setTimeout( () => {
        alert("You loose 😹, press start to try again!");
      }, 2500)
      disableButtons()
    } else {
      currentPosition += 1
        if( playerNotes.length === simonNotes.length ) { // Player is done, turn over game back to Simon
          playerNotes.length = 0
          currentPosition = 0
          disableButtons()
          simonAddNote()
          setTimeout(function() {
            simonSays(0, flashSound)
          }, 100)
        }
   }
}

$(document).ready(() => {
  $('#start').on('click', () => {
    startGame()
  })
  $('#strict').on('click', () => {
    strictMode = !strictMode
  })
})

function enableButtons() {
  $('#orange').on('click', function() {
    playerNotes.push("orange")
    $('#simonSound4').get(0).play()
    $('#orange').effect('highlight', {}, 250)
    playerTurn()
  })
  $('#turquoise').on('click', function() {
    playerNotes.push("turquoise")
    $('#simonSound2').get(0).play()
    $('#turquoise').effect('highlight', {}, 250)
    playerTurn()
  })
  $('#lime').on('click', function() {
    playerNotes.push("lime")
    $('#simonSound1').get(0).play()
    $('#lime').effect('highlight', {}, 250)
    playerTurn()
  })
  $('#purple').on('click', function() {
    playerNotes.push("purple")
    $('#simonSound3').get(0).play()
    $('#purple').effect('highlight', {}, 250)
    playerTurn()
  })
}

function disableButtons() {
  $('#orange').off('click')
  $('#turquoise').off('click')
  $('#lime').off('click')
  $('#purple').off('click')
}
