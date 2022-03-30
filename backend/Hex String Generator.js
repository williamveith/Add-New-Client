/**
 * Returns MD5 hash, as a hexadecimal string, of a string
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} str - The string to be hashed
 * @return {string} The hexadecimal hash of the input as a string
 */
function strToMD5HexStr(str) {
  let byteArray = new Uint8Array(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, str))
  let hexStr = byteArrayToHexStr(byteArray);
  return hexStr;
}

/**
 * Converts a byte array to hexidecimal, then returns it as a string
 * @author: Frxstrem from Stack Overflow
 * @param {object[]} byteArray - The byte array to be converted
 * @return {string} The byte array expressed as a hexidecimal string
 */
function byteArrayToHexStr(byteArray) {
  return Array.prototype.map.call(byteArray, function (byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}