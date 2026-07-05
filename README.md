# ⚡ Quick Links Hub

A sleek, dark-mode personal launchpad for organizing and accessing your most-visited bookmarks. Built with vanilla HTML, CSS, and JS, featuring a secure admin mode, drag-and-drop reordering, and real-time search.

## Features
- **Real-time search & categorized filtering**
- **Secure Admin mode** for adding, editing, deleting, and reordering links
- **Drag-and-drop** functionality (Admin only)
- **Local storage persistence** with JSON Export/Import capabilities
- **Beautiful dark UI** with glassmorphism effects and dynamic favicons

---

## 🚀 Quick Start (Local Testing)

If you just want to run the app quickly on your own computer:

1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Run `npx serve .`
4. Open `http://localhost:3000` in your browser.

---

## 🌍 Production Deployment (Caddy)

To host this app permanently on a server machine (like an office intranet server or a cloud VPS) so that other users can access it, we recommend using **Caddy** as a lightweight web server.

### Step 1: Prepare the Server
Log into your remote server machine and ensure **Git** and **Caddy** are installed.
- **Windows:** Run `winget install Git.Git` and `winget install caddy`
- **Linux (Ubuntu):** Run `sudo apt install git` and follow the official Caddy installation docs.

### Step 2: Clone the Repository
Open a terminal on the server and navigate to the directory where you want the app to live, then clone the code:
```bash
git clone https://github.com/Daud-stack/quick-links.git
cd quick-links
```

### Step 3: Start the Server
Start Caddy in the background using the provided `Caddyfile`:
```bash
caddy start
```
*Your app is now live on the server!*

---

## 🔗 How Users Access the App

Depending on where your server is located, users will access the app in different ways:

1. **Office Network (Intranet):** Users type the server's local IPv4 address into their browser (e.g., `http://192.168.1.50:8080`).
2. **Cloud Server (VPS):** Users type the server's public IP address (e.g., `http://104.23.45.67:8080`).
3. **Custom Domain (Recommended):** Buy a domain (e.g., `links.mycompany.com`), point it to your server's IP, and update the `Caddyfile` to use your domain name instead of `:8080`. Caddy will automatically secure the site with HTTPS!

---

## 🔄 Updating the Live App

If you make code changes on your personal computer:
1. Push your changes to GitHub.
2. Log into the server machine.
3. Open a terminal in the `quick-links` folder and run `git pull`.

The live website will update immediately without needing to restart the Caddy server.

---

## 🔐 Admin Mode & Password

Editing rights (adding, deleting, reordering links) are restricted to the Administrator.
To unlock editing controls, click the **🔒 Lock icon** in the navigation bar.

**Default Password:** `Tehi1@`

### Changing the Admin Password
To change the password, you must generate a new SHA-256 hash:
1. Open your browser's Developer Console (`F12`).
2. Run this code, replacing `YOUR_NEW_PASSWORD`:
   ```javascript
   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_NEW_PASSWORD'))
     .then(h => console.log([...new Uint8Array(h)].map(b => b.toString(16).padStart(2,'0')).join('')))
   ```
3. Copy the resulting 64-character hash.
4. Open `app.js`, find the `ADMIN_PASSWORD_HASH` constant at the top of the file, and replace the old hash with your new one.
