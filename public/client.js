const button = document.querySelector('button');
const form = document.querySelector('form');
const searchField = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');


form.addEventListener('submit', (event)=>{
	event.preventDefault();
	console.log("form submitted!");
	message1.textContent = "Loading...";
	message2.textContent = '';
	//make weather request to backend using fetch
	fetch('http://localhost:3500/weather?address='+searchField.value).then((response)=>{
		return response.json();
	}).then((response)=>{
		
			if(response.hasOwnProperty('error')){
				message1.textContent = response.error +  searchField.value;
			}
			else
			{
				var description = response.weather[0].description;
				var temperature = response.main.temp;
				// console.log(response);
				message1.textContent = 'The weather status in ' + searchField.value +','+response.sys.country + ' seems to be like '+description;;
				message2.textContent = 'The temperature is ' + String(temperature-273) + '°C';
			}
	});
	//display the results in the message2 paragraph.
});
