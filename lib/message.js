const SnowflakeEntity = require('./snowflake_entity');
const ReactionStore = require('./reaction_store');
const Reaction = require('./reaction');

class Message extends SnowflakeEntity {
  constructor(author, channel, message, options) {
    super();
    this.author = author;
    this.channel = channel;

    if (typeof(message) === 'string' || message instanceof String) {
      this.content = message;
    } else {
      this.content = message.content;
    }

    this.embeds = [];
    if (options && options.embed) {
      this.embeds.push(options.embed);
    }

    const hasContent = this.content && (this.content != '');
    const hasEmbeds = this.embeds && (this.embeds.length > 0);

    if ((!hasContent) && (!hasEmbeds)) {
      throw new Error('Cannot send an empty message');
    }

    this.reactions = new ReactionStore();
  }

  react(emoji) {
    return this.reactAs(this.channel.guild.client.user, emoji);
  }

  reactAs(user, emoji) {
    const reaction = new Reaction(user, emoji, this);
    this.reactions.set(reaction.id, reaction);

    const client = this.channel.guild.client;
    return client.trigger('messageReactionAdd', reaction, user)
      .then(() => reaction);
  }

  delete() {
    this.channel.messages.delete(this.id);
  }
}

module.exports = Message;
