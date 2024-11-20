const rupeeSymbol = '\u20B9';
let total = 0;
const menuContainer = document.getElementById('menuContainer');
const cartTotalSpan = document.getElementById('cartTotal');
const addToCartButton = document.getElementById('addToCartButton'); // Add an ID to your "Add to Cart" button
let menuData = [];
let orderItems = {};

axios.get('http://localhost:3000/menu/showVeg')
    .then(response => {
        menuData = response.data;
        renderMenu(menuData);
    })
    .catch(error => {
        console.error(error);
    });

function renderMenu(data) {
    menuContainer.innerHTML = '';
    data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('menu-item');
        const plusButton = document.createElement('div');
        plusButton.classList.add('quantity-controls');
        plusButton.innerHTML = `<span class="label">AddItem</span>
            <button class="add-button"> + </button>
            <span class="count">0</span>
            <button class="remove-button" disabled>-</button>`; // Initially disable the '-' button

        itemElement.innerHTML = `<div class="item-info"><strong>${item.itemName}</strong>: 
            <textarea class="item-description">${item.description}</textarea>
            - ${rupeeSymbol} <span class="item-price">${item.price}</span></div>`;

        itemElement.appendChild(plusButton);
        menuContainer.appendChild(itemElement);

        const addButton = plusButton.querySelector('.add-button');
        const removeButton = plusButton.querySelector('.remove-button');
        const spanCount = plusButton.querySelector('.count');

        addButton.addEventListener('click', () => addItem(item, spanCount, removeButton));
        removeButton.addEventListener('click', () => removeItem(item, spanCount, removeButton));
    });

    // Disable "Add to Cart" button initially
    addToCartButton.disabled = true;
}

function addItem(item, spanCount, removeButton) {
    const itemName = item.itemName;

    if (!orderItems[itemName]) {
        orderItems[itemName] = { count: 0, total: 0, price: item.price };
    }

    orderItems[itemName].count++;
    spanCount.textContent = orderItems[itemName].count;
    orderItems[itemName].total += orderItems[itemName].price;
    total += orderItems[itemName].price;

    // Enable the '-' button when an item is added
    removeButton.disabled = false;

    // Enable "Add to Cart" button when at least one item is added
    addToCartButton.disabled = false;

    updateCartTotal();
}

function removeItem(item, spanCount, removeButton) {
    const itemName = item.itemName;

    if (orderItems[itemName] && orderItems[itemName].count > 0) {
        orderItems[itemName].count--;
        spanCount.textContent = orderItems[itemName].count;
        orderItems[itemName].total = Math.max(0, orderItems[itemName].total - orderItems[itemName].price);
        total = Math.max(0, total - orderItems[itemName].price);

        // Disable the '-' button when all items are removed
        if (orderItems[itemName].count === 0) {
            removeButton.disabled = true;
        }

        // Disable "Add to Cart" button when all items are removed
        if (total === 0) {
            addToCartButton.disabled = true;
        }

        updateCartTotal();
    }
}

// ... (rest of your existing code)
