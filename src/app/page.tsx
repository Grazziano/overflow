import { handleNewUserRegistration } from '@/actions/users';
import { connectDB } from '@/config/db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Link from 'next/link';

connectDB();

export default async function Home() {
  await handleNewUserRegistration();
  const user: User | null = await currentUser();

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href="/questions/new-question"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Ask a question
        </Link>
      </div>
    </div>
  );
}
