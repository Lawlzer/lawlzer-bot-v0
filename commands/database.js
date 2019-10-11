const requirements = require('./requirements');
const databaseController = require('../lib/database')

exports.foreveralone = {
  blurb: "I'm forever alone.",
  help: 'I\'m lonely, please help. Never cease.',
  example: '!foreveralone',
  execute: databaseController.foreverAlone,
  requirements: [],
}

exports.lonely = exports.imlonely= {
  blurb: 'I\'m lonely.',
  help: 'I\'m lonely, please help.',
  example: '!lonely',
  execute: databaseController.lonely,
  requirements: [],
}

exports.test = {
	blurb: 'Example blurb (aka a short help description)',
	help: 'Example help (long help!)',
	example: '!test',
	execute: databaseController.test,
  requirements: [],
}

exports.ping = {
  blurb: 'Make sure the server is running',
  help: 'Make sure the server is running',
  example: '!ping', 
  execute: databaseController.ping,
  requirements: [],
}

exports.pong = {
  blurb: 'Make sure the server is running',
  help: 'Make sure the server is running',
  example: '!pong', 
  execute: databaseController.pong,
  requirements: [],
}

exports.getaccount = {
	blurb: 'Shouldn\'t need to be used. (For Lawlzie Balsie only)',
	help: 'Shouldn\'t need to be used. (For Lawlzie Balsie only)',
	example: 'Shouldn\'t need to be used. (For Lawlzie Balsie only)',
	execute: databaseController.getAccount,
  requirements: [],
}

exports.setadminrole = {
  blurb: 'Set the admin role.',
  help: 'Set the active admin role - Must not be set yet. (If already set, ask Lawlzer to change it. Please @ the role in the message.)',
  example: '!setAdminRole @botAdmin',
  execute: databaseController.setAdminRole,
  requirements: [requirements.oneArgument],
}

exports.amiadmin = {
  blurb: 'Check if you are an admin.',
  help: 'This will reply \'true\' if you have the admin role.',
  example: '!amIAdmin',
  execute: databaseController.amIAdmin,
  requirements: [],
}

exports.setchatlog = {
  blurb: 'Set the channel for where things should be logged.',
  help: 'Set the active channel for where things should be set - Must be pinged & should be **only** for the bot.',
  example: '!setAdminRole #botLogChannel',
  execute: databaseController.setChatLog,
  requirements: [requirements.oneArgument],
}

exports.spam = {
  blurb: 'qqq',
  help: 'qqq',
  example: 'qqq',
  execute: databaseController.spam,
  requirements: [],
}