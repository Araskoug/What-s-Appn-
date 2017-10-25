$(function() {
    $('#event-btn').click(function() {
        var city = $('#city').val();
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
                $("#hoppsan").innerHTML = data;

            },
            error: function(data){
                console.log("ERROR, det gick fel")
            }
        });
    });
});


/*

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