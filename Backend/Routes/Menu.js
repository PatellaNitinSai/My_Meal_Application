const express = require('express');
const router = express.Router();
const menuController = require('../controllers/MenuController')
const dataController = require('../controllers/showData')
router.post('/veg',menuController.vegMenu)
router.get('/showVeg',dataController);
router.get('/non-veg',(req,res)=>{
    res.send("This is non-veg Menu")
})
  
module.exports = router;