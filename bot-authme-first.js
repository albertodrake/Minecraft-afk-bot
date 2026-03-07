const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');

// Configuration - Edit these values for your server
const config = {
  server: {
    host: 'luis_201332.aternos.me', // Change to your server IP
    port: 42617,
    version: '1.21.11' // Change to your server version
  },
  bot: {
    username: 'AFKBot', // Change to your desired bot name
    auth: 'mojang', // 'offline', 'microsoft', or 'mojang'
    password: '', // Minecraft account password (if using premium auth)
    authmePassword: 'luis_201332' // AuthMe password for /register and /login
  },
  serverCommands: {
    enabled: true,
    joinServer: '/server survival', // Command to join specific server AFTER AuthMe
    delay: 3000 // Wait 3 seconds after AuthMe before sending server command
  },
  features: {
    autoReconnect: {
      enabled: true,
      delay: 5000
    },
    movement: {
      enabled: true,
      coordinates: {
        x: 0, // Change to your desired AFK coordinates
        y: 64,
        z: 0
      }
    },
    antiAFK: {
      enabled: true,
      jump: true,
      sneak: false,
      look: true,
      interval: 30000 // 30 seconds
    },
    chatMessages: {
      enabled: false,
      interval: 300000, // 5 minutes
      messages: [
        'Still here!',
        'AFK farming...',
        'Bot is active'
      ]
    },
    chatLog: {
      enabled: true
    }
  }
};

let bot;
let isAuthenticated = false;
let loginAttempts = 0;
let serverJoined = false;
let authmeCompleted = false;
const maxLoginAttempts = 3;

function createBot() {
  console.log('🤖 Creating bot...');
  
  const botOptions = {
    host: config.server.host,
    port: config.server.port,
    username: config.bot.username,
    version: config.server.version,
    hideErrors: false
  };

  // Add authentication based on type
  if (config.bot.auth === 'microsoft') {
    botOptions.auth = 'microsoft';
  } else if (config.bot.auth === 'mojang' && config.bot.password) {
    botOptions.password = config.bot.password;
    botOptions.auth = 'mojang';
  } else {
    botOptions.auth = 'offline';
  }

  bot = mineflayer.createBot(botOptions);

  // Load pathfinder plugin
  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    console.log(`✅ Bot ${bot.username} successfully joined the server!`);
    
    // Reset all status variables
    isAuthenticated = false;
    loginAttempts = 0;
    serverJoined = false;
    authmeCompleted = false;
    
    // Set up movement settings
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);

    // FIRST: Attempt AuthMe authentication
    console.log('📋 Step 1: Starting AuthMe authentication...');
    setTimeout(() => {
      attemptAuthMeLogin();
    }, 3000);
  });

  // Manual AuthMe authentication handling
  bot.on('chat', (username, message, translate, jsonMsg, matches) => {
    if (config.features.chatLog.enabled && username !== bot.username) {
      console.log(`💬 [${username}] ${message}`);
    }

    // Handle server messages for AuthMe
    if (username === bot.username) return;

    const lowerMessage = message.toLowerCase();
    
    // Server join success detection (for survival server)
    if (serverJoined && lowerMessage.includes('survival') && 
        (lowerMessage.includes('joined') || lowerMessage.includes('connected') || lowerMessage.includes('welcome'))) {
      console.log('🌍 Successfully joined survival server!');
      console.log('📋 Step 3: Starting bot activities...');
      setTimeout(startBotActivities, 2000);
    }
    
    // Common AuthMe registration messages
    if ((lowerMessage.includes('register') || lowerMessage.includes('registration')) && 
        (lowerMessage.includes('password') || lowerMessage.includes('/register') || lowerMessage.includes('command'))) {
      console.log('🔐 Registration required detected');
      setTimeout(() => {
        const password = config.bot.authmePassword;
        bot.chat(`/register ${password} ${password}`);
        console.log('📝 Sent registration command');
      }, 1500);
    }
    
    // Common AuthMe login messages
    else if ((lowerMessage.includes('login') || lowerMessage.includes('log in')) && 
             (lowerMessage.includes('password') || lowerMessage.includes('/login') || lowerMessage.includes('command'))) {
      console.log('🔑 Login required detected');
      setTimeout(() => {
        bot.chat(`/login ${config.bot.authmePassword}`);
        console.log('🔓 Sent login command');
        loginAttempts++;
      }, 1500);
    }
    
    // AuthMe Success messages - THEN join survival server
    else if ((lowerMessage.includes('successfully') || lowerMessage.includes('welcome') || lowerMessage.includes('logged')) && 
             (lowerMessage.includes('logged') || lowerMessage.includes('registered') || lowerMessage.includes('authenticated'))) {
      console.log('✅ AuthMe authentication successful!');
      isAuthenticated = true;
      authmeCompleted = true;
      
      // NOW join the survival server after AuthMe success
      if (config.serverCommands.enabled && config.serverCommands.joinServer) {
        console.log('📋 Step 2: AuthMe completed, now joining survival server...');
        setTimeout(() => {
          joinSpecificServer();
        }, config.serverCommands.delay);
      } else {
        // If no server command, just start activities
        setTimeout(startBotActivities, 2000);
      }
    }
    
    // Failed login messages
    else if (lowerMessage.includes('wrong password') || 
             lowerMessage.includes('incorrect password') || 
             lowerMessage.includes('invalid password')) {
      console.log('❌ AuthMe login failed - wrong password');
      if (loginAttempts < maxLoginAttempts) {
        console.log(`🔄 Retrying login (${loginAttempts}/${maxLoginAttempts})...`);
        setTimeout(() => {
          bot.chat(`/login ${config.bot.authmePassword}`);
          loginAttempts++;
        }, 3000);
      } else {
        console.log('🚫 Max login attempts reached');
      }
    }
    
    // Timeout messages
    else if (lowerMessage.includes('timeout') || 
             (lowerMessage.includes('time') && lowerMessage.includes('up')) ||
             lowerMessage.includes('too slow')) {
      console.log('⏰ AuthMe timeout detected');
      if (!authmeCompleted) {
        setTimeout(attemptAuthMeLogin, 2000);
      }
    }

    // Already registered messages
    else if (lowerMessage.includes('already') && lowerMessage.includes('registered')) {
      console.log('ℹ️ Already registered, attempting login...');
      setTimeout(() => {
        bot.chat(`/login ${config.bot.authmePassword}`);
        console.log('🔓 Sent login command after registration notice');
      }, 1500);
    }

    // Error messages that might indicate we need to try AuthMe again
    else if (lowerMessage.includes('not authenticated') || lowerMessage.includes('please login')) {
      console.log('⚠️ Authentication required message detected');
      if (!authmeCompleted) {
        setTimeout(attemptAuthMeLogin, 1000);
      }
    }
  });

  bot.on('error', (err) => {
    console.error('❌ Bot error:', err.message);
  });

  bot.on('kicked', (reason) => {
    console.log('⚠️ Bot was kicked:', reason);
    if (config.features.autoReconnect.enabled) {
      console.log(`🔄 Reconnecting in ${config.features.autoReconnect.delay / 1000} seconds...`);
      setTimeout(createBot, config.features.autoReconnect.delay);
    }
  });

  bot.on('end', () => {
    console.log('🔌 Bot disconnected from server');
    if (config.features.autoReconnect.enabled) {
      console.log(`🔄 Reconnecting in ${config.features.autoReconnect.delay / 1000} seconds...`);
      setTimeout(createBot, config.features.autoReconnect.delay);
    }
  });

  bot.on('death', () => {
    console.log('💀 Bot died and respawned');
    setTimeout(() => {
      if (authmeCompleted && serverJoined) {
        startBotActivities();
      } else if (authmeCompleted && !serverJoined) {
        joinSpecificServer();
      } else {
        attemptAuthMeLogin();
      }
    }, 3000);
  });

  // Handle pathfinder events
  bot.on('goal_reached', () => {
    console.log('🎯 Reached target location!');
  });

  bot.on('path_update', (r) => {
    if (r && r.visitedNodes && r.time) {
      const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2);
      console.log(`🗺️ Pathfinding: ${r.visitedNodes} nodes, ${nodesPerTick} nodes/s, ${r.time.toFixed(2)} ms`);
    }
  });

  return bot;
}

function joinSpecificServer() {
  console.log(`🌍 Now joining survival server with: ${config.serverCommands.joinServer}`);
  
  bot.chat(config.serverCommands.joinServer);
  console.log(`📤 Sent server join command: ${config.serverCommands.joinServer}`);
  serverJoined = true;

  // If no response indicating successful server join after 10 seconds, start activities anyway
  setTimeout(() => {
    if (authmeCompleted && !serverJoined) {
      console.log('⚠️ No server join confirmation, starting activities anyway...');
      startBotActivities();
    }
  }, 10000);
}

function attemptAuthMeLogin() {
  if (authmeCompleted) {
    console.log('ℹ️ AuthMe already completed, skipping...');
    return;
  }

  console.log('🔐 Attempting AuthMe authentication...');
  
  // Try registration first, then login
  setTimeout(() => {
    const password = config.bot.authmePassword;
    bot.chat(`/register ${password} ${password}`);
    console.log('📝 Attempted registration');
  }, 2000);
  
  setTimeout(() => {
    bot.chat(`/login ${config.bot.authmePassword}`);
    console.log('🔑 Attempted login');
    loginAttempts++;
  }, 4000);
  
  // If no AuthMe response after 15 seconds, assume it's completed and proceed
  setTimeout(() => {
    if (!authmeCompleted) {
      console.log('⚠️ No AuthMe response detected, assuming authentication completed...');
      isAuthenticated = true;
      authmeCompleted = true;
      
      if (config.serverCommands.enabled && config.serverCommands.joinServer) {
        console.log('📋 Step 2: Proceeding to join survival server...');
        setTimeout(() => {
          joinSpecificServer();
        }, config.serverCommands.delay);
      } else {
        startBotActivities();
      }
    }
  }, 15000);
}

function startBotActivities() {
  if (!authmeCompleted) {
    console.log('⚠️ Cannot start activities - AuthMe not completed yet');
    return;
  }
  
  console.log('🎮 Starting bot activities on survival server...');
  
  // Move to specified coordinates
  if (config.features.movement.enabled) {
    const { x, y, z } = config.features.movement.coordinates;
    console.log(`🚶 Moving to coordinates: ${x}, ${y}, ${z}`);
    
    try {
      const goal = new goals.GoalBlock(x, y, z);
      bot.pathfinder.setGoal(goal);
    } catch (error) {
      console.log('⚠️ Pathfinding error:', error.message);
    }
  }

  // Start anti-AFK activities
  if (config.features.antiAFK.enabled) {
    console.log('🎯 Starting anti-AFK activities');
    startAntiAFK();
  }

  // Start chat messages
  if (config.features.chatMessages.enabled) {
    console.log('💭 Starting periodic chat messages');
    startChatMessages();
  }
}

function startAntiAFK() {
  const antiAfkConfig = config.features.antiAFK;
  
  setInterval(() => {
    if (!bot || !bot._client || bot._client.state !== 'play') return;
    
    try {
      if (antiAfkConfig.jump) {
        bot.setControlState('jump', true);
        setTimeout(() => {
          if (bot && bot.setControlState) {
            bot.setControlState('jump', false);
          }
        }, 100);
      }
      
      if (antiAfkConfig.sneak) {
        bot.setControlState('sneak', true);
        setTimeout(() => {
          if (bot && bot.setControlState) {
            bot.setControlState('sneak', false);
          }
        }, 200);
      }
      
      if (antiAfkConfig.look) {
        const yaw = (Math.random() - 0.5) * Math.PI;
        const pitch = (Math.random() - 0.5) * Math.PI / 2;
        bot.look(yaw, pitch);
      }
      
      console.log('🔄 Anti-AFK action performed');
    } catch (error) {
      console.log('⚠️ Anti-AFK error (bot may be disconnected):', error.message);
    }
  }, antiAfkConfig.interval);
}

function startChatMessages() {
  const chatConfig = config.features.chatMessages;
  let messageIndex = 0;
  
  setInterval(() => {
    if (!bot || !bot._client || bot._client.state !== 'play') return;
    
    try {
      if (chatConfig.messages.length > 0 && authmeCompleted) {
        bot.chat(chatConfig.messages[messageIndex]);
        console.log(`💬 Sent chat message: ${chatConfig.messages[messageIndex]}`);
        messageIndex = (messageIndex + 1) % chatConfig.messages.length;
      }
    } catch (error) {
      console.log('⚠️ Chat message error (bot may be disconnected):', error.message);
    }
  }, chatConfig.interval);
}

// Start the bot
console.log('🤖 Starting Minecraft AFK Bot with correct AuthMe → Server flow...');
console.log('📋 Bot Flow:');
console.log('   1️⃣ Connect to server');
console.log('   2️⃣ Complete AuthMe authentication');
console.log('   3️⃣ Join survival server (/server survival)');
console.log('   4️⃣ Start AFK activities');
console.log('');
console.log('📋 Configuration:');
console.log(`   Server: ${config.server.host}:${config.server.port}`);
console.log(`   Version: ${config.server.version}`);
console.log(`   Username: ${config.bot.username}`);
console.log(`   Auth: ${config.bot.auth}`);
console.log(`   AuthMe Password: ${config.bot.authmePassword ? '[SET]' : '[NOT SET - PLEASE CONFIGURE]'}`);
console.log(`   Server Command: ${config.serverCommands.enabled ? config.serverCommands.joinServer : 'Disabled'}`);
console.log(`   Movement: ${config.features.movement.enabled ? 'Enabled' : 'Disabled'}`);
console.log(`   Anti-AFK: ${config.features.antiAFK.enabled ? 'Enabled' : 'Disabled'}`);
console.log('');

if (config.bot.authmePassword === 'change_this_password') {
  console.log('⚠️  WARNING: Please change the AuthMe password in the configuration!');
  console.log('');
}

createBot();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down bot...');
  if (bot) {
    bot.quit('Bot shutting down');
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down bot...');
  if (bot) {
    bot.quit('Bot shutting down');
  }
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  if (config.features.autoReconnect.enabled) {
    console.log('🔄 Restarting bot due to uncaught exception...');
    setTimeout(createBot, 5000);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});
