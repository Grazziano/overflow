'use client';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <div>
      <h1>Homepage</h1>

      <div className="p-10">
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
