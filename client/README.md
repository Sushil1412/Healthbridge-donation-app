# 🩸 HealthBridge Donation App

**HealthBridge** is a full-stack platform designed to streamline **blood** and **organ donation** between **donors**, **hospitals**, and **admins**. The system ensures real-time coordination, donor outreach, inventory tracking, and secure request processing — all aimed at saving lives with speed and transparency.

---

## 🚀 Project Overview

The platform has three main stakeholders:

### 🔐 Admin Panel
- Approves hospital registrations (no hospital can log in without approval).
- Maintains and monitors blood and organ **inventory**.
- Handles **requests** from hospitals for blood or organs.
  - ✅ If available in inventory → directly accepts the request and shares **collection details** with the hospital.
  - ❌ If **not available**, searches for **donors within a 50km radius** of the requesting hospital.
    - Sends **donation request** to those donors.
    - If a donor accepts, the admin shares donor info with the hospital for collection.
    
### 🏥 Hospital/Recipient Panel
- Register and await approval from the admin.
- Once approved, can:
  - Log in to portal.
  - Request blood or organ donations.
  - Get **donation details** after request acceptance.

### 🧑‍💼 Donor Panel
- Register and log in.
- Can pledge to **donate blood and/or organs**.
- Receive **donation requests** from admin.
  - If accepted, donor details are shared securely with the requesting hospital.

---

## ✨ Features

- 🔐 Role-based login: Admin, Hospital, Donor
- 📦 Blood & Organ Inventory Management (Admin Only)
- 📍 Smart radius-based donor search (within 50km)
- 🔁 Real-time status tracking for requests
- 📨 Donor notification system
- 👨‍⚕️ Hospital approval system
- 📈 Dashboard for requests, inventory & statistics

---

## 🛠️ Tech Stack

| Frontend        | Backend         | Database      | Other Tools         |
|----------------|----------------|----------------|---------------------|
| React.js        | Node.js         | MongoDB + Mongoose | JWT (Auth), Axios, Express |
| Tailwind CSS    | Express.js      |                | Geolocation API (for 50km radius donor search) |

Live at https://healthbridge-donation-app-frontend.onrender.com/

