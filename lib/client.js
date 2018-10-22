const Discord = require('discord.js');
const Member = require('./member');
const Guild = require('./guild');
const DMChannel = require('./dm_channel');

class Client {
  constructor() {
    this.user = new Member();
    this.guilds = new Discord.Collection();
    this.channels = new Discord.Collection();
    this.dmChannels = new Discord.Collection();
    this.users = new Discord.Collection();
    this.eventHandlers = {};
  }

  create(type, name) {
    switch (type) {
    case 'guild': {
      const guild = new Guild(this, name);
      this.guilds.set(guild.id, guild);
      return guild;
    }
    case 'dmChannel': {
      const channel = new DMChannel(this, name);
      name.dmChannel = channel;
      this.dmChannels.set(channel.id, channel);
      return channel;
    }
    }
  }

  on(event, callback) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }

    this.eventHandlers[event].push(
      (...args) => Promise.resolve(callback(...args)));
  }

  trigger(event, ...args) {
    if (!this.eventHandlers[event]) {
      return Promise.resolve();
    }

    const callbacksComplete = this.eventHandlers[event].map(
      callback => callback(...args));
    return Promise.all(callbacksComplete);
  }
}

module.exports = Client;
