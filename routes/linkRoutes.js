const express = require('express');
const router = express.Router();
const {
    createShortLink,
    createCustomShortLink,
    getLongUrl,
    getShortLinkQrCode
} = require('../controllers/linkController');

// Creat default short link
router.post('/', createShortLink);

// Creat custom short link
router.post('/custom', createCustomShortLink);

// Get long url from short link
router.get('/:shortUrl', getLongUrl);

// Get QR code for short link
router.get('/:shortUrl/qr', getShortLinkQrCode);

module.exports = router;
