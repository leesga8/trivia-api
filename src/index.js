import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import Trivia from './business.js'

$(document).ready(function () {
  $('#start').click(function () {
    let promise = Trivia.getQuestion();
    promise.then(function (response) {
      const body = JSON.parse(response);

      // function getElements(body) {
        $("#quizForm").show();
        $("#start").hide();
        let question = body[0].question;
        let correctAnswers = 0;
        let questionNum = 0;
        let correctAnswer = body[0].correctAnswer;
        let Answers = body[0].incorrectAnswers;

        function newQuestion() {
          $('#question').text(`Q: ${question}`);
          Answers.push(correctAnswer);
          Answers.sort();
          $('#answersDiv').html("");
          Answers.forEach(function (answer) {
            if (answer !== correctAnswer) {
              $('#answersDiv').append(`<div><input type="radio" id="${answer}" name="feild${questionNum}" value="${answer}">
            <label class="incorrect answer" for="${answer}">${answer}</label></div>`)
            } else {
              $('#answersDiv').append(`<div><input type="radio" id="${answer}" name="feild${questionNum}" value="${answer}">
            <label class="correct answer" for="${answer}">${answer}</label></div>`)
            }
          });
        }

        newQuestion();

        function questionSubmit() {
          const answer = $(`input[name='feild${questionNum}']:checked`).val();
          $(".incorrect").css("color", "red");
          $(".correct").css("color", "green");
          $("#button").hide();
          $("#next").show();

          if (answer === correctAnswer) {
            correctAnswers++;
          }
          console.log(answer);
          console.log(correctAnswer);
          console.log(questionNum);
        }

        $('#quizForm').submit(function (event) {
          event.preventDefault();
          questionSubmit();
          questionNum++;
        })

        $('#next').click(function () {
          if (questionNum === 10) {
            $("#next").hide();
            $("#finalPage").show();
            $("#quizForm").hide();
            $("#correctCount").hide();
            $("#finalTotalSpan").text(correctAnswers);
          } else {
            $("#button").show();
            $("#next").hide();
            question = body[questionNum].question;
            correctAnswer = body[questionNum].correctAnswer;
            Answers = body[questionNum].incorrectAnswers;
            $(".answer").css("color", "black");
            newQuestion();
          }
        })

        $("#tryAgain").click(function () {
          location.reload();
        })

      // }
    }, function (error) {
      $('.showErrors').text(`ERROR: ${error}`)
    })  
  })
});