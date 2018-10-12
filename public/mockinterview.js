'use strict';

let questionNumber = 0;

const interviewQuestions = [];
const interviewResponses = {
    username: "",
    firstName: "",
    responses: []};

function getInterviewQuestions(callback){
    const URL = "https://stark-thicket-75096.herokuapp.com/mock-interview";
    $.getJSON(URL, callback)
    .done(data => {
        console.log(data);
        storeQuestionsLocally(data);
    });
}

function storeQuestionsLocally(data){
    data.questions.forEach(question => interviewQuestions.push(question));
    displayQuestion(interviewQuestions);
}

function randomQuestion(questions){
    if(interviewQuestions.length > 0){
        let randomNumber = Math.floor(Math.random() * interviewQuestions.length);
        console.log(randomNumber);
        const output = questions.splice(randomNumber,1);
        console.log(output[0]);
        return output[0];
    } 
    else {
        alert("No more questions");
    }
    
}

function displayQuestion(){
    $('#mockInterview').html(`
        <form id='interview' name='interview' autocomplete='off'>
            <div class="row">
                <img id="interviewAvatar" class="col-12" src="/Interview_avatar.png">
            </div>
            <div class="row">
                <label class='interviewQuestion col-12'><span>${randomQuestion(interviewQuestions).questionText}</span></label>
            </div>
            <div class="row">
                <textarea class="col-12" id='userResponse' rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='userResponse' autofocus></textarea>
            </div>
            <div class="row">
                <button id='answerButton' type='submit' value='Answer'>Answer</button>
            </div>
        </form>`);
    answerButtonHandler();
}


function getAndDisplayQuestions(){
    getInterviewQuestions(displayQuestion);
}

function createInterview(){
    console.log(`createInterview called`);
    const token = localStorage.getItem("access_token");
    const userInfo = parseJwt(token);
    const URL = `/users/${userInfo.user.username}/interview`;
    const data = interviewResponses;
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        dataType: "json",
        type: "POST",
        url: URL,
        data: JSON.stringify(data),
        success: function(){
            displayResponses(data);
        },
    });
    
}

function displayResponses(data) {
    console.log(data);
    $('header').removeClass('hide');
    $('header').html(`<h1><u>Here are your responses</u></h1><br><br>`);
    $('main').html(`<section id="display-responses" class="row"></section>`)
    for (let i=0; i < data.responses.length; i++){
        console.log(`appending results ${i}`);
        console.log(data.responses[i].questionText);
        $('#display-responses').append(
            `<div class="response-container col-6">
                <p><strong> ${data.responses[i].questionText}</strong></p>
                <p> ${data.responses[i].responseText}</p>
             </div>`
        );
    }
}

function mockStartHandler() {
    console.log("mockStartHandler called");
    $('#mockStart').click(function(){
        $('welcome').toggleClass('hide');
        $('mock').toggleClass('hide');
        $(getInterviewQuestions());
    });
}

function answerButtonHandler() {
    $('#interview').submit(function(e){
        e.preventDefault();
        const parsedToken = parseJwt(localStorage.getItem("access_token"));
        if(questionNumber < 9 && localStorage.getItem("access_token") !== null){
            interviewResponses.username = parsedToken.user.username;
            interviewResponses.firstName = parsedToken.user.firstName;
            interviewResponses.responses.push({
                "username": `${parsedToken.user.username}`,
                "questionText": $('#interview').find('label').text(),
                "responseText": $('#interview').find('textarea[name="userResponse"]').val()
            });
            $(displayQuestion());
            
        } else {
            console.log(parsedToken.user.username);
            interviewResponses.responses.push({
                "username": `${parsedToken.user.username}`,
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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};