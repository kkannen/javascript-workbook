'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




const pigLatin = (word) => {
  const vowel = ['a', 'e', 'i', 'o', 'u', 'y'];
  const formattedWord = word.toLowerCase().trim(); //lowercase word, nospaces
  const letters = formattedWord.split(''); //makes array out of letters in word
  for (i = 0; i < letters.length; i++){
    for (j = 0; j < vowel.length; j++){
      const indexOfVowel = letters.indexOf(vowel[j])
      let firstLetters = ''
      if(letters[0] === vowel[5]){
        return word.slice(1) + 'yay'
      } else if (letters[0] === vowel[j]) {
        return word + 'yay'
      } else if (letters[i] === vowel[j] && letters.indexOf(vowel[j] > 0)){
        firstLetters = letters.splice(0, indexOfVowel).join('')
        const lettersToEnd = letters.push(firstLetters + 'ay')
        const translatedWord = letters.join('')
        return translatedWord
      }//if statement
    }//vowels loop
  }//letters loop
}//pigLatin
console.log(pigLatin('car'))

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
