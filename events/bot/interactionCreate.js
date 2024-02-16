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

                const clientdb = interaction.client.dbconn.db("TechstarsBot");
                const coll = clientdb.collection("projects");
                const project = (interaction.customId.split(':'))[1];

                const projectCheck = await coll.findOne({
                    'server' : interaction.guildId,
                    'members' : interaction.member.id
                });

                if( projectCheck !== null){ //leave funtion if memeber is already a part of a team
                    interaction.reply({
                        content: ("You are already in a team"),
                        ephemeral: true
                    });
                    return 
                }
                
                //add members id to the project
                coll.updateOne(
                    {teamName: project, server: interaction.guildId},
                    { $push: {members : interaction.member.id}}
                );

                //TODO: assign user that projects role
                
                interaction.reply({
                    content: ('Joined Team ' + project),
                    ephemeral: true
                });
            }
        }
	},
};