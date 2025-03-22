'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react';

import { CirclePlus, Send, ImagePlus } from 'lucide-react'

export default function MessagesContent() {

    const [message, setMessage] = useState('');
    const [recipientId, setRecipientId] = useState('4800028590064156');
    const [status, setStatus] = useState('');

    const sendMessage = async (e) => {

        e.preventDefault();
        setStatus('Sending...');
        try {
          const response = await fetch('/api/send-facebook-message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: message,
              recipientId: recipientId,
            }),
          });
          
          const data = await response.json();
          setStatus(`Message sent: ${JSON.stringify(data)}`);

          console.log(data);
        } catch (error) {
          setStatus(`Error: ${error.message}`);
        }
    }

  return (
    <div className='w-full basis-1/2'>
        <Card className="h-full w-full py-0 gap-2">
            <CardHeader className="flex flex-row items-center bg-muted rounded-t-xl py-3">
                <Avatar className={'w-10 h-10'}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>
                    <h5 className="text-base font-semibold">
                        John Doe
                    </h5>
                    <p className='text-xs font-semibold'>Active</p>
                </span>
            </CardHeader>
            <CardContent className="h-full">
                <div className='h-full flex flex-col-reverse gap-2'>
                    <AgentMessage message="Hello" />
                    <CustomerMessage message="Hi John, how can I help you today?" />
                </div>
            </CardContent>
            <CardFooter className="px-2 py-5">
                <div className='flex flex-row items-center gap-2 w-full'>
                    <div className='flex flex-row items-center h-full'>
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                            <CirclePlus className='size-5' />
                        </Button>
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                            <ImagePlus className='size-5' />
                        </Button>
                    </div>
                    <form className='flex flex-row items-center w-full' onSubmit={sendMessage}>
                        <Input
                            placeholder="Type a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button variant="ghost" size="icon" className="cursor-pointer" type="submit"
                        >
                            <Send className='size-5' />
                        </Button>
                    </form>
                </div>
            </CardFooter>
        </Card>
    </div>
  )
}

function CustomerMessage ({ message }) {
    return (
        <Card className="bg-muted w-fit max-w-[50%] shadow-none px-3 py-2 mr-auto">
            <CardContent className="p-0">
                <p className='font-normal text-sm'>{message}</p>
            </CardContent>
        </Card>
    )
}

function AgentMessage ({ message }) {
    return (
        <Card className="bg-neutral-95 w-fit max-w-[50%] shadow-none px-3 py-2 ml-auto">
            <CardContent className="p-0">
                <p className='font-normal text-sm'>{message}</p>
            </CardContent>
        </Card>
    )
}