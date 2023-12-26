import { handleNewUserRegistration } from '@/actions/users';
import Filter from '@/components/Filter';
import QuestionCard from '@/components/QuestionCard';
import { connectDB } from '@/config/db';
import { IQuestion } from '@/interfaces';
import QuestionModel from '@/models/questionModel';
import Link from 'next/link';

connectDB();

interface HomeProps {
  searchParams: {
    tag: string;
    search: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  await handleNewUserRegistration();
  const { tag, search } = searchParams;

  let filtersObject = {};

  if (tag) {
    filtersObject = {
      tags: {
        $in: [tag],
      },
    };
  }

  if (search) {
    filtersObject = {
      title: {
        $regex: search,
        $options: 'i',
      },
    };
  }

  const questions: IQuestion[] = await QuestionModel.find(filtersObject)
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
