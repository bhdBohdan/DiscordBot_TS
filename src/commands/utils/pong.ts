import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  },
};
