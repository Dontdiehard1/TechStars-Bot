const { Permissions, RoleFlags } = require("discord.js");

async function createRole(guild, roleName) {
	if (!guild) {
		throw new Error("Guild Not Specified");
	}

	//check if role exists
	await guild.roles.fetch();
	const foundRoles  = guild.roles.cache.find((role) => role.name === roleName);
	if (foundRoles) {
		return foundRoles;
	}

	const role = await guild.roles.create({
		name: roleName,
		hoist: true,
		mentionable: true,
	});

	return role;
}

module.exports = createRole;
