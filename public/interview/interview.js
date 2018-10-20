'use strict';

let questionNumber = 0;

const interviewQuestions = [];
const interviewResponses = {
    username: "",
    firstName: "",
    responses: []};

//etc functions

function storeQuestionsLocally(data){
    data.questions.forEach(question => interviewQuestions.push(question));
    displayQuestion(interviewQuestions);
}

function randomQuestion(questions){
    if(interviewQuestions.length > 0){
        let randomNumber = Math.floor(Math.random() * interviewQuestions.length);
        const output = questions.splice(randomNumber,1);
        return output[0];
    } 
    else {
        alert("No more questions");
    }
    
}

function addResponse(){
    interviewResponses.responses.push({
        "questionText": $('#interview').find('label').text(),
        "responseText": $('#interview').find('textarea[name="userResponse"]').val()
    });
}



//display functions

function displayQuestion(){
    $('#mockInterview').html(`
        <form id='interview' name='interview' autocomplete='off'>
            <div class="row">
                <img id="interviewAvatar" class="center" src="/Interview_avatar.png">
            </div>
            <div class="row">
                <label class='interviewQuestion col-12'><span>${randomQuestion(interviewQuestions).questionText}</span></label>
            </div>
            <div class="row">
                <textarea class="col-12" id='userResponse' rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='userResponse' autofocus></textarea>
            </div>
            <div class="row">
                <button id='answerButton' class="center" type='submit' value='Answer'>Answer</button>
            </div>
        </form>`);
    answerButtonHandler();
}

function getAndDisplayQuestions(){
    getInterviewQuestions(displayQuestion);
}

function displayResponses(data) {
    $('main').html(`<h1>Here are your responses</h1><br>
    <button id='review-all' class='center'>Review All</button><section id="display-responses" class="row"></section>`)
    for (let i=0; i < data.responses.length; i++){
        $('#display-responses').append(
            `<div id=${i} class="response-container col-6">
                <p><strong> ${data.responses[i].questionText}</strong></p>
                <p> ${data.responses[i].responseText}</p>
             </div>`
        );
    }
    $(reviewAllHandler);
}



//button handlers

function answerButtonHandler() {
    $('#interview').submit(function(e){
        e.preventDefault();
        const user = getUserAuthenticationFromCache();
        if(questionNumber < 9 && user.jwtToken !== null){
            addResponse();
            $(displayQuestion());
        } 
        else {
            addResponse();
            $('#mockInterview').html(`
                <section class='container row'>
                    <div class='col-12'>
                        <h3>Thank you for your time, this concludes the interview</h3>
                        <p><span class='center'>Click the review button to review your answers.</span></p>
                    </div>
                </section>
                <button id='reviewButton' class='center'>Review Your Answers</button>`);
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

function mockStartHandler() {
    $('#mockStart').click(function(){
        $('welcome').toggleClass('hide');
        $('mock').toggleClass('hide');
        $(getInterviewQuestions());
        $('#mockStart').addClass('hide');
    });
}

function reviewAllHandler() {
    $('#review-all').click(function(){
        loadScreen('review');
    });
}