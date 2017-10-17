
// Basic application setup
window.fbAsyncInit = function() {
    FB.init({
        appId      : '1727145577327534',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.10'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
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
        testAPI();
    } else {
        console.log('Not authenticated');
        setElements(false);
    }
}

// Testar Facebook API
function testAPI(){
    FB.api('/me?fields=name,email,events', function(response){
        if(response && !response.error){
            //console.log(response)
            buildProfile(response);
        }
    })
    
    FB.api('/me/events', function(response){
        if(response && !response.error){
            buildEvents(response);
        }
    })
}

// Hämtar data från Facebook
function buildProfile(user){
    let eventList = ` 
        <h3>${user.name}</h3>
        <ul class="list-group">
            <li class="list-group-item">User name: ${user.name}</li>
        </ul>
    `;
    document.getElementById('events').innerHTML = eventList;
}

// Skapar lista med event  från Facebook (fungerar ej)
function buildEvents(events){
    let output = `<h3>Latest events</h3>`;
        for(let i in events.data){
            if(events.data[i].place){
                output += `
                <div>
                    ${events.data[i].name}, 
                    ${events.data[i].place}
                </div>
                `;
            }
        }
    document.getElementById('events').innerHTML = output;
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
        document.getElementById('events').style.display = 'block';
        document.getElementById('fb-btn').style.display = 'none';
    } else {
        document.getElementById('logout').style.display = 'none';
        document.getElementById('events').style.display = 'none';
        document.getElementById('fb-btn').style.display = 'block';
    }
}

// Loggar ut användaren
function logout(){
    FB.logout(function(response){
        setElements(false);
    });
}