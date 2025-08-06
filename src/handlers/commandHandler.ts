// import { Client } from "discord.js";
// import * as fs from "node:fs";
// import * as path from "node:path";
// //import type { ExtendedClient } from "../classes/ExtendedClient.ts";
// import { fileURLToPath, pathToFileURL } from "node:url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default async (client: Client) => {
//   try {
//     const foldersPath = path.join(__dirname, "../commands");
//     const commandFolders = fs.readdirSync(foldersPath);

//     for (const folder of commandFolders) {
//       const commandsPath = path.join(foldersPath, folder);
//       const commandFiles = fs
//         .readdirSync(commandsPath)
//         .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

//       for (const file of commandFiles) {
//         const filePath = path.join(commandsPath, file);
//         const fileUrl = pathToFileURL(filePath);
//         const command = await import(fileUrl.href);

//         // Set a new item in the Collection with the key as the command name and the value as the exported module
//         if ("data" in command && "execute" in command) {
//           client.commands.set(command.data.name, command);
//         } else {
//           console.log(
//             `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//           );
//         }
//       }
//     }
//   } catch (error: any) {
//     console.error("commandHandler error:", error.message);
//   }
// };
