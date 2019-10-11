exports.exampleRequirement = async function(command, argsCapitalized, argsLowercased, message, bot) {
}

exports.admin = async function(commandName, argsCapitalized, argsLowercased, message, bot) {
  const database = await databaseController.getOrCreateDatabase(message.guild.id);
  if (message.member.roles.has(database.adminRoleId)) {
    console.log('true');
    return true;
  }
  console.log('false');
  return false;
}

exports.oneArgument = async function(commmand, argsCapitalized, argsLowercased, message, bot) {
  if (argsLowercased.length < 1) {
    message.reply('Please use at least one argument. Example: `!test THISISANARGUMENT');
    return false;
  }
  return true;
}

exports.twoRequirements = async function(command, argsCapitalized, argsLowercased, message, bot) {
  if (!argsLowercased[1]) {
    message.reply('This command requires two arguments.');
    return false;
  }
  return true;
}