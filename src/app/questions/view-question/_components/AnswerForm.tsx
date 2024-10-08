'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  Switch,
  Textarea,
} from '@nextui-org/react';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AnswerFormProps {
  showAnswerForm: boolean;
  setShowAnswerForm: React.Dispatch<React.SetStateAction<boolean>>;
  type?: 'edit' | 'add';
  questionId: string;
  initialData?: any;
}

interface AnswerInterface {
  description: string;
  code: string;
  question: string;
}

export default function AnswerForm({
  showAnswerForm,
  setShowAnswerForm,
  type = 'add',
  questionId = '',
  initialData,
}: AnswerFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [answer, setAnswer] = useState<AnswerInterface>({
    description: '',
    code: '',
    question: '',
  });
  const router = useRouter();

  const onSave = async () => {
    try {
      setLoading(true);

      if (!showCode) {
        answer.code = '';
      }

      if (type === 'add') {
        answer.question = questionId;
        await axios.post('/api/answers', answer);
        toast.success('Answer saved successfully');
      } else {
        await axios.put(`/api/answers/${initialData._id}`, answer);
        toast.success('Answer updated successfully');
      }

      router.refresh();
      setShowAnswerForm(false);
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === 'edit') {
      setAnswer(initialData);

      if (initialData.code) {
        setShowCode(true);
      }
    }
  }, [initialData, type]);

  return (
    <Modal
      isOpen={showAnswerForm}
      onOpenChange={() => setShowAnswerForm(false)}
      size="4xl"
    >
      <ModalContent>
        <div className="p-5">
          <h1 className="text-primary text-xl">
            {type === 'add' ? 'Add' : 'Edit'} Answer
          </h1>

          <Textarea
            placeholder="Description"
            value={answer.description}
            onChange={(e) =>
              setAnswer({ ...answer, description: e.target.value })
            }
            label="Description"
            labelPlacement="outside"
          />

          <Switch
            placeholder="Do you want add code?"
            defaultChecked={showCode}
            onChange={() => setShowCode(!showCode)}
            isSelected={showCode}
            className="py-5"
          >
            <span className="text-gray-600">Do you want add code?</span>
          </Switch>

          {showCode && (
            <CodeMirror
              value={answer.code}
              height="200px"
              theme="dark"
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => {
                setAnswer({ ...answer, code: value });
              }}
              defaultValue={answer.code}
            />
          )}

          <div className="flex justify-end gap-5 mt-5">
            <Button onClick={() => setShowAnswerForm(false)}>Cancel</Button>
            <Button color="primary" isLoading={loading} onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
