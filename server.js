const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./forecast/geocode.js');
const weather = require('./forecast/weather.js');

//intializations
const app = express();
const staticFolder = path.join(__dirname, "/public");
const viewsFolder = path.join(__dirname,"./templates/views");
const partialsFolder = path.join(__dirname,"./templates/partials");

const port_number = 3500;

app.use(express.static(staticFolder));//set the statics folder.
app.set('view engine', 'hbs'); //set the view engine.
app.set('views', viewsFolder); //set the views folder
hbs.registerPartials(partialsFolder); //set the partials folder.


//creating end-points.

app.get('/',(req,res)=>{
	res.render('index',{body: 'Hello and Welcome!'});
});
app.get('/weather',(req,res)=>{
	console.log(req.query);
	if(req.query.hasOwnProperty('address'))
	{
		geocode.getCoordinates(req.query.address,
		 (error, coordinates)=>{
		 	if(error){
		 		return res.send({error: 'error fetching data for requested place.'});
		 	}
		 	 weather.getWeatherAt(coordinates, (error, data)=>{
		 	 	if(error){
		 	 		console.log(error);
		 	 		return res.send({error: 'error fetching data for requested place.'});
		 	 	}
		 	 	else{
		 	 		res.send(data);
		 	 	}
		 	 });
		 });
	}
	else
	{
	res.render('weather',{body: 'Check your weather here!'});
	}
});
app.get('/about',(req,res)=>{
	res.render('about',{body: 'Hey! This website helps you find out the weather at your location!'});
});
//start the server.
app.listen(port_number, () => {
	console.log('server up and running on port '+port_number);
});