function addItems(){
    let itemName = document.getElementById('ItemName');
    let itemDescription = document.getElementById('description');
    let itemPrice = document.getElementById('ItemPrice');
    var newItem = document.createElement("div");
    newItem.className = "menu-item";
    newItem.innerHTML = `<strong>${itemName}</strong><p>${itemDescription}</p><p>Price: $${itemPrice}</p>`;

    document.getElementById("menuList").appendChild(newItem);
    document.getElementById("addItemForm").reset();
}