const productGrid = document.getElementById('productGrid');
let allProducts = []; 


async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();
        allProducts = products;
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts(products) {
    productGrid.innerHTML = '';

    if (products.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.category}</p>
            <p class="price">₹${p.price}</p>
        `;
        productGrid.appendChild(card);
    });
}

function filterProducts() {
    const selectedCategory = document.getElementById('filterCategory').value;

    const filtered = selectedCategory
        ? allProducts.filter(p => p.category === selectedCategory)
        : [...allProducts];

    const sorted = sortProducts(filtered);
    renderProducts(sorted);
}


function sortProducts(productsToSort = [...allProducts]) {
    const sortOption = document.getElementById('sortOption').value;

    switch (sortOption) {
        case 'name_asc':
            productsToSort.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name_desc':
            productsToSort.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price_asc':
            productsToSort.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            productsToSort.sort((a, b) => b.price - a.price);
            break;
    }

    return productsToSort;
}

function handleChange() {
    filterProducts(); 
}

fetchProducts();
