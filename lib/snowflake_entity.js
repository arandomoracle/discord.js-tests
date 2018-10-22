class Snowflake {
  constructor(id) {
    this.id = id || Snowflake.nextId.toString();
    Snowflake.nextId++;
  }
}

Snowflake.nextId = 0;

class SnowflakeEntity {
  constructor() {
    this.snowflake = new Snowflake();
  }

  get id() {
    return this.snowflake.id;
  }

  set id(id) {
    this.snowflake = new Snowflake(id);
  }
}

module.exports = SnowflakeEntity;
