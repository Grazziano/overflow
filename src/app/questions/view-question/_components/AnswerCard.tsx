'use client';
import React, { useState } from 'react';
import { IAnswer } from '@/interfaces';
import { dateTimeFormat } from '@/helpers/date-time-formats';
import ViewCode from '@/components/ViewCode';
import { Button } from '@nextui-org/react';
import CommentForm from './CommentForm';
import axios from 'axios';

interface AnswerCardProps {
  answer: IAnswer;
}

export default function AnswerCard({ answer }: AnswerCardProps) {
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<any>([]);

  const getComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/comments?answer=${answer._id}`);
      setComments(response.data.comments);
    } catch (error: any) {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border bg-gray-100 p-3 flex flex-col gap-2 border-gray-500">
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
        {!showComments ? (
          <Button
            isLoading={loading}
            onClick={() => {
              setShowComments(true);
              getComments();
            }}
            size="sm"
          >
            View Comments
          </Button>
        ) : (
          <Button
            isLoading={loading}
            onClick={() => {
              setShowComments(false);
            }}
            size="sm"
          >
            Hide Comments
          </Button>
        )}
        <Button
          onClick={() => setShowCommentForm(true)}
          size="sm"
          color="primary"
          variant="flat"
        >
          Add Comment
        </Button>
      </div>

      {comments.length > 0 && showComments && (
        <div className="flex flex-col gap-2 ml-5 mt-5">
          {comments.map((comment: any) => (
            <div
              key={comment._id}
              className="border bg-gray-200 p-2 flex flex-col gap-2 border-gray-300"
            >
              <p className="text-sm text-gray-600">{comment.text}</p>

              <div className="flex justify-end gap-10 text-xs">
                <span>
                  Comment On{' '}
                  <span className="text-secondary">
                    {dateTimeFormat(comment.createdAt)}
                  </span>
                </span>

                <span>
                  By <span className="text-secondary">{comment.user.name}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

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
