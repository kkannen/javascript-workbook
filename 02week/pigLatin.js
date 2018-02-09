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


//PIG LATIN TRANSLATOR FUNCTION
const pigLatin = (word) => {
  const vowel = ['a', 'e', 'i', 'o', 'u', 'y']; //all the vowels--including the sometimes ones
  const formattedWord = word.toLowerCase().trim(); //lowercase word, nospaces
  const letters = formattedWord.split(''); //makes array out of letters in word
  for (let i = 0; i < letters.length; i++){
    for (let j = 0; j < vowel.length; j++){
      const indexOfVowel = letters.indexOf(vowel[j])
      let firstLetters = ''
      if(letters[0] === vowel[5]){ //cases in which the first letter of a word is 'y'
        return word.slice(1) + 'yay'
      } else if (letters[0] === vowel[j]) { //cases in which first letter is a vowel
        return word + 'yay'
      } else if (letters[i] === vowel[j] && letters.indexOf(vowel[j] > 0)){ //cases in which first letter(s) is/are consonant(s)
        firstLetters = letters.splice(0, indexOfVowel).join('') //chops consonants off the beginning of letters array, and converts them to string
        const lettersToEnd = letters.push(firstLetters + 'ay') //pushes firstLetters + 'ay' to end of word
        const translatedWord = letters.join('') //converts mutated array to string
        return translatedWord
      }//if statement
    }//vowels loop
  }//letters loop
}//pigLatin


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
