const { ActionRowBuilder, ButtonBuilder, ButtonStyle,SlashCommandBuilder } = require('discord.js');
const createRole = require('../../utils/createRole');
const createChannels = require('../../utils/createChannels');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joinbuttons')
		.setDescription('test'),
	async execute(interaction) {
                const clientdb = interaction.client.dbconn.db("TechstarsBot");
                const coll = clientdb.collection("projects");

                const projectsForServer = await coll.find({ 'server' : interaction.guild.id }).toArray();

                const buttons = [];

                for(project of projectsForServer){
                        const button = new ButtonBuilder()
                                .setCustomId("JoinButton:" + project.teamName)
                                .setLabel(project.teamName)
                                .setStyle(ButtonStyle.Secondary);

                        buttons.push(button);

                        role = await createRole(interaction.guild,project.teamName);

                        createChannels(interaction.guild,project.teamName,role.id);
                }


                const row = new ActionRowBuilder().addComponents(buttons);

                await interaction.reply({
                        content : "test",
                        components : [row]
                });
	},
};