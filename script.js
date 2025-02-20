const products = [];
let filteredProducts = [];

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
    const saleProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 5);
    const trendingProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 5);
    

    // All Products - Filtered Products

    filteredProducts.forEach(element => {
        productHtml += `
    <div class="card ${element.category}">
        <p class="product-name">${element.title}</p>
        <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img" draggable="false">
        <p class="product-price">${element.price * 400} Ft</p>
    </div>
    `;
    if(document.getElementById('productContainer')){
        document.getElementById('productContainer').innerHTML = productHtml;
    }
    });
    productHtml = '';


    // Trending Products

    trendingProducts.forEach(element => {   
        productHtml += `
    <div class="card ${element.category}">
        <p class="product-name">${element.title}</p>
        <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img" draggable="false">
        <p class="product-price">${element.price * 400} Ft</p>
    </div>
    `;   
    if(document.getElementById('trendingProductContainer')) 
        document.getElementById('trendingProductContainer').innerHTML = productHtml;
    });
    productHtml = '';


    // Sale Products

    saleProducts.forEach(element => {   
        productHtml += `
    <div class="card ${element.category}">
        <p class="product-name">${element.title}</p>
        <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img" draggable="false">
        <div class="product-price"><p><s>${element.price*400} Ft</s></p><p>${Math.round((element.price-element.price*0.30)* 400)} Ft</p></div>  
    </div>
    `;   
    if(document.getElementById('saleProductContainer')) 
        document.getElementById('saleProductContainer').innerHTML = productHtml;
    });
}

function onChangeCategory(value) {
    console.log(value);

    filterByCategory(value);
    renderProducts();
}

function init() {
    fetchProducts();
}

function fetchProducts() {
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



const cardContainer = document.querySelectorAll('.vertical-scroll')
cardContainer.forEach(scroll => {
    scroll.addEventListener('wheel', (event) => {
        event.preventDefault();
        scroll.scrollLeft += (event.deltaY * 8);
    });

});;

document.querySelectorAll('.product-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.vertical-scroll');
    const leftArrow = wrapper.querySelector('.left-arrow');
    const rightArrow = wrapper.querySelector('.right-arrow');

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Drag Scrolling
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = "grabbing";
        document.body.style.userSelect = 'none'; // Prevents text selection
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = "grab";
        document.body.style.userSelect = ''; // Re-enable selection
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = "grab";
        document.body.style.userSelect = ''; // Re-enable selection
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * -1.5; // Adjust speed for better feel
        container.scrollLeft = scrollLeft + walk;
    });




    // Arrow Button Scrolling
    leftArrow.addEventListener('click', () => {
        container.scrollBy({ left: -700, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        container.scrollBy({ left: 700, behavior: 'smooth' });
    });
});

window.onload = init();
