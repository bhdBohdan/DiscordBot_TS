import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import * as fs from "node:fs";
import * as path from "node:path";
import env from "dotenv";
import { fileURLToPath, pathToFileURL } from "node:url";

env.config();

const token = process.env.DISCORD_TOKEN || "nulltoken";
const clientId = process.env.DISCORD_CLIENT_ID || "nulltoken";

const commands: any[] = [];
// Grab all the command folders from the commands directory you created earlier

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const fileUrl = pathToFileURL(filePath);
    const commandDef = await import(fileUrl.href);
    const command = commandDef.default;

    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

console.log("Succes");
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Create a temporary client to fetch all guilds
//  to deploy  commands to all guilds
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", async () => {
  try {
    const guilds = client.guilds.cache.map((g) => g.id);
    console.log(
      `Deploying to ${guilds.length || 0} guild(s) ${
        commands.length || 0
      } application (/) commands....`
    );

    // The put method is used to fully refresh all commands in the guild with the current set

    for (const guildId of guilds) {
      try {
        const data: any = await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          { body: commands }
        );

        console.log(`✅ Deployed ${data.length} commands to guild ${guildId}`);
      } catch (err) {
        console.error(`❌ Failed to deploy to guild ${guildId}`, err);
      }
    }
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  } finally {
    client.destroy(); // cleanup
  }
});

client.login(token);
