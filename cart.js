const products = [];
let filteredProducts = [];
var product = {};

function filterByCategory(category) {
    if (category) {
        filteredProducts = products.filter(element => element.category === category);
        if (category === 'all') {
            filteredProducts = products;
        }
    }
    else {
        filteredProducts = products;
    }
    console.log(filteredProducts);

}


function renderProducts() {
    let productHtml = '';
    let cartProductIds = JSON.parse(localStorage.getItem("cart")) || [];

    if(cartProductIds.length > 0){
        cartProductIds.forEach(cartId => {
            let product = products.find(product => product.id == cartId);
            if (product) {
                productHtml += `
        <div class="card ${product.category}" id=${product.id} onclick="onClickProduct(this.id)" >
            <p class="product-name">${product.title}</p>
            <img src="${product.image}" alt="${product.title}" title="${product.title}" class="product-img" draggable="false">
            <p class="product-price">${product.price * 400} Ft</p>
        `;
        if (JSON.parse(localStorage.getItem("cart") || "[]").includes(product.id)){
            productHtml += 
            `
            <button class="remove-from-cart" onclick="removeFromCart(${product.id})">Remove from Cart</button></div>
            `
        }
        else {
            productHtml += 
            `
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button></div>
            `
        }

            document.getElementById('productContainer').innerHTML = productHtml;
            }
        })
        
        
    }
    else {
        productHtml = `<p>Your cart is empty.</p>`;
        document.getElementById('productContainer').innerHTML = productHtml;
    }

            


   

};



function onClickProduct(id) {
    
    getProductById(id);
    
    window.location.href = `product.html?id=${id}`;
    
}
       
console.log(product);


function init() {
    fetchProducts();
    fetchCart()
}

function fetchProducts() {
    const url = 'https://fakestoreapi.com/products';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },}
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



function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderProducts()
    }
  }
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let index = cart.indexOf(productId);
    if (index !== -1) {
        cart.splice(index, 1); 
        localStorage.setItem("cart", JSON.stringify(cart));
        renderProducts()
    }
}








window.onload = init();
