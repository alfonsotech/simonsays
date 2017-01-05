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
  resetVars()
  simonAddNote()
  timeOutLoop(0, flashSounds, 1000)
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
  const randomNum = Math.floor((Math.random()*3) + 1)
  const colorObj = {
    1: 'orange',
    2: 'cyan',
    3: 'brown',
    4: 'indigo'
  }
  simonNotes.push(colorObj[randomNum])
  console.log(simonNotes)
}

function flashSounds(reps) {
  const soundsToNotes = {
    brown: document.getElementById("simonSound1"),
    cyan: document.getElementById("simonSound2"),
    indigo: document.getElementById("simonSound3"),
    orange: document.getElementById("simonSound4")
  }
  if(soundsToNotes[playerNotes[reps]]){
    soundsToNotes[playerNotes[reps]].play()
    $('#'+ [playerNotes[reps]]).effect('highlight', {}, 1000)
  }
}

function timeOutLoop(reps, fn, delay) {
  if(reps <= simonNotes.length) {
    // TODO: Delete const timerID
    const timerId = setTimeout(() => {
      fn(reps)
      timeOutLoop(reps + 1, fn, delay)
    }, 1000)
  }
}

function playerTurn() {
  if(playerNotes.length === 20) { // Win condition
    gameRunning = false
    resetVars()
    alert("You win! Press start to play again.")
    // Disable buttons
  } else if(playerNotes[currentPosition] !== simonNotes[currentPosition]) { // Lose condition
    alert("You loose 😹, press start to try again!");
    // Disable buttons
  } else {
    // Disable buttons
    simonAddNote()
    // Enable Error

    // let stillCorrect = true
    // playerNotes.forEach( (element, index) => {
    //   if (element === simonNotes[index]) {
    //
    //   } else {
    //     stillCorrect = false
    //   }
    // })
  }
}

//disable player buttons
$(document).ready(() => {
  $('#start').on('click', () => {
    startGame()
    $('#orange').on('click', function() {
      playerNotes.push("orange")
      $('#simonSound4').get(0).play()
      $('#orange').effect('highlight', {}, 250)
      playerTurn()
    })
    $('#cyan').on('click', function() {
      playerNotes.push("cyan")
      $('#simonSound2').get(0).play()
      $('#cyan').effect('highlight', {}, 250)
      playerTurn()
    })
    $('#brown').on('click', function() {
      playerNotes.push("brown")
      $('#simonSound1').get(0).play()
      $('#brown').effect('highlight', {}, 250)
      playerTurn()
    })
    $('#indigo').on('click', function() {
      playerNotes.push("indigo")
      $('#simonSound3').get(0).play()
      $('#indigo').effect('highlight', {}, 250)
      playerTurn()
    })
  })
})
