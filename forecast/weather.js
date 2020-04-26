//using the openweathermap api
var request = require('request');
const apikey = 'd1b7f05b594a7522dd2d383af6696ffd';

function getWeatherAt(coordinates, callback = (error, data)=>{})
{
	var apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&appid=${apikey}`;
	
	request({url: apiURL}, (error, response)=>{
		if(error){
			return callback(error, undefined);
		}
		else{
			response = JSON.parse(response.body);
			return callback(undefined, response);
		}
	});
}

module.exports = {
	getWeatherAt: getWeatherAt
};

// module.exports = {
// 	getWeatherAt:getWeatherAt
// };