'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { IQuestion } from '@/interfaces';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ProfileTabsProps {
  askedQuestions: IQuestion[];
  answeredQuestions: IQuestion[];
  savedQuestions: IQuestion[];
}

export default function ProfileTabs({
  askedQuestions,
  answeredQuestions,
  savedQuestions,
}: ProfileTabsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedQuestionToDelete, setSelectedQuestionToDelete] = useState<
    string | null
  >(null);

  const deleteQuestion = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/questions/${id}`);
      toast.success('Question deleted successfully');
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getQuestion = (question: IQuestion) => (
    <div className="border p-3 flex flex-col gap-2 bg-gray-50 cursor-pointer hover:border-gray-700">
      <h1>{question.title}</h1>
      <span className="text-gray-500 text-sm line-clamp-2">
        {question.description}
      </span>

      <div className="flex justify-end gap-5 mt-5">
        <Button
          size="sm"
          color="secondary"
          variant="flat"
          isLoading={loading && selectedQuestionToDelete === question._id}
          onClick={() => {
            setSelectedQuestionToDelete(question._id);
            deleteQuestion(question._id);
          }}
        >
          Delete
        </Button>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          onClick={() =>
            router.push(`/questions/edit-question/${question._id}`)
          }
        >
          Edit
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Tabs
        color="primary"
        onSelectionChange={(key) => {
          router.push(`/profile?tab=${key}`);
        }}
      >
        <Tab title="Questions Asked" key="asked">
          <div className="flex flex-col gap-5">
            {askedQuestions.map((question) => (
              <h1 key={question._id}>{getQuestion(question)}</h1>
            ))}
          </div>
        </Tab>
        <Tab title="Questions Answered" key="answered">
          <h1>Questions Answered</h1>
        </Tab>
        <Tab title="Questions Saved" key="saved">
          <h1>Questions Saved</h1>
        </Tab>
      </Tabs>
    </div>
  );
}
