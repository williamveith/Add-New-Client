# Add-New-Client

This is a new Client Registration System created in [Google App Scripts](https://developers.google.com/apps-script).

1. The system is monitored, maintained, hosted, and run, for free, on a standard Google Account
2. Everything is JavaScript and JSON, which simplifies the tech stack
3. Google services are used to access data and external systems

   - [Google Calendar](https://developers.google.com/apps-script/reference/calendar)
   - [Drive](https://developers.google.com/apps-script/reference/drive)
   - [Gmail](https://developers.google.com/apps-script/reference/gmail)
   - [Forms](https://developers.google.com/apps-script/reference/forms)

## Front End

- [**Registration-Form.html**](./frontend/Registration-Form.html) Google Form with regex response validation and [on form submit script trigger](https://ctrlq.org/google.apps.script/docs/guides/triggers/events.html)

## Back End

- [**main.js**](./backend/main.js) Function onNewUserAuthorizationFormSubmit(e) catches and processes form responses on form submit
- [**History.js**](./backend/History.js) An encrypted JSON Document Database stored in Google Drive contains a record of all registered users
- [**Transparent Encryption.js**](./backend/Transparent%20Encryption.js) Serves as an interface between the code and the encrypted data. Records are decrypted and encrypted automatically when records are retrieved or saved
- [**Cryptography.js**](./backend/Cryptography.js) Cryptographic primitives from crypto-js used for the encryption and decryption protocol
- [**Hex String Generator.js**](./backend/Hex%20String%20Generator.js) Hashes user information and creates keys
- [**Email.js**](./backend/Email.js) The form response is hashed, the hash is checked against the database of registered users, and a followup email is sent to the user
- [**Existing User.html**](./backend/Existing%20User.html) If the user is already registered, this template generates an email informing the user they already have an account
- [**New User.html**](./backend/New%20User.html) If the user is not registered this template generates an email confirming registration
- [**Calendar.js**](./backend/Calendar.js) New user account information is added to a Google Calendar Event so Facility Admins can finish the user registration
- [**Calendar Description.html**](./backend/Calendar%20Description.html) This template formats new user information added to the Google Calendar Event so it is more readable

## Outputs

- [**Email: Registration Confirmed**](./outputs/registration-confirmation.pdf)
- [**Email: Account Already Exists**](./outputs/account-already-exists.pdf)
- [**Calendar Event: Admin Account**](./outputs/calendar-event.pdf)
- [**Database: Google Drive Storage**](./outputs/database-storage.pdf)
