# 🧠 TalkDox

> Chat with any **document**, **website**, or **YouTube video** - powered by Google Gemini 2.5 Flash.  
> Agentic RAG with 12+ AI features in one unified intelligence layer.


[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🎯 What is TalkDox?

TalkDox transforms any document, webpage, or video into an intelligent conversation partner. Upload a PDF, Word doc, text file, paste a URL, or drop a YouTube link - TalkDox reads, understands, and lets you have a full AI conversation with it.

Unlike basic chatbots, TalkDox uses a **3-layer Agentic RAG pipeline** with self-reflection and confidence scoring, plus 12+ built-in AI tools.

---

## ✨ Features

### 📂 3 Source Types
- **📄 Document Reader** - PDF, Word (.docx), Text (.txt), Markdown (.md) — research papers, contracts, resumes, reports
- **🌐 Web Surfer** - Any website URL, with rotated user agents to bypass basic bot detection
- **▶️ YouTube Extractor** - Auto-transcribes any video with captions

### 🤖 12 AI Capabilities

| Feature | What It Does |
|---------|-------------|
| 💬 Smart Q&A | Streaming responses grounded with source citations |
| 🧬 Document DNA | Auto-profile: domain, tone, complexity, themes |
| 🔀 Doc vs Doc Compare | Side-by-side compare with colour-coded sources |
| 🕐 Timeline Extractor | Auto-extract dates and milestones |
| 🃏 3D Flip Flashcards | Realistic flip-card study mode with difficulty filters |
| 🛠 5 Automation Tools | Summary, Quiz, Email, Contradictions, Actions |
| 🤖 3 Agentic Layers | Clarification → Self-Reflection → Confidence |
| 📊 Session Analytics | Track confidence trends and patterns |
| ⚖️ AI Personas | Lawyer, Doctor, Teacher, Analyst, Journalist |
| 🎯 Response Modes | ELI5, Executive Brief, Devil's Advocate |
| 🌐 Multilingual | Auto-detects language, responds in kind |
| 🎙 Voice Input | Hands-free via Web Speech API |

---

## 🧠 Agentic RAG Pipeline

```
Query → Clarification Layer → Retrieval (FAISS) → Self-Reflection → Confidence Score → Response
```

1. **Clarification** - Detects ambiguous queries and asks for specifics
2. **Retrieval** - Embeds + searches FAISS for top-k relevant chunks
3. **Self-Reflection** - Critiques its own answer and refines if needed
4. **Confidence** - Multi-signal scoring (retrieval depth + content quality + keyword overlap) with 0–100% transparency

---

## 🛠 Tech Stack

**Frontend** • React 18 (Vite) • DM Sans + Syne • Web Speech API • 3D CSS Transforms • Vercel  
**Backend** • Python 3.12 • FastAPI • LangChain • FAISS • HuggingFace Spaces (Docker)  
**AI** • Google Gemini 2.5 Flash • gemini-embedding-001  
**Integrations** • Supadata API (YouTube) • BeautifulSoup (web scraping) • PyPDF • python-docx

---

## 📊 Engineering Highlights

- ✅ Streaming responses (word-by-word) with blinking cursor for premium UX
- ✅ Async background processing for Document DNA generation
- ✅ Multi-signal confidence scoring (not just keyword overlap)
- ✅ Rotated user agents + browser-like headers for resilient web scraping
- ✅ File size & page count validations to prevent server crashes
- ✅ Friendly error mapping for HTTP status codes (403/404/429/timeout)
- ✅ Mobile-first responsive design with className-based breakpoints
- ✅ 3D CSS transforms for realistic flashcard flip animations
- ✅ Premium loading screen for HuggingFace cold starts

---

## 🧪 Limits

| Source | Comfortable | Maximum |
|--------|-------------|---------|
| **Document** | 1-100 pages | 300 pages / 20 MB |
| **Website** | Any article/blog | 50,000-word pages |
| **YouTube** | 5-60 min | Up to 3-4 hour videos |

Limits are enforced server-side with friendly error messages — no crashes on oversized uploads.

---

## 📁 Project Structure

```
TalkDox/
├── backend/
│   ├── main.py              # FastAPI entry point
│   ├── utils/
│   │   ├── agents.py        # Agentic RAG layers
│   │   ├── ai_helpers.py    # Gemini calls, embeddings
│   │   ├── pdf_processor.py # Document/web/YouTube ingestion
│   │   └── styles.py        # Response formatting
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx  # Landing page
│   │   │   ├── Upload.jsx   # Source upload
│   │   │   └── Chat.jsx     # Chat interface
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json
│   └── package.json
└── README.md
```

---

## 👨‍💻 Author

**Gautam Singh**

- 💼 LinkedIn: https://www.linkedin.com/in/gautamsingh139/
- 📧 Email: gautamsr46@gmail.com
- 🐙 GitHub: https://github.com/gautamsingh139

---

## 📄 License

MIT License - free to use, modify, and share.

---

## 🌟 Show Your Support

If TalkDox helped you:
- ⭐ Star this repo
- 🔀 Share with friends
- 🐛 Report bugs in Issues

Built with 💙 by Gautam Singh
