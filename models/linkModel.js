const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema(
    {
        longUrl: {
            type: String,
            required: true
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true
        },
        qrCode: {
            type: String
        },
        views: {
            type: Number
        }
    },
    { timestamps: true }
);

linkSchema.pre('save', async function (next) {
    // Strip "https://www." from long url
    const formattedLongUrl = this.longUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/, '');
    this.longUrl = formattedLongUrl;

    next();
});

module.exports = mongoose.model('Link', linkSchema);
