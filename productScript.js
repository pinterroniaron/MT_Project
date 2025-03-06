
        const param = new URL(window.location.href).searchParams;
        console.log(param.get("id"));
        let productId = param.get("id");
        const products = [];
        
        
        function renderProducts() {
            let productHtml = '';
            if (productId) {
                let product = products.find(product => product.id == productId);
                productHtml += `
                
                <div class="product-section-container" id="${product.id}">
                    <div class="section-left">
                    <p class="product-name">${product.title}</p>
                    <img src="${product.image}" alt="${product.title}" title="${product.title}" class="product-img" draggable="false">
                    </div>
                    <div class="section-right">            
                        <p class="product-price">${product.price * 400} Ft</p>
                        
                        <p class="product-description">${product.description}</p>
                    
            
            `;

            if (JSON.parse(localStorage.getItem("cart") || "[]").includes(product.id)){
                productHtml += 
                `
                <button class="remove-from-cart" onclick="removeFromCart(${product.id})">Remove from Cart</button></div></div>
                `
            }
            else {
                productHtml += 
                `
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button></div></div>
                `
            }
            };
            
    
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