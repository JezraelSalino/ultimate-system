import { Card, CardHeader, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import { UserRoundPlus } from 'lucide-react'
import { Button } from '../ui/button'

export default function MessagesDetails() {
  return (
    <div className='w-full basis-1/4'>
        <Card className="h-full w-full">
            <CardHeader className="flex flex-col items-center gap-0 justify-center">
                <Avatar className={'w-20 h-20'}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h5 className="text-lg font-semibold m-0">
                    John Doe
                </h5>
                <p className='text-xs font-semibold'>Active</p>
                <div className='mt-2'>
                    <Button variant="secondary" size="icon" className="rounded-full cursor-pointer">
                        <UserRoundPlus className='size-5 ml-[2.9px] -mt-[3px]' />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="cursor-pointer hover:no-underline">Chat Info</AccordionTrigger>
                        <AccordionContent>
                            <Button variant="outline" className="w-full mt-2 cursor-pointer">Pinned Messages</Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="cursor-pointer hover:no-underline">Recent Invoice</AccordionTrigger>
                        <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="cursor-pointer hover:no-underline">Is it animated?</AccordionTrigger>
                        <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    </div>
  )
}
