'use client';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Home() {
  const user = useUser();

  console.log(user);

  return (
    <div>
      <h1>Homepage</h1>

      <div className="p-10">
        <UserButton />

        <Button
          color="secondary"
          onClick={() => {
            toast.success('hello world');
          }}
        >
          Click Me
        </Button>
      </div>
    </div>
  );
}
