// const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&country=US&sort=freshness&currency=USD&sizeSchema=US&limit=48&lang=en-US';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '6d53da9344mshb02c9676f6a58c0p1d1dc5jsncbde29faef2c',
// 		'x-rapidapi-host': 'asos2.p.rapidapi.com'
// 	}
// };
// let productsNames = [];
// let productsImgUrl= [];
// let productsPrice = []; 
// const productName = document.querySelectorAll('.product-name');
// const productImg = document.querySelectorAll('.product-img');
// const productPrice = document.querySelectorAll('.product-price');
// try {
//   	const response = fetch(url, options).then((res=>{
//           const result = res.json().then((data)=>{
//             console.log(data);
//               productsNames = data.products.map(product => product.name);
//               productsImgUrl = data.products.map(product => product.imageUrl);
//               productsPrice = data.products.map(product => product.price.current.text);
//                 for (let i = 0; i < productImg.length; i++) {

//                   productImg[i].src ="http://" + productsImgUrl[i];
//                   productImg[i].alt = productsNames[i];
//                   productImg[i].title = productsNames[i];
//                   productName[i].innerText = productsNames[i];
//                   productPrice[i].innerText = productsPrice[i];

//                 }



//               // console.log(productsNames);
//               // console.log(productsImgUrl);
//           })
//       }));
//   } catch (error) {
//   	console.error(error);
// }


fetch('https://fakestoreapi.com/products')
const url = 'https://fakestoreapi.com/products';
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

let productsNames = [];
let productsImgUrl = [];
let productsPrice = [];
let productsCategories = [];
let categories = [];
const productName = document.querySelectorAll('.product-name');
const productImg = document.querySelectorAll('.product-img');
const productPrice = document.querySelectorAll('.product-price');
const productCard = document.querySelectorAll('.card');
const categoryPlace = document.querySelectorAll('.categoryPlace');
const categoryArea = document.querySelector('.categoryArea');
try {
  const response = fetch(url, options).then((res => {
    const result = res.json().then((data) => {
      //console.log(data);
      productsNames = data.map(product => product.title);
      productsImgUrl = data.map(product => product.image);
      productsPrice = data.map(product => product.price);
      productsCategories = data.map(product => product.category);
      productsCategories.forEach(element => {
        if (!categories.includes(element)) {
          categories.push(element);
         }
       });
       //console.log(categories);

      for (let i = 0; i < data.length; i++) {
        productImg[i].src = productsImgUrl[i];
        productImg[i].alt = productsNames[i];
        productImg[i].title = productsNames[i];
        productName[i].innerText = productsNames[i];
        productPrice[i].innerText = productsPrice[i];
        productCard[i].setAttribute('product-category', productsCategories[i]);
        // console.log(productCard[i]);
        

        for (let i = 0; i < categories.length; i++) {
        
          categoryPlace[i].innerText = categories[i];
        
        };
      }
      // console.log(productCard);
      // categoryArea.addEventListener('click', (event) => {
      //   const category = event.target.innerText;
        
      //   productCard.forEach((card) => {
      //     if (category == productCard.getAttribute('product-category')) {
      //       categoryArea.innerHTML = productCard;
      //     };
      //   });
      // });
    });
  }));
}
catch (error) {
  console.error(error);
}

// function filter(category) {
//   category = categories[category];
//   productCard.forEach((card) => {
//     if (category == card.getAttribute('product-category')) {
//       console.log(category);
//       categoryArea.innerHTML += card;
//     }
//   });
// }

const cardContainer = document.querySelector('.card-container');

cardContainer.addEventListener('wheel', (event) => {
  event.preventDefault();
  cardContainer.scrollLeft += (event.deltaY * 8);
});
