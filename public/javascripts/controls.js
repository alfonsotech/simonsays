  'use strict'
  //array to hold played color-notes
  const playedNotes = []
  //array of set of color-notes
  const notesToPlay = []
//function to randomly select new color-note
let counter = 0
let gameRunning = true
//start game function
const startGame = () => {
  if(gameRunning) {
    resetVars() //reset all values and start game again
  } else {
    gameRunning = true
  }
}
  //reset game if already activated
  //activate loop
const resetVars = () => {
  //reset variables
}
//main game loop
while(gameRunning) {
  playedNotes.push("cyan", "indigo", "orange", "cyan", "brown", "indigo", "orange", "indigo")
  timeOutLoop(playedNotes.length, playBack, 1000)
  //getInPut()

  const soundsToNotes = {
    brown: document.getElementById("simonSound1"),
    cyan: document.getElementById("simonSound2"),
    indigo: document.getElementById("simonSound3"),
    orange: document.getElementById("simonSound4")
  }

  if(playedNotes.length === 20) {
    gameRunning = false
    resetVars()
    console.log("You win!")
  }

  //run playback function
  function timeOutLoop(reps, fn, delay) {
    if(reps > 0) {
      const timerId = setTimeout(() => {
        fn(reps)
        timeOutLoop(reps - 1, fn, delay)
      }, 1000)
    }
  }

  function playBack(reps) {
    if(soundsToNotes[playedNotes[reps]]) {
      soundsToNotes[playedNotes[reps]].play()
    }

  }
  playBack()
  console.log("jkshdkjfh")
  gameRunning = false

  //input function
  //check error or win condition

  //playback function
    //play sounds from array
    //add new sound to array

  //input function
    //loop while played array size is less than color-array size
    //get input clicks
      //push click to to played array
}

  //play first sound
  //need to push to the array of played color-notes
  //listens and checks to see if player gives the right input:
    //if player makes correct input then we're going to randomly select a new note, play it, and add it to the played note array
   //else give player error notice and replay sequence
   //then listen for user input

//strict mode
