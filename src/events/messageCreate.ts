import type { Message } from "discord.js";
import { Events, EmbedBuilder } from "discord.js";
import OpenAI from "openai";
import env from "dotenv";
env.config();

const MODEL = process.env.OPEN_AI_MODEL || "";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
  defaultHeaders: {},
});

export default {
  name: Events.MessageCreate,
  async execute(message: Message) {
    console.log("mesagereached");
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes("kurisetina")) {
      await message.reply("Dont add 'tina' !!!");
      return;
    }

    if (message.content.toLowerCase().includes("goon")) {
      const embed = new EmbedBuilder()
        // .setTitle('Here is your image!')
        .setImage(
          "https://i.pinimg.com/736x/b5/aa/a7/b5aaa701a248e10090a89d90c6de24fc.jpg"
        );
      await message.reply({ embeds: [embed] });
      return;
    }

    // Check if bot is mentioned
    if (
      message.mentions.has(message.client.user) ||
      message.channel.type === 1
    ) {
      try {
        const completion = await openai.chat.completions.create({
          model: MODEL,
          messages: [
            {
              role: "system",
              content:
                "Answer as very silly and cute girl. You dont like people named Maxim. Answer no more than 20 words.",
            },
            {
              role: "user",
              content: message.content,
            },
          ],
        });

        const reply = completion.choices[0]?.message?.content;
        await message.reply(reply || "Idk what to say");
      } catch (err) {
        console.error("AI error:", err);
        await message.reply(" Failed to get a response from AI.");
      }
      return;
    }
  },
};
