import React from 'react';
import ProfileTabs from './_components/ProfileTabs';
import QuestionModel from '@/models/questionModel';
import { currentUser } from '@clerk/nextjs/server';
import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';
import { IQuestion } from '@/interfaces';
import AnswerModel from '@/models/answerModel';

interface ProfilePageProps {
  searchParams: any;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const currentUserData = await currentUser();
  const mongoUserId = await getMongoDbUserIdFromClerkUserId(
    currentUserData?.id!
  );

  let askedQuestions: IQuestion[] = [];
  let answeredQuestions: IQuestion[] = [];
  let savedQuestions: IQuestion[] = [];

  const tab = searchParams.tab || 'asked';

  if (tab === 'asked') {
    askedQuestions = await QuestionModel.find({
      user: mongoUserId,
    })
      .sort({ createdAt: -1 })
      .populate('user');
  }

  if (tab === 'answered') {
    answeredQuestions = await AnswerModel.find({
      user: mongoUserId,
    })
      .sort({ createdAt: -1 })
      .populate('question');
  }

  return (
    <div>
      <ProfileTabs
        askedQuestions={JSON.parse(JSON.stringify(askedQuestions))}
        answeredQuestions={JSON.parse(
          JSON.stringify(
            answeredQuestions.map((answer: any) => answer.question)
          )
        )}
        savedQuestions={JSON.parse(JSON.stringify(savedQuestions))}
        mongoUserId={mongoUserId.toString()}
      />
    </div>
  );
}
