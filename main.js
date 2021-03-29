const fs = require('fs');
const JWSCertificate = require('./greencertificate');

const jsonToEncode = fs.readFileSync('./test_data/input_data.json', {encoding:'utf8', flag:'r'});
const privateKey = fs.readFileSync('./test_keys/key.pem', {encoding:'utf8', flag:'r'});
const publicKey = fs.readFileSync('./test_keys/public.pem', {encoding:'utf8', flag:'r'});

const jwsCertificate = new JWSCertificate();

const main = async () => {
  var signature = await jwsCertificate.sign(privateKey, jsonToEncode);
  console.log(signature);
  var obj = await jwsCertificate.verify(publicKey, signature);
  console.log(obj.payload);
  console.log(obj.verified);
}

main();