const Discord = require('discord.js');

class MessageStore extends Discord.Collection {
  constructor(iterable) {
    super(iterable);
    this.unfetchedMessages = new Discord.Collection();
  }

  fetch(options) {
    if (this.unfetchedMessages.array().length > 0) {
      this.unfetchedMessages.forEach(message => {
        this.set(message.id, message);
      });
    }

    if (options) {
      if (typeof options === 'string' || options instanceof String) {
        return Promise.resolve(this.get(options));
      } else if (options.limit) {
        const result = this.array().slice(-1 * options.limit);
        return Promise.resolve(result);
      }
    }

    return Promise.resolve(this.clone());
  }
}

module.exports = MessageStore;
