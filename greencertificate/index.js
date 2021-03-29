const jws = require('jws');
const fs = require('fs');



class JWSCertificate {
    sign(privateKey, payload) { 
      const promiseSign = new Promise( (resolutionFunc, rejectionFunc) => {
        jws.createSign({
            header: { alg: 'RS256' },
            privateKey: privateKey,
            payload: payload,
          }).on('done', function(signature) {
            resolutionFunc(signature);
          });
      });
      return promiseSign;
    }

    verify(publicKey, signature) {
      const promiseVerify = new Promise( (resolutionFunc, rejectionFunc) => {
        jws.createVerify({
          algorithm: 'RS256',
          publicKey: publicKey,
          signature: signature,
        }).on('done', function(verified, obj) {
          obj.verified = verified;
          resolutionFunc(obj)
        }).on('error', function(err) {
          rejectionFunc(new Error("Not a valid certificate"))
        });
      });
      return promiseVerify;
    }
}

module.exports = JWSCertificate;