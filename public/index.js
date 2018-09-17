'use strict';
console.log('client-side code is running');

let questionNumber = 0;

const interviewResponses = {
    userName: "Admin",
    firstName: "Aaron",
    responses: []
};

function getPracticeQuestion(callback){
    const URL = "https://stark-thicket-75096.herokuapp.com/mock-interview";

    $.getJSON(URL, callback)
    .done(function(data){
        console.log(data);
    });
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
    const URL = "https://stark-thicket-75096.herokuapp.com/interview";
    const data = interviewResponses;
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {"content-type": "application/json"},
        type: "POST",
        url: URL,
        data: JSON.stringify(data),
        success: function(response){
            console.log(`POST of was successful for the following:`); 
            console.log(response);
            displayResponses(response);
        }
    });
    
}

// function getResponses(callback){
//     const URL = "https://stark-thicket-75096.herokuapp.com/interview";
//     $.getJSON(URL,callback);
// }

function displayResponses(data) {
    console.log(`the data to be displayed is:`);
    console.log(data);
    $('body').addClass('center');
    $('body').html(`
    <h1><u>Here are your responses</u></h1><br><br>`);
    for (let i=0; i< data.responses.length; i++){
        $('body').append(
            `<div class="response col-6">
                <p><strong> ${data.responses[i].questionText} </strong></p>
                <p> ${data.responses[i].responseText} </p>
             </div>`
        );
    }
}

// function getAndDisplayResponses(){
//     getResponses(displayResponses);
// }

function mockStartHandler() {
    console.log(`mockStartHandler called`);
    $('#mockStart').click(function(){
        $('welcome').toggleClass('hide');
        $('mock').toggleClass('hide');
        $(getAndDisplayQuestions());
    });
}

function answerButtonHandler() {
    console.log(`answerButtonHandler called`);
    $('#interview').submit(function(e){
        e.preventDefault();
        console.log(`answer button clicked`);
        if(questionNumber < 9){
            interviewResponses.responses.push({
                "userName": "Admin",
                "questionText": $('#interview').find('label').text(),
                "responseText": $('#interview').find('textarea[name="userResponse"]').val()
            });
            $(getAndDisplayQuestions());
            
        } else {
            interviewResponses.responses.push({
                "userName": "Admin",
                "questionText": $('#interview').find('label').text(),
                "responseText": $('#interview').find('textarea[name="userResponse"]').val()
            });
            $('#mockInterview').html(`
                <h3>Thank you for your time, this concludes the interview</h3>
                <p><span class='center'>Click the review button to review your answers.</span></p>
                <button id='review'>Review Your Answers</button>`);
            $(reviewButtonHandler());
        }
        let mic = $('#speechinput');
        mic.onfocus = mic.blur;
        mic.onwebkitspeechchange = function(e) {
        $('#userResponse').val() = speechinput.val();
    };
        questionNumber++;
        console.log(interviewResponses);
    });
}

function reviewButtonHandler(){
    $("#review").click(function(){
        console.log(`Review button clicked`);
        questionNumber = 0;
        createInterview();
    });
}

function handleNodeApp(){
    $(mockStartHandler());
}

$(document).ready($(handleNodeApp()));
