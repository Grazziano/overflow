import React from 'react';
import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen fixed inset-0">
      <Spinner />
    </div>
  );
}
