'use strict';

$.ajax({
    type: "POST",
    url: "https://stark-thicket-75096.herokuapp.com",
    data: JSON.stringify({speech: "message"}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){alert(data);},
    failure: function(errMsg) {
        alert(errMsg);
    }
});