'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const handOneWin = (hand1, hand2) => {
  if (hand1 === "rock" && hand2 === "scissors") {
    return true
  } else if (hand1 === "paper" && hand2 === "rock") {
    return true
  } else if (hand1 === "scissors" && hand2 === "paper"){
    return true
  }
}

const handTwoWin = (hand1, hand2) => {
  if (hand2 === "rock" && hand1 === "scissors") {
    return true
  } else if (hand2 === "paper" && hand1 === "rock") {
    return true
  } else if (hand2 === "scissors" && hand1 === "paper"){
    return true
  }
}

function rockPaperScissors(hand1, hand2) {
  hand1.toLowerCase().trim();
  hand2.toLowerCase().trim();
  if (hand1 === hand2) {
    console.log("It's a tie")
    return true
  } else if (handOneWin(hand1, hand2)) {
    console.log("Hand one wins")
    return true
  } else if (handTwoWin(hand1, hand2)) {
    console.log("Hand 2 wins!")
    return true
  } else {
    console.log("invalid input, dummy")
    return true
  }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), true);
      assert.equal(rockPaperScissors('paper', 'paper'), true);
      assert.equal(rockPaperScissors('scissors', 'scissors'), true);
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), true);
      assert.equal(rockPaperScissors('paper', 'scissors'), true);
      assert.equal(rockPaperScissors('rock', 'scissors'), true);
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), true);
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), true);
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), true);
    });
  });
} else {

  getPrompt();

}
