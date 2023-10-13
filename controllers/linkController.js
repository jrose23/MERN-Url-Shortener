const asyncHandler = require('express-async-handler');
const Link = require('../models/linkModel');
const ShortUniqueId = require('short-unique-id');
const QRcode = require('qrcode');

// @desc    Create new Link
// @route   POST /api/links/
// @access  Private
const createShortLink = asyncHandler(async (req, res) => {
    const { longUrl } = req.body;

    const uid = new ShortUniqueId({ length: 6 });
    const shortUrl = uid.rnd();

    const qrCode = await QRcode.toDataURL(`http://localhost:5000/api/links/${shortUrl}`);

    const shortLink = await Link.create({ longUrl, shortUrl, qrCode });

    if (!shortLink) {
        res.status(500);
        throw new Error('Something went wrong...');
    }

    res.status(200).json(shortLink);
});

// @desc    Create new custom Link
// @route   POST /api/links/custom
// @access  Private
const createCustomShortLink = asyncHandler(async (req, res) => {
    const { longUrl, customShortLink } = req.body;

    const qrCode = await QRcode.toDataURL(`http://localhost:5000/api/links/${customShortLink}`);

    const shortLink = await Link.create({ longUrl, shortUrl: customShortLink, qrCode });

    if (!shortLink) {
        res.status(500);
        throw new Error('Something went wrong...');
    }

    res.status(200).json(shortLink);
});

// @desc    Get long url
// @route   GET /api/links/:shortUrl
// @access  Public
const getLongUrl = asyncHandler(async (req, res) => {
    const { shortUrl } = req.params;

    const link = await Link.findOne({ shortUrl });

    if (!link) {
        res.status(404);
        throw new Error('Link not found');
    }

    res.redirect(`http://${link.longUrl}`);
});

module.exports = { createShortLink, createCustomShortLink, getLongUrl };
