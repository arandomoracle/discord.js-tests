const SnowflakeEntity = require('./snowflake_entity');

class Role extends SnowflakeEntity  {
  constructor(guild, name) {
    super();
    this.guild = guild;
    this.name = name;
  }
}

module.exports = Role;
