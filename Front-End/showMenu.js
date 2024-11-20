// client.js
const fetchMenuButton = document.getElementById('fetchMenuButton');
const menuList = document.getElementById('menuList');

fetchMenuButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/menu/veg/itemNames'); // Assuming your server is running on the same domain
    const data = await response.json();

    // Assuming data is an array of menu items
    menuList.innerHTML = data.map(item => `<li>${item.itemName} - ₹ ${item.price}</li>`).join('');

    // Get the item names and append to the name label
    const names = data.map(item => item.itemName).join(', ');
    const name = document.createElement('label');
    name.textContent = `Item Names: ${names}`;
    document.body.appendChild(name);

  } catch (error) {
    console.error('Error fetching menu:', error);
    // Handle error appropriately, e.g., display an error message to the user
  }
});
