# Nodejs challenge

Completed the send letter to Santa challenge following the guidelines, used ethereal email.
User info from given JSON files are used to validate the username & age.

# Validation

- Validated username & wish input using HTML, client.js, user.js, server.js
- Validated user's age using moment.js

# Error & Success

- Unregistered users will receive invalid-user error message
- Older than 10 users will receive invalid-age error message
- User with valid registration & 10 years old/ below will receive valid-user message
# Work done

Front End

- form validation & character count on client.js
- css change on style.css
- error & success messages in HTML added under views folder

Back End

- installed nodemailer, moment, axios
- able to fetch user info from user.js
- added sendEmail.js for sending emails
- stored credentials on .env

# Improvement

- jest testing
