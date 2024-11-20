const MenuButton = document.getElementById('VegMenu');
const Name = document.getElementById('Name');
const ItemPrice = document.getElementById('price');
const ItemDescription = document.getElementById('description');

MenuButton.addEventListener('click', async () => {
    const itemName = Name.value;
    const description = ItemDescription.value;
    const price = ItemPrice.value;

    try {
        const newItem = new Item({
            itemName,
            description,
            price
        });

        // Assuming you have some logic to handle saving on the frontend
        // e.g., calling an API or performing some other action
        // For simplicity, let's just log the item for now
        console.log(newItem);

        // You can add more logic here based on your requirements

    } catch (error) {
        console.error(error);
        // Handle errors if necessary
    }
});
