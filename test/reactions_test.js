const { Mocks } = require('../index');
const { User, ReactionStore, Reaction, Emoji } = Mocks;

exports['reactions'] = {
  setUp: done => {
    done();
  },
  'create reaction': test => {
    const user = new User();
    const emoji = new Emoji(null, ':test:');
    const reaction = new Reaction(user, emoji);

    test.equal(reaction.emoji, emoji);
    test.equal(reaction.users.get(user.id), user);
    test.equal(reaction.count, 1);
    test.done();
  },
  'store distinct reactions from one user': test => {
    const user = new User();
    const firstEmoji = new Emoji(null, ':test_1:');
    const secondEmoji = new Emoji(null, ':test_2:');
    const firstReaction = new Reaction(user, firstEmoji);
    const secondReaction = new Reaction(user, secondEmoji);

    const reactionStore = new ReactionStore();
    reactionStore.set(firstReaction.id, firstReaction);
    reactionStore.set(secondReaction.id, secondReaction);

    test.equal(reactionStore.array().length, 2);
    test.done();
  },
  'store distinct reactions from two users': test => {
    const firstUser = new User();
    const secondUser = new User();
    const firstEmoji = new Emoji(null, ':test_1:');
    const secondEmoji = new Emoji(null, ':test_2:');
    const firstReaction = new Reaction(firstUser, firstEmoji);
    const secondReaction = new Reaction(secondUser, secondEmoji);

    const reactionStore = new ReactionStore();
    reactionStore.set(firstReaction.id, firstReaction);
    reactionStore.set(secondReaction.id, secondReaction);

    test.equal(reactionStore.array().length, 2);
    test.done();
  },
  'combine repeat reactions': test => {
    const emojis = [
      new Emoji(null, ':test_1:'),
      new Emoji(null, ':test_2:'),
      new Emoji(null, ':test_3:')
    ];
    const reactionStore = new ReactionStore();

    function addReaction(emoji) {
      const user = new User();
      const reaction = new Reaction(user, emoji);
      reactionStore.set(reaction.id, reaction);
    }

    emojis.forEach(emoji => {
      addReaction(emoji);
    });

    for (let i = 0; i < 20; ++i) {
      const randomEmoji = emojis[Math.floor((Math.random() * 2))];
      addReaction(randomEmoji);
    }

    test.equal(reactionStore.array().length, emojis.length);
    test.done();
  }
};
