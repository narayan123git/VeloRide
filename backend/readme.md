# User Registration, Login, Profile & Logout Endpoints

## User Registration Endpoint

### URL
`/users/register`

### Method
`POST`

### Request Data
- **fullname**: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, optional, minimum 3 characters)
- **email**: A valid email address (string, required, minimum 5 characters)
- **password**: A string with a minimum of 6 characters (required)

### Description
This endpoint registers a new user. It validates the input data using express-validator. Upon successful validation:
- The password is hashed.
- A new user is created.
- A JWT token is generated.

### Responses

#### Success
- **Status Code:** 201
- **Body:**
  ```json
  {
    "message": "User registered successfully",
    "user": { "id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "..." },
    "token": "..."
  }
  ```

#### Validation Error
- **Status Code:** 400
- **Body:**
  ```json
  {
    "errors": [ { "msg": "...", "param": "...", ... } ]
  }
  ```
  
> Note: Other errors may return different status codes depending on the failure point.

## User Login Endpoint

### URL
`/users/login`

### Method
`POST`

### Request Data
- **email**: A valid email address (string, required)
- **password**: A string with a minimum of 6 characters (required)

### Description
This endpoint logs in an existing user by verifying credentials using express-validator. Upon successful verification:
- A JWT token is generated for the session.

### Responses

#### Success
- **Status Code:** 200
- **Body:**
  ```json
  {
    "message": "User login successful",
    "user": { "id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "..." },
    "token": "..."
  }
  ```

#### Validation Error or Incorrect Credentials
- **Status Code:** 400 or 401
- **Body:**
  ```json
  {
    "errors": [ { "msg": "...", "param": "...", ... } ]
  }
  ```

## User Profile Endpoint

### URL
`/users/profile`

### Method
`GET`

### Authentication
This endpoint requires authentication through a valid JWT token passed via headers or cookies.

### Description
This endpoint retrieves the profile information of the authenticated user.

### Responses

#### Success
- **Status Code:** 200
- **Body:**
  ```json
  {
    "message": "User profile fetched successfully",
    "user": { "id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "..." }
  }
  ```

#### Error
- **Status Code:** 401
- **Body:**
  ```json
  {
    "message": "Unauthorized or invalid token"
  }
  ```

## User Logout Endpoint

### URL
`/users/logout`

### Method
`GET`

### Authentication
This endpoint requires authentication through a valid JWT token passed via headers or cookies.

### Description
This endpoint logs out the user by clearing the authentication cookie and blacklisting the JWT token.

### Responses

#### Success
- **Status Code:** 200
- **Body:**
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

#### Error
- **Status Code:** 400
- **Body:**
  ```json
  {
    "message": "No token provided"
  }
  ```

# Captain Endpoints

## Captain Registration Endpoint

### URL
`/captain/register`

### Method
`POST`

### Request Data
- **fullname**: An object containing:
  - `firstname` (string, required, minimum 3 characters)
  - `lastname` (string, required, minimum 3 characters)
- **email**: A valid email address (string, required)
- **password**: A string with a minimum of 6 characters (required)
- **vehicle**: An object containing:
  - `color` (string, required, minimum 3 characters)
  - `plate` (string, required, alphanumeric up to 10 characters)
  - `capacity` (number, required, minimum 1)
  - `vehicleType` (string, required, one of: car, bike, truck, van)

### Description
This endpoint registers a new captain. It validates the input data using express-validator.
Upon successful validation:
- The password is hashed.
- A new captain is created.
- A JWT token is generated.

### Responses

#### Success
- **Status Code:** 201
- **Body:**
  ```json
  {
    "message": "Captain registered successfully",
    "captain": { "id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "...", "vehicle": { "color": "...", "plate": "...", "capacity": 1, "vehicleType": "car" } },
    "token": "..."
  }
  ```

#### Validation Error
- **Status Code:** 400
- **Body:**
  ```json
  {
    "errors": [ { "msg": "...", "param": "...", ... } ]
  }
  ```

#### Duplicate Email Error
- **Status Code:** 400
- **Body:**
  ```json
  {
    "message": "Captain with this email already exists"
  }
  ```

#### Internal Server Error
- **Status Code:** 500
- **Body:**
  ```json
  {
    "message": "Internal server error"
  }
  ```

---

## Captain Login Endpoint

### URL
`/captain/login`

### Method
`POST`

### Request Data
- **email**: A valid email address (string, required)
- **password**: A string with a minimum of 6 characters (required)

### Description
This endpoint logs in an existing captain by verifying credentials using express-validator. Upon successful verification:
- A JWT token is generated for the session.

### Responses

#### Success
- **Status Code:** 200
- **Body:**
  ```json
  {
    "message": "Captain logged in successfully",
    "captain": { "id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "...", "vehicle": { "color": "...", "plate": "...", "capacity": 1, "vehicleType": "car" } },
    "token": "..."
  }
  ```

#### Validation Error or Incorrect Credentials
- **Status Code:** 400 or 401
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## Captain Profile Endpoint

### URL
`/captain/profile`

### Method
`GET`

### Authentication
Requires a valid JWT token in headers or cookies.

### Description
Retrieves the profile information of the authenticated captain.

### Responses

#### Success
- **Status Code:** 200
- **Body:**
  ```json
  {
    "message": "Captain profile retrieved successfully",
    "captain": { "id": "...", "fullname": { "firstname": "...", "lastname": "..." }, "email": "...", "vehicle": { "color": "...", "plate": "...", "capacity": 1, "vehicleType": "car" } }
  }
  ```

#### Error
- **Status Code:** 401
- **Body:**
  ```json
  {
    "message": "Unauthorized or invalid token"
  }
  ```

---

## Captain Logout Endpoint

### URL
`/captain/logout`

### Method
`GET`

### Authentication
Requires a valid JWT token in headers or cookies.

### Description
Logs out the captain by clearing authentication cookies and blacklisting the JWT token.

### Responses

#### Success
- **Status Code:** 200
- **Body:**
  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

#### Error
- **Status Code:** 400
- **Body:**
  ```json
  {
    "message": "No token provided"
  }
  ```