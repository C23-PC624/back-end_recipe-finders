# Recipe Finders API Documentation

This API documentation provides information about the endpoints available in the Recipe Finders API.

# Database Structure
![alt text](Database-Structure.png "Title")

# Google CLoud Architecture
![alt text]([Database-Structure.png "Title"](https://github.com/C23-PC624/back-end_recipe-finders/blob/5bec7c8cbda9513380a43bbd5b1f63cb092ad4e4/Backend%20Architecture.png))

## Base URL

The base URL for all API endpoints is: `https://backend-dot-recipe-finder-388213.as.r.appspot.com/`

## Authentication

All endpoints require authentication using a valid token. Include the token in the request headers as follows:


## Endpoints Users

### Get All Users
  - Endpoint: /users
  - Method: GET
  - Description: Retrieves information of all users.
  - Authentication: Requires authentication with a valid token.
  - Request Parameters: None
  - Response: Returns an array of user objects.
  - example :
  - Response:
    Status: 200 OK
    Body:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "img": "http://example.com/images/user1.jpg"
    }

### Get User by ID
  - Endpoint: `/users/:id`
  - Method: GET
  - Description: Retrieves information of a specific user based on the provided ID.
  - Authentication: Requires authentication with a valid token.
  - Request Parameters:
    - `id` (path parameter) - The ID of the user to retrieve.
  - Response: Returns the user object matching the provided ID.
  - Example:
    - Request:
      - URL: `/users/1`
      - Headers:
        - Authorization: {valid_token}
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        [
          {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "img": "http://example.com/images/user1.jpg"
          }
        ]
        ```
Berikut adalah dokumentasi yang dibuat berdasarkan contoh router yang Anda berikan:

### Get User by ID
  - Endpoint: `/users/:id`
  - Method: GET
  - Description: Retrieves information of a specific user based on the provided ID.
  - Authentication: Requires authentication with a valid token.
  - Request Parameters:
    - `id` (path parameter) - The ID of the user to retrieve.
  - Response: Returns the user object matching the provided ID.
  - Example:
    - Request:
      - URL: `/users/1`
      - Headers:
        - Authorization:  {valid_token}
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        [
          {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "img": "http://example.com/images/user1.jpg"
          }
        ]
        ```

### Delete User
  - Endpoint: `/users/:id`
  - Method: DELETE
  - Description: Deletes a user based on the provided ID.
  - Authentication: Requires authentication with a valid token.
  - Request Parameters:
    - `id` (path parameter) - The ID of the user to delete.
  - Response: Returns a success message upon successful deletion.
  - Example:
    - Request:
      - URL: `/users/1`
      - Headers:
        - Authorization:  {valid_token}
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
          "message": "Delete successful"
        }
        ```

### Register User
  - Endpoint: `/users/register`
  - Method: POST
  - Description: Registers a new user with the provided information.
  - Request Body:
    - `name` (string) - The name of the user.
    - `email` (string) - The email of the user.
    - `password` (string) - The password of the user.
    - `img` (file) - Optional. An image file for the user's profile picture.
  - Response: Returns a success message and the ID of the inserted user upon successful registration.
  - Example:
    - Request:
      - URL: `/users/register`
      - Headers:
        - Content-Type: application/json
      - Body:
        ```json
        {
          "name": "John Doe",
          "email": "john@example.com",
          "password": "password123"
        }
        ```
    - Response:
      - Status: 201 Created
      - Body:
        ```json
        {
          "message": "User inserted successfully",
          "insertId": 1
        }
        ```

### Login User
  - Endpoint: `/users/login`
  - Method: POST
  - Description: Authenticates a user based on the provided email and password.
  - Request Body:
    - `email` (string) - The email of the user.
    - `password` (string) - The password of the user.
  - Response: Returns a success message, the user data, and an authentication token upon successful login.
  - Example:
    - Request:
      - URL: `/users/login`
      - Headers:
        - Content-Type: application/json
      - Body:
        ```json
        {
          "email": "john@example.com",
          "password": "password123"
        }
        ```
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
          "message": "Login Successful",
          "data": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "img": "http://example.com/images/user1.jpg"
          },
          "token": "{authentication_token}"
        }
        ```

### Update User Password
  - Endpoint: `/editpass/:id`
  - Method: PUT
  - Description: Updates the password of a user based on the provided ID and old password.
  - Authentication: Requires authentication with a valid token.
  - Request Parameters:
    - `id` (path parameter) - The ID of the user to update.
  - Request Body:
    - `oldpassword` (string) - The old password of the user.
    - `password` (string) - The new password of the user.
  - Response: Returns a success message upon successful password update.
  - Example:
    - Request:
      - URL: `/editpass/1`
      - Headers:
        - Authentication:{valid_token}
        - Content-Type: application/json
      - Body:
        ```json
        {
          "oldpassword": "oldpassword123",
          "password": "newpassword123"
        }
        ```
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
          "message": "Password updated successfully"
        }
        ```

### Update User Image
  - Endpoint: `/editimage/:id`
  - Method: PUT
  - Description: Updates the image of a user based on the provided ID.
  - Authentication: Requires authentication with a valid token.
  - Request Parameters:
    - `id` (path parameter) - The ID of the user to update.
  - Request Body:
    - `img` (file) - The new image file for the user's profile picture.
  - Response: Returns a success message upon successful image update.
  - Example:
    - Request:
      - URL: `/editimage/1`
      - Headers:
        - Authorization:  {valid_token}
      - Body:
        - Form Data:
          - `img` (file): [image file]
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
          "message": "Users updated successfully"
        }
        ```

### Update User Email and Image
  - Endpoint: `/users/:id`
  - Method: PUT
  - Description: Updates the email and image of a user based on the provided ID.
  - Authentication: Requires authentication with a valid token.
  - Request Parameters:
    - `id` (path parameter) - The ID of the user to update.
  - Request Body:
    - `email` (string) - The new email of the user.
    - `img` (file) - The new image file for the user's profile picture.
  - Response: Returns a success message upon successful update.
  - Example:
    - Request:
      - URL: `/users/1`
      - Headers:
        - Authorization:  {valid_token}
      - Body:
        - Form Data:
          - `email` (string): john.doe@example.com
          - `img` (file): [image file]
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
          "message": "Users updated successfully"
        }
        ```

## Endpoints Food

### Get All Food
  - Endpoint: `/food`
  - Method: GET
  - Description: Retrieves information of all food.
  - Response: Returns an array of food objects.
  - Example:
    - Request:
      - URL: `/food`
      - Headers:
        - Authentication:{valid_token}
        - Content-Type: application/json
    - Response:
      - Status: 200 OK
      - Body : 
        ```json
        [
            {
                "id": 1,
                "name": "Bakso",
                "category": 4,
                "description": "It is a Food that is made with meat",
                "ingredients": "meat, salt, pepper",
                "kkal": "250",
                "lemak": "10",
                "protein": "15",
                "karbohidrat": "40",
                "idx": "1",
                "kategori": "Halal"
            },
            {
                "id": 2,
                "name": "Sate",
                "category": 4,
                "description": "It is a Food that is made with meat",
                "ingredients": "meat, salt, pepper",
                "kkal": "250",
                "lemak": "10",
                "protein": "15",
                "karbohidrat": "50",
                "idx": "3",
                "kategori": "Halal"
            }
        ]  
        ```

### Get Food by ID
  - Endpoint: `/food/:id`
  - Method: GET
  - Description: Retrieves information of a specific food based on the provided ID.
  - Request Parameters:
    - `id` (path parameter) - The ID of the food to retrieve.
  - Response: Returns a food object.
  - Example:
    - Request:
      - URL: `/food/1`
      - Headers:
        - Authentication:{valid_token}
        - Content-Type: application/json
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
            "id": 1,
            "name": "Bakso",
            "category": 4,
            "description": "It is a Food that is made with meat",
            "ingredients": "meat, salt, pepper",
            "kkal": "250",
            "lemak": "10",
            "protein": "15",
            "karbohidrat": "40",
            "idx": "1",
            "kategori": "Halal"
        }
        ```

## Endpoints Favorite

### Add Favorites
  - Endpoint: `/favorites`
  - Method: POST  
  - Description: Adds a new favorite to the database base on the food's id and user's id.
  - Request 
  - Request Body:
    - `food_id` (integer) - The ID of the food to add to favorites.
    - `user_id` (integer) - The ID of the user to add to favorites.
  - Response: Returns a success message upon successful addition.
  - Example:
    - Request:
      - URL: `/favorites`
      - Headers:
        - Authentication:{valid_token}
        - Content-Type: application/json
      - Body:
        ```json
        {
          "food_id": 1,
          "user_id": 1
        }
        ```
    - Response:
        - Status: 201 Created
        - Body:
            ```json
            {
            "message": "Data inserted successfully"
            }
            ```

### Delete Favorites
  - Endpoint: `/favorites/:id`
  - Method: DELETE
  - Description: Deletes a favorite from the database based on the provided ID.
  - Request Parameters:
    - `id` (path parameter) - The ID of the favorite to delete.
  - Response: Returns a success message upon successful deletion.
  - Example:
    - Request:
      - URL: `/favorites/1`
      - Headers:
        - Authentication:{valid_token}
        - Content-Type: application/json
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
          "message": "Data deleted successfully"
        }
        ```

### Get Favorites by User ID
  - Endpoint: `/favorites/:id`
  - Method: GET
  - Description: Retrieves information of all favorites based on the provided user ID.
   - Request Parameters:
   - `id` (path parameter) - The ID of the user to retrieve favorites for the user.
   - Response: Returns an array of favorite objects.
   - Example:
        - Request:
         - URL: `/favorites/1`
         - Headers:
           - Authentication:{valid_token}
           - Content-Type: application/json
        - Response:
         - Status: 200 OK
         - Body:
            ```json
            [
                 {
                  "id": 1,
                  "user_id": 1,
                  "img" : file
                 },
                 {
                  "id": 2,
                  "user_id": 1,
                  "food_id": 2
                 }
            ]
            ```

## Endpoints History

### GET History by User ID
  - Endpoint: `/history/:id`
  - Method: GET
  - Description: Retrieves information of all history based on the provided user ID.
  - Authentication: Requires authentication with a valid token.
   - Request Parameters:
   - `id` (path parameter) - The ID of the user to retrieve history for the user.
   - Response: Returns an array of history objects.
   - Example:
        - Request:
         - URL: `/history/1`
         - Headers:
           - Authentication:{valid_token}
           - Content-Type: application/json
        - Response:
         - Status: 200 OK
         - Body:
            ```json
            [
                 {
                  "id": 1,
                  "user_id": 1,
                  "food_id": 1
                 },
                 {
                  "id": 2,
                  "user_id": 1,
                  "food_id": 2
                 }
            ]
            ```

### Add History
  - Endpoint: `/history`
  - Method: POST  
  - Description: Adds a new history to the database base on the user's id and image file from the user.
  - Authentication: Requires authentication with a valid token.
    - Request Body:
        - `user_id` (integer) - The ID of the user to add to history.
        - `img` (file) - The image file of the food to add to history.
    - Response: Returns a success message upon successful addition.
  - Example :
    - Request:
      - URL: `/history`
      - Headers:
        - Authentication:{valid_token}
        - Content-Type: application/json
      - Body:
        ```json
        {
          "user_id": 1,
          "img": file
        }
        ```
    - Response:
        - Status: 201 Created
        - Body:
            ```json
            {
            "message": "Data inserted successfully"
            }
            ```

### Delete History
    - Endpoint: `/history/:id`
    - Method: DELETE
    - Description: Deletes a history from the database based on the provided ID.
    - Authentication: Requires authentication with a valid token.
    - Request Parameters:
        - `id` (path parameter) - The ID of the history to delete.
    - Response: Returns a success message upon successful deletion.
    - Example:
        - Request:
        - URL: `/history/1`
        - Headers:
            - Authentication:{valid_token}
            - Content-Type: application/json
        - Response:
        - Status: 200 OK
        - Body:
            ```json
            {
            "message": "Data deleted successfully"
            }
            ```

## Endpoints Preferences

### Get All Preferences
  - Endpoint: `/preferences`
  - Method: GET
  - Description: Retrieves information of all preferences.
  - Response: Returns an array of preference objects.
  - Example:
    - Request:
      - URL: `/preferences`
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        [
          {
            "id": 1,
            "name": "Preference 1"
          },
          {
            "id": 2,
            "name": "Preference 2"
          },
          ...
        ]
        ```

### Get Preference by ID
  - Endpoint: `/preferences/:id`
  - Method: GET
  - Description: Retrieves information of a specific preference based on the provided ID.
  - Request Parameters:
    - `id` (path parameter) - The ID of the preference to retrieve.
  - Response: Returns the preference object matching the provided ID.
  - Example:
    - Request:
      - URL: `/preferences/1`
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        [
          {
            "id": 1,
            "name": "Preference 1"
          }
        ]
        ```

### Add Preference
  - Endpoint: `/preferences`
  - Method: POST
  - Description: Creates a new preference with the provided information.
  - Request Body:
    - `name` (string) - The name of the preference.
  - Response: Returns a success message and the ID of the inserted preference upon successful creation.
  - Example:
    - Request:
      - URL: `/preferences`
      - Headers:
        - Content-Type: application/json
      - Body:
        ```json
        {
          "name": "Preference 3"
        }
        ```
    - Response:
      - Status: 201 Created
      - Body:
        ```json
        {
          "message": "Data inserted successfully",
          "insertId": 3
        }
        ```

### Delete Preference
  - Endpoint: `/preferences/:id`
  - Method: DELETE
  - Description: Deletes a preference based on the provided ID.
  - Request Parameters:
    - `id` (path parameter) - The ID of the preference to delete.
  - Response: Returns a success message upon successful deletion.
  - Example:
    - Request:
      - URL: `/preferences/1`
    - Response:
      - Status: 200 OK
      - Body:
        ```json
        {
          "message": "Delete successful"
        }
        ```

