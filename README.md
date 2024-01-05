# Notes App API

The Notes App API is a Node.js and Express-based backend service for managing notes. It integrates with MongoDB as a database and provides Swagger documentation for easy exploration and testing.

## Features

- **User Authentication and Authorization:** Secure user accounts with sign-up and login functionality.
- **Note Management:** CRUD operations for creating, retrieving, updating, and deleting notes.
- **Note Sharing:** Share notes with other users.
- **Keyword-based Search:** Search for notes based on keywords.
- **Express Middleware:** Includes rate limiting, request throttling, and logging using Express middleware.
- **Swagger Documentation:** Comprehensive Swagger documentation for API exploration.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/notes-app-api.git
   cd notes-app-api
Install dependencies:

bash
Copy code
npm install
Set up your MongoDB database:

Create a MongoDB database.
Update the connection string in db.js or use environment variables.
Start the application:

bash
Copy code
npm start
Usage
API Endpoints:

POST /api/auth/signup: Create a new user account.
POST /api/auth/login: Log in to an existing user account and receive an access token.
GET /api/notes: Get a list of all notes for the authenticated user.
GET /api/notes/:id: Get a note by ID for the authenticated user.
POST /api/notes: Create a new note for the authenticated user.
PUT /api/notes/:id: Update an existing note by ID for the authenticated user.
DELETE /api/notes/:id: Delete a note by ID for the authenticated user.
POST /api/notes/share: Share a note with another user for the authenticated user.
GET /api/search?q=:query: Search for notes based on keywords for the authenticated user.


Swagger Documentation:
Explore the API documentation using Swagger UI:
Local URL: http://localhost:3000/api-docs
Contributing
Contributions are welcome! Please follow the Contributing Guidelines.