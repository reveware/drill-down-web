<!--- Title: the ticket name, otherwise one line in the imperative. -->

## Description

<!---
An action in the imperative, then its effects as bullets. Concise description of what changes for the app or user flows
Ex-
Add password reset:
- a user who forgets their password requests a link by email and sets a new one
- a link works once and expires after an hour
-->

### Components

<!---
(when adding or changing components)
Short sentences on what changed, along a table of the components touched.

| component | change |
| --- | --- |
| LoginForm | gains a Forgot password link |
| ForgotPasswordForm | new, asks for the email and shows the sent state |
| ResetPasswordForm | new, sets the password or shows the expired message |
-->

### Screens

<!---
(when adding or changing a route)
One bullet per route touched: the path, then what the user does there.

- /forgot-password: enter the email, then see that a link was sent
- /reset-password/:token: set the new password; an expired link says so
-->

## Motivation

<!---
One or two sentences: the problem, then the goal.

A user who forgets their password is locked out until someone resets it by hand, so they get a
way back in on their own.
-->

## Testing

<!---
Numbered steps a user takes in the UI, then what they should see on its own line.

1. On the login page choose Forgot password and enter your email
2. Open the link from the email and set a new password
The login page accepts the new password, and the link opened a second time says it has expired.
-->
