import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import { preventOverflow } from '@popperjs/core';


$(document).ready(function () {
  $('#start').click(function () {
    let request = new XMLHttpRequest();
    const url = "https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,general_knowledge,history,society_and_culture,sport_and_leisure&limit=10"

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $("#quizForm").show();
      $("#start").hide();
      let question = response[0].question;
      let correctAnswers = 0;
      let questionNum = 0;
      let correctAnswer = response[0].correctAnswer;
      let Answers = response[0].incorrectAnswers;

      function newQuestion() {
        $('#question').text(`Q: ${question}`);
        Answers.push(correctAnswer);
        Answers.sort();
        $('#answersDiv').html("");
        Answers.forEach(function (answer) {
          if(answer !== correctAnswer) {
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
          correctAnswers ++;
        }
        console.log(answer);
        console.log(correctAnswer);
        console.log(questionNum);
      }

      $('#quizForm').submit(function(event){
        event.preventDefault();
        questionSubmit();
        questionNum ++;
      })

      $('#next').click(function(){
        if (questionNum === 10) {
          $("#next").hide();
          $("#finalPage").show();
          $("#quizForm").hide();
          $("#correctCount").hide();
          $("#finalTotalSpan").text(correctAnswers);
        } else {
        $("#button").show();
        $("#next").hide();
        question = response[questionNum].question;
        correctAnswer = response[questionNum].correctAnswer;
        Answers = response[questionNum].incorrectAnswers;
        $(".answer").css("color", "black");
        newQuestion();
        }
      })

      $("#tryAgain").click(function() {
        location.reload();
      })

    }
  });
});