const Item = require('../models/itemModel');
const asyncHandler = require('express-async-handler');

const vegMenu = asyncHandler(async (req, res, next) => {
    const { itemName, description, price, category, imageUrl } = req.body;

    try {
        const newItem = new Item({
            itemName,
            description,
            price,
            category,
            image: imageUrl 
        });

        await newItem.save();
        res.status(201).json({ success: true, message: 'Item added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});



module.exports = {
    vegMenu
};
