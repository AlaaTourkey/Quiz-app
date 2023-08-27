import { Quiz } from './quiz.js'
export class Settings {
  constructor() {
    this.categoryElement = document.getElementById('Category');
    this.difficultyElement = Array.from(document.getElementsByName('difficulty'));
    this.numberOfQuestionsElement = document.getElementById('numberOfQuestions');
    document.getElementById("startBtn").addEventListener("click", this.startQuiz.bind(this));
  }

  async startQuiz(e) {
    e.preventDefault();
    let category = this.categoryElement.value;
    let difficulty = this.difficultyElement.filter(el => el.checked)[0].value
    let numOfQuestions = this.numberOfQuestionsElement.value
    let API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`

    if (numOfQuestions == "") {
      $("#alert1").fadeIn(400)
    } else {
      $("#alert1").fadeOut(400)

    }
    let questions = await this.fetchAPI(API)
    if (questions.length > 0) {
      $('#setting').fadeOut(400, () => {
        $('#quiz').fadeIn(400)
      })
      let quiz = new Quiz(questions)
    } else {

    }

  }
  // hold the api
  async fetchAPI(API) {
    let response = await fetch(API)
    response = await response.json()
    return response.results;
  }
}