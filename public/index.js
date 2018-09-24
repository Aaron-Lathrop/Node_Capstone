'use strict';

function handleNav(){
    $('li').click(function(e){
        let go = e.target.id
        loadScreen(go);
    });
}

function loadScreen(screen){
    let html;
        if(screen === 'home'){
            html = `
            <section id="homescreen row">
                <div class="home col-12">
                        <div class="home center col-6">
                            <p>Welcome to interview prep. Many people feel excited and nervous when they get a job interview. What questions will they ask? How do I want to respond?</p><br>
                            <p>Sometimes, when we think back on what we said in an interview, we wish we had something else. 
                            Our growing database of common interview questions gives you a chance to practice and reivew your answers so you can perfect them.</p><br>
                            <div class='row col-6'>
                                <button id="homeLogin" class='center'>Login</button>
                                <button id="homeSignup"class='center'>Sign Up</button>
                            </div>
                        </div> 
                </div>
            </section>`;
        } else if(screen === 'practice'){
            html = `
            <h2>Mock Interview</h2>
            <div id="mockInterview" role="alert" aria-live="polite">
                <p>You're about to start a 10 question mock interview. Questions will be delivered in a random order and your responses will be saved for later review.</p>
                <button id='mockStart'>Start Interview</button>
            </div>`;
        } else if(screen === 'review'){
            html = `review page`;
        } else if(screen === 'register'){
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
        } else if(screen === 'signin'){
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
        } else if(screen === 'logout'){
            sessionStorage.clear();
            html = `
            <section id="homescreen row">
                <div class="home col-12">
                        <div class="home center col-6">
                            <p>Welcome to interview prep. Many people feel excited and nervous when they get a job interview. What questions will they ask? How do I want to respond?</p><br>
                            <p>Sometimes, when we think back on what we said in an interview, we wish we had something else. 
                            Our growing database of common interview questions gives you a chance to practice and reivew your answers so you can perfect them.</p><br>
                            <div class='row col-6'>
                                <button id="homeLogin" class='center'>Login</button>
                                <button id="homeSignup"class='center'>Sign Up</button>
                            </div>
                        </div> 
                </div>
            </section>`;
        }
        $('main').html(html);
        $(document).ready($(handleNodeApp()));
}



 function postNewUser(url, data){
    $.ajax({
        async: true,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        success: function(response){
            loginUser("http://localhost:8080/auth/login", data);
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
            const token = res.authToken;
            localStorage.clear();
            localStorage.setItem("access_token", token);
            $.ajax({
                url: `http://localhost:8080/users/${data.username}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
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
    });
}

function loginHandler(){
    $('#login').submit(function(e){
        e.preventDefault();
        const user = {
            username: $('input[name="login-username"]').val(),
            password: $('input[name="login-password"]').val()
        };
        $('input[name="login-username"]').val("");
        $('input[name="login-password"]').val("");
        loginUser("http://localhost:8080/auth/login", user);
    });
}

function logoutUser(){
    console.log('logoutUser called');
    $('#logout').click(function(){
        console.log('clicked logout');
        localStorage.removeItem("access_token");
        location.reload();
    });
}

function getDashboardUser(user){
    $.ajax({
        url: `http://localhost:8080/users/${user}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "content-type": "application/json"
        },
        async: true,
        type: "GET",
        success: function(res){
            $(document).ready(displayDashboard(res));
        }
    });
}

function displayDashboard(data){
    $('.js-username-dash').html(data.firstName);
}

function getAndDisplayDashboard(){
    displayDashboard(getDashboardUser());
}

// function handleShowLoginSignup() {
//     $('.js-show-login-signup').click(function(){
//         $('#signup').toggleClass('hide');
//         $('#login').toggleClass('hide');
//     });

// }

function loggedIn() {
    if(localStorage.getItem("access_token")){
        const parsedToken = parseJwt(localStorage.getItem("access_token"));
        console.log(`you're logged in right now`);
        
        $('#practice, #review, #logout').removeClass('hide');
        $('#signin, #register').addClass('hide');
        getDashboardUser(parsedToken.sub);
        $(logoutUser());
    } else{
        console.log("you're logged out right now");
        $('#practice, #review, #logout').addClass('hide');
        $('#home, #sigin, #register').removeClass('hide');
        
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function handleNodeApp(){
    $(signupHandler());
    $(loginHandler());
    //$(handleShowLoginSignup());
    $(handleNav());
    $(loggedIn());
    $(mockStartHandler());
}

$(document).ready($(handleNodeApp()));