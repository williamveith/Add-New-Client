/**
 * Main function that is triggered when the form is submitted.
 * It extracts the submitted form data, modifies it, then creates a calendar event with the form data
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} e - FormResponse https://developers.google.com/apps-script/reference/forms/form-response
 */
function onNewUserAuthorizationFormSubmit(e) {
  let inputs = toResponsesObj(e.response);
  const users = loadJson();
  FormApp.openById(getProperties("formId")).deleteAllResponses();
  const id = strToMD5HexStr(inputs['UT EID']);
  if (userExists(users, id)) {
    sendConfirmationEmail(inputs, "Existing User");
    Logger.log("This user already existed.");
    return;
  };
  inputs["Calendar Event Id"] = createCalendarEvent(inputs);
  sendConfirmationEmail(inputs, "New User");
  users[id] = createRecord(inputs);
  setJsonFileContent(users);
  Logger.log("A new user applied for an account");
  return;
}

/**
 * Checks if a user id has already been used to create an account
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} users - Object containing records of all existing users
 * @param {string} id - User EID
 * @return {boolean} Does user already exist
 */
function userExists(users, id) {
  return Boolean(users[id]);
}

/**
 * Turns Object[] itemResponses into Object inputs
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object[]} itemResponses - itemResponse https://developers.google.com/apps-script/reference/forms/item-response
 * @return {object} Form inputs structured as an object where the form question is the key and the answer is the value
 */
function toResponsesObj(response) {
  const itemResponses = response.getItemResponses()
  let inputs = {};
  for (let itemResponse of itemResponses) {
    inputs[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
  };
  // Fix user input formatting issues
  inputs["First Name"] = correctCapitalization(inputs["First Name"]);
  inputs["Last Name"] = correctCapitalization(inputs["Last Name"]);
  inputs["UT EID"] = correctCapitalization(inputs["UT EID"], "UT EID");
  inputs["Email Address"] = correctCapitalization(inputs["Email Address"], "Email");
  // Create Username
  inputs["Username"] = inputs["First Name"] + "_" + inputs["Last Name"];
  inputs["Name"] = inputs["First Name"] + " " + inputs["Last Name"];
  if (inputs["Username"].length > 25) {
    inputs["Username"] = inputs["UT EID"];
  };
  return inputs;
}

/**
 * Formats string so it has the right capitalization for the given type
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} string - String to be formatted 
 * @param {string} [type="Name"] - String format type Name, Email, UT EID
 * @return {string} Formatted string or original string if Error
 */
function correctCapitalization(string, type = "Name") {
  try {
    switch (type) {
      case "Name":
        const lowercase = string.slice(1).toLowerCase();
        return string.charAt(0).toUpperCase() + lowercase;
      case "Email":
        return string.toLowerCase();
      case "UT EID":
        return string.toLowerCase();
    }
  } catch {
    Logger.log("Error in function correctCapitalization(). String is: " + string);
    return string;
  }
}