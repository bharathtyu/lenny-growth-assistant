# Lenny Growth Assistant

A full-stack AI chat application built with **FastAPI**, **Next.js**, **PostgreSQL**, **Ollama**, and **Docker Desktop**.

## Features

* Multiple chat sessions
* AI chat using Ollama (Llama 3 / Llama 3.2 3B)
* Chat history storage
* Artifact Viewer for generated content
* FastAPI backend
* Next.js frontend
* PostgreSQL database
* Docker support with Docker Compose

## Tech Stack

* Frontend: Next.js, TypeScript, Tailwind CSS
* Backend: FastAPI, SQLAlchemy
* Database: PostgreSQL
* AI Model: Ollama (Llama 3 / Llama 3.2 3B)
* Containerization: Docker Desktop & Docker Compose

## Prerequisites

* Node.js
* Python 3.11
* Docker Desktop
* Ollama

## Run the Project

### Start PostgreSQL

```bash
docker compose up -d
```

### Start the Backend

```bash
cd backend
uvicorn app.main:app --reload
```

### Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### Start Ollama

```bash
ollama run llama3.2:3b
```

Open `http://localhost:3000` in your browser.
