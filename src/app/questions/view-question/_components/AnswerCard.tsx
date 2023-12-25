'use client';
import React, { useState } from 'react';
import { IAnswer } from '@/interfaces';
import { dateTimeFormat } from '@/helpers/date-time-formats';
import ViewCode from '@/components/ViewCode';
import { Button } from '@nextui-org/react';
import CommentForm from './CommentForm';

interface AnswerCardProps {
  answer: IAnswer;
}

export default function AnswerCard({ answer }: AnswerCardProps) {
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [comments, setComments] = useState<any>([]);

  return (
    <div className="border bg-gray-100 p-3 flex flex-col gap-2 border-gray-300">
      <div className="flex gap-10 text-xs">
        <span>
          Answered On{' '}
          <span className="text-secondary">
            {dateTimeFormat(answer.createdAt)}
          </span>
        </span>

        <span>
          By <span className="text-secondary">{answer.user.name}</span>
        </span>
      </div>

      <p className="text-sm text-gray-600">{answer.description}</p>

      {answer.code && <ViewCode code={answer.code} />}

      <div className="flex justify-between items-center mt-5">
        <h1 className="text-sm">View Comments</h1>
        <Button onClick={() => setShowCommentForm(true)} size="sm">
          Add Comment
        </Button>
      </div>

      {showCommentForm && (
        <CommentForm
          answer={answer}
          showCommentForm={showCommentForm}
          setShowCommentForm={setShowCommentForm}
          reloadData={() => {}}
        />
      )}
    </div>
  );
}
