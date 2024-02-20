const { Permissions } = require("discord.js");

async function createRole(guild, roleName) {
	if (!guild) {
		throw new Error("Guild Not Specified");
	}

	//check if role exists
	await guild.roles.fetch();
	if (guild.roles.cache.find((role) => role.name === roleName)) {
		return;
	}

	guild.roles.create({
		name: roleName,
		hoist: true,
		mentionable: true,
	});
}

module.exports = createRole;
