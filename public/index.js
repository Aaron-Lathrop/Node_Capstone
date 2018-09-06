'use strict';

$.ajax({
    type: "POST",
    url: "https://stark-thicket-75096.herokuapp.com",
    // data: JSON.stringify({speech: "message"}),
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){return data;},
    failure: function(errMsg) {
        alert(errMsg);
    }
});