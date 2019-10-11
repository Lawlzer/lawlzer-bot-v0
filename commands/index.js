const databaseCommands = require('./database');
const requirements = require('./requirements')

exports = Object.assign(exports, databaseCommands);

exports.help = {
  admin: false,
  blurb: 'Get general guidance for non-admin commands',
  help: 'use this command to get an overview of all bot commands. Use this command, followed by another command, to get detailed info on that command. For example: !help checkin for detailed help on the checkin command.',
  execute: function(command, argsCapitalized, argsLowercased, message, bot){
    var helpString = '';
    if(argsLowercased.length === 0){
      helpString = generalHelp(false);
    }else{
      helpString = commandHelp(argsLowercased[0], false);
    }
    message.reply(helpString);
  }
}

exports.adminhelp = {
  admin: true,
  blurb: 'Get general guidance for all admin commands',
  help: 'use this command to get an overview of all bot commands. Use this command, followed by another command, to get detailed info on that command. For example: !help checkin for detailed help on the checkin command.',
  execute: function(command, argsCapitalized, argsLowercased, message, bot) {
    var helpString = '';
    if(argsLowercased.length === 0){
      helpString = generalHelp(true);
    }else{
      helpString = commandHelp(argsLowercased[0], true);
    }
    message.reply(helpString);
  }
}

const generalHelp = function(isAdmin){
  var helpString = '\n';
  for(var keys = Object.keys(exports), i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(exports.hasOwnProperty(key) && (!exports[key].admin || isAdmin)){
        helpString += '!' + key + ': ' + exports[key].blurb + '\n';
      }
  }
  return helpString;
}

const commandHelp = function(cmd, isAdmin) {
  if(!exports.hasOwnProperty(cmd) || (!isAdmin && exports[cmd].admin)){
    return 'No command "!' + cmd + '" found.'
  }

  return '\n**!' + cmd + '**:  ' + exports[cmd].help;
}