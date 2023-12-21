import { connectDB } from '@/config/db';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';

connectDB();

export default async function Home() {
  const user: User | null = await currentUser();

  return (
    <div>
      <h1>Homepage</h1>
      <h1>Logged in user FirstName: {user?.firstName}</h1>
      <h1>Logged in user LastName: {user?.lastName}</h1>
    </div>
  );
}
