const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [{ name: 'commonName', value: 'localhost' }];
const options = { days: 365 };

const pems = selfsigned.generate(attrs, options);

// Save the private key and certificate
fs.writeFileSync('key.pem', pems.private);
fs.writeFileSync('cert.pem', pems.cert);

console.log('Self-signed certificate generated!');
