/**
 * This event will watch for a user getting asigned a role
 * if that role is a role of one of the projects we want to
 * assign them to the members array of the database for that project
 * 
 * BUG: If a user has not been chached(not interacted with the bot sience a restart)
 * Then the oldMember will be null. This is fine for adding roles, but 
 * removeing roles will cause it it never trigger thus they might not get removed
 * from the database
 */

const { Client, GatewayIntentBits, Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(dbconn, oldMember, newMember) {

        const clientdb = dbconn.db("TechstarsBot");
        const coll = clientdb.collection("projects");

        
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

        //I dont want to deal with this case
        if(addedRoles.size > 1){ 
            console.error("More than 1 role joined at a time");
            return;
        }

        if (addedRoles.size > 0) {
            const projectCheck = await coll.findOne({
                'server' : newMember.guild.id,
                'members' : newMember.id
            });

            //leave funtion if memeber is already a part of a team
            if( projectCheck !== null){ 
                console.log("Member Already Part of Team");
                return;
            }

            coll.updateOne(
                {teamName: addedRoles.map(r => r.name)[0], server: newMember.guild.id},
                { $push: {members : newMember.id}}
            );
        }

        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

        if (removedRoles.size > 0) {
                coll.updateOne(
                {teamName: removedRoles.map(r => r.name)[0], server: newMember.guild.id},
                { $pull: {members : newMember.id}}
            );
        }
    },
};