const Discord = require('discord.js');
const SnowflakeEntity = require('./snowflake_entity');

class AuditLog extends SnowflakeEntity {
  constructor(guild) {
    super();
    this.guild = guild;
    this.entries = new Discord.Collection();
  }
}

module.exports = AuditLog;
