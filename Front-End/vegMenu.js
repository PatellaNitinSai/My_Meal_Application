const loadingSpinner = document.getElementById('loadingSpinner');
const menuContainer = document.getElementById('menuContainer');
const cartTotalSpan = document.getElementById('cartTotal');
const apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://webapllication.onrender.com';
const rupeeSymbol = '\u20B9';

let menuData = [];
let orderItems = [];
let total = 0;

// Show and hide spinner
function showSpinner() {
    loadingSpinner.style.visibility = 'visible';
}

function hideSpinner() {
    loadingSpinner.style.visibility = 'hidden';
}

// Fetch menu data
function fetchMenu() {
    showSpinner();
    axios.get(`${apiUrl}/menu/showVeg`)
        .then(response => {
            menuData = response.data;
            renderMenu(menuData);
        })
        .catch(error => {
            console.error(error);
            alert('Failed to load menu data.');
        })
        .finally(hideSpinner);
}

// Render menu items
function renderMenu(data) {
    menuContainer.innerHTML = '';
    data.forEach(item => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');

        const card = `
            <div class="card h-100 border-primary">
                <div class="card-body">
                    <h5 class="card-title text-primary">${item.itemName}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="text-dark"><strong>${rupeeSymbol}${item.price}</strong></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="label">Add Item</span>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-success add-button">+</button>
                            <span class="count mx-2">0</span>
                            <button class="btn btn-sm btn-danger remove-button" disabled>-</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        col.innerHTML = card;
        menuContainer.appendChild(col);

        const addButton = col.querySelector('.add-button');
        const removeButton = col.querySelector('.remove-button');
        const countSpan = col.querySelector('.count');

        addButton.addEventListener('click', () => addItem(countSpan, item.price, item.itemName, removeButton));
        removeButton.addEventListener('click', () => removeItem(countSpan, item.price, item.itemName, removeButton));
    });
}

// Add and remove items
function addItem(countSpan, price, name, removeButton) {
    let count = parseInt(countSpan.textContent) + 1;
    countSpan.textContent = count;
    total += price;
    updateCartTotal();
    orderItems.push(name);
    removeButton.disabled = false;
}

function removeItem(countSpan, price, name, removeButton) {
    let count = parseInt(countSpan.textContent) - 1;
    countSpan.textContent = count > 0 ? count : 0;
    total = Math.max(0, total - price);
    updateCartTotal();

    if (count === 0) {
        removeButton.disabled = true;
    }
    orderItems = orderItems.filter(item => item !== name);
}

// Update cart total
function updateCartTotal() {
    cartTotalSpan.textContent = total.toFixed(2);
}

// Search and filter
document.getElementById('searchBox').addEventListener('input', () => {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const filteredItems = menuData.filter(item => item.itemName.toLowerCase().includes(searchTerm));
    renderMenu(filteredItems);
});

document.getElementById('filterDropdown').addEventListener('change', () => {
    const filterValue = document.getElementById('filterDropdown').value.toLowerCase();
    const filteredItems = filterValue === 'all' ? menuData : menuData.filter(item => item.category.toLowerCase() === filterValue);
    renderMenu(filteredItems);
});

// Initial load
fetchMenu();
