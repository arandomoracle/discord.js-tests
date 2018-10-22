const Discord = require('discord.js');

class ReactionStore extends Discord.Collection {
  set(key, value) {
    const emojiAlreadyAdded = this.find(reaction => {
      const existingEmojiId = reaction.emoji.id || reaction.emoji;
      const newEmojiId = value.emoji.id || value.emoji;
      return existingEmojiId == newEmojiId;
    });

    if (emojiAlreadyAdded) {
      emojiAlreadyAdded.combine(value);
      return;
    }

    super.set(key, value);
  }
}

module.exports = ReactionStore;
