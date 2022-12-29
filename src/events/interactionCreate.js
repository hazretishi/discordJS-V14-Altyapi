const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");

module.exports = async (interaction) => {
   if(!interaction.isChatInputCommand()) return;

   const command = interaction.client.commands.get(interaction.commandName);
   if(!command) return;

   try {
       await command.execute(client, interaction)
     } catch (error) {
       console.error(error);
       await interaction.reply({content: "Bu komutta bir hata bulunuyor.", ephemeral:true})
   }
} 
module.exports.conf = {name: "interactionCreate"}
