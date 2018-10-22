const SnowflakeEntity = require('./snowflake_entity');

class AuditLogEntry extends SnowflakeEntity {
  constructor(guild) {
    super();
    this.guild = guild;
  }
}

module.exports = AuditLogEntry;
