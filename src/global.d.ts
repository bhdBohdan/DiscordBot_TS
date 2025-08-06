import "discord.js";
import type {
  Collection,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { Command } from "./interfaces/command.ts";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, Collection<string, number>>;
  }
}
