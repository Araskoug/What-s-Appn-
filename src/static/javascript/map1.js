
var map;
function initMap() {
    // map options
    var options = {
        center: {lat: 55.6050, lng: 13.0038},
        zoom: 13
    }
    
    // new map
    map = new google.maps.Map(document.getElementById('map'), options);
    
    
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
    
    // Array of markers
    var markers = [
        {
            coords:{lat: 55.6050, lng: 13.0038},    iconImage:'http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png',
            content:'<h1>Malmö</h1>'
        },
        {
            coords:{lat:55.7047, lng:13.1910}
        }  
    ];
    
    // Loop through markers
    for(i = 0;i < markers.length;i++){
        addMarker(markers[i]);
    }  
        
    // Add marker function
    function addMarker(props){
        var marker = new google.maps.Marker({
        position:props.coords, 
        map:map, 
        });
        // Check for custom icon
        if(props.iconImage){
            // Set icon image
            marker.setIcon(props.iconImage);
        }
        // Check content
        if(props.content){
            var infoWindow = new google.maps.InfoWindow ({
                content:props.content
            });
            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
            
        }
    }
    
}

