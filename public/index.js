'use strict';

$.ajax({
    type: "POST",
    url: "/",
    // data: markers,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){alert(data);},
    failure: function(errMsg) {
        alert(errMsg);
    }
});