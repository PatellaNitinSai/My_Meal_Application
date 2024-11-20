let items = []

function addItems()
{
let itemName = document.getElementById('itemName').value;
let itemDescription = document.getElementById('itemDescription').value
let itemPrice = document.getElementById('itemPrice').value;

var newItem = {
    name: itemName,
    description: itemDescription,
    price: itemPrice
};
items.push(newItem);
}

function showItems() {
    var cartContainer = document.getElementById("cartContainer");
    cartContainer.innerHTML = ''; // Clear existing content

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var newItemElement = document.createElement("div");
        newItemElement.className = 'item';
        newItemElement.innerHTML = `<h4>${item.name}</h4><p>${item.description}</p><p>${item.price}</p>`;

        cartContainer.appendChild(newItemElement);
    }
}
