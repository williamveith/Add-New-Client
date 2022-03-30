/**
 * Saves record of all registered users in an encrypted form
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} newData - Updated record of all registered users
 * @param {string} datafileId - File Id of the record registered users record file
 */
function saveAsEncrypted(newData, datafileId = PropertiesService.getScriptProperties().getProperty("fileId")) {
  const encrypted = encryptData(newData);
  DriveApp.getFileById(datafileId).setContent(JSON.stringify(encrypted[0]));
  DriveApp.getFileById(PropertiesService.getScriptProperties().getProperty("keyIvFileId")).setContent(JSON.stringify(encrypted[1]));
}

/**
 * Encrypts cleartext data
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} plainTextData - All registered user data to be encrypted
 * @returns {string} Encrypted record of all registered users
 */
function encryptData(plainTextData) {
  const key = CryptoJS.lib.WordArray.random(16);
  const iv = CryptoJS.lib.WordArray.random(16);
  const JsonFormatter = {
    stringify: function (cipherParams) {
      const jsonObj = [
        {
          ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
        },
        {
          iv: cipherParams.iv.toString(),
          key: cipherParams.key.toString()
        }]
      return jsonObj;
    }
  };
  const encrypted = CryptoJS.AES.encrypt(plainTextData, key, { iv: iv, format: JsonFormatter });
  return JsonFormatter.stringify(encrypted);
}

/**
 * Retrieves the encrypted record of all registered users
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} dataFileId - File id for the encrypted record of all users
 * @param {string} keyIvFileId - File id for the current encryption key file
 * @returns {object} A record of all registered users
 */
function decryptFromFile(dataFileId = PropertiesService.getScriptProperties().getProperty("fileId"), keyIvFileId = PropertiesService.getScriptProperties().getProperty("keyIvFileId")) {
  const encryptedJson = DriveApp.getFileById(dataFileId).getBlob().getDataAsString();
  const keyJson = DriveApp.getFileById(keyIvFileId).getBlob().getDataAsString();
  return decryptedJson(encryptedJson, keyJson);
}

/**
 * Decrypts the encrypted record of all registered users
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} encryptedJson - The encrypted record of all registered users
 * @param {string} keyJson - Stringified key object used to encrypt current registered users record file
 * @returns {object} A record of all registered users
 */
function decryptedJson(encryptedJson, keyJson) {
  const JsonFormatter = {
    parse: function (jsonStr, keyStr) {
      const jsonObj = JSON.parse(jsonStr);
      const keyObj = JSON.parse(keyStr);
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct),
        key: CryptoJS.enc.Hex.parse(keyObj.key),
        iv: CryptoJS.enc.Hex.parse(keyObj.iv)
      });
      return cipherParams;
    }
  };
  const data = JsonFormatter.parse(encryptedJson, keyJson)
  const decrypted = CryptoJS.AES.decrypt(data, data.key, { iv: data.iv });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}