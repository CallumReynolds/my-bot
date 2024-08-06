const { Events } = require('discord.js');
const cron = require('cron');

const releaseDateG = process.env.SPACE_MARINE_RELEASE_DATE;

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
	  console.log(`Ready! Logged in as ${client.user.tag}`);
  
	  const server = client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
	  const channel = server.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  
	  console.log('Before job instantiation');
  
	  const scheduledMessage = new cron.CronJob(process.env.CRON_MESSAGE_TIME, () => {
		try {
		  console.log(`Running scheduled message for cron time: ${process.env.CRON_MESSAGE_TIME}`);
  
		  const nowInAEST = new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000);
  
		  if (nowInAEST >= Date.parse(releaseDateG)) {
			channel.send('Space Marine 2 is out!');
			return; // Terminate the cron job after sending the message
		  }
  
		  const daysRemaining = daysToSept9(nowInAEST);
		  const daysRemainingStr = daysRemaining === 1 ? `${daysRemaining} day` : `${daysRemaining} days`;
		  channel.send(`${daysRemainingStr} until Space Marine 2!`);
		} catch (error) {
		  console.error(`Error scheduling message: ${error}`);
		}
	  }, {
		scheduled: true,
	  });
  
	  console.log('After job instantiation');
	  scheduledMessage.start();
	},
}; 

function daysToSept9(xTime) {
	const releaseDate = Date.parse(releaseDateG);
	const targetDate = new Date(releaseDate);
  
	// Convert xTime to a Date object if it's not already
	const xDate = new Date(xTime);
  
	// Calculate the difference in milliseconds
	const diffInMs = targetDate - xDate;
  
	// Convert milliseconds to days
	const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
	return diffInDays;
}