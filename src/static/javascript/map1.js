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
    var malmo = {lat: 55.6050, lng: 13.0038};
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: malmo,
        radius: 500,
        type: ['store']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

/*
    // add marker
    var marker = new google.maps.Marker({
        position:{lat: 55.6050, lng: 13.0038}, 
        map:map, icon:'http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png'
    });
    var infoWindow = new google.maps.InfoWindow ({
        content: '<h1>Malmö</h1>'
    });
    marker.addListener('click', function(){
        infoWindow.open(map, marker);
    });
*/
   
function addMarkers() {
    var placeIDs = []
    // Loop through markers
    for(i = 0;i < eventInfo.length;i++){
        //placeIDs.push(addPlaceID(eventInfo[i]))
        addMarker(eventInfo[i]);
        //placeIDs.push(addPlaceID(eventInfo[i]));
    }
}


/*  

.---- BAJSKOD HÄR ----.

function addPlaceID(props){
    var geocoder = new google.maps.Geocoder;
    //var infowindow = new google.maps.InfoWindow;
    if(props.coords){
        geocoder.geocode({'location': props.coords}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    //map.setZoom(11);
                    var placeId = results[0].place_id;
                    //console.log(placeId);
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
            console.log(placeId);
            return placeId
        });
    }
}

*/

function addRating(props){
    if(props.placeName){
        
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
            infoWindow.open(map, marker);
        });
        map.addListener('click', function(){
            infoWindow.close(map, marker);
        });

    }
}

