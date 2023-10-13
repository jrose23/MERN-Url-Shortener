const express = require('express');
const router = express.Router();
const {
    createShortLink,
    createCustomShortLink,
    getLongUrl
} = require('../controllers/linkController');

// Creat default short link
router.post('/', createShortLink);

// Creat custom short link
router.post('/custom', createCustomShortLink);

// Get long link
router.get('/:shortUrl', getLongUrl);

module.exports = router;
