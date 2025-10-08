# 🧠 Minecraft AFK Bot with AuthMe and Server Selector


<p align="center">
  <img src="https://img.shields.io/badge/Made%20by-Alberto%20Drake-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Minecraft-Java%20Edition-green?style=for-the-badge&logo=minecraft">
  <img src="https://img.shields.io/github/stars/yourusername/minecraft-afk-bot?style=for-the-badge&color=yellow">
  <img src="https://img.shields.io/github/forks/yourusername/minecraft-afk-bot?style=for-the-badge&color=orange">
  <img src="https://img.shields.io/github/license/yourusername/minecraft-afk-bot?style=for-the-badge&color=red">
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

🧾 Configuration
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


▶️ Running the Bot
```
node bot-authme-first.js

```

⚡ Advanced Usage
🧭 Customize pathfinding coordinates for your AFK spot

💬 Enable periodic chat messages for server presence

⏱️ Modify timing delays for joining servers or retrying AuthMe login

🧩 Extend functionality with custom Mineflayer plugins

🧰 Requirements
Node.js v18+

Minecraft Java Edition 1.18+

AuthMe plugin on the target server

(Optional) BungeeCord or Multiplex network setup

🧑‍💻 Contributing
Contributions are welcome!
Submit issues and pull requests to improve features or fix bugs.
Please follow best practices and ensure backward compatibility.

⚖️ License
This project is licensed under the MIT License.
See the LICENSE file for details.

💎 Acknowledgments
Mineflayer Project

AuthMe Reloaded Plugin

Prismarine.js Ecosystem

📞 Contact
Created and maintained by:
👤 Alberto Drake
💬 For inquiries or collaborations, reach out via GitHub Issues or Discussions.

⭐ If you like this project, don’t forget to give it a star!
Your support motivates future updates and improvements. 🌟
