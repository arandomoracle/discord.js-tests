const Discord = require('discord.js');
const SnowflakeEntity = require('./snowflake_entity');
const GuildChannelStore = require('./guild_channel_store');
const AuditLog = require('./audit_log');
const Category = require('./category');
const Channel = require('./channel');
const Member = require('./member');
const Role = require('./role');
const Emoji = require('./emoji');

class Guild extends SnowflakeEntity {
  constructor(client, name) {
    super();
    this.client = client;
    this.name = name;
    this.channels = new GuildChannelStore(this);
    this.members = new Discord.Collection();
    this.roles = new Discord.Collection();
    this.emojis = new Discord.Collection();
    this.auditLog = new AuditLog(this);
    this.client.guilds.set(this.id, this);
  }

  create(type, name) {
    switch (type) {
    case 'category': {
      const category = new Category(this, name);
      this.channels.set(category.id, category);
      this.client.channels.set(category.id, category);
      return category;
    }
    case 'channel': {
      const channel = new Channel(this, name);
      this.channels.set(channel.id, channel);
      this.client.channels.set(channel.id, channel);
      return channel;
    }
    case 'member': {
      const member = new Member(this, name);
      this.members.set(member.id, member);
      this.client.users.set(member.user.id, member.user);
      return member;
    }
    case 'role': {
      const role = new Role(this, name);
      this.roles.set(role.id, role);
      return role;
    }
    case 'emoji': {
      const emoji = new Emoji(this, name);
      this.emojis.set(emoji.id, emoji);
      return emoji;
    }
    }
  }

  createCategory(name) {
    const category = new Category(this, name);
    this.channels.set(category.id, category);
    this.client.channels.set(category.id, category);
    return category;
  }

  createChannel(name) {
    const channel = new Channel(this, name);
    this.channels.set(channel.id, channel);
    this.client.channels.set(channel.id, channel);
    return channel;
  }

  createMember(name) {
    const member = new Member(this, name);
    this.members.set(member.id, member);
    this.client.users.set(member.user.id, member.user);
    return member;
  }

  createRole(name) {
    const role = new Role(this, name);
    this.roles.set(role.id, role);
    return role;
  }

  createEmoji(name) {
    const emoji = new Emoji(this, name);
    this.emojis.set(emoji.id, emoji);
    return emoji;
  }

  fetchAuditLogs() {
    return Promise.resolve(this.auditLog);
  }
}

module.exports = Guild;
