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
    // console.log(interviewQuestions);
    // console.log(randomQuestion(interviewQuestions));
    $('#mockInterview').html(`
        
        <form id='interview' name='interview' autocomplete='off'>
        <img id="interviewAvatar" src="/Interview_avatar.png">
        <label class='row'><span class="interviewQuestion">${randomQuestion(interviewQuestions).questionText}</span></label>
        <textarea id='userResponse' rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='userResponse' autofocus></textarea>
        <button id='answerButton' type='submit' value='Answer'>Answer</button>
        </form>`);
    answerButtonHandler();
}


function getAndDisplayQuestions(){
    getInterviewQuestions(displayQuestion);
}

function createInterview(){
    const token = localStorage.getItem("access_token");
    const userInfo = parseJwt(token);
    const URL = `http://localhost:8080/users/${userInfo.user.username}/interview`;
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
    $('header').html(`
    <h1><u>Here are your responses</u></h1><br><br>`);
    for (let i=0; i< data.responses.length; i++){
        $('main').append(
            `<div class="response col-12">
                <p><strong> ${data.responses[i].questionText}</strong></p>
                <p> ${data.responses[i].responseText}</p>
             </div>`
        );
    }
}

function mockStartHandler() {
    console.log("mockStartHandler called");
    $('#mockStart').click(function(){
        console.log('starting interview')
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