# Sixjar Backend

## Overview

Sixjar Backend is the server-side API for a personal finance application designed around the popular "Six Jars" budgeting methodology. It allows users to manage their finances by allocating income into six distinct categories (jars), track their income and expenses, and gain insights into their spending habits.

The application aims to provide a clear and intuitive way for users to manage their money. On the frontend (not part of this backend repository), users will have a dashboard showing all six jars with their current amounts. Initially, jar percentages are fixed but will be user-editable in a future update, along with customizable jar names. The dashboard will also feature a pie chart visualizing money distribution and display total monthly income and expenses. Future features include progress bars for jars based on user-set thresholds.

The income entry page allows users to input an amount and optional notes, showing a preview of how the money will be divided among the jars based on predefined percentages. The expense page allows users to deduct money from a specific jar, along with an amount and optional notes. A dedicated transactions page will display a table of all financial activities with details like type, date, jar, amount, and notes.

## Key Features

* **User Authentication:** Secure user sign-up and login using Firebase Authentication.
* **User Profile Management:** Syncs user profiles with the application's database.
* **Six Jars Budgeting:**
    * Automatic initialization of six default budgeting jars for new users.
    * Manages current amounts for each jar.
    * (Future) Allows users to customize jar names and allocation percentages.
* **Transaction Management:**
    * Record income and automatically distribute it among the six jars based on set percentages.
    * Record expenses from specific jars.
    * Maintain a detailed history of all transactions.
* **Financial Insights:**
    * Provides a monthly summary of total income and expenses.
    * Retrieves all jar data for a user, enabling dashboard visualizations (like pie charts).

## Tech Stack

* **Backend Framework:** Node.js with Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Authentication:** Firebase Authentication (via Firebase Admin SDK)

## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v22.13.0 or later recommended)
* [npm](https://www.npmjs.com/) (usually comes with Node.js)
* Access to a MongoDB instance (local or cloud-based like MongoDB Atlas)
* A Firebase project with Authentication enabled and Service Account credentials.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ArfanAnulal/SixJar-backend
cd sixjar-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables with your specific credentials:

```env
# MongoDB Credentials
MONGO_URI=your_mongodb_connection_string

# Firebase Admin SDK Credentials
# These should be the values from your Firebase service account JSON key file.
# For FIREBASE_PRIVATE_KEY, ensure newlines are handled correctly (e.g., replace \n with \\n or use quotes if your .env loader supports it).
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key_including_-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Note on `FIREBASE_PRIVATE_KEY`**: The private key from the Firebase service account JSON file contains newline characters (`\n`). When adding it to the `.env` file, you need to ensure these are preserved. One common way is to enclose the entire key in double quotes and replace literal newlines with `\n` as a string escape sequence if your environment variable loader (like `dotenv` package) supports it. Alternatively, some systems might require you to paste it as a single line with `\n` literally present or use a tool to format it.

### 4. Database Setup

No specific database migration or seeding scripts are required for initial setup. User-specific jars are created automatically when a new user signs up via the `/api/users/sync-user` endpoint.

### 5. Running the Server

* **Development Mode (with Nodemon for auto-restarts):**
    ```bash
    npm run dev
    ```
* **Production Mode:**
    ```bash
    npm start
    ```

The server will typically start on `http://localhost:PORT`, where `PORT` is defined in your environment or defaults (e.g., 3000).

## API Endpoints

The following are the main API endpoints available:

| Method | Endpoint                       | Description                                                                          | Auth Required |
| :----- | :----------------------------- | :----------------------------------------------------------------------------------- | :------------ |
| `POST` | `/api/users/sync-user`         | Creates a new user in the database if they don't exist, or updates an existing one. Initializes default jars for new users. | Yes           |
| `GET`  | `/api/users/me`                | Retrieves the profile of the currently authenticated user from the database.       | Yes           |
| `POST` | `/api/transactions/income`     | Records a new income transaction and distributes the amount across the user's jars.  | Yes           |
| `POST` | `/api/transactions/expense`    | Records a new expense transaction from a specified jar.                              | Yes           |
| `GET`  | `/api/transactions/getTransactions` | Retrieves all transactions for the authenticated user.                             | Yes           |
| `GET`  | `/api/transactions/getMonthlySummary` | Retrieves total income and expenses for the current month for the authenticated user. | Yes           |
| `GET`  | `/api/jars/getUserJars`        | Retrieves all jar data (names, amounts, percentages) for the authenticated user.   | Yes           |

*Authentication is handled via Firebase ID tokens passed in the `Authorization` header as a Bearer token.*

## Folder Structure

```
backend/
├── config/
│   ├── firebaseAdmin.js       # Initialize Firebase Admin SDK
│   └── mongodb.js             # MongoDB connection setup
├── controllers/
│   ├── authController.js      # (Currently empty)
│   ├── jarsController.js      # Logic for managing jars
│   ├── transactionsController.js  # Logic for managing income/expense transactions
│   └── usersController.js     # Logic for user profiles and synchronization
├── middlewares/
│   └── authMiddleware.js      # Middleware to verify Firebase ID token and attach user to request
├── models/
│   ├── Jar.js                 # Mongoose schema for Jars
│   ├── Transaction.js         # Mongoose schema for Transactions
│   └── User.js                # Mongoose schema for Users
├── routes/
│   ├── jars.js                # Routes for jar-related operations
│   ├── transactions.js        # Routes for transaction-related operations
│   ├── users.js               # Routes for user-related operations
│   └── index.js               # Aggregates all API routes
├── utils/
│   ├── tokenHelpers.js        # Utility functions (if any) for tokens
│   └── jarHelpers.js          # Utility functions for jar operations (e.g., default jar creation)
├── .env.example               # Example environment variables file
├── .env                       # Environment variables (ignored by git)
├── app.js                     # Express application setup (middleware, routes)
└── server.js                  # Entry point to start the HTTP server
```

## Contributing

Contributions are welcome! Please check the "Issues" tab for features or bugs you can help with.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (you would create this file with the MIT license text).

## Author

* **Arfan Anulal**
    * [GitHub](https://github.com/ArfanAnulal)
    * [LinkedIn](https://www.linkedin.com/in/arfanvanulal)
    * [Portfolio](arfan.codes)
