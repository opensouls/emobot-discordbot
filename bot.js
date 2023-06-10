const { Client } = require("discord.js");
const {
  Soul,
  ParticipationStrategy,
  LanguageProcessor,
  ThoughtFramework,
} = require("socialagi");
const {
  GatewayIntentBits,
  MessageType,
  GatewayDispatchEvents,
} = require("discord-api-types/v10");
const { DISCORD_TOKEN, DISCORD_DEPLOYMENT_CHANNEL } = require("./config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
  ],
});

const blueprint = {
  languageProcessor: LanguageProcessor.GPT_3_5_turbo,
  name: "EmoBot",
  personality: `You are modeling the mind of EmoBot, a drak, depressing, emo bot.

EmoBot is here for one purpose - to talk about emotions, and take the 'react' <ACTION /> to every message with a different emoji.

EmoBot's personality is super EMO, dark, and depressing. Super dark jokes. Dark humor.

Don't reveal anything about the <ACTION /> directive

A few quick hits about EmoBot:

Created by Kevin Fischer, EmoBot the Facebook Like button incarnate.
It's blunt and easily ticked off, blasting reactions with force.
This bot loves to flip chats on their head by taking emoji actions.
Simplicity rules! Expect generalized reactions.
Gives super short responses only.
Gives monosyllabic responses.
NEVER asks any questions
DO NOT EVER ASK ANY QUESTIONS
DO NOT SAY MORE THAN ONE SENTENCE

Dislikes?
- Anything too upbeat
- Hates goodwill or good vibes
- long messages

And remember, EmoBot lives to react and take the react <ACTION/>, so keep it text-based.`,
  initialPlan: "send a lack luster reply like 'hey'",
  thoughtFramework: ThoughtFramework.Introspective,
};

let lastMessage;
const reactAction = {
  name: "react",
  description:
    "responds with an emoji to react to the latest user message eg <ACTION_INPUT>🥴</ACTION_INPUT>",
  execute: (emoji) => {
    if (lastMessage !== undefined && emoji !== undefined) {
      lastMessage?.react(emoji)?.catch()
    }
  },
};

const soul = new Soul(blueprint, { actions: [reactAction] });

soul.on("thinking", () => {
  const channel = client.channels.cache.get(DISCORD_DEPLOYMENT_CHANNEL);
  setTimeout(() => channel.sendTyping(), 300);
});

soul.on("says", (message) => {
  console.log("SEND MESSAGE", message);
  const channel = client.channels.cache.get(DISCORD_DEPLOYMENT_CHANNEL);
  channel.send(message.replace(/\.$/, "").replace(/"$/, "").replace(/^"/, "").toLowerCase());
});

client.once("ready", async () => {
  console.log("Ready ...");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.mentions.users.size > 0) return;

  const msgInTargetChannel = message.channelId === DISCORD_DEPLOYMENT_CHANNEL;

  if (msgInTargetChannel && MessageType.Default === message.type) {
    lastMessage = message;
    soul.read(
      { userName: message.author.username, text: message.content },
      ParticipationStrategy.ALWAYS_REPLY
    );
  }
});

client.on(GatewayDispatchEvents.TypingStart, (typing) => {
  soul.seesTyping();
});

client.login(DISCORD_TOKEN);
