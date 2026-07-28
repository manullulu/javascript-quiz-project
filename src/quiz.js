class Quiz {
    constructor(questions, timeLimit, timeRemaining){
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
    
    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }
    
    moveToNextQuestion(){
        this.currentQuestionIndex++;
    }
    shuffleQuestions(){
        this.questions.sort(() => Math.random() - 0.5); 
    }
    checkAnswer(answer){
        if(this.getQuestion().answer === answer){
            this.correctAnswers += 1;
        }
    }

    // 6. hasEnded()
    hasEnded(){
        if(this.currentQuestionIndex < this.questions.length){
            return false;
        }else if(this.currentQuestionIndex === this.questions.length){
            return true;
        }
    }
    filterQuestionsByDifficulty(difficulty){
        if((difficulty >= 1) && (difficulty <= 3)){
            this.questions = this.questions.filter(element => element.difficulty === difficulty);
            return this.questions
        }
    }
    averageDifficulty(){
       return  this.questions.reduce((acc, n) => {
            return acc + n.difficulty }, 0) / this.questions.length;
    }

}