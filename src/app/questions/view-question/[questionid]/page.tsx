import React from 'react';
import { IQuestion } from '@/interfaces';
import QuestionModel from '@/models/questionModel';
import { dateTimeFormat } from '@/helpers/date-time-formats';
import ViewCode from '@/components/ViewCode';
import QuestionInfoFooter from '../_components/QuestionInfoFooter';
import { currentUser } from '@clerk/nextjs';
import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';

interface ViewQuestionProps {
  params: {
    questionid: string;
  };
}

export default async function ViewQuestion({ params }: ViewQuestionProps) {
  const question: IQuestion = (await QuestionModel.findById(
    params.questionid
  ).populate('user')) as IQuestion;

  const currentUserData = await currentUser();
  const mongoDbUserId = await getMongoDbUserIdFromClerkUserId(
    currentUserData?.id!
  );

  return (
    <div>
      <div className="bg-gray-100 p-3">
        <h1 className="text-primary text-xl">{question.title}</h1>

        <div className="flex gap-10 text-xs mt-2">
          <span>
            Asked on{' '}
            <span className="text-secondary">
              {dateTimeFormat(question.createdAt)}
            </span>
          </span>

          <span>
            Asked by{' '}
            <span className="text-secondary">{question.user.name}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-7">
        <p className="text-sm text-gray-600">{question.description}</p>

        <ViewCode code={question.code} />

        <QuestionInfoFooter
          question={JSON.parse(JSON.stringify(question))}
          mongoDbUserId={mongoDbUserId.toString()}
        />
      </div>
    </div>
  );
}
