// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let word = "";
function initialPrompt() {
   console.log("Let's play some scrabble!");
   word = input.question("Enter a word to score: ");
   return word;
};

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

/*function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      let scoredLetter = word[i];
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(scoredLetter)) {
            letterPoints += Number(pointValue);
            //console.log(`Points for ${scoredLetter}: ${pointValue}`);
         }

      }
   }
   return letterPoints;

}
*/
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word) {
   word = word.toUpperCase();
   let simpleScore = 0;
   for (let i = 0; i < word.length; i++) {
      simpleScore += 1;
   }
   return simpleScore;
}

const vowelBonusPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U', 'Y']
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      let scoredLetter = word[i];
      for (const pointValue in vowelBonusPointStructure) {
         if (vowelBonusPointStructure[pointValue].includes(scoredLetter)) {
            letterPoints += Number(pointValue);
            //console.log(`Points for ${scoredLetter}: ${pointValue}`);
         }
      }
   }
   return letterPoints;
}

function scrabbleScorer(word) {
      word = word.toUpperCase();
      let letterPoints = 0;
   
      for (let i = 0; i < word.length; i++) {
         let scoredLetter = word[i].toLowerCase();
         for (const letter in newPointStructure) {
            if (letter === scoredLetter) {
               letterPoints += newPointStructure[letter];
            }
   
         }
      }
      return letterPoints;
   
   }


let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let bonusVowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt(word) {

   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let scoreChoice = input.question("Enter 0, 1, or 2: ");

   for (i in scoringAlgorithms) {
      let points = 0;
      if (scoreChoice === i) {
         points = scoringAlgorithms[i].scorerFunction(word);
         console.log(`Score for '${word}': ${points}`);
      }
   }
}

function transform(oldPointStructure) {
   let newPointStructure = [];
for(pointsValue in oldPointStructure) {
for(i=0; i < oldPointStructure[pointsValue].length; i++){
newPointStructure[oldPointStructure[pointsValue][i].toLowerCase()] = Number(pointsValue);
}
}
return newPointStructure;
}

function runProgram() {
   word = initialPrompt();
   scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};