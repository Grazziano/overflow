'use client';
import React, { useEffect, useState } from 'react';
import { Chip, Input } from '@nextui-org/react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const tag = searchParams.get('tag');

  useEffect(() => {
    if (!tag) {
      setTimeout(() => {
        router.push(`/?search=${search}`);
      }, 300);
    }
  }, [search]);

  return (
    <div className="mt-5">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for questions"
        size="lg"
      />

      <div className="mt-5">
        {tag && (
          <h1>
            Showing results for tag:{' '}
            <Chip
              color="primary"
              onClose={() => router.push('/')}
              variant="flat"
            >
              {tag}
            </Chip>
          </h1>
        )}
      </div>
    </div>
  );
}
