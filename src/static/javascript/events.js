$(document).ready(function(){
    $('#events-btn').click(function(){
        var usrInput = $('#city').val();
        queryEvent(usrInput);
    });
});

// Hämtar events utifrån Query
function queryEvent(usrInput){
    var apiString = '/search?type=event&q=' + usrInput;
    alert(apiString);
    FB.api(apiString, function(response){
        if(response && !response.error){
            buildPublicEvents(response, addMarkers);
        }
        return response
    })
}  







/*
$(function() {
    $('#event-btn').click(function() {
        var city = $('#city').val();
        $.ajax({
            type: 'POST',
            url: '/',
            data: city,
            success: function(data) {
                console.log('Success!');
                $("#hoppsan").innerHTML = data;

            },
            error: function(data){
                console.log("ERROR, det gick fel")
            }
        });
    });
    // Hämtar events
    function publicAPI(){
        var query = $('#city').val();
        FB.api('/search?type=event&q=' + query, function(response){

            if(response && !response.error){
                buildPublicEvents(response, addMarkers);
            }
            return response
        })
    }
    
});





$(function() {
    $('#upload-file-btn').click(function() {
        var form_data = new FormData($('#upload-file')[0]);
        $.ajax({
            type: 'POST',
            url: '/watbay/api',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: false,
            success: function(data) {
                console.log('Success!');
                $("#Hurtig").append(data);

            },
            error: function(data){
                console.log("ERROR, det gick fel")
            }
        });
    });
});

*/ 