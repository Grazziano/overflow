'use client';
import React, { useState } from 'react';
import { IQuestion } from '@/interfaces';
import { Button } from '@nextui-org/react';

interface QuestionInfoFooterProps {
  question: IQuestion;
}

export default function QuestionInfoFooter({
  question,
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
        >
          Write an Answer
        </Button>
      </div>
    </div>
  );
}
