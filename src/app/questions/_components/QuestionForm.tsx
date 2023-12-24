'use client';
import React, { useEffect, useState } from 'react';
import { Button, Input, Switch, Textarea } from '@nextui-org/react';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface QuestionInterface {
  title: string;
  description: string;
  code: string;
}

interface QuestionFormProps {
  inicialData?: any;
  type?: 'edit' | 'add';
}

export default function QuestionForm({
  inicialData = null,
  type = 'add',
}: QuestionFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [question, setQuestion] = useState<QuestionInterface>({
    title: '',
    description: '',
    code: '',
  });

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (type === 'add') {
        await axios.post('/api/questions', question);
        toast.success('Question created successfully');
      } else {
        await axios.put(`/api/questions/${inicialData._id}`, question);
        toast.success('Question updated successfully');
      }

      router.refresh();
      router.back();
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === 'edit' && inicialData) {
      setQuestion(inicialData);

      if (inicialData.code) setShowCode(true);
    }
  }, [inicialData]);

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

      <Switch
        placeholder="Do you want add code?"
        defaultChecked={showCode}
        onChange={() => setShowCode(!showCode)}
        isSelected={showCode}
      >
        <span className="text-gray-600">Do you want add code?</span>
      </Switch>

      {showCode && (
        <CodeMirror
          value={question.code}
          height="200px"
          theme="dark"
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => {
            setQuestion({ ...question, code: value });
          }}
          defaultValue={question.code}
        />
      )}

      <div className="flex justify-end gap-5">
        <Button>Cancel</Button>
        <Button color="primary" type="submit" isLoading={loading}>
          Save
        </Button>
      </div>
    </form>
  );
}
