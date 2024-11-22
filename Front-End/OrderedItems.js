// OrderedItems.js

// Retrieve total from local storage
const cartTotal = localStorage.getItem('cartTotal') || '0';

// Retrieve order items from local storage
const orderItemsString = localStorage.getItem('cartItems');
const orderItems = orderItemsString ? JSON.parse(orderItemsString) : [];

console.log('orderItems:', orderItems);
console.log('cartTotal:', cartTotal);

const orderedItemsContainer = document.getElementById('orderedItemsContainer');

if (orderItems.length > 0) {
    orderItems.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.innerHTML = `<h2 class="item">${item}</h2>`;
        orderedItemsContainer.appendChild(itemElement);
    });

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

const totalAmount = document.getElementById('cartTotal');
totalAmount.textContent = `Pay ₹${cartTotal}`;

// Function to enable the Google Pay button
const button = document.querySelector("button")
// ...

// ...

// OrderedItems.js

// ... (previous code)

button.addEventListener("click", () => {
    fetch("https://webapllication.onrender.com/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: orderItems.map(item => ({ itemName: item, quantity: 1 })),
            amount:cartTotal
        }),
    })
    .then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json));
    })
    .then(({ url }) => {
        window.location = url;
    })
    .catch(e => {
        console.error(e.error);
    });
});
