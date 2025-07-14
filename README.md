# 🪙 Bitcoin Loan Platform – Decentralized Bitcoin-Backed Loan System

A decentralized finance (DeFi) platform that allows users to take out loans backed by Bitcoin, without needing to sell their BTC. Built entirely on the **Internet Computer Protocol (ICP)**, the platform uses **Rust canisters** and **React frontend**, authenticated with Internet Identity.

---

## 💻 Tech Stack

- 🔐 **ICP Internet Identity** – Secure, passwordless login
- ⚙️ **Rust Canisters** – Backend smart contracts deployed on the Internet Computer
- ⚛️ **React.js** – Frontend with real-time UI
- 🔌 **Candid + dfx + agent-js** – Communication between frontend and backend
- 📦 **npm workspaces** – Monorepo support for managing frontend/backend together

---

## 🚀 Features

- Login via Internet Identity (ICP)
- Request loans using BTC as collateral
- Repay existing loans
- Live BTC price feed integration
- Release collateral upon repayment
- View transaction history
- Real-time notifications and error handling

---

## 🛠️ Getting Started

### 📦 Clone and Setup

```bash
git clone https://github.com/Eshrathsubhani/bitcoin-loan-platform.git
cd bitcoin-loan-platform
npm install
