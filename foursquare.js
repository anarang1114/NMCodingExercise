$(document).ready(function() {
//local variables
var query;


//Pulling data using foursquare api
function receive(result)
{

	var things = new Array();
	for(var i = 0; i < 5; i++){
		things.push((result.response.groups[0].items[i].venue.name + " : " +
		(result.response.groups[0].items[i].venue.location.address)));
		
	}
	
	things.sort();
	var listOfThings = things.join("</br>");
	
		
	$("#results").html(listOfThings);
}


function send(){
	var url = "https://api.foursquare.com/v2/venues/explore";
	query = $("select option:selected").val();
	
    $.ajax(
           {
           "url":url,
            "data":{
            "client_id":"5AMVKS4AGNPXZTLSNA44VJIKD4ONRZ03HSKH2MQBKUS2QD1N",
            "client_secret": "43IJ11SJO5RUJHBJIEKMSUKFFCCZRFREUYWC1SC52THC213B",
            "v": "20180101",
			"query": query,
			"food": "outdoors",
            "near": $("#location").val(),
            "limit": 5,
            },
           }).done(function(data){
                   receive(data);
           }).fail(function(data) {
				   alert("INVALID CITY TRY ANOTHER");
                   console.log(data);
                   });
	
	
}

function start()
{
    $("#suggest").click(send);
}

	$(start);

});



