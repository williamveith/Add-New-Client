/**
 * Modifies the calendar event day in accordance to the cutoff time for form submission
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} inputs - Form inputs object. Key is question on form
 * @return {string} Calendar event ID
 */
function createCalendarEvent(inputs) {
  let cutOff = {
    today: new Date(),
    hour: 12,
    minute: 0
  };
  toBusinessDays(cutOff);
  inputs["Account Activation"] = cutOff.eventEnd;
  let info = createHTMLEventDescription(inputs);
  let title = "Create Labaccess Account: " + inputs["Name"];
  return CalendarApp.createEvent(title, cutOff.eventStart, cutOff.eventEnd, { description: info }).addPopupReminder(30).getId()
}

/**
 * Modifies the day this event is scheduled so the event will be scheduled on a business day at 12:30PM
 * Regardless of when the form was submitted
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} cutOff - An object containing when the form has to be submitted by, to be scheduled that day
 * @param {Date} cutOff.today - The day the form was submitted
 * @param {number} cutOff.hour - The cutoff hour the form needs to be submitted by
 * @param {number} cutOff.minute - The cutoff minute the form needs to be submitted by
 */
function toBusinessDays(cutOff) {
  const missedCutOffTime = Boolean(cutOff.today.getHours() > cutOff.hour && cutOff.today.getMinutes() >= cutOff.minute);
  const missedCutOffDay = Boolean(cutOff.today.getDay() === 0 || cutOff.today.getDay() === 6)
  if (missedCutOffDay || missedCutOffTime) {
    switch (cutOff.today.getDay()) {
      case 1:
      case 2:
      case 3:
      case 4:
        cutOff.today.setDate(cutOff.today.getDate() + 1);
        break;
      case 0:
        cutOff.today.setDate(cutOff.today.getDate() + 1);
        break;
      case 5:
        cutOff.today.setDate(cutOff.today.getDate() + 3);
        break;
      case 6:
        cutOff.today.setDate(cutOff.today.getDate() + 2);
        break;
    };
  }
  cutOff.eventStart = new Date(cutOff.today.getFullYear(), cutOff.today.getMonth(), cutOff.today.getDate(), 12, 30, 0);
  cutOff.eventEnd = new Date(cutOff.today.getFullYear(), cutOff.today.getMonth(), cutOff.today.getDate(), 12, 45, 0);
  return;
}

/**
 * Creates HTML content from the inputs. The HTML content becomes the event description
 * @author William Veith <williamveith+linkedin@gmail.com>
 * @param {object} inputs - Form inputs object. Key is question on form
 * @return {object} HtmlOutput object https://developers.google.com/apps-script/reference/html/html-output
 */
function createHTMLEventDescription(inputs) {
  const userId = strToMD5HexStr(inputs['UT EID']);
  const emailInputs = inputs;
  // Redacted form endpoint value for security reasons 
  emailInputs["Account Created Link"] = "" + userId + "&submit=Submit";
  let htmlTemplate = HtmlService.createTemplateFromFile("Calendar Description");
  htmlTemplate.inputs = emailInputs;
  return htmlTemplate.evaluate().getContent();
}