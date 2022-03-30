# Add-New-Client

This is new Client registration system. The system has several benefits:

1. Code editing and testing is done on a free Google Account IDE
2. Event triggers cause the program to run, for free, on Google Cloud
3. Program databases are stored in a free Google Account as a JSON Document Database

## Front End

- [**Registration-Form.html**](./frontend/Registration-Form.html) Google Form with Regex response validation and script triggers on form submit

## Back End

- [**main.js**](./backend/main.js) Function onNewUserAuthorizationFormSubmit(e) runs when a form is submitted and catches the form response. The response is then processed
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
