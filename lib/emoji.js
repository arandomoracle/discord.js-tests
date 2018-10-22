const SnowflakeEntity = require('./snowflake_entity');

class Emoji extends SnowflakeEntity  {
  constructor(guild, name) {
    super();
    this.guild = guild;
    this.name = name;
  }
}

module.exports = Emoji;
