const products = [];
let filteredProducts = [];
let fuzzyProducts = [];

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
  const saleProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 8);
  const trendingProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 8);


  // All Products - Filtered Products
  if (document.getElementById('productContainer')) {
    filteredProducts.forEach(element => {
      productHtml += `
        <div class="card ${element.category}">
            <p class="product-name">${element.title}</p>
            <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img" draggable="false">
            <p class="product-price">${element.price * 400} Ft</p>
        </div>
        `;

      document.getElementById('productContainer').innerHTML = productHtml;

    });
  };
  
  productHtml = '';


  // Trending Products
  if (document.getElementById('trendingProductContainer')) {
    trendingProducts.forEach(element => {
      productHtml += `
        <div class="card ${element.category}">
            <p class="product-name">${element.title}</p>
            <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img" draggable="false">
            <p class="product-price">${element.price * 400} Ft</p>
        </div>
        `;

      document.getElementById('trendingProductContainer').innerHTML = productHtml;
    });
  };
  productHtml = '';


  // Sale Products
  if (document.getElementById('saleProductContainer')) {
    saleProducts.forEach(element => {
      productHtml += `
        <div class="card ${element.category}">
            <p class="product-name">${element.title}</p>
            <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img" draggable="false">
            <div class="product-price"><p><s>${element.price * 400} Ft</s></p><p>${Math.round((element.price - element.price * 0.30) * 400)} Ft</p></div>  
        </div>
        `;

      document.getElementById('saleProductContainer').innerHTML = productHtml;
    });
  };
};

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




const cardContainer = document.querySelectorAll('.vertical-scroll');

function handleScroll(event) {
  event.preventDefault();
  this.scrollLeft += event.deltaY * 8;
}

function updateScrollBehavior() {
  if (window.innerWidth >= 1200) {
    // Enable scroll effect
    cardContainer.forEach(scroll => {
      if (!scroll.hasAttribute('data-scroll-enabled')) {
        scroll.addEventListener('wheel', handleScroll);
        scroll.setAttribute('data-scroll-enabled', 'true'); // Mark as enabled
      }
    });
  } else {
    // Disable scroll effect
    cardContainer.forEach(scroll => {
      scroll.removeEventListener('wheel', handleScroll);
      scroll.removeAttribute('data-scroll-enabled'); // Remove marker
    });
  }
}

// Run on load
updateScrollBehavior();

// Re-run when the window resizes
window.addEventListener('resize', updateScrollBehavior);





function updateProductWrapperBehavior() {
  document.querySelectorAll('.product-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.vertical-scroll');
    const leftArrow = wrapper.querySelector('.left-arrow');
    const rightArrow = wrapper.querySelector('.right-arrow');

    if (!container || !leftArrow || !rightArrow) return; // Prevent errors

    if (window.innerWidth < 1200) {
      //  Disable custom scrolling behavior, enable default scrolling
      container.style.overflowX = 'auto';
      container.style.cursor = 'default';

      //  Remove event listeners for dragging
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);

      //  Remove event listeners for arrows
      leftArrow.removeEventListener('click', handleLeftClick);
      rightArrow.removeEventListener('click', handleRightClick);

      //  Remove attribute tracking events
      container.removeAttribute('data-events-added');

    } else {
      //  Enable custom scrolling behavior
      container.style.overflowX = 'hidden'; // Hide native scrollbar
      container.style.cursor = 'grab';

      //  Ensure event listeners are only added once
      if (!container.hasAttribute('data-events-added')) {
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);

        leftArrow.addEventListener('click', handleLeftClick);
        rightArrow.addEventListener('click', handleRightClick);

        container.setAttribute('data-events-added', 'true'); // Mark as initialized
      }
    }
  });
}

//  Mouse Drag Handlers
function handleMouseDown(e) {
  const container = this;
  container.isDown = true;
  container.startX = e.pageX - container.offsetLeft;
  container.scrollLeftStart = container.scrollLeft;
  container.style.cursor = "grabbing";
  document.body.style.userSelect = 'none';
}

function handleMouseLeave() {
  this.isDown = false;
  this.style.cursor = "grab";
  document.body.style.userSelect = '';
}

function handleMouseUp() {
  this.isDown = false;
  this.style.cursor = "grab";
  document.body.style.userSelect = '';
}

function handleMouseMove(e) {
  const container = this;
  if (!container.isDown) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - container.startX) * -1.5;
  container.scrollLeft = container.scrollLeftStart + walk;
}

//  Arrow Click Handlers
function handleLeftClick() {
  const container = this.closest('.product-wrapper').querySelector('.vertical-scroll');
  if (container) container.scrollBy({ left: -700, behavior: 'smooth' });
}

function handleRightClick() {
  const container = this.closest('.product-wrapper').querySelector('.vertical-scroll');
  if (container) container.scrollBy({ left: 700, behavior: 'smooth' });
}

//  Run on page load
updateProductWrapperBehavior();

//  Re-run when window resizes
window.addEventListener('resize', updateProductWrapperBehavior);




function renderProducts2() {
  let productHtml = '';
  fuzzyProducts.forEach(element => {
    productHtml += `
    <div class="card ${element.category}">
      <p class="product-name">${element.title}</p>
      <img src="${element.image}" alt="${element.title}" title="${element.title}" class="product-img" draggable="false">
      <p class="product-price">${element.price * 400} Ft</p>
    </div>
    `;

    document.getElementById('productContainer').innerHTML = productHtml;

  });

}

function fuzzySearch() {

  let searchValue = document.getElementById('fuzzySearchInput').value.toLowerCase();
  console.log(searchValue);
  fuzzyProducts = products.filter(element => element.title.toLowerCase().includes(searchValue));
  if (fuzzyProducts.length === 0) {
    fuzzyProducts = [{ title: 'Nincs találat' }];
  }
  renderProducts2();
}

window.onload = init();