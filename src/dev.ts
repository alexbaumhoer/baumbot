const index = require('./index');
index.handler({
  channelId: process.env.CHANNEL_ID,
  message: 'Hello, from sunny Denver, Colorado!',
  reactions: ['🏔', '☀️'],
});
