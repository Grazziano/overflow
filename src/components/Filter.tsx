'use client';
import { Input } from '@nextui-org/react';
import React, { useState } from 'react';

export default function Filter() {
  const [search, setSearch] = useState<string>('');

  return (
    <div className="mt-5">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for questions"
        size="lg"
      />
    </div>
  );
}
