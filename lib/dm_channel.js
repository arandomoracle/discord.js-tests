const SnowflakeEntity = require('./snowflake_entity');
const MessageStore = require('./message_store');
const Message = require('./message');

class DMChannel extends SnowflakeEntity {
  constructor(client, user) {
    super();
    this.client = client;
    this.user = user;
    this.messages = new MessageStore();
  }

  send(message, options) {
    return new Promise(resolve => {
      const wrappedMessage = new Message(
        this.client.user, this, message, options);
      this.messages.set(wrappedMessage.id, wrappedMessage);
      resolve(wrappedMessage);
    });
  }
}

module.exports = DMChannel;
