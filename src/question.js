class Question {
    constructor(text, choices, answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }
    //
    // 1. constructor (text, choices, answer, difficulty)

    shuffleChoices(){
        this.choices.sort(() => Math.random() - 0.5);
    }
}
/*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}  
  for(let i = this.choices.length - 1 ; i > 0 , i--){
        let num = Math.floor(Math.random() * (i + 1));
        

    }
*/

  