# Lumina ✦

> A full-featured AI assistant with an original Command Deck interface.

Built with React, Node.js, MongoDB, and the Claude API.

## Status
🚧 In active development — v1.0 coming soon.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- AI: Claude API / OpenAI API
- Auth: JWT + bcrypt
- Deploy: Vercel + Railway

## Getting Started
_Setup guide coming soon._

<div align="center">

# ✦ Lumina

### A full-featured AI assistant with its own original interface.
Not a ChatGPT clone. A product of its own.

![Status](https://img.shields.io/badge/Status-In_Development-A855F7?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React_·_Node.js_·_MongoDB-22D3EE?style=flat-square)
![AI](https://img.shields.io/badge/AI-Claude_·_OpenAI-F472B6?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-4ADE80?style=flat-square)

</div>

---

## What is Lumina?

Lumina is a full-stack AI chat application built from scratch. It supports
real-time streaming responses, conversation history, markdown rendering,
code highlighting, and multi-model AI — all wrapped in a completely
original interface that looks nothing like ChatGPT, Claude, or Gemini.

---

## The Interface — Command Deck

Most AI apps follow the same layout: sidebar on the left, chat in the
middle, input at the bottom of the chat panel. Lumina breaks that pattern.

**Command Deck** is Lumina's interface concept:

- **Collapsible sidebar** — recent chats always visible, collapses 
  to icon-only mode with one click to reclaim screen space,
  keeping the main canvas completely distraction-free
- **Full-width dark canvas** — the chat area breathes, messages have
  space, nothing feels cramped
- **Bottom-anchored command palette** — the input bar sits at the bottom
  of the screen, centered, inspired by VS Code's ⌘K and Spotlight Search
- **Micro animations** — streaming text with a blinking cursor, smooth
  message transitions, a typing indicator that feels alive

---

## Design System — Nebula

Lumina uses a custom dark theme called **Nebula** — deep cosmic black
with vivid violet, hot pink, and electric cyan accents.

| Token | Value | Role |
|---|---|---|
| Background | `#070312` | Deep cosmic black |
| Surface | `#100B24` | Cards and panels |
| Border | `#2D1D5E` | Violet borders |
| Primary | `#A855F7` | Vivid violet — buttons, icons, accents |
| Pink | `#F472B6` | Hot pink — code keywords, highlights |
| Cyan | `#22D3EE` | Electric cyan — function names, links |
| Green | `#4ADE80` | Electric green — success, status |
| Gold | `#FCD34D` | Code strings and values |
| Text | `#F8FAFC` | Near white |
| Dim | `#E9D5FF` | Light violet — secondary text |

**Typography:**
- Headings & UI — `Space Grotesk`
- Code & labels — `JetBrains Mono`

---

## Features

- ✦ User authentication (register, login, JWT sessions)
- ✦ Real-time streaming AI responses via Server-Sent Events
- ✦ Full conversation history — save, load, delete
- ✦ Markdown rendering with `react-markdown`
- ✦ Code syntax highlighting with copy button
- ✦ Image upload support
- ✦ Search through past conversations
- ✦ Export conversations as `.txt` or `.md`
- ✦ Multiple AI model selector (Claude / GPT-4o)
- ✦ Regenerate response with one click
- ✦ Dark / Light theme toggle
- ✦ Fully responsive — mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| AI Engine | Claude API / OpenAI API |
| Auth | JWT + bcrypt |
| Streaming | Server-Sent Events (SSE) |
| Deployment | Vercel (frontend) · Railway (backend) |

---

## Project Structure
```
lumina/
├── client/ # React frontend
│ └── src/
│ ├── components/
│ │ ├── Auth/ # Login, Register
│ │ ├── Chat/ # Messages, Input, Streaming
│ │ ├── Layout/ # Navbar, Overlay, Canvas
│ │ └── UI/ # Button, Modal, Tooltip
│ ├── pages/
│ ├── hooks/
│ ├── context/
│ ├── services/ # API calls
│ └── utils/
│
└── server/ # Node.js backend
├── controllers/
├── routes/
├── models/ # User, Conversation, Message
├── middleware/
└── config/ # DB and AI client
```
---

## Getting Started

> Full setup guide coming in v1.0. For now:

```bash
# Clone the repo
git clone https://github.com/IbrahimAltaf78/lumina.git
cd lumina

# Copy environment variables
cp .env.example .env
# Fill in your API keys in .env

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

---

## Roadmap

- [x] Project setup and folder structure
- [x] Interface design — Command Deck concept
- [x] Design system — Nebula color scheme
- [ ] Backend — auth, database, conversation API
- [ ] Frontend — core UI and auth pages
- [ ] AI integration and streaming
- [ ] Advanced features (upload, search, export)
- [ ] Deploy to Vercel + Railway

---

## Author

**Ibrahim Altaf (Ibby)**
Full-Stack Developer · BS Cybersecurity, UMT Lahore

[![GitHub](https://img.shields.io/badge/GitHub-IbrahimAltaf78-A855F7?style=flat-square&logo=github)](https://github.com/IbrahimAltaf78)

---

<div align="center">
Built with intention. Designed to be different.
</div>