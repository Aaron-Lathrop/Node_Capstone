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

function getPracticeQuestion(questionList){
    if(questionNumber < questionList.length){
        const question = questionList.questions[questionNumber].questionText;
        questionNumber++;
        return question;
    }
    
}

function mockStartHandler() {
    $('#mockStart').click(function(){
        $('#mockInterview').html(`
        <form id='interview name='interview' autocomplete='off'>
        <label>${getPracticeQuestion(nodeSampleQuestions)}</label>
        <textarea rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='Describe the HTTP requests/response lifecycle'></textarea>
        <input id='answerButton' type='submit' value='Answer'>
        </form>`);
    });
    $(answerButtonHandler());
}

function answerButtonHandler() {
    $('#mockInterview').submit("#interview", function(e){
        e.preventDefault();
        $('#mockInterview').html(`
        <form id='interview name='interview' autocomplete='off'>
        <label>${getPracticeQuestion(nodeSampleQuestions)}</label>
        <textarea rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='Describe the HTTP requests/response lifecycle'></textarea>
        <input id='answerButton' type='submit' value='Answer'>
        </form>`);
    });
}

function handleNodeApp(){
    $(mockStartHandler());
    
}

$(handleNodeApp());
