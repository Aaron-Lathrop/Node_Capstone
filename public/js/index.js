'use strict';
// import * as CACHE from 'utilities';
const CACHE = window.CACHE_MODULE;


function signupButtonHandler(){
    $('#signup').submit(function(e){
        e.preventDefault();
        const username = `${$('input[name="username"]').val()}`;
        const password = `${$('input[name="password"]').val()}`;
        const firstName = `${$('input[name="firstName"]').val()}`;
        const lastName = `${$('input[name="lastName"]').val()}`;
        console.log(username, password, firstName, lastName);
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

function postNewUser(userSignupInfo){
    $.ajax({
        async: true,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        url: "/users",
        data: JSON.stringify(userSignupInfo),
        success: function(response){
            loginUser(userSignupInfo);
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

// function loginUser(usernameAndPassword){
//     $.ajax({
//         async: true,
//         crossDomain: true,
//         headers: {"content-type": "application/json"},
//         type: "POST",
//         url: "/auth/login",
//         data: JSON.stringify(usernameAndPassword),
//         success: function(jwtToken){
//             const authToken = jwtToken.authToken;
//             const parsedToken = parseJwt(authToken);
//             localStorage.clear();
//             localStorage.setItem("access_token", authToken);
//             loadLoggedInScreenUsing(parsedToken);
//         },
//         error: function (jqXHR, status, err) {
//             console.log(jqXHR, status, err);
//         }
//     });
// }

function loginUser(usernameAndPassword){
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {"content-type": "application/json"},
        type: "POST",
        url: "/auth/login",
        data: JSON.stringify(usernameAndPassword),
        success: function(response){
            console.log(response);
            CACHE.saveUserAuthenticationIntoCache(response)
            loadLoggedInScreenUsing();
        },
        error: function (jqXHR, status, err) {
            console.log(jqXHR, status, err);
        }
    });
}

function loadLoggedInScreenUsing(){
    const user = CACHE.getUserAuthenticationFromCache();
    console.log(user);
    $.ajax({
        url: `/users/${user.username}`,
        headers: {
            "Authorization": `Bearer ${user.jwtToken}`,
            "content-type": "application/json"
        },
        async: true,
        type: "GET",
        success: function(res){
            location.reload();
            $(document).ready(displayDashboard(res));
        }
    });
}

function getInterviews(callback){
    const token = localStorage.getItem("access_token");
    const userInfo = parseJwt(token);
    $.ajax({
        url: `/users/${userInfo.user.username}/interview`,
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "application/json"
        },
        async: true,
        type: "GET",
        success: function(res){
            console.log(res);
            if(res.interviews.length > 0){
                callback(res.interviews);
            } else if(res.interviews.length === 0){
                $('header').html(`
                <div class='row'>
                    <div class='col-12'>
                        <h2>Looks like you haven't taken any interiews yet.</h2>
                    </div>
                </div>
                `);
            }            
        }
    });
}

function displayInterviewCards(data){
    console.log(data);
    $('main').html(`<h1>Click on an interview to view your responses.</h1>
    <section id="selectInterview" class="row"></section>`);
    data.forEach(interview => {
        $('#selectInterview').append(`
        <div id=${interview._id} class='col-6 response-container interviewContainer'>

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
    console.log(data);
    $('.reviewInterview').on("click", function(e){
        const interviewId = $(e.target).closest('div').attr('id');
        const interview = data.find(function(item){
            return item.id === interviewId;
        });
        console.log(interviewId);
        console.log(interview);
        displayResponses(interview);
    });
}

function deleteInterview(){
    const token = localStorage.getItem("access_token");
    const userInfo = parseJwt(token);
    $(".deleteInterview").click(function(e){
        console.log(`delete button clicked`);
        if(confirm(`Deleting an interview CANNOT be undone and you'll lose this data permanently.\n\nClick OK to PERMANENTLY DELETE your intervew.`)){
            const interviewId = $(e.target).closest('div').attr('id');
            $.ajax({
                url: `/users/${userInfo.user.username}/interview/${interviewId}`,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                },
                async: true,
                type: "DELETE",
                data: JSON.stringify({
                    username: userInfo.user.username,
                    id: interviewId
                }),
                success: function(){
                    alert(`Interview has been deleted`);
                    $(`#${interviewId}`).addClass('hide');
                }
            });
        }
    });
}

function logoutUser(){
    $('#logout').click(function(){
        localStorage.removeItem("access_token");
        location.reload();
    });
}

function displayDashboard(data){
    $('.js-username-dash').html(data.firstName);
}

function handleShowLoginSignup() {
    $('.js-show-login-signup').click(function(){
        $('#signup').toggleClass('hide');
        $('#login').toggleClass('hide');
    });
}

function loggedIn() {
    const user = CACHE.getUserAuthenticationFromCache();
    console.log(`loggedIn called`);
    let userLoggedInToken = localStorage.getItem("access_token");
    if(userLoggedInToken){
        const parsedToken = parseJwt(userLoggedInToken);
        console.log(`you're logged in right now`);
        $('nav').removeClass('hide');
        $('#practice, #review, #logout').removeClass('hide');
        $('#signin, #register, #get-started').addClass('hide');
        displayDashboard(parsedToken.user);
        $(logoutUser());
        return true;
    } else{
        console.log("you're logged out right now");
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

function handleNodeApp(){
    $(loggedIn());
    $(signupButtonHandler());
    $(loginButtonHandler());
    $(handleShowLoginSignup());
    $(handleNav());
    $(mockStartHandler());
    $(getStartedHandler());
}

$(document).ready($(handleNodeApp()));