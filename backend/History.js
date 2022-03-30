/**
 * Sets a new script property key/value pair
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} key - Key for a script property object property
 * @param {string} value - New value for a script property object property
 */
function setProperties(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, value);
  return;
}

/**
 * Initializes or Re-initialized the script properties 
 * @author William Veith <williamveith+linkedin@gmail.com>
 */
function reinitializeScriptPropertiesForThisProgram() {
  deleteScriptProperties(undefined, true)
  // Redacted property values for security reasons 
  setProperties("formId", "");
  setProperties("fileId", "");
  setProperties("keyIvFileId", "");
  Logger.log("All script properties for New User Authorization were reinitialized");
  return;
}

/**
 * Deletes one or all of the script properties
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} [key=null] - Key for a script property object property
 * @param {boolean} [deleteAll=false] - Delete all script properties
 */
function deleteScriptProperties(key = null, deleteAll = false) {
  if (key === null && deleteAll) {
    PropertiesService.getScriptProperties().deleteAllProperties();
    Logger.log("All Script Properties from New User Authorization deleted");
    return;
  }
  PropertiesService.getScriptProperties().deleteProperty(key);
  Logger.log("Script property from New User Authorization Deleted. Key: " + key);
  return;
}

/**
 * Returns the value of a given script property property
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} [key=null] - Key for a script property object property
 * @return {string} Value of the script property object property 
 */
function getProperties(key = null) {
  if (key === null) {
    return PropertiesService.getScriptProperties().getKeys();
  }
  return PropertiesService.getScriptProperties().getProperty(key);
}

/**
 * Returns an object containing all registered users
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @return {object} Contains all registered users
 */
function loadJson() {
  return decryptFromFile();
}

/**
 * Updates the record of all registered users
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} content - Contains all registered users
 */
function setJsonFileContent(content) {
  saveAsEncrypted(JSON.stringify(content));
  return;
}

/**
 * Creates an object containing the newly registered users data. This object is added to the record of all registered users
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} inputs - Form inputs object. Key is question on form
 * @return {object} Object containing the newly registered users data
 */
function createRecord(inputs) {
  return {
    timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('en-GB'),
    calendarid: inputs["Calendar Event Id"],
    firstname: inputs['First Name'],
    lastname: inputs['Last Name'],
    alreadyuser: inputs['Are you currently a lab access user?'],
    password: inputs['Password'],
    phone: inputs['Phone Number'],
    email: inputs['Email Address'],
    boss: inputs['Professor/Company'],
    eid: inputs['UT EID']
  }
}

/**
 * Modifies the user object stored in the object of all registered users
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} id - The key for the user record property
 * @param {string} editProperty - The key for the user property to be changed
 * @param {string} newValue - The new value of the user property
 */
function modifyRecord(id, editProperty, newValue) {
  let users = loadJson();
  users[id][editProperty] = newValue;
  setJsonFileContent(users);
  return;
}