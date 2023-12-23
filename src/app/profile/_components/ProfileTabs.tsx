'use client';
import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ProfileTabs() {
  const router = useRouter();

  return (
    <div>
      <Tabs
        color="primary"
        onSelectionChange={(key) => {
          router.push(`/profile?tab=${key}`);
        }}
      >
        <Tab title="Questions Asked" key="asked">
          <h1>Questions Asked</h1>
        </Tab>
        <Tab title="Questions Answered" key="answered">
          <h1>Questions Answered</h1>
        </Tab>
        <Tab title="Questions Saved" key="saved">
          <h1>Questions Saved</h1>
        </Tab>
      </Tabs>
    </div>
  );
}
