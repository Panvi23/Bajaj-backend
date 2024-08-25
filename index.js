const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const USER_ID = "21BCE0427";
const EMAIL = "chethan.nv2021@vitstudent.ac.in";
const ROLL_NUMBER = "21BCE0427";

// POST /bfhl endpoint
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, error: "Data must be an array" });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(
      (item) => typeof item === "string" && /^[0-9]+$/.test(item)
    );
    const alphabets = data.filter(
      (item) => typeof item === "string" && /^[A-Za-z]$/.test(item)
    );

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(
      (char) => char === char.toLowerCase()
    );
    let highestLowercaseAlphabet = [];
    if (lowercaseAlphabets.length > 0) {
      const maxChar = lowercaseAlphabets.reduce((a, b) => (a > b ? a : b));
      highestLowercaseAlphabet.push(maxChar);
    }

    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

// GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
