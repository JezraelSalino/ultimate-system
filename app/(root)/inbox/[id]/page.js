import { getMessagesById } from '@/app/actions';
import MessagesContent from '@/components/inbox/MessagesContent'
import MessagesDetails from '@/components/inbox/MessagesDetails'
import UsersSections from '@/components/inbox/UsersSection'
import React from 'react'

export default async function Page({ params }) {
    const { id } = await params;
    const messages = await getMessagesById(id);
    const session = '242940366637373';

    return (
        <div className='container px-4 h-[calc(100vh-3rem)] min-w-full'>
            <div className='flex flex-row h-full gap-[1rem] min-w-full'>
                <UsersSections />
                <MessagesContent messages={messages} session={session} recipientId={id} />
                <MessagesDetails />
            </div>
        </div>
    )
}