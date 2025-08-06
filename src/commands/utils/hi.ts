import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Message,
} from "discord.js";

export default {
  cooldown: 3,

  data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Replies with hi!"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(`HElooooooooooooooooo! ${interaction.user}`);
    if (
      interaction.channel &&
      interaction.channel.isTextBased() &&
      interaction.channel.isSendable()
    ) {
      const sentMessage: Promise<Message> = interaction.channel.send("Hi?");
      sentMessage.then((msg) => {
        msg.react("👍");
      });
    }
  },
};
