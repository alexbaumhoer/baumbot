# lambda-discord-bot

A (very) simple Discord bot intended to run on AWS Lambda written in Node with TypeScript.

## Prerequisites

- Node 18

## Running locally

### Install dependencies

```sh
npm i
```

### Setup required environment variables

Create a `.env` file at the root of the project:
```
AUTHORIZATION_HEADER=<Bot token from Discord>
CHANNEL_ID=<Discord channel id>
```

### Run the bot
```sh
npm run dev
```

A message should be posted to the Discord channel defined in your environment variables.

## Deploying to Lambda

### Build the project
```sh
npm run build
```

A zipped function should be output to `dist/dist.zip`.

### Upload to Lambda

Within your Lambda in the AWS Console select `Upload from` -> `.zip file`.

### Configure environment variables

Within your Lambda in the AWS console go to `Configuration` and configure `AUTHORIZATION_HEADER` as an environment variable.

### Event structure

When executing your Lambda you will need to ensure that an event is passed in with the following structure:
```
{
  channelId: string // The Discord channel id this message should be posted to
  message?: string // (Optional) The content of the message that will be posted
  reactions?: string[] // (Optional) An array of reactions to be added to the message
}
```
