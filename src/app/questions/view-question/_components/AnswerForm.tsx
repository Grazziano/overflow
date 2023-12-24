'use client';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  Switch,
  Textarea,
} from '@nextui-org/react';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';

interface AnswerFormProps {
  showAnswerForm: boolean;
  setShowAnswerForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AnswerInterface {
  description: string;
  code: string;
}

export default function AnswerForm({
  showAnswerForm,
  setShowAnswerForm,
}: AnswerFormProps) {
  const [showCode, setShowCode] = useState<boolean>(false);
  const [answer, setAnswer] = useState<AnswerInterface>({
    description: '',
    code: '',
  });

  const onSave = () => {};

  return (
    <Modal
      isOpen={showAnswerForm}
      onOpenChange={() => setShowAnswerForm(false)}
      size="4xl"
    >
      <ModalContent>
        <div className="p-5">
          <h1 className="text-primary text-xl">Write an Answer</h1>

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
          >
            <span className="text-gray-600">Do you want add code?</span>
          </Switch>

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

          <div className="flex justify-end gap-5 mt-5">
            <Button onClick={() => setShowAnswerForm(false)}>Cancel</Button>
            <Button color="primary">Save</Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
