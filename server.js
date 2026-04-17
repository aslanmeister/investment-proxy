const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; // ← safe, hidden from browser

  const response = await fetch(
    https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey},
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: message }]
        }],
        systemInstruction: {
          parts: [{ text: "You are a helpful investment advisor assistant. Help users understand investment concepts, risk, and strategy. Keep answers concise and clear." }]
        }
      })
    }
  );

  const data = await response.json();
  const reply = data.candidates[0].content.parts[0].text;
  res.json({ reply });
});

app.listen(3000);