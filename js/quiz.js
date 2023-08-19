export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.score = 0
    console.log(questions);
    document.getElementById('next').addEventListener('click', this.nextQuestion.bind(this))
    document.getElementById('tryBtn').addEventListener('click', this.tryAgain.bind(this))
    this.showQuestion();

  }

  // random array 
  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // show the question
  showQuestion() {
    document.getElementById('currentQuestion').innerHTML = this.currentQuestion + 1;
    document.getElementById('totalQuestions').innerHTML = this.questions.length;

    document.getElementById('question').innerHTML = this.questions[this.currentQuestion].question;
    let answers = [this.questions[this.currentQuestion].correct_answer, ...this.questions[this.currentQuestion].incorrect_answers];

    console.log(answers);
    this.shuffle(answers);
    console.log(answers);

    let answersRow = ''
    for (let i = 0; i < answers.length; i++) {
      answersRow += `
      <div class="form-check ">
        <input class="form-check-input" id="${answers[i]}" type="radio" name="answer"  value="${answers[i]}" >
        <label class="form-check-label" for="${answers[i]}">
          ${answers[i]}
        </label>  <br>
      </div>
      `

    }
    document.getElementById('rowAnswer').innerHTML = answersRow;
  }

  // show the next question
  nextQuestion() {
    if (Array.from(document.getElementsByName('answer')).filter(el => el.checked).length != 0) {
      $('#alert').fadeOut(400);
      let userAnswer = Array.from(document.getElementsByName('answer')).filter(el => el.checked)[0].value;
      let correctAnswer = this.questions[this.currentQuestion].correct_answer;
      this.checkUserAnswer(correctAnswer, userAnswer)
      this.currentQuestion++;
      if (this.questions.length > this.currentQuestion) {
        this.showQuestion();
      } else {
        console.log(this.score);
        document.getElementById('score').innerHTML = this.score + ` / ${this.questions.length}`
        $('#quiz').fadeOut(400, () => {
          $('#finish').fadeIn(400)
        })
      }
    } else {
      $('#alert').fadeIn(400);
    }


  }

  // check the answer
  checkUserAnswer(correctAnswer, userAnswer) {
    if (correctAnswer == userAnswer) {
      this.score++;
      $('#Correct').fadeIn(400).fadeOut(400)
    } else {
      $('#inCorrect').fadeIn(400).fadeOut(400)
    }
  }

  // try again the quiz
  tryAgain() {
    $('#finish').fadeOut(400, () => {
      $('#setting').fadeIn(400)
    })
  }
}


