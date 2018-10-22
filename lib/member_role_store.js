const Discord = require('discord.js');

class MemberRoleStore extends Discord.Collection {
  constructor(member) {
    super();
    this.member = member;
  }

  add(roleId) {
    const role = this.member.guild.roles.get(roleId);
    super.set(role.id, role);
  }

  remove(roleId) {
    this.delete(roleId);
  }

  set(roles) {
    this.array().forEach(role => {
      this.delete(role.id);
    });

    if (!roles) return;
    roles.forEach(role => {
      this.add(role.id);
    });
  }
}

module.exports = MemberRoleStore;
