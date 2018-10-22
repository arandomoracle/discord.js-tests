const Discord = require('discord.js');

class GuildChannelStore extends Discord.Collection {
  constructor(guild, iterable) {
    super(iterable);
    this.guild = guild;
  }

  create(name, options) {
    let channel;
    if (options.type == 'category') {
      channel = this.guild.createCategory(name);
    } else {
      channel = this.guild.createChannel(name);
    }

    if (options.parent) {
      const parentId = options.parent.id || options.parent;
      const parent = this.guild.channels.get(parentId);

      if (parent && parent.channels) {
        parent.channels.set(channel.id, channel);
      }
    }

    return Promise.resolve(channel);
  }
}

module.exports = GuildChannelStore;
