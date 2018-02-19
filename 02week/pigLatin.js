'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
CODE PLAN
---------------
--create array of vowels
--convert the word to be translated into an array of letters
--loop through letters of word and vowels to find the first match
  -if/ if else statements
    -words where the first "vowel" is Y are a lil special.
      --if y is the first letter of the word, treat like consonant, if it is in the middle of the word treat like vowel.
      put this case first (if statement)
      --else if the first letter is a vowel, add yay to end of the word (push? or just + 'yay')
      --else if the first letter is a consonant, remove consonant(s) from beginning of array and push to lettersToEnd
        -convert first letters to string + 'ay' --> push this to the end of the words
        -join the result to create a string of the translated word
*/

const pigLatin = (word) => {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  word = word.trim().toLowerCase()
  const letters = word.split('')
  if (letters[0] === vowels[5]) {
    return word.slice(1) + 'yay'
  } else if (vowels.includes(letters[0])) {
    return word + 'yay'
  } else {
    const firstVowel = letters.findIndex(letter => vowels.includes(letter));
    const firstLetters = (letters.splice(0, firstVowel)).join('')
    const translatedWordAsArr = letters.push(firstLetters + 'ay')
    const translatedWord = letters.join('')
    return(translatedWord)
  }
}

function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
