const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()){

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        } else if(interaction.isButton()){

            //See if its our join buttons 
            if(interaction.customId.includes("JoinButton")){
                console.log(interaction);

                const clientdb = interaction.client.dbconn.db("TechstarsBot");
                const coll = clientdb.collection("projects");
                const project = (interaction.customId.split(':'))[1];

                //add members id to the project
                coll.updateOne(
                    {teamName: project, server: interaction.guildId},
                    { $push: {members : interaction.member.id}}
                );


                //TODO: assign user that projects role
                //TODO: Check if User is already part of team then dont assign them

                interaction.reply({
                    content: ('Joined Team ' + project),
                    ephemeral: true
                });
                
                console.log(interaction.member);
            }
        }
	},
};