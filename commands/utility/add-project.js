const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addproject')
		.setDescription('Adds a project to the list of projects')
		.addStringOption(option => 
			option
				.setName('name')
				.setDescription("Name of the team to add to the Projects Lists")),
	async execute(interaction) {
			
		const clientdb = interaction.client.dbconn.db("TechstarsBot");
		const coll = clientdb.collection("projects");

		await coll.insertOne({
			"teamName" : interaction.options.getString('name'),
			"server" : interaction.guild.id,
			"members" : []
		});



		await interaction.reply("Added Project: " + interaction.options.getString('name'));
	},
}; 