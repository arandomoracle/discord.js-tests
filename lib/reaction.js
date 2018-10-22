const Discord = require('discord.js');
const SnowflakeEntity = require('./snowflake_entity');

class Reaction extends SnowflakeEntity {
  constructor(user, emoji, message) {
    super();
    this.emoji = emoji;
    this.message = message;
    this.count = 1;
    this.users = new Discord.Collection();
    this.users.set(user.id, user);
  }

  combine(reaction) {
    this.users = this.users.concat(reaction.users);
    this.count += reaction.count;
  }
}

module.exports = Reaction;
