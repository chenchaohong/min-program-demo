
import RSA from './wxapp_rsa'

// var privateKey = '-----BEGIN RSA PRIVATE KEY-----MIIBOwIBAAJBAJpkOZ/BbuBik9JI7D+npNayc6pZ3gXMq/8j3kewO9y96r6yIFTKneCv+nxCHBQm5ZM81cV9Asy44RQGYbimzXkCAwEAAQJBAIUxFa1GmLqnEFOHaZh4rfIyPSqnIKzsJy2S6f36gYoqSanBWEmZH70eHP6F/LH3CVgyZFDYpamdovRRalbDmMkCIQDqLjGbIInj4afEESXUIr0TWtgnpH/LgRu7HSS9jc2udwIhAKjG3BodRZC8lLRh6hHhOQNjVArRqh39+y6FuhBwOa+PAiB2MGIw3Lc7H8RAHDdvXSj3/71gJJGq77pDMW49jLfl+QIgJWX7O6Yk1g+Te+z+avvXIFMQOl1/Lqoq0II9WosjnS0CIQC9ipDEiOsfoytTTK5bdbORDFRgcbKDVCVVOz5yTyPeLQ==-----END RSA PRIVATE KEY-----'
// var publicKey = '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJpkOZ/BbuBik9JI7D+npNayc6pZ3gXMq/8j3kewO9y96r6yIFTKneCv+nxCHBQm5ZM81cV9Asy44RQGYbimzXkCAwEAAQ==-----END PUBLIC KEY-----'
var publicKey = '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK661JxEl46iP9a7QPBFX4byOGwxABXGHryM0hQLZn8a0198ge7T8Qpxc8yiPHmoP4sNg0AX0IDMb6QyvQXGwb0CAwEAAQ==-----END PUBLIC KEY-----'
var privateKey = ''

/**
 * rsa加密 加密字段长度不大于117
 * @param {Object} text
 */
export function rsaEncrypt (text) {
    var encryptRsa = new RSA.RSAKey()
    encryptRsa = RSA.KEYUTIL.getKey(publicKey)
    var encStr = encryptRsa.encrypt(text)
    encStr = RSA.hex2b64(encStr)
    return encStr
}

/**
 * rsa解密
 * @param {Object} text
 */
export function rsaDecrypt (text) {
    var decryptRsa = new RSA.RSAKey()
    decryptRsa = RSA.KEYUTIL.getKey(privateKey)
    text = RSA.b64tohex(text)
    var decStr = decryptRsa.decrypt(text)
    return decStr
}

/**
 * rsa加签
 * @param {Object} text
 */
export function signRsa (text) {
    let signRsa = new RSA.RSAKey()
    signRsa = RSA.KEYUTIL.getKey(privateKey)
    var hashAlg = 'sha1'
    var hSig = signRsa.signString("signData", hashAlg)
    hSig = RSA.hex2b64(hSig) // hex 转 b64
    return hSig
}

/**
 * rsa验签
 * @param {Object} text
 */
export function verifyRsa (text) {
    var verifyRsa = new RSA.RSAKey()
    verifyRsa = RSA.KEYUTIL.getKey(publicKey)
    text = RSA.b64tohex(text)
    var ver = verifyRsa.verifyString("signData", text)
    return ver
}
