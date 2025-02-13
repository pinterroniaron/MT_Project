const products = [];
let filteredProducts = [];

function filterByCategory(category) {
    if(category !== 'all') {
        filteredProducts = products.filter(element => element.category === category);}
    else  { 
        filteredProducts = products;
    }
    console.log(filteredProducts);
}

function renderProducts() {
    let productHtml = '';

    filteredProducts.forEach(element => {
        productHtml += `
    <div class="card ${element.category}">
        <p class="product-name">${element.title}</p>
        <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img">
        <p class="product-price">${element.price}</p>
    </div>
    `;
        document.getElementById('productContainer').innerHTML = productHtml;
    })
}

function onChangeCategory(value) {
    console.log(value);
    
    
    filterByCategory(value);
    renderProducts();
}

function init() {
    fetchProducts();    
}

function fetchProducts(){
const url = 'https://fakestoreapi.com/products';
const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};
try {
    const response = fetch(url, options).then((res => {
        const result = res.json().then((data) => {
            console.log(data);
            data.forEach(element => {
                products.push(element);
            });
            filterByCategory();
            renderProducts();
        })
    }));
}
catch (error) {
    console.error(error);
}
}




const cardContainer = document.querySelector('.card-container');

 cardContainer.addEventListener('wheel', (event) => {   event.preventDefault();
   cardContainer.scrollLeft += (event.deltaY * 8);
 });

 
window.onload = init();
