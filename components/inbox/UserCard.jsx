import { Button } from '../ui/button'
import { Ellipsis } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "../ui/card"
import Link from 'next/link'

export default function UserCard({ name, img, id }) {
  return (
    <Link href={`/inbox/${id}`}>
        <Card className="py-4 cursor-pointer hover:bg-muted border-none shadow-none group">
            <CardContent className="flex gap-3 items-center px-3">
                <Avatar className="w-9 h-9">
                    <AvatarImage src={img} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <h5 className="text-base font-semibold">
                        {name}
                    </h5>
                    <span className='flex gap-1 items-center'>
                        <p className='text-xs font-semibold'>
                            You:
                        </p>
                        <p className='text-xs'>
                            Hello, how may I help you?
                        </p>
                    </span>
                </div>
                <Button variant="outline" size="icon" className="rounded-full ml-auto cursor-pointer opacity-0 group-hover:opacity-100">
                    <Ellipsis />
                </Button>
            </CardContent>
        </Card>
    </Link>
  )
}
