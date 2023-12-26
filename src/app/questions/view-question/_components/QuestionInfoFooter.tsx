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

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          {question.totalAnswers > 0 ? question.totalAnswers : 'No'} answers
        </span>

        <div className="flex gap-5">
          <Button
            size="sm"
            color="secondary"
            onClick={() => onSave()}
            isLoading={loading}
            isDisabled={question.savedBy.includes(mongoDbUserId)}
          >
            {question.savedBy.includes(mongoDbUserId) ? 'Saved' : 'Save'}
          </Button>
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
