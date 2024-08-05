const { SlashCommandBuilder } = require('discord.js');

const targetDate = 'September 9, 2024';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('countdown')
		.setDescription('Replies with exact time until Space Marine 2.'),
	async execute(interaction) {        
		await interaction.reply(getTimeUntil(targetDate) + " until Space Marine 2!");
	},
};

function getTimeUntil(endDate) {
    const now = new Date();
    const end = new Date(endDate);
  
    const differenceInMilliseconds = end - now;

    if (differenceInMilliseconds <= 0) {
        return "0 months, 0 days, 0 hours, 0 minutes and 0 seconds";
    }
  
    // Convert milliseconds to seconds, minutes, hours, days, and months
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximation for months
  
    const secondsDisplay = seconds % 60;
    const minutesDisplay = minutes % 60;
    const hoursDisplay = hours % 24;
    const daysDisplay = days % 30;
  
    const timeUnits = [
      { unit: 'month', value: months },
      { unit: 'day', value: daysDisplay },
      { unit: 'hour', value: hoursDisplay },
      { unit: 'minute', value: minutesDisplay },
      { unit: 'second', value: secondsDisplay }
    ];
  
    const formattedTime = timeUnits.reduce((acc, { unit, value }, index, array) => {
      if (value > 0) {
        const unitText = value === 1 ? unit : `${unit}s`;
        const separator = index === array.length - 2 ? ' and ' : ', ';
        return `${acc}${value} ${unitText}${separator}`;
      }
      return acc;
    }, '');
  
    return formattedTime.trim();
  }