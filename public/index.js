'use strict';

function handleNav(){
    $('li').click(function(e){
        let go = e.target.id
        loadScreen(go);
    });
}

function loadScreen(screen){
    $('header').addClass('hide');
    let html;
        if(screen === 'home'){
            $('header').removeClass('hide').html(`<h1>Welcome <span class="js-username-dash"></span></h1>
            <p>Practice makes perfect. Feel more confident.</p>`);
            html = `
            <section class="row">
                <div class="home col-12">
                    <div class="home">
                        <p>Welcome to interview prep. Many people feel excited and nervous when they get a job interview. What questions will they ask? How do I want to respond?</p><br>
                        <p>Sometimes, when we think back on what we said in an interview, we wish we had something else. 
                        Our growing database of common interview questions gives you a chance to practice and reivew your answers so you can perfect them.</p>
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
        } else if(screen === 'register'){
            html = `
            <div class="row">
                <div class="col-12 text-center">
                    <p>Try a demo of this interview app!</p>
                    <p>Username: demo</p>
                    <p>Password: demo123456</p>
                </div>
            </div>

                <div class="row">
                    <div class="col-12">
                        <form id="signup" name="signup" class="center">
                            <fieldset>
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
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <form id="login" name="login" class="hide center">
                            <fieldset>
                                <legend>LOG IN</legend>
                                <label for="login-username">Username</label>
                                <input type="text" name='login-username' placeholder="Username">
                                <label for="login-password">Password</label>
                                <input type="password" name='login-password' placeholder="Password">
                                <button id='loginButton' type="submit">LOG IN</button>
                                <p>*Don't have an account? <span class='js-show-login-signup'>Sign up</span></p>
                            </fieldset>
                        </form>
                    </div>
                </div>`;
        } else if(screen === 'signin'){
            html = `
            <div class="row">
                <div class="col-12 text-center">
                    <p>Try a demo of this interview app!</p>
                    <p>Username: demo</p>
                    <p>Password: demo123456</p>
                </div>
            </div>
                <div class="row">
                    <div class="col-12">
                        <form id="login" name="login" class="center">
                            <fieldset>
                                <legend>LOG IN</legend>
                                <label for="login-username">Username</label>
                                <input type="text" name='login-username' placeholder="Username">
                                <label for="login-password">Password</label>
                                <input type="password" name='login-password' placeholder="Password">
                                <button id='loginButton' type="submit">LOG IN</button>
                                <p>*Don't have an account? <span class='js-show-login-signup'>Sign up</span></p>
                            </fieldset>
                        </form>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                    <form id="signup" name="signup" class="hide center">
                    <fieldset>
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
                    </div>
                </div>`;
        } else if(screen === 'logout'){
            sessionStorage.clear();
            html = `
            <section id="homescreen" class="row">
                <div class="col-12">
                    <div class="home center">
                        <h1>Logging out</h1>
                    </div> 
                </div>
            </section>`;
        }
        $('main').html(html);
        if(screen ==='review'){
            getAndDisplayInterviewCards();
        }
        $(document).ready($(handleNodeApp()));
}

function signupButtonHandler(){
    $('#signup').submit(function(e){
        e.preventDefault();
        const newUser = {
            username: $('input[name="username"]').val(),
            password: $('input[name="password"]').val(),
            firstName: $('input[name="firstName"]').val(),
            lastName: $('input[name="lastName"]').val()
        };
        postNewUser(newUser);
        $('input[name="username"]').val("");
        $('input[name="password"]').val("");
        $('input[name="firstName"]').val("");
        $('input[name="lastName"]').val("");
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

function loginUser(usernameAndPassword){
    $.ajax({
        async: true,
        crossDomain: true,
        headers: {"content-type": "application/json"},
        type: "POST",
        url: "/auth/login",
        data: JSON.stringify(usernameAndPassword),
        success: function(jwtToken){
            const authToken = jwtToken.authToken;
            const parsedToken = parseJwt(authToken);
            localStorage.clear();
            localStorage.setItem("access_token", authToken);
            loadLoggedInScreenUsing(parsedToken);
        }
    });
}

function loadLoggedInScreenUsing(parsedToken){
    $.ajax({
        url: `/users/${parsedToken.user.username}`,
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
            console.log(res.interviews);
            callback(res.interviews);
        }
    });
}

function displayInterviewCards(data){
    console.log(data);
    $('main').html(`<h1>Click on an interview to view your responses.</h1>
    <button id="backToResults">Go Back</button>
    <section id="selectInterview" class="row"></section>`);
    data.forEach(interview => {
        $('#selectInterview').append(`
        <div id=${interview.id} class='col-6 response-container interview'>
            <strong>Interview from: </strong><span>${interview.created}</span>
            <button class="reviewInterview">Review</button>
            <button class="deleteInterview">Delete</button>
        </div>`);
    });
    $(displayInterviewResponses(data));
    $(deleteInterview());
    $(displayInterviewResponses());
}

function getAndDisplayInterviewCards(){
    getInterviews(displayInterviewCards);
}

function displayInterviewResponses(data){
    console.log(data);
    $('.reviewInterview').on("click", function(e){
        //if($(e.target).prop("tagName").toLowerCase() === "button")
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
        alert(`Deleting an interview CANNOT be undone and you'll lose this data permanently.Type YES to delete your interview. <input id="confirmDelete" type="text">`);
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
    let userLoggedInToken = localStorage.getItem("access_token");
    if(userLoggedInToken){
        const parsedToken = parseJwt(userLoggedInToken);
        console.log(`you're logged in right now`);
        $('#account, #practice, #review, #logout').removeClass('hide');
        $('#signin, #register').addClass('hide');
        displayDashboard(parsedToken.user);
        $(logoutUser());
    } else{
        console.log("you're logged out right now");
        $('#practice, #review, #logout, #account').addClass('hide');
        $('#home, #sigin, #register').removeClass('hide');
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function handleNodeApp(){
    $(signupButtonHandler());
    $(loginButtonHandler());
    $(handleShowLoginSignup());
    $(handleNav());
    $(loggedIn());
    $(mockStartHandler());
}

$(document).ready($(handleNodeApp()));