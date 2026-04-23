# SkillSwap.uz

Welcome to **SkillSwap.uz**, a peer-to-peer student skill exchange platform. 

## ✨ Key Features

*   **Secure Auth**: Register and login with university credentials.
*   **Intelligent Matching**: Discovers users based on skill complementarity.
*   **AI Skill Verification**: Verify your expertise by linking your GitHub portfolio.
*   **Real-time Chat**: Connect and collaborate instantly after matching.
*   **Premium Dashboard**: A sleek, student-focused interface.

## 🛠 Project Structure

```text
├── backend/           # NestJS + Prisma + Socket.io
└── frontend/          # Next.js + Vanilla CSS + Socket.io-client
```

## 🚀 Quick Start

### Prerequisites

*   Node.js (v18+)
*   PostgreSQL
*   npm

### 1. Initial Setup

Install all dependencies (root, backend, and frontend):

```bash
npm run install:all
```

### 2. Run Both (Recommended)

You can run both the backend and frontend simultaneously from the root directory:

```bash
npm run dev
```

### 3. Run Separately (Manual)

If you prefer to run them in separate terminals:

**Backend:**
```bash
cd backend
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🧩 Architecture

*   **Backend**: Modular architecture with separate modules for `Auth`, `Skills`, `Matches`, and `Chat`.
*   **Matching**: Uses an intelligent scoring system based on skill relevance and verification status.
*   **Design**: Premium design tokens defined in `globals.css` with a custom dark-theme aesthetic.

---

Built with ❤️ for students in Uzbekistan.
