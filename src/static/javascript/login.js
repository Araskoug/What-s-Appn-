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
            buildEvents(response);
        }
    })
}

// Global variabel som hämtar all info från evenemangen.
var event = ''

// Hämtar publika events
function publicAPI(){
    FB.api('/search?type=event&q=malmö', function(response){
           if(response && !response.error){
            buildPublicEvents(response, addMarkers);
        }
        return response
    })
}   
var eventInfo = []

// Skapar lista med alla public events
function buildPublicEvents(events, done){
    console.log('Adam Allsing');
    let output = `<h3>Public Events</h3>`;
    for(i in events.data){
        if(events.data[i].name && events.data[i].place && events.data[i].place.location){
            eventInfo[i] = {
                name:events.data[i].name,
                placeName:events.data[i].place.name,
                city:events.data[i].place.location.city,
                coords:{lat:events.data[i].place.location.latitude, lng:events.data[i].place.location.longitude}
            }; 
                
            output += `
            <div>
                ${eventInfo[i].name}
            </div>
            `;
        }
        
    }
        
    document.getElementById('public_events').innerHTML = output;
    done();
}

// KOD EJ KLAR (VI VILL ATT DEN SKA HÄMTA ALL INFO FRÅN FB EVENTS
// OCH SKAPA EN DICT SOM KAN SKICKAS TILL MAPS "MAKE MARKERS" typ...)

function buildInfo(events){
    eventInfo.append({
                coords:
                {
                    lat:events.data[i].location.latitude,   
                    lng:events.data[i].location.longitude
                },
                startTime:events.data[i].start_time,
                content:
                {
                    header:events.data[i].name,
                    place:events.data[i].place.name,
                    description:events.data[i].description
                }
            });
}



// Skapar lista med event  från Facebook (fungerar ej)
function buildEvents(events){
    let output = `<h3>My events</h3>`;
        for(let i in events.data){
            if(events.data[i].name){
                output += `
                <div>
                    ${events.data[i].name}
                </div>
                `;
            }
        }
    document.getElementById('my_events').innerHTML = output;
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