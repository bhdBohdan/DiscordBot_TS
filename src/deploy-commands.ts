import { REST, Routes } from "discord.js";
import env from "dotenv";

env.config();

const TOKEN = process.env.DISCORD_TOKEN || "nulltoken";
const CLIENT_ID = process.env.DISCORD_CLIENT_ID || "nulltoken";
const GUILD_ID = process.env.DISCORD_GUILD_ID || "nulltoken";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
