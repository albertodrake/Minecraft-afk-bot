
# 🧠 Minecraft AFK Bot with AuthMe and Server Selector
# Minecraft AFK Bot


<p align="center">
  <a href="https://github.com/albertodrake/minecraft-afk-bot/stargazers">
    <img src="https://img.shields.io/github/stars/albertodrake/minecraft-afk-bot?style=for-the-badge&color=yellow" alt="GitHub stars">
  </a>
  <a href="https://github.com/albertodrake/minecraft-afk-bot/network/members">
    <img src="https://img.shields.io/github/forks/albertodrake/minecraft-afk-bot?style=for-the-badge&color=orange" alt="GitHub forks">
  </a>
  <a href="https://github.com/albertodrake/minecraft-afk-bot/watchers">
    <img src="https://img.shields.io/github/watchers/albertodrake/minecraft-afk-bot?style=for-the-badge&color=blue" alt="GitHub watchers">
  </a>
  <a href="https://github.com/albertodrake/minecraft-afk-bot/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/albertodrake/minecraft-afk-bot?style=for-the-badge&color=red" alt="License">
  </a>
  <a href="https://github.com/albertodrake/minecraft-afk-bot/commits/main">
    <img src="https://img.shields.io/github/last-commit/albertodrake/minecraft-afk-bot?style=for-the-badge&color=brightgreen" alt="Last Commit">
  </a>
  <a href="https://github.com/albertodrake/minecraft-afk-bot">
    <img src="https://img.shields.io/github/languages/code-size/albertodrake/minecraft-afk-bot?style=for-the-badge&color=purple" alt="Code Size">
  </a>
  <a href="https://shields.io/" target="_blank">
        <img src="https://img.shields.io/badge/clones-123-blue.svg?style=for-the-badge" alt="Clones" />
    </a>
    <a href="https://shields.io/" target="_blank">
        <img src="https://img.shields.io/badge/views-456-orange.svg?style=for-the-badge" alt="Views" />
    </a>
    <img src="https://img.shields.io/badge/code%20size-12345%20lines-success.svg?style=for-the-badge" alt="Code Size" />
</p>

---
## 🚀 Overview
This is a **sophisticated Minecraft AFK bot** built with [Mineflayer](https://github.com/PrismarineJS/mineflayer), featuring:
- ✅ **Full AuthMe plugin compatibility** for secure authentication  
- 🔁 **Automatic server switching** with custom commands (e.g., `/server survival`)  
- 💤 **Smart anti-AFK mechanisms** to stay active  
- ⚙️ **Robust auto-reconnect and error handling**  
- 🧩 **Easy configuration** for any Minecraft server version  
- 🌍 **Designed for networks** using AuthMe + BungeeCord/Multiplex  
---
## ✨ Features
| Feature | Description |
|----------|-------------|
| 🔐 **AuthMe Authentication** | Auto register/login via chat detection and retry logic |
| 🌐 **Server Selector** | Automatically join servers using commands like `/server survival` |
| 💤 **Anti-AFK System** | Periodic jumps, sneaks, and random looks to avoid kick |
| 🧭 **Movement & Pathfinding** | Moves to configured AFK coordinates using Mineflayer pathfinder |
| 🔁 **Auto Reconnect** | Reconnects automatically after disconnection or kick |
| 💬 **Chat Logging** | Logs chat messages and can send periodic updates |
| 🧩 **Cross-Platform Support** | Works on Windows, Linux, Docker, and Pterodactyl panels |
---
## ⚙️ Installation
```bash
git clone https://github.com/albertodrake/minecraft-afk-bot.git
cd minecraft-afk-bot
npm install
```
## 🧾 Configuration
Edit the bot-authme-first.js file with your own settings:
```
{
  "server": {
    "host": "your.minecraft.server.ip",
    "port": 25565,
    "version": "1.20.4"
  },
  "bot": {
    "username": "YourBotName",
    "auth": "offline",
    "authmePassword": "YourAuthMePassword"
  },
  "serverCommands": {
    "enabled": true,
    "joinServer": "/server survival",
    "delay": 3000
  },
  "features": {
    "movement": {
      "enabled": true,
      "coordinates": {
        "x": 100,
        "y": 65,
        "z": 100
      }
    },
    "antiAFK": {
      "enabled": true,
      "jump": true,
      "sneak": false,
      "look": true,
      "interval": 30000
    },
    "chatMessages": {
      "enabled": false,
      "interval": 300000,
      "messages": ["Still here!", "AFK farming...", "Bot is active"]
    }
  }
}
```
## ▶️ Running the Bot
```
node bot-authme-first.js
```
## ⚡ Advanced Usage
🧭 Customize pathfinding coordinates for your AFK spot
💬 Enable periodic chat messages for server presence
⏱️ Modify timing delays for joining servers or retrying AuthMe login
🧩 Extend functionality with custom Mineflayer plugins
## 🧰 Requirements
Node.js v18+
Minecraft Java Edition 1.18+
AuthMe plugin on the target server
(Optional) BungeeCord or Multiplex network setup
## 🧑‍💻 Contributing
Contributions are welcome!
Submit issues and pull requests to improve features or fix bugs.
Please follow best practices and ensure backward compatibility.
## ⚖️ License
This project is licensed under the MIT License.
See the LICENSE file for details.
💎 Acknowledgments
Mineflayer Project
AuthMe Reloaded Plugin
Prismarine.js Ecosystem
## 📞 Contact
Created and maintained by:
👤 Alberto Drake
💬 For inquiries or collaborations, reach out via GitHub Issues or Discussions.
⭐ If you like this project, don’t forget to give it a star!
Your support motivates future updates and improvements. 🌟
