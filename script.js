const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&country=US&sort=freshness&currency=USD&sizeSchema=US&limit=48&lang=en-US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '6d53da9344mshb02c9676f6a58c0p1d1dc5jsncbde29faef2c',
		'x-rapidapi-host': 'asos2.p.rapidapi.com'
	}
};
let productsNames = [];
let productsImgUrl= []; 
const productImg = document.querySelectorAll('.product-img');

try {
  	const response = fetch(url, options).then((res=>{
          const result = res.json().then((data)=>{
            console.log(data);
              productsNames = data.products.map(product => product.name);
              productsImgUrl = data.products.map(product => product.imageUrl);

                for (let i = 0; i < productImg.length; i++) {
                  productImg[i].src ="http://" + productsImgUrl[i];
                }
                
                
              // console.log(productsNames);
              // console.log(productsImgUrl);
          })
      }));
  } catch (error) {
  	console.error(error);
}







const cardContainer = document.querySelector('.card-container');

  cardContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    cardContainer.scrollLeft += (event.deltaY * 8);
  });
