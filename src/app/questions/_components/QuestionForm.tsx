'use client';
import React, { useState } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';

interface QuestionInterface {
  title: string;
  description: string;
}

export default function QuestionForm() {
  const [question, setQuestion] = useState<QuestionInterface>({
    title: '',
    description: '',
  });

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(question);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={onsubmit}>
      <Input
        placeholder="Title"
        isRequired
        required
        label="Title"
        value={question.title}
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        labelPlacement="outside"
      />

      <Textarea
        placeholder="Description"
        isRequired
        required
        label="Description"
        value={question.description}
        onChange={(e) =>
          setQuestion({ ...question, description: e.target.value })
        }
        labelPlacement="outside"
      />

      <div className="flex justify-end gap-5">
        <Button>Cancel</Button>
        <Button color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
