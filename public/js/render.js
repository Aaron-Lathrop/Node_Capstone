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
            $('header').removeClass('hide');
            html = `
            <section class="row">
                <div class="container col-12">
                        <h2>Welcome to Interview Prep!</h2> 
                        <p>Many people feel excited and nervous when they get a job interview.</p> 
                        <p><b>What questions will the interviewer ask? How do I want to respond?</b></p>
                        <p>Sometimes, when we think back on what we said in an interview, we wish we had something else. 
                        Our growing database of common interview questions gives you a chance to practice and reivew your answers so you can perfect them.</p>
                </div>
            </section>`;
        } else if(screen === 'practice'){
            $('header').addClass('hide');
            html = `
            <h1>Mock Interview</h1>
            <div id="mockInterview" class='center-text' role="alert" aria-live="polite">
                <div class='container'>
                    <p>You're about to start a 10 question mock interview.</p> 
                    <p>Questions will be delivered in a random order and your responses will be saved for later review.</p>
                    <p>This is Rupert, he'll be your interviewer for the day. Good luck!</p>
                    <img id="interviewAvatar" class="center" src="/Interview_avatar.png">
                </div>
                <button id='mockStart' class='center'>Start Interview</button>
            </div>`;
        } else if(screen === 'register'){
            $('header').addClass('hide');
            html = `
            <div class="row">
                <div class="col-12 center-text">
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
                                <label for="firstName">First Name*</label>
                                <input type='text' name='firstName' placeholder="First Name" required>
                                <label for="lastName">Last Name*</label>
                                <input type="text" name='lastName' placeholder="Last Name" required>
                                <label for="username">Username*</label>
                                <input type="text" name='username' placeholder="Username" required>
                                <label for="password">Password*</label>
                                <input type="password" name='password' placeholder="Password" required>
                                <button id='signupButton' class='center' type="submit">SIGN UP</button>
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
                                <label for="login-username">Username*</label>
                                <input type="text" name='login-username' placeholder="Username">
                                <label for="login-password">Password*</label>
                                <input type="password" name='login-password' placeholder="Password">
                                <button id='loginButton' class='center' type="submit">LOG IN</button>
                                <p>*Don't have an account? <span class='js-show-login-signup'>Sign up</span></p>
                            </fieldset>
                        </form>
                    </div>
                </div>`;
        } else if(screen === 'signin'){
            $('header').addClass('hide');
            html = `
            <div class="row">
                <div class="col-12 center-text">
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
                                <label for="login-username">Username*</label>
                                <input type="text" name='login-username' placeholder="Username">
                                <label for="login-password">Password*</label>
                                <input type="password" name='login-password' placeholder="Password">
                                <button id='loginButton' class='center' type="submit">LOG IN</button>
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
                        <label for="firstName">First Name*</label>
                        <input type='text' name='firstName' placeholder="First Name">
                        <label for="lastName">Last Name</label>
                        <input type="text" name='lastName' placeholder="Last Name" required>
                        <label for="username">Username*</label>
                        <input type="text" name='username' placeholder="Username" required>
                        <label for="password">Password*</label>
                        <input type="password" name='password' placeholder="Password" required>
                        <button id='signupButton' class='center' type="submit">SIGN UP</button>
                        <p>*Already have an account? <span class='js-show-login-signup'>Log in</span></p>
                    </fieldset>
                </form>
                    </div>
                </div>`;
        } else if(screen === 'logout'){
            $('header').addClass('hide');
            sessionStorage.clear();
            html = `
            <section class='row'>
                <div class="container col-12">
                    <h1>Logging out</h1>
                </div>
            </section>`;
            $('html').css("background-image", "url(https://images.unsplash.com/photo-1518110516893-31ce851decb0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b8757e7de4ecb8fb79654a5a2e9cc25d&auto=format&fit=crop&w=750&q=80)");
            location.reload();
        }
        $('main').html(html);
        if(screen ==='review'){
            $('header').addClass('hide');

            $('main').html(`
            <h1>Review</h1>
            <section id="mockInterview" class='center-text' class="row">
                <div class="container col-12">
                    <div class="container">
                        <p>It looks like you haven't completed any interviews yet. Once you complete an interview, you can come back here to review the questions and answers or delete any interviews you no longer wish to keep.</p>
                        <p>You can start an interview by clicking the button below or by clicking "Practice" above.</p>
                    </div>
                </div>
            </section>
            <button id='mockStart' class="center">Start Interview</button>`);
            getAndDisplayInterviewCards();
            //$(mockStartHandler());
        }
        $(document).ready($(handleNodeApp()));
}

function getStartedHandler(){
    $('#get-started').click(function(){
        loadScreen('signin');
    });
}