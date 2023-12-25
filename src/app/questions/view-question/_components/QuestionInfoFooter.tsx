'use client';
import React, { useState } from 'react';
import { IQuestion } from '@/interfaces';
import { Button } from '@nextui-org/react';
import AnswerForm from './AnswerForm';

interface QuestionInfoFooterProps {
  question: IQuestion;
  mongoDbUserId: string;
}

export default function QuestionInfoFooter({
  question,
  mongoDbUserId,
}: QuestionInfoFooterProps) {
  const [showNewAnswerModal, setShowNewAnswerModal] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          {question.totalAnswers > 0 ? question.totalAnswers : 'No'} answers
        </span>

        <Button
          size="sm"
          color="secondary"
          onClick={() => setShowNewAnswerModal(true)}
          isDisabled={mongoDbUserId === question.user._id}
        >
          Write an Answer
        </Button>
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
