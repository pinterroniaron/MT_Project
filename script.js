const url = 'https://ali-express1.p.rapidapi.com/categories';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6d53da9344mshb02c9676f6a58c0p1d1dc5jsncbde29faef2c',
		'x-rapidapi-host': 'ali-express1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}


const cardContainer = document.querySelector('.card-container');

  cardContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    cardContainer.scrollLeft += (event.deltaY * 8);
  });
