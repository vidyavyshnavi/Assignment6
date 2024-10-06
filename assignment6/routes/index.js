const express = require('express');
const path = require('path');
const router = express.Router();

// Route to serve the index page
router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '../views/index')); // Adjust the path to where your index.html is located
});
router.post('/register', (req, res, ) => {
    res.render('register'); // This will look for register.pug in the views directory
});

module.exports = router;
