'use server'

import { query } from '@/lib/db';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export async function getItems() {
  const result = await query('SELECT * FROM items');
  return result.rows;
}

export async function addItem(data) {
  const { name, description } = data;
  const result = await query(
    'INSERT INTO items(name, description) VALUES($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
}

export async function inserMessage(data) {
    const { sender, recipient, provider, message } = data;
    
    const result = await query(
      'INSERT INTO inbox (sender, recipient, provider, message) VALUES($1, $2, $3, $4) RETURNING *',
      [sender, recipient, provider, message]
    );

    await pusher.trigger('messages-channel', 'new-message', {
      id: result.rows[0].id,
      message,
      sender,
      recipient,
      provider,
      timestamp: new Date().toISOString()
  });

    return result.rows[0];
}

export async function getMessagesById(id) {
  const result = await query('SELECT * FROM inbox WHERE sender = $1 OR recipient = $1', [id]);
  return result.rows;
}