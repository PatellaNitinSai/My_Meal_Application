// Retrieve total from local storage
const cartTotal = localStorage.getItem('cartTotal');

// Retrieve order items from local storage
const orderItemsString = localStorage.getItem('cartItems');
const orderItems = orderItemsString ? JSON.parse(orderItemsString) : [];

console.log('orderItems:', orderItems);
console.log('cartTotal:', cartTotal);

const orderedItemsContainer = document.getElementById('orderedItemsContainer');

if (orderItems.length > 0) {
    // Display each item in the orderItems list
    orderItems.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.innerHTML = `<h2 class="item">${item.itemName} (Quantity: ${item.quantity})</h2>`;
        orderedItemsContainer.appendChild(itemElement);
    });

    // Display the total amount
    let totalElement = document.createElement('div');
    if (cartTotal !== null && cartTotal !== undefined) {
        const numericCartTotal = parseFloat(cartTotal);

        console.log('numericCartTotal:', numericCartTotal);
        if (!isNaN(numericCartTotal)) {
            totalElement.innerHTML = `<div>Total: ₹${numericCartTotal.toFixed(2)}</div>`;
        } else {
            totalElement.innerHTML = `<div>Total: Invalid value</div>`;
        }
    } else {
        totalElement.innerHTML = `<div>Total: Not available</div>`;
    }

    orderedItemsContainer.appendChild(totalElement);
} else {
    let noItemsElement = document.createElement('p');
    noItemsElement.textContent = 'No items in the cart.';
    orderedItemsContainer.appendChild(noItemsElement);
}

// Update the displayed total amount
const totalAmount = document.getElementById('cartTotal');
totalAmount.textContent = `Pay ₹${cartTotal}`;

// Function to enable the Google Pay button
const button = document.querySelector("button");

// Define yourItemsData and yourTotalAmount before using them
let yourItemsData = orderItems.map(item => ({
    itemName: item.itemName,
    quantity: item.quantity,
    price: item.priceInCents // Adjust to fit your data structure
}));

let yourTotalAmount = parseFloat(cartTotal);

// Check if the total amount is valid
if (isNaN(yourTotalAmount)) {
    yourTotalAmount = 0;  // Set a default value if the total amount is invalid
}

const apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5500' // For local development
    : 'https://webapllication.onrender.com'; // For production

// Button click event to call the API
button.addEventListener("click", () => {
    fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
        },
        body: JSON.stringify({
            items: yourItemsData, 
            amount: yourTotalAmount,
        }),
        credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(data => {
        // Handle success
        if (data.url) {
            window.location.href = data.url; // Redirect to Stripe Checkout
        } else {
            console.error('No URL returned from server');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
