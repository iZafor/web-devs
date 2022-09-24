const QRReader = require('qrcode-reader');
const fs = require('fs');
const jimp = require('jimp');

exports.extractText = async function (fileLocation) {
    const img = await jimp.read(fs.readFileSync(fileLocation));

    const qr = new QRReader();

    const value = await new Promise((resolve, reject) => {
        qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
        qr.decode(img.bitmap);
    });

    await fs.unlink(fileLocation, (err) => {
        if (!err) {
            console.log(`Deleted file path: ${fileLocation}`)
        }
    });

    return value.result;
};