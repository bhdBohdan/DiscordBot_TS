import type { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export interface Command {
  data: SlashCommandBuilder;
  cooldown?: number;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
