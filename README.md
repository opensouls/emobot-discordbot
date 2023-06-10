# EmoBot

This discord repo provides everything you need to create your own EmoBot discord bot - EmoBot is a tech demo that shows how Actions can be used from the SocialAGI project to allow a soul to take action, with the specific action here taken being react with various emojis to messages.

Under the hood, EmoBot uses the [SocialAGI](https://github.com/opensouls/SocialAGI) library to create its digital soul through just a few commands.

## Discord integration tutorial

First export your OpenAI api key:

```
export OPENAI_API_KEY=sk_...
```

Second, create a new discord application at https://discord.com/developers/applications. Make sure to create a fun name, username, and profile image.

You'll need a few environment variables to run the bot

```
export DISCORD_TOKEN_EMOBOT=...
```

You can find your discord application's API token here:

<img width="1391" alt="Screen Shot 2023-06-10 at 5 28 42 PM" src="https://github.com/opensouls/emobot-discordbot/assets/8204988/5c0e1ebe-f5de-4145-8af6-c7d9a75d50c7">

Next, you'll need to decide which channel you're going to deploy the bot to in your server

```
export DISCORD_DEPLOYMENT_CHANNEL_EMOBOT=...
```

You can find the `channelID` by visiting your target discord server/channel inside the web browser

<img width="564" alt="image" src="https://github.com/opensouls/samantha-discordbot/assets/8204988/ea2ccef6-a9d7-4de6-abda-9606c5e8e132">

Now, you'll need to add the discord bot to your server using the discord URL generator with the appropriate permissions

<img width="955" alt="Screen Shot 2023-05-29 at 10 50 22 PM" src="https://github.com/opensouls/samantha-discordbot/assets/8204988/60acb5ca-d7fb-49a0-9e5e-82092310fb8c">

At the bottom of this page you'll get a URL

<img width="1036" alt="Screen Shot 2023-05-29 at 10 30 02 PM" src="https://github.com/opensouls/samantha-discordbot/assets/8204988/443ebab1-8f64-4a01-ab23-f93fc395c956">

Copy this url and then add your new application's bot to your target server

<img width="402" alt="Screen Shot 2023-06-10 at 5 30 32 PM" src="https://github.com/opensouls/emobot-discordbot/assets/8204988/510d6cea-ba5f-4883-827d-ceea5ae59dc9">

## Running the discord bot server locally

Now that your discord bot is in your server, you'll need to install the bot's dependencies

```
npm install
```

and run the bot

```
node bot.js
```

Now, your bot should be in your server running and you should be able to talk to EmoBot.

<img width="435" alt="Screen Shot 2023-06-10 at 5 31 31 PM" src="https://github.com/opensouls/emobot-discordbot/assets/8204988/87559f2d-5d68-4e76-8d0f-5ae557ca5e29">

### Running the discord bot server on heroku

This repo is intended to be deployed to heroku easily.

You'll need to do the following steps:

```
heroku login
```

Then create a heroku git repo

```
heroku create <desired-git-name>
```

Now, deploy the bot to heroku

```
git push heroku main
```

Now that the bot is deployed, you'll have to configure Heroku. First, go to settings and add the appropriate env

<img width="1391" alt="Screen Shot 2023-06-10 at 5 28 42 PM" src="https://github.com/opensouls/emobot-discordbot/assets/8204988/92de6369-4748-43f7-9ae2-50f3369619c8">

Lastly, adjust the resources to run the bot. Your resources should look like this:

<img width="1241" alt="Screen Shot 2023-05-29 at 10 40 13 PM" src="https://github.com/opensouls/samantha-discordbot/assets/8204988/e3f393bc-88cf-4815-bff8-306e4ee0d4f2">

Make sure to kill your local discord bot server.

That's it! Now you should be able to talk to EmoBot running from your Heroku instance

Now, your bot should be in your server running and you should be able to talk to EmoBot.

<img width="434" alt="Screen Shot 2023-06-10 at 5 25 13 PM" src="https://github.com/opensouls/emobot-discordbot/assets/8204988/fe5b2b5b-e665-44b6-ac41-20ed87119c4b">

