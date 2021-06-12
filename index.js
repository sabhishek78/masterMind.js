// https://gist.github.com/McLarenCollege/cbb5fbadc37ffbacefbe0d033d76cb95
let rlSync = require('readline-sync');
function playGame(){
let code = generateCode();
 console.log(code);
let guessCount =1;
while(guessCount <=5){
  let userGuess = getUserGuess();
  let resultObj = calcScore(code,userGuess);
  // console.log(resultObj);
  if(resultObj['correctPos'] === 4){
    console.log("Your Guess is Correct. You Win !!!");
    break;
  }
  else{
  console.log(" Attemp Number : "+ guessCount);
  console.log(resultObj['correctPos'] + " digits matching in the correct position");
  console.log(resultObj['inCorrectPos'] + " digits matching in the incorrect position");
  if(guessCount !==5){
   console.log("Lets Try Again!!");
  }
  
  guessCount++;

  }
  
}
if(guessCount === 6){
  console.log("End Of Game. You Lost");
  console.log(" The correct Code was "+ code);
}



}
function getUserGuess(){
 let userGuess = rlSync.question("Please guess a 4 digit numeric code :");
 if(checkValidityOfUserGuess(userGuess)){
   console.log("You entered "+ userGuess);
   return userGuess;
 }
 else{
   console.log("Invalid Input. Please retry!!");
   getUserGuess();
 }
}
function checkValidityOfUserGuess(userGuess){
  if(userGuess.length !== 4){
    return false;
  }
  for( let i=0;i<userGuess.length;i++){
    if(!(userGuess[i]>='0' && userGuess[i]<='9')){
      return false;
    }
  }
  return true;
}
function generateCode(){
      var fullNumber = [];
      var digit1 = Math.floor(Math.random() * 5) + 1;
      var digit2 = Math.floor(Math.random() * 5) + 1;
      var digit3 = Math.floor(Math.random() * 5) + 1;
      var digit4 = Math.floor(Math.random() * 5) + 1;
      fullNumber.push(digit1, digit2, digit3, digit4);
      return fullNumber.join("");
    }

function calcScore(code,guess){
 let obj = {
    'correctPos' : 0,
    'inCorrectPos' :0
  }
  let guessArray = guess.split('');
  let codeArray = code.split('');
  for( let i=0;i<guessArray.length;i++){
    for( let j=0;j<codeArray.length;j++){
      if(guessArray[i] === codeArray[j]){
        if( i===j){
          obj['correctPos']++;
          }
        else{
          obj['inCorrectPos']++;
          }
        guessArray[i]= '*';
        codeArray[j]='*';
        break;
      }
    }
  }
 return obj; 
}
playGame();
// console.log(calcScore([4, 4, 1, 2], [4, 1, 0, 2]));//2,1
// console.log(calcScore([4, 4, 1, 2], [0, 0, 0, 0]));//0,0
// console.log(calcScore([4, 4, 1, 2], [4, 4, 1, 2]));//4,1
// console.log(calcScore([4, 4, 1, 2], [4, 1, 0, 2]));//2,1
// console.log(calcScore([4, 4, 1, 2], [0, 0, 0, 0]));//0,0
// console.log(calcScore([4, 2, 2, 2], [4, 1, 1, 1]));//1,0
// console.log(calcScore([2, 4, 2, 2], [4, 1, 1, 1]));//0,1
// console.log(calcScore([2, 4, 4, 2], [4, 1, 1, 4]));//0,2