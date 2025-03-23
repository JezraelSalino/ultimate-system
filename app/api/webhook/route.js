import { inserMessage } from "@/app/actions";
import { NextResponse } from "next/server";
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    const VERIFY_TOKEN = "z2zi596DwW2xpzvvAoAyP4FR3J0XdrM0qsDzjgsc7UvLBR2h0hC1VZL6aXiyDJ6K";

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
    } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        console.log('Received Facebook Webhook:', body);
        // console.log('Received Facebook Webhook:', body.entry[0].messaging[0].message.text);
        // console.log('Received Facebook Webhook:', body.entry[0].messaging[0].sender.id);
        // console.log('Received Facebook Webhook:', body.entry[0].messaging[0].recipient.id);
        // console.log('Received Facebook Webhook:', body.entry[0].messaging[0]);

        const { entry } = body;
        const message = entry[0].messaging[0].message.text;
        const sender = entry[0].messaging[0].sender.id;
        const recipient = entry[0].messaging[0].recipient.id;
        const provider = "facebook";

        const newMessage = await inserMessage({ sender, recipient, provider, message });

        await pusher.trigger('messages-channel', 'new-message', {
            id: newMessage.id,
            message,
            sender,
            recipient,
            provider,
            timestamp: new Date().toISOString()
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}