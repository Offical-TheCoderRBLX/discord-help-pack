const { Client, PermissionFlagsBits} = require("discord.js");

function BootBot(token, intents, status,Show_activity, activity, activityType) {
    const client = new Client({ intents: intents });

    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`);
        if (status) {
            client.user.setStatus(status || 'online');
            if (Show_activity) {
                client.user.setActivity(activity || "Config the activity in your Code", { type: activityType || "4" });
            }
        }
    });

    client.login(token);
    return client;
}

function testPermissions(member, permissions) {
    return member.permissions.has(permissions);
}

function registerGuildCommands(client, commands, guildId) {
    if (!client || !commands || !guildId) throw new Error("Missing parameters");

    const guild = client.guilds.cache.get(guildId);
    if (!guild) throw new Error("Guild not found");

    guild.commands.set(commands)
        .then(() => console.log("Commands registered successfully"))
        .catch(console.error);
}

function registerGlobalCommands(client, commands) {
    if (!client || !commands) throw new Error("Missing parameters");

    client.application.commands.set(commands)
        .then(() => console.log("Global commands registered successfully"))
        .catch(console.error);
}

function getCommandJson(name, description, options = []) {
    return {
        name: name,
        description: description,
        options: options
    };
}


module.exports = {
    BootBot, testPermissions, registerGlobalCommands, registerGuildCommands, getCommandJson
};