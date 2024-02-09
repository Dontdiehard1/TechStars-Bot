const { ensureAllServersExist } = require("../Database");
const { Events } = require('discord.js');

module.exports ={
    name: Events.guildCreate,
    once: false,
    execute(guild){
        console.log(`Bot joined a new server: ${guild.name} (ID: ${guild.id})`);
  
        //Update server collection THIS IS NOT VERY SCALEABLE
        ensureAllServersExist(client);
    },
};
