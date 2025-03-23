import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

import { Input } from '../ui/input'
import UserCard from './UserCard'

export default function UsersSection() {
  return (
    <div className='basis-1/4 w-full'>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Chats</CardTitle>
          <Input placeholder="Search..." className="mt-3" />
        </CardHeader>
        <CardContent>
          <UserCard name="John Doe" img="https://github.com/shadcn.png" id="4800028590064156" />
          {/* <UserCard name="John Doe" img="https://github.com/shadcn.png" />
          <UserCard name="John Doe" img="https://github.com/shadcn.png" /> */}
        </CardContent>
      </Card>
    </div>
  )
}