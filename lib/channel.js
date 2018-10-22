const SnowflakeEntity = require('./snowflake_entity');
const MessageStore = require('./message_store');
const Message = require('./message');

class Channel extends SnowflakeEntity {
  constructor(guild, name) {
    super();
    this.guild = guild;
    this.name = name;
    this.messages = new MessageStore();
  }

  send(message, options) {
    return this.sendAs(this.guild.client.user, message, options);
  }

  sendAs(user, message, options) {
    const wrappedMessage = new Message(user, this, message, options);
    this.messages.set(wrappedMessage.id, wrappedMessage);
    return this.guild.client.trigger('message', wrappedMessage)
      .then(() => wrappedMessage);
  }
}

module.exports = Channel;
