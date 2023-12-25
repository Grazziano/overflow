'use client';
import React, { useState } from 'react';
import { IAnswer } from '@/interfaces';
import { Button, Modal, ModalContent, Textarea } from '@nextui-org/react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface CommentFormProps {
  type?: 'add' | 'edit';
  answer: IAnswer;
  showCommentForm: boolean;
  setShowCommentForm: (show: boolean) => void;
  reloadData: (answer: IAnswer) => void;
}

export default function CommentForm({
  type = 'add',
  answer,
  showCommentForm,
  setShowCommentForm,
  reloadData,
}: CommentFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const onSave = async () => {
    try {
      setLoading(true);

      if (type === 'add') {
        await axios.post('/api/comments', {
          answer: answer._id,
          text,
          question: answer.question._id,
        });
        toast.success('Comment added successfully');
      }

      reloadData();
      setShowCommentForm(false);
    } catch (error: any) {
      toast.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={showCommentForm}
      onOpenChange={() => setShowCommentForm(false)}
      size="2xl"
    >
      <ModalContent>
        <div className="p-5">
          <h1 className="text-primary text-xl">
            {type === 'add' ? 'Add' : 'Edit'} Comment
          </h1>

          <Textarea
            placeholder="Enter Comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex justify-end gap-5 mt-5">
            <Button onClick={() => setShowCommentForm(false)}>Cancel</Button>
            <Button color="primary" isLoading={loading} onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
