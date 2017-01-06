'use strict'
const playerNotes = []
const simonNotes = []
let counter = 0
let gameRunning = true
let currentPosition = 0

const startGame = () => {
  if(!gameRunning) {
    gameRunning = true
  }
  disableButtons()
  resetVars()
  simonAddNote()
  simonSays(0, flashSound)
  // TODO: Make these run after player's turn and once before any turn
}

const resetVars = () => {
  // TODO: Test that this array actually empties (const)
  playerNotes.length = 0
  simonNotes.length = 0
  counter = 0
  currentPosition = 0
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
    // TODO: Delete const timerID
    const timerId = setTimeout(() => {
      callback(iterator)
      simonSays(iterator + 1, callback)
    }, 1000)
  } else if (iterator === simonNotes.length -1) {
    const timerId = setTimeout(() => {
      callback(iterator)
      enableButtons()
    }, 1000)
  }
}

function playerTurn() {
  console.log("current position", currentPosition)
  console.log("simonnotes.length", simonNotes.length)
  console.log("plyerNoeslength", playerNotes.length)
  if(playerNotes.length === 20) { // Win condition
    gameRunning = false
    resetVars()
    alert("You win! Press start to play again.")
    disableButtons()
  } else if(playerNotes[currentPosition] !== simonNotes[currentPosition]) { // Lose condition
    alert("You loose 😹, press start to try again!");
    disableButtons()
  } else {
    currentPosition += 1
    // Is player still punching in more notes for the sequence? or is player done with this sequence?
    // Time the player?
      if( playerNotes.length === simonNotes.length ) { // Player is done, turn over game back to Simon
        playerNotes.length = 0
        currentPosition = 0
        disableButtons()
        simonAddNote()
        setTimeout(function() {
          simonSays(0, flashSound)
        }, 100)
      }
    // Enable Error
  }
}

//disable player buttons
$(document).ready(() => {
  $('#start').on('click', () => {
    startGame()
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
