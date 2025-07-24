# 🩸 HealthBridge Donation App

**HealthBridge** is a full-stack donation management platform that connects **donors**, **hospitals**, and **admins** to facilitate secure and efficient **blood** and **organ** donation. The system prioritizes availability, locality, and approval-based control to ensure transparency and life-saving coordination.

---

## 🌐 Live Demo

🚀 [Click here to visit the live app](https://healthbridge-donation-app-frontend.onrender.com/)

> _Note: Replace the above link with your actual deployed link._

---

## 🚀 Project Overview

The platform supports three main user roles:

### 🔐 Admin Panel
- Approves hospital registrations (mandatory for access).
- Maintains **blood and organ inventory**.
- Manages incoming **requests** from hospitals.
  - ✅ If the requested item is **available**, it shares collection info with the hospital.
  - ❌ If **unavailable**, the system searches for **donors within 50km** of the recipient hospital.
    - Sends request to potential donors.
    - Once a donor accepts, admin shares their info with the hospital.

### 🏥 Hospital/Recipient Panel
- Register and wait for admin approval.
- After approval:
  - Log in to request **blood or organ**.
  - Receive donor/collection details after admin processes the request.

### 🧑‍💼 Donor Panel
- Register and pledge to donate **blood** and/or **organs**.
- Receive donation requests from admin.
  - Can accept/reject requests.
  - On acceptance, details are securely shared with the requesting hospital.

---

## ✨ Key Features

- 🔐 Role-based login: **Admin**, **Hospital**, **Donor**
- 🧾 Inventory management system for blood & organs
- 📍 Radius-based donor matching (within 50km)
- 📨 Donor request system with response tracking
- 👨‍⚕️ Hospital approval workflow
- 📈 Real-time dashboard for monitoring and stats

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Database      | Other Tools           |
|----------------|-----------------|---------------|------------------------|
| React.js        | Node.js         | MongoDB + Mongoose | JWT Auth, Axios, Express |
| Tailwind CSS    | Express.js      |               | Google Maps API (for 50km radius logic) |



### 🔧 Prerequisites

- Node.js (v14+)
- MongoDB Atlas/local
- Git

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/HealthBridge-donation-app.git
cd HealthBridge-donation-app
