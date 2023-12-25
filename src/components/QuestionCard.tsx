'use client';
import React from 'react';
import { IQuestion } from '@/interfaces';
import { dateTimeFormat } from '@/helpers/date-time-formats';
import { useRouter } from 'next/navigation';

interface QuestionCardProps {
  question: IQuestion;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const router = useRouter();

  return (
    <div
      className="p-3 flex flex-col gap-3 border bg-gray-50 hover:border-gray-700 cursor-pointer"
      onClick={() => router.push(`/questions/view-question/${question._id}`)}
    >
      <h1>{question.title}</h1>
      <p className="text-gray-500 line-clamp-2 text-sm">
        {question.description}
      </p>

      <div className="flex justify-between mt-5 items-center">
        <div>
          <span className="text-secondary text-xs">
            {question.totalAnswers > 0 ? question.totalAnswers : 'No'} answers
          </span>
        </div>

        <div className="flex gap-10 text-xs">
          <span>
            Asked on{' '}
            <span className="text-secondary">
              {dateTimeFormat(question.updatedAt)}
            </span>
          </span>

          <span>
            Asked by{' '}
            <span className="text-secondary">{question.user.name}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
