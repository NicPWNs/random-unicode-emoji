var randomEmoji = require('./random-unicode-emoji.js');

randomEmoji.random({count: 3, custom: message.guild.emojis.map()});