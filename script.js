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

(function() {

  var root = this;
  
  var fuzzy = {};
  
  // Use in node or in browser
  if (typeof exports !== 'undefined') {
    module.exports = fuzzy;
  } else {
    root.fuzzy = fuzzy;
  }
  
  // Return all elements of `array` that have a fuzzy
  // match against `pattern`.
  fuzzy.simpleFilter = function(pattern, array) {
    return array.filter(function(str) {
      return fuzzy.test(pattern, str);
    });
  };
  
  // Does `pattern` fuzzy match `str`?
  fuzzy.test = function(pattern, str) {
    return fuzzy.match(pattern, str) !== null;
  };
  
  // If `pattern` matches `str`, wrap each matching character
  // in `opts.pre` and `opts.post`. If no match, return null
  fuzzy.match = function(pattern, str, opts) {
    opts = opts || {};
    var patternIdx = 0
      , result = []
      , len = str.length
      , totalScore = 0
      , currScore = 0
      // prefix
      , pre = opts.pre || ''
      // suffix
      , post = opts.post || ''
      // String to compare against. This might be a lowercase version of the
      // raw string
      , compareString =  opts.caseSensitive && str || str.toLowerCase()
      , ch;
  
    pattern = opts.caseSensitive && pattern || pattern.toLowerCase();
  
    // For each character in the string, either add it to the result
    // or wrap in template if it's the next string in the pattern
    for(var idx = 0; idx < len; idx++) {
      ch = str[idx];
      if(compareString[idx] === pattern[patternIdx]) {
        ch = pre + ch + post;
        patternIdx += 1;
  
        // consecutive characters should increase the score more than linearly
        currScore += 1 + currScore;
      } else {
        currScore = 0;
      }
      totalScore += currScore;
      result[result.length] = ch;
    }
  
    // return rendered string if we have a match for every char
    if(patternIdx === pattern.length) {
      // if the string is an exact match with pattern, totalScore should be maxed
      totalScore = (compareString === pattern) ? Infinity : totalScore;
      return {rendered: result.join(''), score: totalScore};
    }
  
    return null;
  };
  
  // The normal entry point. Filters `arr` for matches against `pattern`.
  // It returns an array with matching values of the type:
  //
  //     [{
  //         string:   '<b>lah' // The rendered string
  //       , index:    2        // The index of the element in `arr`
  //       , original: 'blah'   // The original element in `arr`
  //     }]
  //
  // `opts` is an optional argument bag. Details:
  //
  //    opts = {
  //        // string to put before a matching character
  //        pre:     '<b>'
  //
  //        // string to put after matching character
  //      , post:    '</b>'
  //
  //        // Optional function. Input is an entry in the given arr`,
  //        // output should be the string to test `pattern` against.
  //        // In this example, if `arr = [{crying: 'koala'}]` we would return
  //        // 'koala'.
  //      , extract: function(arg) { return arg.crying; }
  //    }
  fuzzy.filter = function(pattern, arr, opts) {
    if(!arr || arr.length === 0) {
      return [];
    }
    if (typeof pattern !== 'string') {
      return arr;
    }
    opts = opts || {};
    return arr
      .reduce(function(prev, element, idx, arr) {
        var str = element;
        if(opts.extract) {
          str = opts.extract(element);
        }
        var rendered = fuzzy.match(pattern, str, opts);
        if(rendered != null) {
          prev[prev.length] = {
              string: rendered.rendered
            , score: rendered.score
            , index: idx
            , original: element
          };
        }
        return prev;
      }, [])
  
      // Sort by score. Browsers are inconsistent wrt stable/unstable
      // sorting, so force stable by using the index in the case of tie.
      // See http://ofb.net/~sethml/is-sort-stable.html
      .sort(function(a,b) {
        var compare = b.score - a.score;
        if(compare) return compare;
        return a.index - b.index;
      });
  };
  
  
  }());

window.onload = init();