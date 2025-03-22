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
    
    const data = await response.json();
    return Response.json(data);
}