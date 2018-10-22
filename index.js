const Mocks = {
  AuditLog: require('./lib/audit_log'),
  AuditLogEntry: require('./lib/audit_log_entry'),
  Category: require('./lib/category'),
  Channel: require('./lib/channel'),
  Client: require('./lib/client'),
  DMChannel: require('./lib/dm_channel'),
  Emoji: require('./lib/emoji'),
  Guild: require('./lib/guild'),
  Member: require('./lib/member'),
  MemberRoleStore: require('./lib/member_role_store'),
  Message: require('./lib/message'),
  MessageStore: require('./lib/message_store'),
  Reaction: require('./lib/reaction'),
  ReactionStore: require('./lib/reaction_store'),
  Role: require('./lib/role'),
  User: require('./lib/user')
};

module.exports = {
  Mocks: Mocks
};
