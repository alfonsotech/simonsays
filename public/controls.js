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

  playerSetup()

  function init() {
    const randomNum = Math.floor((Math.random()*3) + 1)
    const colorObj = {
      1: 'orange',
      2: 'cyan',
      3: 'brown',
      4: 'indigo'
    }
    notesToPlay.push(colorObj[randomNum])
    console.log(notesToPlay)
  }

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

  //run flashSounds function
  function timeOutLoop(reps, fn, delay) {
    if(reps <= playedNotes.length) {
      const timerId = setTimeout(() => {
        fn(reps)
        timeOutLoop(reps + 1, fn, delay)
      }, 1000)
    }
  }

  function flashSounds(reps) {
    if(soundsToNotes[playedNotes[reps]]){
      soundsToNotes[playedNotes[reps]].play()
      $('#'+ [playedNotes[reps]]).effect('highlight', {}, 1000)
      //return soundsToNotes[playedNotes[reps]].play()
    }
  }
  flashSounds()
  gameRunning = false

  //input function
  function playerSetup() {
    $('#orange').on('click', function() {
      playedNotes.push("orange")
      $('#simonSound4').get(0).play()
      $('#orange').effect('highlight', {}, 250)
    })
    $('#cyan').on('click', function() {
      playedNotes.push("cyan")
      $('#simonSound2').get(0).play()
      $('#cyan').effect('highlight', {}, 250)
    })
    $('#brown').on('click', function() {
      playedNotes.push("brown")
      $('#simonSound1').get(0).play()
      $('#brown').effect('highlight', {}, 250)
    })
    $('#indigo').on('click', function() {
      playedNotes.push("indigo")
      $('#simonSound3').get(0).play()
      $('#indigo').effect('highlight', {}, 250)
    })
  }

  function playerTurn() {
    let stillCorrect = true
    do {
      playedNotes.forEach( (element, index) => {
        if (element === notesToPlay[index]) {

        } else {
          stillCorrect = false
        }
      })
    } while(stillCorrect)
  }
  //check error or win condition

  //flashSounds function
    //play sounds from array
    //add new sound to array

  //input function
    //loop while played array size is less than color-array size
    //get input clicks
      //push click to to played array

// TODO: Make these run after player's turn and once before any turn      
  init()
  timeOutLoop(0, flashSounds, 1000)
  playerTurn()
}

  //play first sound
  //need to push to the array of played color-notes
  //listens and checks to see if player gives the right input:
    //if player makes correct input then we're going to randomly select a new note, play it, and add it to the played note array
   //else give player error notice and replay sequence
   //then listen for user input

//strict mode
