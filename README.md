<img width="100%" src="https://capsule-render.vercel.app/api?type=venom&color=A855F7&height=200&section=header&text=%E2%9C%A6%20Lumina&fontSize=90&fontColor=ffffff&animation=twinkling&fontAlignY=45&desc=AI%20Assistant%20%C2%B7%20Command%20Deck%20%C2%B7%20Nebula%20Theme&descAlignY=68&descSize=18&descColor=E9D5FF"/>

<div align="center">

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=600&size=24&duration=3000&pause=800&color=A855F7&center=true&vCenter=true&width=740&height=60&lines=Not+a+ChatGPT+clone.+A+product+of+its+own.;Built+with+React+%C2%B7+Node.js+%C2%B7+MongoDB;Command+Deck+%C2%B7+Nebula+Theme+%C2%B7+Streaming+AI;Real-time+responses+%C2%B7+Multi-model+support" alt="Typing Animation"/>

<br/><br/>

![Status](https://img.shields.io/badge/Status-In%20Development-A855F7?style=for-the-badge&logo=statuspage&logoColor=white)
![Version](https://img.shields.io/badge/Version-0.1.0-22D3EE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-4ADE80?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-F472B6?style=for-the-badge)

</div>

---

## ✦ What is Lumina?

Lumina is a full-stack AI chat application built from the ground up. It supports real-time streaming responses, conversation history, markdown rendering, code highlighting, and multi-model AI — all wrapped in a **completely original interface** that looks nothing like ChatGPT, Claude, or Gemini.

---

## 🎨 The Interface — Command Deck

<div align="center">
<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=14&duration=2500&pause=500&color=22D3EE&center=true&vCenter=true&width=600&height=40&lines=No+clutter.+No+copy.+Just+the+conversation." alt=""/>
</div>

> Most AI apps follow the same layout: sidebar on the left, chat in the middle, input at the bottom. **Lumina breaks that pattern.**

| Feature | Description |
|---|---|
| 🗂️ **Collapsible Sidebar** | Recent chats always visible, collapses to icon-only mode with one click to reclaim space |
| 🖥️ **Full-width Canvas** | The chat area breathes — nothing cramped, nothing cluttered |
| ⌨️ **Command Palette Input** | Bottom-anchored input bar inspired by VS Code ⌘K and Spotlight Search |
| ✨ **Micro Animations** | Streaming text with a blinking cursor, smooth transitions, typing indicator |

---

## 🌌 Design System — Nebula

> Deep cosmic black · vivid violet · hot pink · electric cyan

<div align="center">

![](https://img.shields.io/badge/%23070312-Background-070312?style=for-the-badge&labelColor=070312)
![](https://img.shields.io/badge/%23A855F7-Primary%20Violet-A855F7?style=for-the-badge&labelColor=A855F7)
![](https://img.shields.io/badge/%23F472B6-Hot%20Pink-F472B6?style=for-the-badge&labelColor=F472B6)
![](https://img.shields.io/badge/%2322D3EE-Electric%20Cyan-22D3EE?style=for-the-badge&labelColor=22D3EE)
![](https://img.shields.io/badge/%234ADE80-Electric%20Green-4ADE80?style=for-the-badge&labelColor=4ADE80)
![](https://img.shields.io/badge/%23FCD34D-Code%20Gold-FCD34D?style=for-the-badge&labelColor=FCD34D)

</div>

<br/>

**Typography:** `Space Grotesk` for UI &nbsp;·&nbsp; `JetBrains Mono` for code

---

## ⚡ Features

<div align="center">

| Core | Advanced |
|---|---|
| ✦ User auth — register, login, JWT | ✦ Image upload support |
| ✦ Real-time streaming via SSE | ✦ Search past conversations |
| ✦ Full conversation history | ✦ Export as `.txt` or `.md` |
| ✦ Markdown rendering | ✦ Multiple AI model selector |
| ✦ Code highlighting + copy button | ✦ Regenerate response |
| ✦ Collapsible sidebar | ✦ Dark / Light theme toggle |
| ✦ Fully responsive design | ✦ Conversation pinning |

</div>

---

## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,mongodb,js,git&theme=dark&perline=8"/>

<br/><br/>

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| AI Engine | Claude API / OpenAI API |
| Auth | JWT + bcrypt |
| Streaming | Server-Sent Events (SSE) |
| Deployment | Vercel · Railway |

</div>

---

## 📁 Project Structure
````
lumina/
├── client/ # React frontend (Vite)
│ └── src/
│ ├── components/
│ │ ├── Auth/ # Login, Register
│ │ ├── Chat/ # Messages, Input, Streaming
│ │ ├── Layout/ # Navbar, Sidebar, Canvas
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
````

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/IbrahimAltaf78/Lumina.git
cd Lumina

# Copy environment variables
cp .env.example .env
# Fill in your API keys in .env

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Start the backend
cd ../server && npm run dev

# Start the frontend (new terminal)
cd ../client && npm run dev
```

---

## 🗺️ Roadmap

- [x] Project setup and folder structure
- [x] Interface design — Command Deck + collapsible sidebar
- [x] Design system — Nebula color scheme
- [x] Express server running on port 5000
- [x] MongoDB Atlas connected — lumina-cluster
- [x] Database models — User, Conversation, Message
- [ ] Auth system — register, login, JWT middleware
- [ ] Frontend — core UI, Nebula theme, auth pages
- [ ] AI integration — Claude API + streaming
- [ ] Advanced features — upload, search, export
- [ ] Deploy to Vercel + Railway

---

## 👤 Author

<div align="center">

**Ibrahim Altaf (Ibby)**

Full-Stack Developer &nbsp;·&nbsp; BS Cybersecurity, UMT Lahore

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-IbrahimAltaf78-A855F7?style=for-the-badge&logo=github&logoColor=white)](https://github.com/IbrahimAltaf78)

</div>

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0:F472B6,50:A855F7,100:070312&height=130&section=footer&text=Built%20with%20intention.%20Designed%20to%20be%20different.&fontSize=16&fontColor=ffffff&fontAlignY=65&animation=fadeIn"/>