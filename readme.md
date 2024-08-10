# Chatbot with Groq API and NLP Features

## Overview

A simple chatbot based on the Groq API (llama3-groq-8b-8192 model), integrated with sentiment analysis and entity recognition using the `compromise` and `sentiment` packages. The backend is implemented in TypeScript, with a simple frontend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [NLP Features](#nlp-features)
- [Integration Details](#integration-details)

## Features

- **Chatbot**: A basic chatbot that responds to user input using the Groq API.
- **NLP Integration**: Sentiment analysis and entity recognition are provided by the `sentiment` and `compromise` packages.

## Installation

To set up and run this project locally, follow these steps:

### 1. Clone the repository

    git clone https://github.com/Hossam212/Chatbot-task.git
    cd chatbot

### 2. Install dependencies

    npm install

.env file normally shouldn't be in the repo, but it's included here just for the sake of using Groq API Key.

### 3. Compile TypeScript

    npx tsc

### 4. Start the server

    node dist/server.js

### 5. Access the chatbot

Open your browser and navigate to http://localhost:3000

## Usage

- **User Input**: Enter your message in the chat form.
- **Chatbot Response**: The chatbot will respond using the Groq API.
- **NLP Analysis**: The frontend will display sentiment and highlight recognized entities.

## Technologies Used

- **Backend**: Node.js, TypeScript
- **API Integration**: Groq API
- **NLP Libraries**:
  - `compromise` for entity recognition
  - `sentiment` for sentiment analysis
- **Frontend**: HTML

## NLP Features

- **Sentiment Analysis**: Classifies user messages as positive, negative, or neutral using the `sentiment` package.
- **Entity Recognition**: Identifies and highlights entities like topics in user messages using the `compromise` package.

## Integration Details

### Groq API Integration

- The Groq API is used to generate chatbot responses. It is initialized using the `groq` package with an API key, which is stored in an environment variable (`GROQ_API_KEY`). The API is called within the `/chat` endpoint to generate responses based on user input.

### Sentiment Analysis Integration

- The `sentiment` package is used to analyze the sentiment of user messages. It is instantiated as `sentimentAnalyzer` and used to analyze the `message` string within the `/chat` endpoint. The sentiment score is then classified as `positive`, `negative`, or `neutral`.

### Entity Recognition Integration

- The `compromise` package is used to perform entity recognition on user messages. It processes the `message` string to identify and extract entities (e.g., topics) within the text. The recognized entities are then returned in the response from the `/chat` endpoint.
