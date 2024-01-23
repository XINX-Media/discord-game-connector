require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');

class ViewerConnection
{
	constructor([commands])
	{
		
	}

	connect()
	{
		
	}

	handleMessage()
	{

	}

	sendMessage(message)
	{

	}
}

class DiscordConnection extends ViewerConnection
{
	constructor([commands])
	{

	}

	connect()
	{
		const { token } = process.env.DISCORD_TOKEN;

		// Create a new client instance
		const client = new Client({ intents: [GatewayIntentBits.Guilds] });

		// When the client is ready, run this code only once
		client.once(Events.ClientReady, readyClient => {
			console.log(`Ready! Logged in as ${readyClient.user.tag}`);
		});

		// Log in to Discord with your client's token
		client.login(token);
	}

	sendMessage(channel, messageContent)
	{
		channel.send(
		{
			message: "Message text",
			files: [{
			  attachment: 'example.file',
			  name: 'filename',
			  description: 'file description for accessibility'
			}]
		})
			.then(console.log)
			.catch(console.error);
	}
}