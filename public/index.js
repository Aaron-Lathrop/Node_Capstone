'use strict';
console.log('client-side code is running');

let questionNumber = 0;

const nodeSampleQuestions = {
    "questions": [
        {
            "id": "1111111",
            "questionText": "Describe the HTTP requests/response lifecycle.",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "2222222",
            "questionText": "Describe the architecture of a basic Express app. How is it organized?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "3333333",
            "questionText": "Tell me about a time when you've used Express Router. How was it helpful?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "4444444",
            "questionText": "What's your experience with continuous integration? How has it helped you?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "5555555",
            "questionText": "Describe how a Mongo database is structured.",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "6666666",
            "questionText": "How do JSON web tokens work?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "7777777",
            "questionText": "What is the purpose of bycrypt in the authentication process?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        }
    ]
};

const responses = {
    "responses": [
        {
            "id": "1111111",
            "userName": "Aaron",
            "questionText": "",
            "userResponse": "",
            "date": Date
        },
        {
            "id": "2222222",
            "userName": "Aaron",
            "questionText": "",
            "userResponse": "",
            "date": Date
        },
        {
            "id": "3333333",
            "userName": "Aaron",
            "questionText": "",
            "userResponse": "",
            "date": Date
        },
        {
            "id": "4444444",
            "userName": "Aaron",
            "questionText": "",
            "userResponse": "",
            "date": Date
        },
        {
            "id": "5555555",
            "userName": "Aaron",
            "questionText": "",
            "userResponse": "",
            "date": Date
        },
        {
            "id": "6666666",
            "userName": "Aaron",
            "questionText": "",
            "userResponse": "",
            "date": Date
        },
        {
            "id": "7777777",
            "userName": "Aaron",
            "questionText": "",
            "userResponse": "",
            "date": Date
        },
        
    ]
};

function getPracticeQuestion(questionList){
        const question = questionList.questions[questionNumber].questionText;
        return question;
}

function getResponses(callback){
    setTimeout(function(){callback(responses)}, 100);
}

function displayResponses(data) {
    for (let i=0; i< data.responses.length; i++){
        $('body').append(
            `<strong> ${data.responses[i].questionText} </strong>
             <p> ${data.responses[i].userResponse} </p><br><br>`
        );
    }
}

function getAndDisplayResponses(){
    getResponses(displayResponses);
}

function mockStartHandler() {
    $('#mockStart').click(function(){
        const question = getPracticeQuestion(nodeSampleQuestions);
        $('#mockInterview').html(`
            <form id='interview' name='interview' autocomplete='off'>
            <label>${question}</label>
            <textarea id='userResponse' rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='userResponse' autofocus></textarea>
            <button id='answerButton' type='submit' value='Answer'>Answer</button>
            </form>`);
    });
    let mic = $('#speechinput');
    mic.onfocus = mic.blur;
    mic.onwebkitspeechchange = function(e) {
        $('#userResponse').val() = speechinput.val();
    };
    $(answerButtonHandler());
}

function answerButtonHandler() {
    $('#mockInterview').submit("#interview", function(e){
        e.preventDefault();
        
        if(questionNumber < nodeSampleQuestions.questions.length){
            responses.responses[questionNumber].questionText = $('#interview').find('label').text();
            responses.responses[questionNumber].userResponse = $('#interview').find('textarea[name="userResponse"]').val();
            console.log(`The user response is: ${responses.responses[questionNumber].userResponse}`);
            const question = getPracticeQuestion(nodeSampleQuestions);
            $('#mockInterview').html(`
                <form id='interview' name='interview' autocomplete='off'>
                <label>${question}</label>
                <textarea id='userResponse' rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='userResponse' autofocus></textarea>
                <button id='answerButton' type='submit' value='Answer'>Answer</button>
                </form>`);
            
        } else {
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
    });
}

function reviewButtonHandler(){
    $("#review").click(function(){
        console.log(`Review button clicked`);
        $(getAndDisplayResponses);
    });
}

function handleNodeApp(){
    $(mockStartHandler());
}

$(handleNodeApp());
