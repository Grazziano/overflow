'use client';
import React, { useState } from 'react';
import { IAnswer } from '@/interfaces';
import { dateTimeFormat } from '@/helpers/date-time-formats';
import ViewCode from '@/components/ViewCode';
import { Button } from '@nextui-org/react';
import CommentForm from './CommentForm';
import axios from 'axios';
import AnswerForm from './AnswerForm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AnswerCardProps {
  answer: IAnswer;
  mongoUserId: string;
}

export default function AnswerCard({ answer, mongoUserId }: AnswerCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [showAnswerForm, setShowAnswerForm] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingForDelete, setLoadingForDelete] = useState<boolean>(false);
  const [loadingForDeletingComment, setLoadingForDeletingComment] =
    useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [comments, setComments] = useState<any>([]);
  const router = useRouter();
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [commentFormType, setCommentFormType] = useState<'add' | 'edit'>('add');

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

  const deleteAnswer = async () => {
    try {
      setLoadingForDelete(true);
      await axios.delete(
        `/api/answers/${answer._id}?question=${answer.question._id}`
      );
      toast.success('Answer deleted successfully');
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoadingForDelete(false);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      setLoadingForDeletingComment(true);
      await axios.delete(`/api/comments/${id}`);
      toast.success('Comment deleted successfully');
      getComments();
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoadingForDeletingComment(false);
    }
  };

  return (
    <div className="border bg-gray-100 p-3 flex flex-col gap-2 border-gray-500">
      <div className="flex gap-10 text-xs">
        <span>
          Answered On{' '}
          <span className="text-secondary">
            {dateTimeFormat(answer.updatedAt)}
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

        <div className="flex gap-5">
          {mongoUserId === answer.user._id && (
            <>
              <Button
                onClick={() => {
                  deleteAnswer();
                }}
                size="sm"
                color="primary"
                variant="flat"
                isLoading={loadingForDelete}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  setSelectedAnswer(answer);
                  setShowAnswerForm(true);
                }}
                size="sm"
                color="primary"
                variant="flat"
              >
                Edit
              </Button>
            </>
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
      </div>

      {comments.length > 0 && showComments && (
        <div className="flex flex-col gap-2 ml-5 mt-5">
          {comments.map((comment: any) => (
            <div
              key={comment._id}
              className="border bg-gray-200 p-2 flex flex-col gap-2 border-gray-300"
            >
              <p className="text-sm text-gray-600">{comment.text}</p>

              <div className="flex justify-between mt-5 items-center flex-wrap gap-5">
                <div className="flex gap-5 flex-wrap">
                  {comment.user._id === mongoUserId && (
                    <>
                      <Button
                        onClick={() => {
                          setSelectedComment(comment);
                          deleteComment(comment._id);
                        }}
                        size="sm"
                        color="primary"
                        variant="flat"
                        isLoading={
                          loadingForDeletingComment &&
                          selectedComment?._id === comment._id
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setCommentFormType('edit');
                          setSelectedComment(comment);
                          setShowCommentForm(true);
                        }}
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex gap-10 text-xs">
                  <span>
                    Comment On{' '}
                    <span className="text-secondary">
                      {dateTimeFormat(comment.createdAt)}
                    </span>
                  </span>

                  <span>
                    By{' '}
                    <span className="text-secondary">{comment.user.name}</span>
                  </span>
                </div>
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
          reloadData={getComments}
          initialData={selectedComment}
          type={commentFormType}
        />
      )}

      {showAnswerForm && (
        <AnswerForm
          showAnswerForm={showAnswerForm}
          setShowAnswerForm={setShowAnswerForm}
          questionId={answer.question._id.toString()}
          initialData={selectedAnswer}
          type="edit"
        />
      )}
    </div>
  );
}
