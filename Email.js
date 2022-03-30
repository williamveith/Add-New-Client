/**
 * Sends a confirmation to the form submitter. If user is already registered, the user is informed
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} inputs - Form inputs structured as an object where the form question is the key and the answer is the value
 * @param {string} userType - Appropriate email template filename
 */
function sendConfirmationEmail(inputs, userType) {
  const emailBody = createEmailBody(inputs, userType);
  sendEmail(inputs["Email Address"], emailBody);
  return;
}

/**
 * Creates the email body from an HTML template
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} inputs - Form inputs structured as an object where the form question is the key and the answer is the value
 * @param {string} userType - Appropriate email template filename
 * @return {object} HtmlOutput object https://developers.google.com/apps-script/reference/html/html-output
 */
function createEmailBody(inputs, userType) {
  let htmlTemplate = HtmlService.createTemplateFromFile(userType);
  htmlTemplate.inputs = inputs;
  return htmlTemplate.evaluate().getContent();
}

/**
 * Sends the confirmation email to the user
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {string} recipient - User email address from inputs
 * @param {object} emailBody - HtmlOutput object https://developers.google.com/apps-script/reference/html/html-output
 */
function sendEmail(recipient, emailBody) {
  const subject = "Confirmation: UT MRC Equipment Access User Authorization Form Received";
  const displayName = "Lab Access Automated Message";
  const ccRecipient = ""; // ccRecipient redacted for privacy reasons
  const aliases = GmailApp.getAliases();
  GmailApp.sendEmail(recipient, subject, "", {
    name: displayName,
    cc: ccRecipient,
    from: aliases[0],
    htmlBody: emailBody
  });
  return;
}