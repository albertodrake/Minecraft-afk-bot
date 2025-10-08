# Minecraft-afk-bot
Minecraft AFK Bot with AuthMe and Server Selector
![Minecraft Banner](https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft

This is a sophisticated Minecraft AFK bot built with Mineflayer, featuring:

Full AuthMe plugin compatibility for secure server authentication

Automatic server switching with custom commands (e.g., /server survival)

Smart anti-AFK mechanisms to keep the bot active

Robust auto-reconnect and error handling

Easy configuration for any Minecraft server version

Designed to work flawlessly on Minecraft Java Edition networks running AuthMe and BungeeCord/Multiplex server networks

Features
AuthMe Authentication: Automatic registration and login handling via chat detection with retries.

Server Selector Command: Joins designated server after authentication using custom commands like /server survival.

Anti-AFK: Periodic jumps, sneaks, and random looks to prevent disconnection.

Movement: Pathfinding to configured coordinates for AFK spot.

Auto Reconnect: Re-establishes connection if disconnected or kicked.

Chat Logging and Messaging: Logs chat and can periodically send messages.

Cross-Platform: Runs on Windows, Linux, Docker containers, and Pterodactyl panels.

Usage
Installation


bash
git clone https://github.com/yourusername/minecraft-afk-bot.git
cd minecraft-afk-bot
npm install
Configuration
Edit the bot-authme-first.js file for these settings:



json
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
Run the Bot


bash
node bot-authme-first.js
Advanced Usage
Customize pathfinding coordinates for your AFK spot.

Enable chat messaging for periodic presence updates.

Modify delay timings for server joining and authentication retries.

Easily extend with custom Minecraft bot features using Mineflayer plugins.

Requirements
Node.js v18 or higher

Minecraft Java Edition 1.8 or above compatible server

AuthMe plugin installed server-side for authentication

BungeeCord/Multiplex network for server switching (optional)

Contributing
Feel free to submit issues and pull requests for improvements or bug fixes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Mineflayer Project

AuthMe Reloaded Plugin

Prismarine.js Ecosystem

Contact
Created and maintained by Alberto Drake
