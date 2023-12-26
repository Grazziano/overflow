import React from 'react';
import ProfileTabs from './_components/ProfileTabs';
import QuestionModel from '@/models/questionModel';
import { currentUser } from '@clerk/nextjs/server';
import { getMongoDbUserIdFromClerkUserId } from '@/actions/users';
import { IQuestion } from '@/interfaces';
import AnswerModel from '@/models/answerModel';
import CommentModel from '@/models/commentModel';

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
  let commentedQuestions: IQuestion[] = [];

  const tab = searchParams.tab || 'asked';

  if (tab === 'asked') {
    askedQuestions = await QuestionModel.find({
      user: mongoUserId,
    })
      .sort({ updatedAt: -1 })
      .populate('user');
  }

  if (tab === 'answered') {
    answeredQuestions = await AnswerModel.find({
      user: mongoUserId,
    })
      .sort({ updatedAt: -1 })
      .populate('question');
  } else if (tab === 'saved') {
    savedQuestions = await QuestionModel.find({
      savedBy: {
        $in: [mongoUserId],
      },
    });
  } else if (tab === 'commented') {
    commentedQuestions = await CommentModel.find({ user: mongoUserId })
      .sort({ updatedAt: -1 })
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
        commentedQuestions={JSON.parse(
          JSON.stringify(
            commentedQuestions.map((comment: any) => comment.question)
          )
        )}
        mongoUserId={mongoUserId.toString()}
      />
    </div>
  );
}
