Accounting API 
This is a Node.js application that implements an accounting API for managing transactions and accounts. The application provides REST endpoints for creating and retrieving transactions, as well as retrieving account data.

Installation
Clone this repository to your local machine.
Navigate to the root directory of the project.
Install the project dependencies by running the command: npm install.
Create a .env file in the root directory and set the BASE_URL and PORT environment variables.
Usage
To start the application, run the command npm start.

The API provides the following endpoints:

GET /ping
Returns a response indicating that the server is up and running.

POST /transactions
Creates a new transaction with the provided account ID and amount.

Example request body:

json
Copy code
{
    "account_id": "abc123",
    "amount": 100.00
}
Returns the newly created transaction data if successful.

GET /transactions
Returns a list of all transactions.

GET /transactions/:transaction_id
Returns the transaction data for the specified transaction ID.

GET /accounts/:account_id
Returns the account data for the specified account ID.

Error handling
The API returns appropriate HTTP status codes and error messages for invalid requests or server errors.