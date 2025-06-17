# User Registration Endpoint

## URL
`/users/register`

## Method
`POST`

## Request Data
- **fullname**: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- **email**: A valid email address (string, required, minimum 5 characters)
- **password**: A string with a minimum of 6 characters (required)

## Description
This endpoint registers a new user. It validates the input data using express-validator. Upon successful validation:
- The password is hashed.
- A new user is created.
- A JWT token is generated.

## Responses

### Success
- **Status Code:** 201
- **Body:**
  ```json
  {
    "message": "User registered successfully",
    "user": { "id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "..." },
    "token": "..."
  }
  ```

### Validation Error
- **Status Code:** 400
- **Body:**
  ```json
  {
    "errors": [ { "msg": "...", "param": "...", ... } ]
  }
  ```
  
> Note: Other errors may return different status codes depending on the failure point.
