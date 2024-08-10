import express from "express";
import Groq from "groq-sdk";
import path from "path";
import dotenv from "dotenv";
import nlp from "compromise";
import Sentiment from "sentiment";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
const groq = new Groq({
  apiKey: process.env["GROQ_API_KEY"],
});
const sentimentAnalyzer = new Sentiment();

app.get("/", (req, res) => {
  res.sendFile("../public/index.html");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: "Message is required" });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "llama3-8b-8192",
    });
    const sentimentResult = sentimentAnalyzer.analyze(message);
    const sentiment = sentimentResult.score;
    const doc = nlp(message);
    const entities = doc.topics().out("array");
    res.send({
      response: chatCompletion.choices[0].message.content,
      sentiment:
        sentiment > 0 ? "positive" : sentiment < 0 ? "negative" : "neutral",
      entities,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to get response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
