const dataModel = require('../models/itemModel');

async function showData(req, res) {
    try {
        const data = await dataModel.find({}, 'itemName description price category');
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = showData;
