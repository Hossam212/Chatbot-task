"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const compromise_1 = __importDefault(require("compromise"));
const sentiment_1 = __importDefault(require("sentiment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
const groq = new groq_sdk_1.default({
    apiKey: process.env["GROQ_API_KEY"],
});
const sentimentAnalyzer = new sentiment_1.default();
app.get("/", (req, res) => {
    res.sendFile("../public/index.html");
});
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    if (!message) {
        return res.status(400).send({ error: "Message is required" });
    }
    try {
        const chatCompletion = yield groq.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "llama3-8b-8192",
        });
        const sentimentResult = sentimentAnalyzer.analyze(message);
        const sentiment = sentimentResult.score;
        const doc = (0, compromise_1.default)(message);
        const entities = doc.topics().out("array");
        res.send({
            response: chatCompletion.choices[0].message.content,
            sentiment: sentiment > 0 ? "positive" : sentiment < 0 ? "negative" : "neutral",
            entities,
        });
    }
    catch (error) {
        res.status(500).send({ error: "Failed to get response" });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
