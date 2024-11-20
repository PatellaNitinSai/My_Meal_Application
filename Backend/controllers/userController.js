const user = require('../models/user');
const asyncHandler = require('express-async-handler');

const person = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Assuming you have a mongoose model named 'User'
    const newUser = new user({
      username,
      password,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = person;
