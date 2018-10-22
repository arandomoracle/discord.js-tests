const SnowflakeEntity = require('./snowflake_entity');
const DMChannel = require('./dm_channel');

class User extends SnowflakeEntity {
  constructor(name) {
    super();
    this.username = name;
    this.dmChannel = new DMChannel(undefined, this);
    this.createdAt = new Date();
  }

  send(...args) {
    return this.dmChannel.send(...args);
  }

  displayAvatarURL() {
    return `https://127.0.0.1/discord/avatars/${this.id}`;
  }
}

module.exports = User;
