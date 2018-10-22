const User = require('./user');
const MemberRoleStore = require('./member_role_store');

class Member {
  constructor(guild, name) {
    this.guild = guild;
    this.user = new User(name);
    this.roles = new MemberRoleStore(this);
  }

  get id() {
    return this.user.id;
  }

  send(...args) {
    return this.user.send(...args);
  }

  kick() {
    this.guild.members.delete(this.id);
    this.guild.client.users.delete(this.id);
    this.guild = undefined;
    this.roles = undefined;
  }
}

module.exports = Member;
