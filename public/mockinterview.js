'use strict';

let questionNumber = 0;

const questions = [];
const interviewResponses = {
    username: "Admin",
    firstName: "Aaron",
    responses: []};

function getPracticeQuestion(callback){
    const URL = "https://stark-thicket-75096.herokuapp.com/mock-interview";
    $.getJSON(URL, callback);
}

function displayQuestion(data){
    $('#mockInterview').html(`
        <form id='interview' name='interview' autocomplete='off'>
        <label><span id="interviewQuestion">${data.questions[questionNumber].questionText}</span><img id="interviewAvatar" src="/Interview_avatar.png"></label>
        <textarea id='userResponse' rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='userResponse' autofocus></textarea>
        <button id='answerButton' type='submit' value='Answer'>Answer</button>
        </form>`);
    answerButtonHandler();
}

function getAndDisplayQuestions(){
    getPracticeQuestion(displayQuestion);
}

function createInterview(){
    const URL = "http://localhost:8080/interview";
    const data = interviewResponses;
    $.ajax({
        async: true,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        url: URL,
        data: JSON.stringify(data),
        success: function(response){
            console.log(`POST of was successful for the following:`); 
            console.log(response);
            displayResponses(response);
        },
    });
    
}

function displayResponses(data) {
    $('body').addClass('center');
    $('body').html(`
    <h1><u>Here are your responses</u></h1><br><br>`);
    for (let i=0; i< data.responses.length; i++){
        $('body').append(
            `<div class="response col-6">
                <p><strong> ${data.responses[i].questionText}</strong></p>
                <p> ${data.responses[i].responseText}</p>
             </div>`
        );
    }
}

function mockStartHandler() {
    $('#mockStart').click(function(){
        console.log('starting interview')
        $('welcome').toggleClass('hide');
        $('mock').toggleClass('hide');
        $(getAndDisplayQuestions());
    });
}

function answerButtonHandler() {
    $('#interview').submit(function(e){
        e.preventDefault();
        if(questionNumber < 9){
            interviewResponses.responses.push({
                "username": "Admin",
                "questionText": $('#interview').find('label').text(),
                "responseText": $('#interview').find('textarea[name="userResponse"]').val()
            });
            $(getAndDisplayQuestions());
            
        } else {
            interviewResponses.responses.push({
                "username": "Admin",
                "questionText": $('#interview').find('label').text(),
                "responseText": $('#interview').find('textarea[name="userResponse"]').val()
            });
            $('#mockInterview').html(`
                <h3>Thank you for your time, this concludes the interview</h3>
                <p><span class='center'>Click the review button to review your answers.</span></p>
                <button id='reviewButton'>Review Your Answers</button>`);
            $(reviewButtonHandler());
        }
        let mic = $('#speechinput');
        mic.onfocus = mic.blur;
        mic.onwebkitspeechchange = function(e) {
        $('#userResponse').val() = speechinput.val();
    };
        questionNumber++;
    });
}

function reviewButtonHandler(){
    $("#reviewButton").click(function(){
        questionNumber = 0;
        createInterview();
    });
}

$(mockStartHandler());