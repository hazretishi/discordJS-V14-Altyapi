const { SlashCommandBuilder}  = require('discord.js');

 module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Bot, gecikmesini gösterir."),

    async execute(client, interaction) {
        await interaction.reply(`${client.ws.ping}`)
    }
 }