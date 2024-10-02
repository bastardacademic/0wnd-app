const crypto = require('crypto');

// Encryption function for sensitive data
function encryptData(data) {
    const algorithm = 'aes-256-ctr';
    const secretKey = process.env.ENCRYPTION_KEY;
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encryptedData.toString('hex')
    };
}

module.exports = { encryptData };
