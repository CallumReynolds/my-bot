const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
// export const data = new SlashCommandBuilder()
//   .setName("ping")
//   .setDescription("Replies with Pong!");

// export async function execute(interaction: CommandInteraction) {
//   return interaction.reply("Pong!");
// }