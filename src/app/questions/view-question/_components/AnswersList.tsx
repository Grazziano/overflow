import React from 'react';
import { IQuestion } from '@/interfaces';
import { connectDB } from '@/config/db';
import AnswerModel from '@/models/answerModel';
import AnswerCard from './AnswerCard';
import { currentUser } from '@clerk/nextjs';
import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';

connectDB();

interface AnswersListProps {
  question: IQuestion;
}

export default async function AnswersList({ question }: AnswersListProps) {
  const currentUserData = await currentUser();
  const mongoUserId = await getMongoDbUserIdFromClerkUserId(
    currentUserData?.id!
  );

  const answers = await AnswerModel.find({ question: question._id })
    .populate('user')
    .populate('question')
    .sort({ updatedAt: -1 });

  return (
    <div className="flex flex-col gap-5">
      {answers.map((answer: any) => (
        <AnswerCard
          answer={JSON.parse(JSON.stringify(answer))}
          key={answer._id}
          mongoUserId={mongoUserId.toString()}
        />
      ))}
    </div>
  );
}
