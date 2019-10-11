const Database = require('../models/Database');
const legalMessages = ["Hi, I'm your friend!", "It's nice to talk to you!", "Would you like to talk to me?", "I enjoy talking to you!", "Be my friend!", "I wish I was more like you!", "Man, you're such a great person!"];

exports.foreverAlone = async function(command, argsCapitalized, argsLowercased, message, bot) {
  for (let i = 10000; i >= 0; i--) {
    message.reply(legalMessages[Math.floor(Math.random()*legalMessages.length)]);
  }
}

exports.lonely = async function(command, argsCapitalized, argsLowercased, message, bot) {
  message.reply(legalMessages[Math.floor(Math.random()*legalMessages.length)]);
}


exports.sendChatMessage = async function(bot, message, messageToSend) {
  const database = await getOrCreateDatabase(message.guild.id);
  var chatLogId = database.chatLogId;
  if (!chatLogId) {
    message.reply('The command has run, but please use `!help setChatLog` for something nice and fancy.');
    return;
  }
  if (!messageToSend) {
    return;
  }
  bot.channels.get(chatLogId).send(messageToSend);
}

exports.test = async function(command, argsCapitalized, argsLowercased, message, bot) {
  exports.sendChatMessage(bot, message, argsCapitalized[0]);
  message.reply('Test command recieved & executed.');
}

exports.ping = async function(command, argsCapitalized, argsLowercased, message, bot) {
  message.reply('pong!');
}

exports.pong = async function(command, argsCapitalized, argsLowercased, message, bot) {
  message.reply('ping!');
}

let getOrCreateDatabase = async function(discordId) {
  let database = await Database.findOne().where('serverId').equals(discordId);
  if(!database){
    database = new Database({
      serverId: discordId,
      adminRole: '',
    });
    await database.save();
    console.log('new Discord server object created.');
  }
  return database;
};
exports.getOrCreateDatabase = getOrCreateDatabase;

exports.getAccount = async function(command, argsCapitalized, argsLowercased, message, bot) {
  console.log(await getOrCreateDatabase(message.guild.id));
  message.reply('Database info has been logged.');
}  

exports.setAdminRole = async function(command, argsCapitalized, argsLowercased, message, bot) {
  var database = await getOrCreateDatabase(message.guild.id);
  if (!!database.adminRoleId) {
    message.reply('There is already an admin role set. Message `Lawlzer#4013` if you need this fixed.');
    return;
  }
  if (argsLowercased[0].replace('<@&','') !== argsLowercased[0]) {
    var adminRoleToAdd = argsLowercased[0].replace('<@&', '').replace('>', '');
    database.adminRoleId = adminRoleToAdd;
    await database.save(); 
    message.reply('The admin role has been set to ' + argsLowercased[0]);
    exports.sendChatMessage(bot, message, 'The admin role has been set to ' + argsCapitalized);
    return;
  }
  message.reply('Please make sure you are @\'ing a role to set.');
}

exports.amIAdmin = async function(command, argsCapitalized, argsLowercased, message, bot) {
  const database = await exports.getOrCreateDatabase(message.guild.id);
  message.reply(message.member.roles.has(database.adminRoleId) ? 'You are an admin' : 'You are not an admin.');
}

exports.setChatLog = async function(command, argsCapitalized, argsLowercased, message, bot) {
  var database = await getOrCreateDatabase(message.guild.id);
  if (!!database.chatLogId) {
    message.reply('There is already a chat log channel specified. Message `Lawlzer#4013` if you need this fixed.');
    return;
  }
  if (argsLowercased[0].replace('<#','') !== argsLowercased[0]) {
    var chatLogToAdd = argsLowercased[0].replace('<#', '').replace('>', '');
    database.chatLogId = chatLogToAdd;
    await database.save(); 
    message.reply('The chat log ID has been set to ' + argsLowercased[0]);
    return;
  }
  message.reply('Please make sure you are pinging (`#` in this case) a specific chat.');
}

exports.spam = async function(command, argsCapitalized, argsLowercased, message, bot) {
  const messageToSpam = argsCapitalized;
  if (argsCapitalized[0] == '<@232294169538723840>') { 
    const startDate = new Date(); //Fuckle // Dawson
    for (let i = 0; i <= 10000; i++) {
      var currentDate = new Date();
      await message.channel.send(messageToSpam + '\nTotal spammed messages: ' + i + '\n That\'s about ' + ((currentDate-startDate)/1000) / i + ' per second');
      console.log('pls wait');
    }
    return;
  }
  for (let i = 10000; i >= 0; i--) {
    message.channel.send(messageToSpam);
    // console.log('Total spammed messages: ' + i);
  }
}