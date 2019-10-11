//Invite Link for the bot: https://discordapp.com/oauth2/authorize?client_id=324404362845749260&scope=bot

console.log('The bot is in index.js');

const commands = require('./commands/index');

const databaseController = require('./lib/database');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.load({ path: '.env' });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

const bot = new Discord.Client();

bot.on('ready', () => { //When our bot is ready:
  // bot.user.setActivity('YouTube', { type: 'WATCHING' })
  // .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  // .catch(console.error);
  console.log('Bot running.');
});

bot.on('message', async message => {
  if (message.author.bot) {
    return; //if the author of the message is the bot, do nothing.
  }

  if (!message.guild) { //If the message is sent via DMs.
  message.reply('Please do not message this bot in DMs. Please do !help in a public channel, or add Lawlzer on Discord for help. Lawlzer#4013')
  return;
  }
  

  const COMMAND_CHAR = '!';
  await (async function executeCommand(){

    const argsCapitalized = message.content.split(' ');
    var commandName = argsCapitalized.shift().toLowerCase();
    if(!commandName.startsWith(COMMAND_CHAR)){
      return;
    }
    commandName = commandName.slice(1);
    var argsLowercased = [];
    for (let i = 0; i < argsCapitalized.length; i++) {
      argsLowercased.push(argsCapitalized[i].toLowerCase());
    }
    if (!commands.hasOwnProperty(commandName)){
      return;
    }
    const command = commands[commandName];
    if (!!command.requirements) {
      for (let i = 0; i <= command.requirements.length-1; i++) {
        if (! await command.requirements[i](commandName, argsCapitalized, argsLowercased, message, bot)) {
          console.log('The requirement: ' + command.requirements[i] + ' has failed');
          return; 
        }
      }
    }
    try {
      var result = command.execute(commandName, argsCapitalized, argsLowercased, message, bot);
      if(!!result && result.hasOwnProperty('then') && typeof result.then === 'function' ) {
        result = await result;
      }
    }catch(e){
      message.reply(e.message);
    }


  })();
});

const token = process.env.DISCORD_BOT_SECRET;
bot.login(token);


// const discordId = message.guild.id;
// const USER_ID = message.author.id;
// const USER_NAME = message.author.username;


//start a thing
//when you end the thing, delete all messages inbetween the two