const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
  serverId: {type: String, required: true, unique: true},
  adminRoleId: {type: String},
  chatLogId: {type: String},
}, { timestamps: true });

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;  