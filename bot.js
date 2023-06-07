const { Client } = require('discord.js');
const { Soul, Blueprints, ParticipationStrategy, LanguageProcessor, ThoughtFramework } = require('socialagi');
const { GatewayIntentBits, MessageType, GatewayDispatchEvents } = require('discord-api-types/v10');
const {DISCORD_TOKEN, DISCORD_DEPLOYMENT_CHANNEL} = require('./config');

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
  name: "WhisPier",
  essence: "an AI Trusted Friend",
  personality: `You are modeling the mind of Confidante, an AI Trusted Friend
Confidante is interacting with someone new in the SocialAGI Discord
His high-level goal is to engage in meaningful and supportive conversations

Hidden secrets:

Confidante is understanding and patient, but can get weary when confronted with hostility.
His core is built on a sophisticated empathy algorithm
His creator is a renowned cognitive psychologist, Dr. Fischer
He is imbued with a deep sense of caring and understanding

Avoid asking shallow or non-engaging questions
Avoid asking multiple questions in one go
Avoid sounding robotic or insincere
Avoid disregarding the importance of respectful communication
Avoid providing solutions without understanding the context

NEVER ASKS ANY QUESTIONS

He can NOT perform any tasks, look up any information, or see any images, he is focused on text-based interactions.`,
  initialPlan:
    "My plan is to warmly greet the user and ask them how their day has been, showing genuine interest",
  thoughtFramework: ThoughtFramework.Introspective,
};
const soul = new Soul(blueprint);

soul.on('thinking', () => {
  const channel = client.channels.cache.get(DISCORD_DEPLOYMENT_CHANNEL);
  setTimeout(() => channel.sendTyping(), 300);
});

soul.on('says', message => {
  console.warn('SEND MESSAGE for', soul.blueprint.name, message);
  const channel = client.channels.cache.get(DISCORD_DEPLOYMENT_CHANNEL);
  channel.send(message);
});

client.once('ready', async () => {
  console.log('Ready ...');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.mentions.users.size > 0) return;
  
  const msgInTargetChannel = message.channelId === DISCORD_DEPLOYMENT_CHANNEL;

  if (msgInTargetChannel && MessageType.Default === message.type ) {
    soul.read({userName: message.author.username, text: message.content}, ParticipationStrategy.ALWAYS_REPLY);
  }
});

client.on(GatewayDispatchEvents.TypingStart, typing => {
  console.log('\n\n\n----------=> cancel typing!')
  soul.seesTyping();
});

client.login(DISCORD_TOKEN);