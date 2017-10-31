var map;
function initMap() {
    // map options
    var options = {
        center: {lat: 55.6050, lng: 13.0038},
        zoom: 13,
        styles: flatDesign
    }
    // new map
    map = new google.maps.Map(document.getElementById('map'), options);

    // Kod för att skapa en Service (PLACE)
    /* 
    // Search for Malmö Live.
    var request = {
        query: "önnestad"
    };
    
    // Skapar Service
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    */
}

// Checks that the PlacesServiceStatus is OK, and adds a marker
// using the place ID and location from the PlacesService.
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: results[0].place_id,
        location: results[0].geometry.location
      }
    });  
      var infoWindow = new google.maps.InfoWindow ({
        maxWidth:300,
        maxHeight:300,
        content:results[0].name + results[0].rating
    }); 
    marker.addListener('click', function(){
        infoWindow.open(map, marker);

    });
    map.addListener('click', function(){
        infoWindow.close();
    });          
  }
}

    //google.maps.event.addDomListener(window, 'load', initialize);



function createRequests(places){
    var requests = [];
    for(i = 0;i < places.length;i++){
        requests.push({
            location:map.getCenter(),
            radius:'500',
            query:places[i]
        });
    }return requests
}


// Funktion som körs i login.js !!! (publicAPI();)   
function addMarkers() {
    var placeList = [];
    // Loop through markers
    for(i = 0;i < eventInfo.length;i++){
        addMarker(eventInfo[i]);
        // Adds place name to place list
        placeList.push(eventInfo[i].placeName);
    }
    var requests = createRequests(placeList);
    for(i = 0;i < requests.length;i++){
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(requests[i], callback);
    }
}

// Fixar style på text
function h3styling(text){
    var startTag = '<h3>';
    var endTag = '</h3>';
    var breakLine = '<hr>';
    var result = startTag + text + endTag + breakLine;
    return result 
}
function subtleStyling(text){
    var startTag = '<p class="subtle">';
    var endTag = '</p>';
    var result = startTag + text + endTag;
    return result
}
function infoStyle(text){
    var startTag = '<div class="info-style">';
    var endTag = '</div>';
    var result = startTag + text + endTag;
    return result
}

// Add marker function
function addMarker(props){
    var marker = new google.maps.Marker({
        icon: {
            //url:'../static/img/center_pointer.png',
            path: google.maps.SymbolPath.CIRCLE,
            scale:8,
            strokeColor:'#28948c',
            strokeWeight:5,
          },
        //animation: google.maps.Animation.DROP,
        position:props.coords,
        venue:props.placeName,
        description:props.dscrp,
        street:props.street,
        time:props.startTime,
        map:map, 
    });
    // Check for custom icon
    if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
    }
    // Check content
    if(props.name){
        var h3name = h3styling(props.name);
        var street = ''
        if(props.street){
            var street = subtleStyling(props.street);
        }
        if(props.placeName){
            var placeName = subtleStyling(props.placeName);
        }
        var time = subtleStyling(props.startTime);
        var infoText = props.dscrp;
        
        var infoWindow = new google.maps.InfoWindow ({
            maxWidth:300,
            maxHeight:300,
            content:infoStyle(h3name + placeName + infoText + street + time)
        }); 
        marker.addListener('click', function(){
            infoWindow.setContent(h3name + placeName + time);
            infoWindow.open(map, marker);

        });
        map.addListener('click', function(){
            infoWindow.close();
        });

    }
}



    




