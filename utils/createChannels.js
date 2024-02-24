const { Permissions, ChannelType,PermissionsBitField  } = require('discord.js');


async function createChannels(guild,teamName,roleId){
    await guild.roles.fetch();
    const MentorId  = guild.roles.cache.find((role) => role.name === 'Mentor').id;

    //quit out if channel already exists
    await guild.channels.fetch();
    if(guild.channels.cache.find((channel) => channel.name === teamName)){
        return; 
    }

    //create guild category
    const categoryChannel = await guild.channels.create({
        name: teamName,
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
            {
                id: roleId,
                allow: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
                id: MentorId,
                allow: [PermissionsBitField.Flags.ViewChannel]
            },
        ]
    });

    guild.channels.create({
        name: (teamName + "_Voice"),
        type: ChannelType.GuildVoice,
        parent: categoryChannel
    });

    guild.channels.create({
        name: (teamName + "_Text"),
        type: ChannelType.GuildText,
        parent: categoryChannel
    });
}

module.exports = createChannels;