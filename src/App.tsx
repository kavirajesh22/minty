import React, { useState } from "react";
import axios from 'axios';
import Users from "./Users"; // Adjust path if needed

interface Styles {
  container: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
  form: React.CSSProperties;
  inputGroup: React.CSSProperties;
  label: React.CSSProperties;
  input: React.CSSProperties;
  error: React.CSSProperties;
  button: React.CSSProperties;
}

const App = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [categories, setCategories] = useState<{ categoryName: string, amount: number }[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [amount, setAmount] = useState<number | string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      setError("email is required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/users", {
        email,
      });

      console.log("user created:", response.data);
      setShowUsers(true);
      setError("");
    } catch (err) {
      console.error("error creating user:", err);
      setError("failed to create user.");
    }
  };

  const handleCategorySubmit = () => {
    if (!categoryName || !amount) {
      setError("both category and amount are required");
      return;
    }

    setCategories([
      ...categories,
      { categoryName, amount: Number(amount) }
    ]);

    setCategoryName("");
    setAmount("");
  };

  const handleSaveCategories = async () => {
    try {
      await axios.post("http://localhost:5000/categories", {
        userEmail: email,
        categories,
      });

      console.log("Categories saved successfully");
    } catch (err) {
      console.error("Error saving categories:", err);
      setError("Failed to save categories.");
    }
  };

  const styles: Styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f4",
      fontFamily: "Albert Sans",
    },
    title: {
      fontSize: "3rem",
      color: "brown",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "2rem",
      color: "green",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      marginBottom: "5px",
      fontSize: "1rem",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    error: {
      color: "red",
      fontSize: "0.875rem",
      marginBottom: "10px",
    },
    button: {
      padding: "12px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>minty</h1>
      <h2 style={styles.subtitle}>where your money blooms</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Enter username (email)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>

      {showUsers && (
        <div>
          <h2>Select Categories</h2>
          <div>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category"
              style={styles.input}
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              style={styles.input}
            />
            <button onClick={handleCategorySubmit} style={styles.button}>
              Add Category
            </button>
          </div>

          <h3>Your Budget for This Week: </h3>
          <ul>
            {categories.map((cat, index) => (
              <li key={index}>
                {cat.categoryName} - ${cat.amount}
              </li>
            ))}
          </ul>

        </div>
      )}

      {showUsers && <Users />}
    </div>
  );
};

export default App;
