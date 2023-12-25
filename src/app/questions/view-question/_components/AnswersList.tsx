import React from 'react';
import { IQuestion } from '@/interfaces';
import { connectDB } from '@/config/db';
import AnswerModel from '@/models/answerModel';
import AnswerCard from './AnswerCard';

connectDB();

interface AnswersListProps {
  question: IQuestion;
}

export default async function AnswersList({ question }: AnswersListProps) {
  const answers = await AnswerModel.find({ question: question._id })
    .populate('user')
    .populate('question')
    .sort({ createdAt: -1 });

  return (
    <div className="flex flex-col gap-5">
      {answers.map((answer: any) => (
        <AnswerCard
          answer={JSON.parse(JSON.stringify(answer))}
          key={answer._id}
        />
      ))}
    </div>
  );
}
