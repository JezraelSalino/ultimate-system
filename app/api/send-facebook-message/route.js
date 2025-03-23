import { inserMessage } from '@/app/actions';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export async function POST(request) {
    const body = await request.json();
    
    const response = await fetch('https://graph.facebook.com/v21.0/me/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FACEBOOK_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: JSON.stringify({ text: body.text }),
        recipient: JSON.stringify({ id: body.recipientId })
      })
    });

    await inserMessage({ sender: '242940366637373', recipient: body.recipientId, provider: 'facebook', message: body.text });
    
    const data = await response.json();
    return Response.json(data);
}