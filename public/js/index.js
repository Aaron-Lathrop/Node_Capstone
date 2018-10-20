'use strict';

const CACHE = {
        getUserAuthenticationFromCache,
        saveUserAuthenticationIntoCache,
        deleteUserAuthenticationFromCache
    };


function signupButtonHandler(){
    $('#signup').submit(function(e){
        e.preventDefault();
        const username = `${$('input[name="username"]').val()}`;
        const password = `${$('input[name="password"]').val()}`;
        const firstName = `${$('input[name="firstName"]').val()}`;
        const lastName = `${$('input[name="lastName"]').val()}`;
        if(username && password && firstName && lastName){
            const newUser = {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            };
            postNewUser(newUser);
            $('input[name="username"]').val("");
            $('input[name="password"]').val("");
            $('input[name="firstName"]').val("");
            $('input[name="lastName"]').val("");
        } else {
            alert(`please complete all required fields`)
        }
        
    });
}

function loginButtonHandler(){
    $('#login').submit(function(e){
        e.preventDefault();
        const userSignupInfo = {
            username: $('input[name="login-username"]').val(),
            password: $('input[name="login-password"]').val()
        };
        $('input[name="login-username"]').val("");
        $('input[name="login-password"]').val("");
        loginUser(userSignupInfo);
    });
}


function displayInterviewCards(data){
    $('main').html(`<h1>Click on an interview to view your responses.</h1>
    <section id="selectInterview" class="row"></section>`);
    data.forEach(interview => {
        $('#selectInterview').append(`
        <div id=${interview.id} class='col-6 response-container interviewContainer'>

            <p><b>Interview from:</b> <span>${interview.created}</span></p>
            <button class="reviewInterview">Review</button>
            <button class="deleteInterview">Delete</button>
        </div>`);
    });
    $(displayInterviewResponses(data));
    $(deleteInterview());
}

function getAndDisplayInterviewCards(){
    getInterviews(displayInterviewCards);
}

function displayInterviewResponses(data){
    $('.reviewInterview').on("click", function(e){
        const interviewId = $(e.target).closest('div').attr('id');
        const interview = data.find(function(item){
            return item.id === interviewId;
        });
        displayResponses(interview);
    });
}



function logoutUser(){
    $('#logout').click(function(){
        CACHE.deleteUserAuthenticationFromCache();
        location.reload();
    });
}

function displayDashboard(){
    const user = CACHE.getUserAuthenticationFromCache();
    $('.js-username-dash').html(user.firstName);
}

function handleShowLoginSignup() {
    $('.js-show-login-signup').click(function(){
        $('#signup').toggleClass('hide');
        $('#login').toggleClass('hide');
    });
}

function loggedIn() {
    const user = CACHE.getUserAuthenticationFromCache();
    if(user){
        $('nav').removeClass('hide');
        $('#practice, #review, #logout').removeClass('hide');
        $('#signin, #register, #get-started').addClass('hide');
        displayDashboard();
        $(logoutUser());
        return true;
    } else{
        $('nav').addClass('hide');
        $('#practice, #review, #logout').addClass('hide');
        $('#home, #signin, #register, #get-started').removeClass('hide');
        return false;
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function showNav(){
    if(loggedIn()){
        $('#home, #practice, #review, #logout').toggle();
        $('#practice, #review, #logout').removeClass('hide');
    } else {
        $('#home, #signin, #register').toggle();
        $('#home, #signin, #register').removeClass('hide');
    }
}

function onPageLoad(){
    $(loggedIn());
    $(signupButtonHandler());
    $(loginButtonHandler());
    $(handleShowLoginSignup());
    $(handleNav());
    $(mockStartHandler());
    $(getStartedHandler());
}

$(document).ready($(onPageLoad()));