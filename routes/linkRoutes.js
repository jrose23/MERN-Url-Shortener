const express = require('express');
const router = express.Router();
const { createLink, createCustomLink, getLongUrl } = require('../controllers/linkController');

// Creat default short link
router.post('/', createLink);

// Creat custom short link
router.post('/custom', createCustomLink);

// Get long link
router.get('/:shortUrl', getLongUrl);

module.exports = router;
