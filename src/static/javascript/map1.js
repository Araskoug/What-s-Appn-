var map;
function initMap() {
    // map options
    var options = {
        center: {lat: 55.6050, lng: 13.0038},
        zoom: 13,
        styles: papuportal
    
    }
    // new map
    map = new google.maps.Map(document.getElementById('map'), options);
    
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
    
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: iconBase + 'library_maps.png'
  },
  info: {
    icon: iconBase + 'info-i_maps.png'
  }
};


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
    var heading = startTag + text + endTag + breakLine;
    return heading 
}
function subtleStyling(text){
    var startTag = '<p class="subtle">';
    var endTag = '</p>';
    var result = startTag + text + endTag;
    return result
}

// Add marker function
function addMarker(props){
    var marker = new google.maps.Marker({
        icon: {
            //url:'../static/img/center_pointer.png',
            path: google.maps.SymbolPath.CIRCLE,
            scale:7,
            strokeColor:'#28948c',
            strokeWeight:7
          },
        animation: google.maps.Animation.DROP,
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
        var time = subtleStyling(props.startTime);
        var infoText = props.dscrp;
        var infoWindow = new google.maps.InfoWindow ({
            maxWidth:300,
            maxHeight:300,
            content:h3name + infoText + street + time
        });
        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        });

    }
}

