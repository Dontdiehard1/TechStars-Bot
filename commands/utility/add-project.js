const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addproject')
		.setDescription('Adds a project to the list of projects'),
	async execute(interaction) {
			
		const clientdb = interaction.client.db.db(interaction.client.id);
		const coll = clientdb.collection();

		// coll.insetOne({}
		// 	"teamName" : "",
		// 	"members" : []
		// });



		await interaction.reply(interaction.client.db + "test");
	},
}; 