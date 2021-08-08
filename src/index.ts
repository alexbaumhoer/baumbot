import { httpRequest } from './lib/http';

if (process.env.ENV === 'development') {
  require('dotenv').config();
}

const DEFAULT_MESSAGE_CONTENT = 'Hello, World!';

async function handler(event: undefined | null | { [name: string]: any; }): Promise<string> {
  if (!process.env.AUTHORIZATION_HEADER) {
    throw new Error('An AUTHORIZATION_HEADER environment variable must be defined.');
  }

  if (!event?.channelId) {
    throw new Error('channelId must be defined on the handler event.');
  }

  const createMessageRequest = JSON.parse(
    await httpRequest(
      {
        hostname: 'discord.com',
        path: `/api/channels/${event.channelId}/messages`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.AUTHORIZATION_HEADER, 
        },
      },
      JSON.stringify({
        content: event?.message ? event.message : DEFAULT_MESSAGE_CONTENT,
      }),
    )
  );

  if (event?.reactions) {
    for (let i = 0; i < event.reactions.length; i++) {

      await httpRequest(
        {
          hostname: 'discord.com',
          path: `/api/channels/${event.channelId}/messages/${createMessageRequest.id}/reactions/${encodeURI(event.reactions[i])}/@me`,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTHORIZATION_HEADER,
          },
        },
      );
  
      if (i < event.reactions.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 750, {}));
      }
    }
  }  

  return 'Success';
}

exports.handler = handler;
