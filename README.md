🌿 Minty
Minty is a personal finance web application that enables users to manage their budgets by creating and saving spending categories. Users can sign in with their email, add categories with associated amounts, and persist their data using a PostgreSQL database.

📦 Features
User Authentication: Sign in using your email address.

Category Management: Add, view, and save spending categories with specified amounts.

Data Persistence: Categories are stored in a PostgreSQL database for future retrieval.

Responsive Design: Clean and intuitive user interface built with React.

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

PostgreSQL (v12 or higher)

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/kavirajesh22/minty.git
cd minty
Set up the PostgreSQL database:

Create a new database named minty.

Create the necessary tables:

sql
Copy
Edit
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  category_name TEXT NOT NULL,
  amount NUMERIC NOT NULL
);
Configure environment variables:

Create a .env file in the root directory with the following content:

env
Copy
Edit
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/minty
Replace <username> and <password> with your PostgreSQL credentials.

Install backend dependencies:

bash
Copy
Edit
npm install
Start the backend server:

bash
Copy
Edit
npm start
Navigate to the frontend directory and install dependencies:

bash
Copy
Edit
cd client
npm install
Start the React frontend:

bash
Copy
Edit
npm start
The application will be accessible at http://localhost:3000.

🛠️ Technologies Used
Frontend:

React

TypeScript

Axios

Backend:

Express

Node.js

PostgreSQL

pg (node-postgres)

📄 API Endpoints
Users
POST /users
Create a new user or retrieve an existing user by email.

Request Body:

json
Copy
Edit
{
  "email": "user@example.com"
}
Response:

json
Copy
Edit
{
  "id": 1,
  "email": "user@example.com"
}
Categories
POST /categories
Save categories for a user.

Request Body:

json
Copy
Edit
{
  "userEmail": "user@example.com",
  "categories": [
    { "categoryName": "Food", "amount": 100 },
    { "categoryName": "Transport", "amount": 50 }
  ]
}
Response:

json
Copy
Edit
{
  "message": "Categories saved successfully"
}
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature/your-feature-name.

Commit your changes: git commit -m 'Add your feature'.

Push to the branch: git push origin feature/your-feature-name.

Open a pull request.

📃 License
This project is licensed under the MIT License.

📫 Contact
For any inquiries or feedback, please contact kavirajesh22.

Feel free to customize this README.md to better fit your project's specific needs. If you need assistance with creating a LICENSE file or setting up GitHub Actions for continuous integration, let me know!
