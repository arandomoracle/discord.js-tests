const Discord = require('discord.js');
const SnowflakeEntity = require('./snowflake_entity');
const Channel = require('./channel');

class Category extends SnowflakeEntity {
  constructor(guild, name) {
    super();
    this.guild = guild;
    this.name = name;
    this.channels = new Discord.Collection();
  }

  create(type, name) {
    switch (type) {
    case 'channel': {
      const channel = new Channel(this, name);
      this.channels.set(channel.id, channel);
      this.guild.channels.set(channel.id, channel);
      this.guild.client.channels.set(channel.id, channel);
      return channel;
    }
    }
  }
}

module.exports = Category;
