# Backend API Documentation

## User Endpoints

### User Registration

**URL:** `/users/register`

**Method:** `POST`

**Request Body:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

**Description:** Registers a new user. Validates input, hashes password, creates user, returns JWT token.

**Responses:**

- `201 Created` on success
- `400 Bad Request` on validation error

---

### User Login

**URL:** `/users/login`

**Method:** `POST`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Description:** Logs in a user, validates credentials, returns JWT token.

**Responses:**

- `200 OK` on success
- `400/401` on validation or login failure

---

### User Profile

**URL:** `/users/profile`

**Method:** `GET`

**Auth Required:** ✅ (JWT)

**Description:** Returns authenticated user's profile.

**Responses:**

- `200 OK`
- `401 Unauthorized` if no valid token

---

### User Logout

**URL:** `/users/logout`

**Method:** `GET`

**Auth Required:** ✅ (JWT)

**Description:** Logs out user by clearing cookie and blacklisting token.

**Responses:**

- `200 OK` on success
- `400 Bad Request` on error

---

## Captain Endpoints

### Captain Registration

**URL:** `/captain/register`

**Method:** `POST`

**Request Body:**

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane@example.com",
  "password": "securepass",
  "vehicle": {
    "color": "red",
    "plate": "WB12A1234",
    "capacity": 4,
    "vehicleType": "auto"
  }
}
```

**Description:** Registers a captain. `vehicleType` must be one of: `car`, `bike`, `taxi`, `auto`.

**Responses:**

- `201 Created`
- `400 Bad Request` on validation/duplicate email
- `500 Internal Server Error`

---

### Captain Login

**URL:** `/captain/login`

**Method:** `POST`

**Request Body:** Same as user login.

**Description:** Logs in a captain, returns JWT.

**Responses:**

- `200 OK`
- `400/401` on failure

---

### Captain Profile

**URL:** `/captain/profile`

**Method:** `GET`

**Auth Required:** ✅

**Description:** Retrieves authenticated captain's profile.

**Responses:**

- `200 OK`
- `401 Unauthorized`

---

### Captain Logout

**URL:** `/captain/logout`

**Method:** `GET`

**Auth Required:** ✅

**Description:** Logs out captain.

**Responses:**

- `200 OK`
- `400 Bad Request`

---

## Location Endpoints

### Get Coordinates

**URL:** `/api/maps/get-coordinates`

**Method:** `GET`

**Query Params:** `address`

**Auth Required:** ✅

**Description:** Returns `{ lat, lon }` from LocationIQ.

**Responses:**

- `200 OK`
- `400/404` on error

---

### Get Distance and Time

**URL:** `/api/maps/get-distance-time`

**Method:** `GET`

**Query Params:** `origin`, `destination`

**Auth Required:** ✅

**Description:** Uses OpenRouteService and LocationIQ to return distance and duration.

**Responses:**

- `200 OK`: `{ distance_meters, duration_seconds }`
- `400/404` on error

---

### Get Suggestions

**URL:** `/api/maps/get-suggestions`

**Method:** `GET`

**Query Params:** `address`

**Auth Required:** ✅

**Description:** Returns address suggestions from LocationIQ.

**Responses:**

- `200 OK`: array of suggestions
- `400/404` on error

---

## Ride Endpoints

### Create Ride

**URL:** `/api/rides/create`

**Method:** `POST`

**Auth Required:** ✅

**Request Body:**

```json
{
  "pickup": "Barobisha, Jalpaiguri",
  "destination": "Coochbehar Industrial Park",
  "vehicleType": "auto"
}
```

**Description:**

- Creates a new ride
- Calculates fare based on vehicle type using OpenRouteService & LocationIQ
- Returns ride object with fare (OTP hidden)

**Responses:**

- `201 Created`
- `400 Bad Request` on validation error
- `500 Internal Server Error`

---

## WebSocket (Socket.IO) Events

### captain-online

**Payload:** `{ captainId, lat, lng }`

Registers a captain as online and updates their location.

---

### user-online

**Payload:** `{ userId }`

Registers a user as online.

---

### disconnect

Removes user/captain from online list.

---

## Dependencies

### Newly Added:

- `axios` – for external API requests
- `socket.io` – for real-time communication

---

## Features Summary

- 🚘 Captain vehicle types updated: `car`, `bike`, `taxi`, `auto`
- 📦 Real-time socket support (online status, ride notifications)
- 🧭 Location services: geocoding, routing, suggestions
- 💰 Ride model with dynamic fare calculation
- 🔐 JWT auth required for protected routes
- 🔄 OTP generation for secure ride validation

---

For exact request/response samples and payload schemas, see individual endpoints above.

---

### Get Fare Estimate

**URL:** `/api/rides/get-fare`

**Method:** `GET`

**Auth Required:** ✅

**Query Params:**
- `pickup` (string): Pickup address
- `destination` (string): Destination address
- `vehicleType` (string): One of `car`, `bike`, `taxi`, `auto`

**Description:**
- Calculates and returns the estimated fare for a ride between the given pickup and destination addresses, based on the selected vehicle type.
- Uses OpenRouteService and LocationIQ for distance and route calculation.

**Responses:**

- `200 OK`:  
  ```json
  {
    "fare": 120,
    "distance_meters": 8500,
    "duration_seconds": 900,
    "vehicleType": "auto"
  }
  ```
- `400 Bad Request` on validation error or missing parameters
- `500 Internal Server Error` on external API failure

---

## Error Handling

- All endpoints return appropriate HTTP status codes.
- Error responses include a `message` field describing the error.
- Validation errors return a list of issues.

---

## Security Notes

- All protected endpoints require a valid JWT (sent via httpOnly cookie).
- On token expiry, users must log in again.
- Logout endpoints clear the token cookie and blacklist the token.

---

## Changelog

- Added `/api/rides/get-fare` endpoint for fare estimation.
- Improved JWT handling and cookie-based authentication.
- Updated CORS and cookie settings for production-readiness.
- Enhanced error messages and validation.

---

For further details, see the codebase or contact

