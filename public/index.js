'use strict';
console.log('client-side code is running');

function mockStartHandler() {
    $('button').click(function(){
        $('#mockInterview').html(`
        <form id='interview'>
        <label>Describe the HTTP requests/response lifecycle.</label>
        <textarea rows='10' cols='75' wrap='hard' placeholder='Type your response...' name='Describe the HTTP requests/response lifecycle'></textarea>
        <input id='answerButton' type='submit' value='Answer'>
        </form>`)
    });
}

$(mockStartHandler());