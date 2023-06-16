# Recipe Finders API Documentation

This API documentation provides information about the endpoints available in the Recipe Finders API.

# Database Structure
![alt text](Database-Structure.png "Title")

## Base URL

The base URL for all API endpoints is: `https://backend-dot-recipe-finder-388213.as.r.appspot.com/`

## Authentication

All endpoints require authentication using a valid token. Include the token in the request headers as follows:


## Endpoints

### Get All Users
Endpoint: /users
Method: GET
Description: Retrieves information of all users.
Authentication: Requires authentication with a valid token.
Request Parameters: None
Response: Returns an array of user objects.

# GET /users
Response:
Status: 200 OK
Body:
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "img": "http://example.com/images/user1.jpg"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "img": "http://example.com/images/user2.jpg"
  }
]


### Get User by ID

...

### Delete User

...

### Register User

...

### User Login

...

### Update User Password

...

### Update User Profile Image

...


