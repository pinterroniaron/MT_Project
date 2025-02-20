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
const categoryOptions = document.querySelectorAll('.categoryOptions');
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
        productPrice[i].innerText = productsPrice[i]*400 + "Ft";
      }
      // console.log(productCard);
      
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
categoryOptions.forEach(element => {
  const category = element;
  category.addEventListener('click', () => {
    productCard.forEach((card) => {
      if (category.innerText == card.getAttribute('product-category')) {
        console.log(category);
        categoryArea.innerHTML += card;
      }
    });
  });
});


// const cardContainer = document.querySelector('.card-container');

// cardContainer.addEventListener('wheel', (event) => {
//   event.preventDefault();
//   cardContainer.scrollLeft += (event.deltaY * 8);
// });

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
      // Disable custom scrolling behavior, enable default scrolling
      container.style.overflowX = 'auto';
      container.style.cursor = 'default';

      // Remove event listeners for dragging
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);

      // Remove event listeners for arrows
      leftArrow.removeEventListener('click', handleLeftClick);
      rightArrow.removeEventListener('click', handleRightClick);

      // Remove attribute tracking events
      container.removeAttribute('data-events-added');
      
    } else {
      // Enable custom scrolling behavior
      container.style.overflowX = 'hidden'; // Hide native scrollbar
      container.style.cursor = 'grab';

      // Ensure event listeners are only added once
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

// Mouse Drag Handlers
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

// Arrow Click Handlers
function handleLeftClick() {
  const container = this.closest('.product-wrapper').querySelector('.vertical-scroll');
  if (container) container.scrollBy({ left: -700, behavior: 'smooth' });
}

function handleRightClick() {
  const container = this.closest('.product-wrapper').querySelector('.vertical-scroll');
  if (container) container.scrollBy({ left: 700, behavior: 'smooth' });
}

// Run on page load
updateProductWrapperBehavior();

// Re-run when window resizes
window.addEventListener('resize', updateProductWrapperBehavior);

