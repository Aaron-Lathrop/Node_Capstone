'use strict';
console.log('client-side code is running');

let questionNumber = 0;

const questions = [];
const interviewResponses = {};

 function postNewUser(url, data){
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {"content-type": "application/json"},
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        success: function(response){
            console.log(`POST of was successful for the following:`); 
            console.log(response);
        },
        fail: function(err){
            console.error(err);
        }
    });
 }

function signupHandler(){
    $('#signup').submit(function(e){
        e.preventDefault();
        const newUser = {
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val(),
            firstName: $('input[name="firstName"]').val(),
            lastName: $('input[name="lastName"]').val()
        };
        console.log(newUser);
        postNewUser("http://localhost:8080/users", newUser);
        $('input[name="username"]').val("");
        $('input[name="password"]').val("");
        $('input[name="firstName"]').val("");
        $('input[name="lastName"]').val("");
    });
}

function loginUser(url, data){
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {"content-type": "application/json"},
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        success: function(res){
            window.location.href = "http://localhost:8080/dashboard";
            const token = `Bearer ${res.authToken}`;
            $.ajax({
                url: `http://localhost:8080/users/${data.username}`,
                headers: {
                    "Authorization": token,
                    "content-type": "application/json"
                },
                async: true,
                type: "GET",
                success: function(res){
                    $(document).ready(displayDashboard(res));
                }
            });
        }
    });
}

function loginHandler(){
    $('#login').submit(function(e){
        e.preventDefault();
        const user = {
            username: $('input[name="login-username"]').val(),
            password: $('input[name="login-password"]').val()
        };
        loginUser("http://localhost:8080/auth/login", user);
        $('input[name="login-username"]').val("");
        $('input[name="login-password"]').val("");
    });
}

//reinstert mockinterview.js code here if necessary

function getDashboardUser(user){
    const url = `http://localhost:8080/users/${user.username}`; 
    $.ajax({
        type: "GET",
        url: url,
        async: true,
        crossDomain: true,
        headers: {
            "contentType": "application/json",
            "Authorization": user.token
        },
        success: function(data){
            console.log(data);
            window.location.href = "/dashboard";
            $(document).ready(displayDashboard(data));
        }
    });
}

function displayDashboard(data){
    $('.js-username-dash').html(data.firstName);
}

function getAndDisplayDashboard(){
    displayDashboard(getDashboardUser());
}

function handleShowLoginSignup() {
    $('.js-show-login-signup').click(function(){
        $('#signup').toggleClass('hide');
        $('#login').toggleClass('hide');
    });

}

function handleNodeApp(){
    $(mockStartHandler());
    $(signupHandler());
    $(loginHandler());
    $(handleShowLoginSignup());
}

$(document).ready($(handleNodeApp()));