# Data Extraction API

## 📌 Description

This project is an AI-powered document analysis system that processes documents in multiple formats (PDF, DOCX, and images) and extracts meaningful information.

The system converts input files (sent as Base64) into text, analyzes the content using AI and rule-based methods, and returns structured data including:

* Summary
* Key entities (names, dates, organizations, amounts)
* Sentiment

The goal is to build a reliable, scalable API that works even under constraints like limited AI quota.

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Key Libraries

* `pdf-parse` → PDF text extraction
* `mammoth` → DOCX text extraction
* `tesseract.js` → OCR for images
* `dotenv` → environment variable management

### AI / LLM

* Google Gemini API (`@google/genai`)
* Model used: configurable via environment (e.g. `gemini-2.5-flash`, `gemini-3-flash-preview`)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Set environment variables

Create a `.env` file in the root:

```
PORT=3000
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
X_API_KEY=sk_track2_987654321
```

Also include a `.env.example` file in repo.

---

### 4. Run the application

```bash
npm start
```

Server will start at:

```
http://localhost:3000
```

---

## 🚀 API Endpoint

### POST `/api/document-analyze`

#### Headers:

```
Content-Type: application/json
x-api-key: YOUR_SECRET_API_KEY
```

---

### Request Body:

```json
{
  "fileName": "sample.pdf",
  "fileType": "pdf",
  "fileBase64": "BASE64_STRING"
}
```

---

### Response:

```json
{
  "status": "success",
  "fileName": "sample.pdf",
  "summary": "...",
  "entities": {
    "names": [],
    "dates": [],
    "organizations": [],
    "amounts": []
  },
  "sentiment": "Neutral"
}
```

---

## 🧠 Approach

### 1. File Processing

* Input file is received as Base64
* Converted into a buffer
* Based on file type:

  * PDF → parsed using `pdf-parse`
  * DOCX → parsed using `mammoth`
  * Image → OCR using `tesseract.js`

---

### 2. Text Extraction

All formats are converted into raw text for further processing.

---

### 3. AI-Based Analysis

#### Summary

* Uses Gemini AI to generate a concise 2–3 line summary
* Focuses on key details like who, what, when, and amounts

#### Entity Extraction

* AI extracts structured entities:

  * Names
  * Dates (normalized to `YYYY-MM-DD`)
  * Organizations
  * Monetary values

* Post-processing applied:

  * Remove duplicates

---

### 4. Sentiment Analysis

* AI classifies document sentiment into:

  * Positive
  * Neutral
  * Negative

* Output is normalized to a single string

---

### 5. Data Cleaning & Optimization

* Remove noise and irrelevant entities
* Normalize:

  * Currency values → ₹ format
  * Dates → ISO format
* Return only meaningful data for better accuracy

---

## 🔐 Security

* API protected using `x-api-key`
* Unauthorized requests return `401`

---

## 📂 Project Structure

```
src/
├── controllers/
├── routes/
├── services/
│   ├── ai/
│   ├── extractors/
│   └── pipeline.service.js
├── utils/
├── middlewares/
└── index.js
```

---

## ✅ Features

* Multi-format document support
* AI-powered summarization
* Structured entity extraction
* Sentiment analysis
* Fallback system for reliability
* Clean and optimized API responses

---

## 🚀 Future Improvements

* Async processing using queues (Celery/Redis equivalent in Node)
* Better entity ranking using AI scoring
* Caching repeated documents
* Support for more languages

---

## 📌 Notes

* Designed for hackathon evaluation with accuracy and robustness in mind
* Focused on clean output rather than excessive extraction
* Optimized for limited API quota usage

---
