

var request = require('request');
const mapboxURL_part1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const mapboxURL_part2 = ".json?access_token=pk.eyJ1IjoiYnNhaWtpcmFuIiwiYSI6ImNrODhvNjQxOTA1ajczZW16cWdreDNrcTcifQ.uDINrkvFw-sUwka2lcARgg";
const resultLimit = 1;

function getCoordinates(s = "",callback = (error,latitutes)=>{}){
	var searchTerm = "";

	s.split('').forEach((c)=>{
		if(c == ' '){
			searchTerm += '%20';
		}else{
			searchTerm += c;
		}
	});

	var finalURL = mapboxURL_part1 + searchTerm + mapboxURL_part2 + '&limit=' + String(resultLimit);

	request({url: finalURL}, (error, response)=>{
		if(error){
			return callback(true, undefined);
		}else
		{
			response = JSON.parse(response.body);
			
			if(!response.features || response.features.length == 0){
				return callback(true, undefined);
			}

		    coordinates = response.features[0].geometry.coordinates;
		    return callback(undefined, coordinates);
		}
	});
	
}

module.exports = {
	getCoordinates:getCoordinates
};