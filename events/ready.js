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
		if (Date.now() >= Date.parse("September 09, 2024")) {
		  channel.send('Space Marine 2 is out!');
		  return; // Terminate the cron job after sending the message
		}
  
		const daysRemaining = daysToSept9(Date.now());
		channel.send(`${daysRemaining} days until Space Marine 2!`);
	  }, {
		scheduled: true,
	  });
  
	  scheduledMessage.start();
	},
  };
  

function daysToSept9(xTime) {
	// Create a Date object for September 9th
	const targetDate = new Date(2024, 8, 9); // Month is 0-indexed
  
	// Convert xTime to a Date object if it's not already
	const xDate = new Date(xTime);
  
	// Calculate the difference in milliseconds
	const diffInMs = targetDate - xDate;
  
	// Convert milliseconds to days
	const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
	return diffInDays;
}