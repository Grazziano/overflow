import { handleNewUserRegistration } from '@/actions/users';
import Filter from '@/components/Filter';
import QuestionCard from '@/components/QuestionCard';
import { connectDB } from '@/config/db';
import { IQuestion } from '@/interfaces';
import QuestionModel from '@/models/questionModel';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Link from 'next/link';

connectDB();

export default async function Home() {
  await handleNewUserRegistration();
  const user: User | null = await currentUser();

  const questions: IQuestion[] = await QuestionModel.find()
    .sort({ updatedAt: -1 })
    .populate('user');

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

      <Filter />

      <div className="flex flex-col gap-5 mt-5">
        {questions.map((question) => (
          <QuestionCard
            key={question._id}
            question={JSON.parse(JSON.stringify(question))}
          />
        ))}
      </div>
    </div>
  );
}
