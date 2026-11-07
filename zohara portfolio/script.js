let cartCount = 0;
let allProducts = [];

// Fetch products from JSON file
async function fetchProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }
    allProducts = await response.json();
    displayProducts(allProducts);
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('products-grid').innerHTML = '<p style="text-align:center; width:100%;">Failed to load products. Please try again later.</p>';
  }
}

// Display product cards dynamically
function displayProducts(products) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  if (products.length === 0) {
    grid.innerHTML = '<p style="text-align:center; width:100%;">No products found.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <span class="category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="details-row">
          <span class="price">$${product.price.toFixed(2)}</span>
          <span class="rating">★ ${product.rating}</span>
        </div>
        <button class="add-cart-btn" onclick="addToCart()">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Add to Cart functionality
function addToCart() {
  cartCount++;
  document.getElementById('cart-count').innerText = cartCount;
}

// Search filter functionality
document.getElementById('search-btn').addEventListener('click', filterProducts);
document.getElementById('search-input').addEventListener('keyup', filterProducts);

function filterProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = allProducts.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

// Initial fetch call
fetchProducts();