'use client';
import React, { useState } from 'react';
import { IQuestion } from '@/interfaces';
import { Button } from '@nextui-org/react';
import AnswerForm from './AnswerForm';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface QuestionInfoFooterProps {
  question: IQuestion;
  mongoDbUserId: string;
}

export default function QuestionInfoFooter({
  question,
  mongoDbUserId,
}: QuestionInfoFooterProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showNewAnswerModal, setShowNewAnswerModal] = useState<boolean>(false);

  const onSave = async () => {
    try {
      setLoading(true);
      const payload: IQuestion = question;
      payload.savedBy.push(mongoDbUserId);
      await axios.put(`/api/questions/${question._id}`, payload);
      toast.success('Question saved successfully to your profile');
      router.refresh();
    } catch (error: any) {
      toast.error('Error saving question to your profile');
    } finally {
      setLoading(false);
    }
  };

  const onRemoveFromSaved = async () => {
    try {
      setLoading(true);
      const payload: IQuestion = question;
      payload.savedBy = payload.savedBy.filter(
        (savedBy) => savedBy !== mongoDbUserId
      );
      await axios.put(`/api/questions/${question._id}`, payload);
      toast.success('Question removed successfully from your profile');
      router.refresh();
    } catch (error: any) {
      toast.error('Error saving question to your profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          {question.totalAnswers > 0 ? question.totalAnswers : 'No'} answers
        </span>

        <div className="flex gap-5">
          {question.savedBy.includes(mongoDbUserId) && (
            <Button
              size="sm"
              color="secondary"
              onClick={() => onRemoveFromSaved()}
              isLoading={loading}
            >
              Remove from saved
            </Button>
          )}

          {!question.savedBy.includes(mongoDbUserId) && (
            <Button
              size="sm"
              color="secondary"
              onClick={() => onSave()}
              isLoading={loading}
            >
              Save
            </Button>
          )}

          <Button
            size="sm"
            color="secondary"
            onClick={() => setShowNewAnswerModal(true)}
            isDisabled={mongoDbUserId === question.user._id}
          >
            Write an Answer
          </Button>
        </div>
      </div>

      {showNewAnswerModal && (
        <AnswerForm
          showAnswerForm={showNewAnswerModal}
          setShowAnswerForm={setShowNewAnswerModal}
          questionId={question._id.toString()}
        />
      )}
    </div>
  );
}
