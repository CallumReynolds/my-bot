const { Events } = require('discord.js');
const cron = require('cron');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) 
   {
	  console.log(`Ready! Logged in as ${client.user.tag}`);
  
	  const server = client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
	  const channel = server.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  
	  const scheduledMessage = new cron.CronJob(process.env.CRON_MESSAGE_TIME, () => {
		try {
			console.log(`Running scheduled message for cron time: ${process.env.CRON_MESSAGE_TIME}`);

			if (Date.now() >= Date.parse("September 10, 2024")) {
			  channel.send('Space Marine 2 is out!');
			  return; // Terminate the cron job after sending the message
			}
	  
			const daysRemaining = daysToSept9(Date.now());
			const daysRemainingStr = daysRemaining === 1 ? `${daysRemaining} day` : `${daysRemaining} days`;
			channel.send(`${daysRemainingStr} until Space Marine 2!`);
		} catch (error) {
			console.error(`Error scheduling message: ${error}`);
		}
	  }, {
		scheduled: true,
	  });
  
	  scheduledMessage.start();
	},
  };
  

function daysToSept9(xTime) {
	// Create a Date object for September 10th
	const targetDate = new Date(2024, 8, 10); // Month is 0-indexed
  
	// Convert xTime to a Date object if it's not already
	const xDate = new Date(xTime);
  
	// Calculate the difference in milliseconds
	const diffInMs = targetDate - xDate;
  
	// Convert milliseconds to days
	const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
	return diffInDays;
}