'use strict';

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

function changePasswordHandler(){
    $('#change-password').submit(function(event){
        event.preventDefault();
        const currentPassword = $("input[name='currentPassword']").val();
        const newPassword = $("input[name='newPassword']").val();
        const confirmPassword = $("input[name='confirmPassword']").val();
        if(newPassword.length >= 10){
            if(confirmPassword === newPassword){
                const passwordChange = {
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }
                changePassword(passwordChange);
                loadScreen('home');
            } else {
                alert(`Passwords do not match`);
            }
        } else {
            alert(`Password must be at least 10 characters in length`);
        }
        
    });
}

function startInterviewHandler(){
    $('#startInterview').click(function(){
        loadScreen('practice');
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

function getAndDisplayInterviewCards(event){
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
        location.reload();
    });
}

function displayDashboard(){
    const user = getUserAuthenticationFromCache();
    $('.js-username-dash').html(user.firstName);
    // loadScreen('home');
}

function handleShowLoginSignup() {
    $('.js-show-login-signup').click(function(){
        $('#signup').toggleClass('hide');
        $('#login').toggleClass('hide');
    });
}

function loggedIn() {
    const user = getUserAuthenticationFromCache();
    if(user){
        displayDashboard();
        $('#get-started').toggle();
        $('#logged-out').addClass('hide');
        $('#logged-in').removeClass('hide');
        return true;
    } else{
        $('nav').addClass('hide');
        return false;
    }
}

function showNav(){
    if(loggedIn()){
        $('#nav-list').toggle();
    }
}

function onPageLoad(){
    $(loggedIn());
    $(logoutUser());
    $(signupButtonHandler());
    $(loginButtonHandler());
    $(reviewAllHandler());
    $(startInterviewHandler());
    $(handleShowLoginSignup());
    $(handleNav());
    $(mockStartHandler());
    $(getStartedHandler());
    $(changePasswordHandler());
}

$(document).ready($(onPageLoad()));
