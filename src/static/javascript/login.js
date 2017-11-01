// Basic application setup
window.fbAsyncInit = function() {
    FB.init({
        appId      : '1727145577327534',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.10'
    });

    FB.getLoginStatus(function(response) {
        // HUR LADDAR VI IN PUBLIC EVENTS INNAN ANVÄNDAREN OMBEDS LOGGA IN ?!
        console.log('Not authenticated');
        setElements(false);
        publicAPI();
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Ber användaren logga in  - och loggar in 
function statusChangeCallback(response){
    if(response.status === 'connected'){
        console.log('Logged in and authenticated');
        setElements(true);
        publicAPI();
        myAPI();
    } else {
        console.log('Not authenticated');
        setElements(false);
        publicAPI();
    }
}

// Hämtar mina Facebook event
function myAPI(){
    FB.api('/me/events', function(response){
        if(response && !response.error){
            buildEvents(response, addMarkers);
        }
    })
}

function coverImg(props){
    var eventURL = '/' + props.id + '?fields=cover';
    FB.api(eventURL, function(response){
        if(response && !response.error){
            $('#event-img').html('<img src="' + response.cover.source + '" />');
        }
    })
}

function attending(props){
    var eventURL = '/' + props.id + '/attending';
    FB.api(eventURL, function(response){
        if(response && !response.error){
            $('#attending').html(response);
            console.log(response);
        }
    })
}

// Global variabel som hämtar all info från evenemangen.
var event = '';

// Hämtar  events
function publicAPI(){
    FB.api('/search?date_format=U&type=event&q=malmö', function(response){
           if(response && !response.error){
            buildPublicEvents(response, addMarkers);
        }
        return response
    })
}  

var eventInfo = [];

// Skapar lista med alla public events
function buildPublicEvents(events, done){
    // "Done" - gör att funktionen körs synkront
    let output = `<h3>Public Events</h3>`;
    for(i in events.data){
        if(events.data[i].name && events.data[i].place && events.data[i].place.location){
            eventInfo[i] = {
                id:events.data[i].id,
                name:events.data[i].name,
                placeName:events.data[i].place.name,
                street:events.data[i].place.location.street,
                startTime:events.data[i].start_time,
                coords:{lat:events.data[i].place.location.latitude, lng:events.data[i].place.location.longitude},
                dscrp:events.data[i].description
            }; 
            output += `
            <div id="${eventInfo[i].id}">

                <a href="#">
                    ${eventInfo[i].name}
                </a>
            </div>
            `;
        }
    }
    $('#public_events').html(output);
    
    done();
    
}


// Skapar lista med event  från Facebook (fungerar ej)
function buildEvents(events, done){
    let output = `<h3>My events</h3>`;
        for(i in events.data){
            if(events.data[i].name && events.data[i].place && events.data[i].place.location){
                eventInfo[i] = {
                name:events.data[i].name,
                placeName:events.data[i].place.name,
                street:events.data[i].place.location.street,
                startTime:events.data[i].start_time,
                coords:{lat:events.data[i].place.location.latitude, lng:events.data[i].place.location.longitude},
                dscrp:events.data[i].description
            };
                output += `
                <div>
                    ${eventInfo[i].name}
                </div>
                `;
            }
        }
    document.getElementById('my_events').innerHTML = output;
    done();
}



// Kontrollerar om användaren är inloggad
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// Visar eller döljer element beroende på inloggningsstatus
function setElements(isLoggedIn){
    if(isLoggedIn) {
        document.getElementById('logout').style.display = 'block';
        document.getElementById('my_events').style.display = 'block';
        document.getElementById('fb-btn').style.display = 'none';
    } else {
        document.getElementById('logout').style.display = 'none';
        document.getElementById('my_events').style.display = 'none';
        document.getElementById('fb-btn').style.display = 'block';
    }
}

// Loggar ut användaren
function logout(){
    FB.logout(function(response){
        setElements(false);
    });
}