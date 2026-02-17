// HELPER: Capitalizes the first letter of a string
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// FETCH CATEGORIES
// Calls the API to get all available product categories and renders filter buttons.
async function fetchCategories() {
    const container = document.getElementById('category-container');
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await res.json();

        // Loop through each category and create a clickable button
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-btn btn btn-outline btn-primary rounded-xl capitalize transition-all hover:-translate-y-1';

            // Clicking the button triggers loadProducts for that specific category
            btn.innerText = capitalize(cat);
            btn.onclick = () => loadProducts(cat);
            container.appendChild(btn);
        });
    } catch (e) { console.error("Error fetching categories", e); }
}

// LOAD PRODUCTS
// Fetches products from the API based on the selected category. Handles loading states and dynamic HTML generation for product cards.

async function loadProducts(category) {
    // Visually update which button is currently selected
    updateActiveButton(category);

    const grid = document.getElementById('products-grid');
    // Show a loading spinner while waiting for API response
    grid.innerHTML = '<span class="loading loading-spinner loading-xl text-primary mx-auto col-span-full"></span>';

    // Determine the correct URL based on whether we want 'all' or a specific category
    const url = category === 'all' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;

    try {
        const res = await fetch(url);
        const products = await res.json();

        // Map through products array and generate HTML for each card
        grid.innerHTML = products.map(p => `
        <div class="card bg-base-100 border border-base-200 hover:shadow-2xl transition-all duration-500 group overflow-hidden">
            <figure class="p-8 bg-white h-60 relative">
                <img src="${p.image}" class="h-full object-contain group-hover:scale-110 transition-transform duration-700" />
            </figure>
            <div class="card-body p-6">
                <h2 class="card-title text-sm font-bold line-clamp-1 h-5">${p.title}</h2>
                <div class="flex items-center justify-between mt-6">
                    <span class="text-2xl font-black text-primary">$${p.price}</span>
                    <div class="flex gap-2">
                        <button onclick="showDetails(${p.id})" class="btn btn-square btn-ghost btn-sm"><i class="fa-solid fa-eye"></i></button>
                        <button onclick="updateCart()" class="btn btn-primary btn-sm rounded-lg"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    } catch (err) {
        grid.innerHTML = '<p class="text-error col-span-full">Failed to load products.</p>';
    }
}

// UPDATE ACTIVE BUTTON UI
// Switches the CSS classes of category buttons to show which one is currently active.
function updateActiveButton(category) {
    const buttons = document.querySelectorAll('#category-container button');
    buttons.forEach(btn => {
        const btnText = btn.innerText.toLowerCase();
        if (btnText === category.toLowerCase() || (category === 'all' && btnText === 'all arrivals')) {
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-active');
        } else {
            btn.classList.add('btn-outline');
            btn.classList.remove('btn-active');
        }
    });
}

// CART LOGIC
// Global counter variable to track total items in the shopping cart.
let count = 0;
function updateCart() {
    count++;
    document.getElementById('cart-count').innerText = count;
}

// INITIALIZE
// Runs when the page finishes loading.
window.onload = () => {
    fetchCategories(); // Fetch filter buttons
    loadProducts('all'); // Load all products by default
};

// SHOW DETAILS (Modal Logic)
// Fetches data for a single product and displays it inside the DaisyUI Modal.
async function showDetails(id) {
    const modal = document.getElementById('product_modal');
    const content = document.getElementById('modal-content');
    // Reset modal content and show loading spinner inside modal
    content.innerHTML = '<div class="flex justify-center p-20"><span class="loading loading-spinner loading-lg"></span></div>';
    modal.showModal();

    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const p = await res.json();

        // Populate the modal with detailed product information
        content.innerHTML = `
            <div class="flex flex-col md:flex-row gap-10 items-center">

                <div class="w-full md:w-1/2 p-10 bg-white rounded-3xl border border-base-100 shadow-inner">
                    <img src="${p.image}" class="w-full h-80 object-contain mx-auto" alt="${p.title}" />
                </div>

                <div class="flex-1 space-y-6 text-left">

                    <div class="badge badge-primary badge-outline font-bold tracking-widest uppercase text-[10px]">${p.category}
                    </div>

                    <h3 class="text-3xl font-black leading-tight text-neutral">${p.title}</h3>
                    <p class="text-base opacity-70 leading-relaxed">${p.description}</p>

                    <div class="divider"></div>

                    <div class="flex items-center justify-between">
                        <span class="text-4xl font-black text-primary">$${p.price.toFixed(2)}</span>
                        <button onclick="updateCart()" class="btn btn-primary btn-lg rounded-2xl px-12 shadow-xl shadow-primary/20">Add to Bag</button>
                    </div>

                </div>
            </div>`;
    } catch (err) {
        content.innerHTML = '<p class="text-error text-center p-10">Failed to load product details.</p>';
    }
}