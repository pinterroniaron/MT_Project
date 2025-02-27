
        const param = new URL(window.location.href).searchParams;
        console.log(param.get("id"));
        let productId = param.get("id");
        const products = [];
        
        
        function renderProducts() {
            let productHtml = '';
            if (productId) {
                let product = products.find(product => product.id == productId);
                productHtml += `
                
                <div class="product-container" id="${product.id}">
                    <img src="${product.image}" alt="${product.title}" title="${product.title}" class="product-img" draggable="false">
                    <div class="product-details">
                        <p class="product-name">${product.title}</p>
                        <p class="product-price">${product.price * 400} Ft</p>
                        <p class="product-description">${product.description}</p>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            
            `;
            }
    
            document.getElementById('productPage').innerHTML = productHtml;
        };



        function init() {
            fetchProducts();
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
                        renderProducts();
                    })
                }));
            }
            catch (error) {
                console.error(error);
            }
        }
        
        
        window.onload = init();