const asyncHandler = require('express-async-handler');
const ShortUniqueId = require('short-unique-id');
const Link = require('../models/linkModel');

// @desc    Create new Link
// @route   POST /api/links/
// @access  Private
const createLink = asyncHandler(async (req, res) => {
    const { longUrl } = req.body;

    const uid = new ShortUniqueId({ length: 6 });
    const shortUrl = uid.rnd();

    const shortLink = await Link.create({ longUrl, shortUrl });

    if (!shortLink) {
        res.status(500);
        throw new Error('Something went wrong...');
    }

    res.status(200).json(shortLink);
});

// @desc    Create new custom Link
// @route   POST /api/links/custom
// @access  Private
const createCustomLink = asyncHandler(async (req, res) => {
    const { longUrl, customShortLink } = req.body;

    const shortLink = await Link.create({ longUrl, shortUrl: customShortLink });

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

module.exports = { createLink, createCustomLink, getLongUrl };
