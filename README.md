# SpringbootAIChatBot

A simple demo that integrates ChatGPT (or another OpenAI-compatible LLM) with a Java Spring Boot backend and a frontend built using VS Code. This project was implemented following: https://www.youtube.com/watch?v=FJzzCqsTnSM

![App Screenshot](screenshot of springboot ai application.jpg)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Running the app](#running-the-app)
- [API example](#api-example)
- [Docker](#docker)
- [Adding the screenshot](#adding-the-screenshot)
- [Development notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

- Spring Boot backend that proxies chat messages to an LLM (e.g., OpenAI / ChatGPT).
- Simple REST endpoint for sending user prompts and receiving responses.
- Configurable via environment variables or Spring properties.
- Minimal frontend (built in VS Code) that communicates with the backend.

## Prerequisites

- Java 17+ (or the Java version your project uses)
- Maven or Gradle (wrappers recommended)
- An API key for your LLM provider (OpenAI, Azure OpenAI, or compatible)
- Internet access for backend requests

## Configuration

This project reads configuration from environment variables or Spring Boot properties. Common keys (adjust to how your code binds them):

Environment variables
- OPENAI_API_KEY — required (your LLM API key)
- AI_API_BASE_URL — optional (e.g. for Azure or a proxy)
- AI_MODEL — optional (e.g. `gpt-4`, `gpt-3.5-turbo`)
- SERVER_PORT — optional (or use `server.port`)

Example application.properties (src/main/resources/application.properties)
```properties
ai.api.key=${OPENAI_API_KEY:}
ai.api.base-url=${AI_API_BASE_URL:https://api.openai.com}
ai.model=${AI_MODEL:gpt-3.5-turbo}

server.port=${SERVER_PORT:8080}
```

## Running the app

Clone the repo, set your API key, then run with your preferred build tool.

Using Maven
```bash
# set environment variable (Linux/macOS)
export OPENAI_API_KEY="sk-xxxx"

# run
./mvnw clean spring-boot:run

# or build and run jar
./mvnw clean package
java -jar target/*.jar
```

Using Gradle
```bash
# set env var (Linux/macOS)
export OPENAI_API_KEY="sk-xxxx"

# run
./gradlew bootRun

# or build and run jar
./gradlew clean bootJar
java -jar build/libs/*.jar
```

## API example

Adjust paths to reflect your controller. Example:

POST /api/chat
Request JSON
```json
{
  "message": "Hello, who are you?"
}
```

Response JSON
```json
{
  "reply": "Hi! I'm an AI assistant. How can I help you?"
}
```

cURL example:
```bash
curl -X POST http://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, who are you?"}'
```

If your implementation supports conversation history, include conversationId or message arrays as needed.

## Docker

Example Dockerfile
```dockerfile
FROM eclipse-temurin
