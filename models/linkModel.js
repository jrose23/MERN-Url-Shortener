const mongoose = require('mongoose');
const QRcode = require('qrcode');

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
        }
    },
    { timestamps: true }
);

linkSchema.pre('save', async function (next) {
    // Strip https://www. from long url
    const formattedLongUrl = this.longUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
    this.longUrl = formattedLongUrl;

    // Generate QR Code
    const qr = await QRcode.toDataURL(`http://localhost:5000/api/links/${this.shortUrl}`);
    this.qrCode = qr;

    next();
});

module.exports = mongoose.model('Link', linkSchema);
