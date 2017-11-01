var map;
function initMap() {
    // map options
    var options = {
        center: {lat: 55.6050, lng: 13.0038},
        zoom: 13,
        styles: evenLighter
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



function backcall(result, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log('BackCall: ' + place);
  }
}




// Checks that the PlacesServiceStatus is OK, and adds a marker
// using the place ID and location from the PlacesService.
function callback(result, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeData = getPlace(result[0]);
        $('#place').html(placeData.rating + placeData.id);
        console.log(placeData.reviews);
        var request = placeData.id;
        var service = new google.maps.places.PlacesService(map);
        service.getDetails(request, backcall);
    }
}
function getPlace(data){
    var placeData = {
        id:data.place_id,
        name:data.name,
        rating:data.rating,
        reviews:data.reviews
    }
    return placeData
}
// Funktion som körs i login.js !!! (publicAPI();)   
function addMarkers() {
    // Loop through markers
    for(i = 0;i < eventInfo.length;i++){
        addMarker(eventInfo[i]);
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
function addMarker(props, color){
    var marker = new google.maps.Marker({
        
        icon: {
            //url:'../static/img/center_pointer.png',
            path: google.maps.SymbolPath.CIRCLE,
            scale:8,
            strokeColor:'#28948c',
            strokeWeight:5,
          },
          
        id:props.id,
        //animation: google.maps.Animation.DROP,
        position:props.coords,
        venue:props.placeName,
        description:props.dscrp,
        street:props.street,
        time:props.startTime,
        map:map, 
    });
    
    marker.addListener('click', function(){            
        infoToSide(props);
        coverImg(props);
        attending(props);
        
        
    });
    map.addListener('click', function(){
        infoClose();
    });

    
}

function infoToSide(props){
    if(props.placeName){
            // Create request and Place markers
            var request = {
                location:map.getCenter(),
                radius:'500',
                query:props.placeName
            }
            var service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);
            
    }
    $('#event').html(
        h3styling(props.name) +
        subtleStyling(props.placeName) + 
        subtleStyling(props.startTime) + 
        infoStyle(props.dscrp) 
        );
    
}

function infoClose(){
    $('#event').html('');
    $('#place').html('');
}

    




