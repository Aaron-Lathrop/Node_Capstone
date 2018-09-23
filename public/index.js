'use strict';
// const {mockStartHandler} = require('./mockinterview');

function handleNav(){
    $('nav').click('li', function(e){
        let go = e.target.id
        loadScreen(go);
    });
}

function loadScreen(screen){
    let html;
        if(screen === 'home'){
           // history.pushState("home", "Home", "");
            html = `home page`;
        } else if(screen === 'practice'){
           // history.pushState("practice", "Practice", "/practice");
            html = `
            <h2>Mock Interview</h2>
            <div id="mockInterview" role="alert" aria-live="polite">
                <p>You're about to start a 10 question mock interview. Questions will be delivered in a random order and your responses will be saved for later review.</p>
                <button id='mockStart'>Start Interview</button>
            </div>`;
        } else if(screen === 'review'){
           // history.pushState("review", "Review", "/review");
            html = `review page`;
        } else if(screen === 'register'){
            //history.pushState("sign up", "Sign up", "/sign-up");
            html = `
            <form id="signup" name="signup">
                <fieldset class='center'>
                    <legend>SIGN UP</legend>
                    <label for="firstName">First Name</label>
                    <input type='text' name='firstName' placeholder="First Name">
                    <label for="lastName">Last Name</label>
                    <input type="text" name='lastName' placeholder="Last Name">
                    <label for="username">Username</label>
                    <input type="text" name='username' placeholder="Username">
                    <label for="password">Password</label>
                    <input type="password" name='password' placeholder="Password">
                    <button id='signupButton' type="submit">SIGN UP</button>
                    <p>*Already have an account? <span class='js-show-login-signup'>Log in</span></p>
                </fieldset>
            </form>
            <form id="login" name="login" class="hide">
                <fieldset class='center'>
                    <legend>LOG IN</legend>
                    
                    <label for="login-username">Username</label>
                    <input type="text" name='login-username' placeholder="Username">
                    <label for="login-password">Password</label>
                    <input type="password" name='login-password' placeholder="Password">
                    <button id='loginButton' type="submit">LOG IN</button>
                    <p>*Don't have an account? <span class='js-show-login-signup'>Sign up</span></p>
                </fieldset>
            </form>`;
            $(handleShowLoginSignup());
        } else if(screen === 'signin'){
            //history.pushState("log in", "Log In", "/log-in");
            html = `
            <form id="login" name="login">
                <fieldset class='center'>
                    <legend>LOG IN</legend>
                    
                    <label for="login-username">Username</label>
                    <input type="text" name='login-username' placeholder="Username">
                    <label for="login-password">Password</label>
                    <input type="password" name='login-password' placeholder="Password">
                    <button id='loginButton' type="submit">LOG IN</button>
                    <p>*Don't have an account? <span class='js-show-login-signup'>Sign up</span></p>
                </fieldset>
            </form>
            <form id="signup" name="signup" class="hide">
                <fieldset class='center'>
                    <legend>SIGN UP</legend>
                    <label for="firstName">First Name</label>
                    <input type='text' name='firstName' placeholder="First Name">
                    <label for="lastName">Last Name</label>
                    <input type="text" name='lastName' placeholder="Last Name">
                    <label for="username">Username</label>
                    <input type="text" name='username' placeholder="Username">
                    <label for="password">Password</label>
                    <input type="password" name='password' placeholder="Password">
                    <button id='signupButton' type="submit">SIGN UP</button>
                    <p>*Already have an account? <span class='js-show-login-signup'>Log in</span></p>
                </fieldset>
            </form>`;
            
        }
        $('main').html(html);
        $(document).ready($(handleNodeApp()));
}

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
            const token = `Bearer ${res.authToken}`;
            //document.cookie = `${token}`;
            $.ajax({
                url: `http://localhost:8080/users/${data.username}`,
                headers: {
                    "Authorization": token,
                    "content-type": "application/json"
                },
                async: true,
                type: "GET",
                success: function(res){
                    loadScreen('home');
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
    $(signupHandler());
    $(loginHandler());
    $(handleShowLoginSignup());
    $(handleNav());
}

$(document).ready($(handleNodeApp()));