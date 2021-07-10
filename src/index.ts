import { httpRequest } from './lib/http';

if (process.env.ENV === 'development') {
  require('dotenv').config();
}

async function handler(): Promise<string> {
  if (!process.env.AUTHORIZATION_HEADER || !process.env.CHANNEL_ID) {
    throw new Error('A required environment variable is missing.');
  }

  const createMessageRequest = JSON.parse(
    await httpRequest(
      {
        hostname: 'discord.com',
        path: `/api/channels/${process.env.CHANNEL_ID}/messages`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.AUTHORIZATION_HEADER, 
        },
      },
      JSON.stringify({
        content: '👋 Why hello there! Please vote for game night this upcoming week!\n\n1️⃣ Monday\n\n2️⃣ Tuesday\n\n3️⃣ Wednesday\n\n4️⃣ Thursday\n\n5️⃣ Friday',
      }),
    )
  );

  const reactions = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'];

  for (let i = 0; i < reactions.length; i++) {

    await httpRequest(
      {
        hostname: 'discord.com',
        path: `/api/channels/${process.env.CHANNEL_ID}/messages/${createMessageRequest.id}/reactions/${encodeURI(reactions[i])}/@me`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.AUTHORIZATION_HEADER,
        },
      },
    );

    if (i < reactions.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 750, {}));
    }
  }

  return 'Success';
}

exports.handler = handler;
