'use client';
import React from 'react';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';

export default function ViewCode({ code }: { code: string }) {
  return (
    <CodeMirror
      value={code}
      theme="dark"
      extensions={[javascript({ jsx: true })]}
      defaultValue={code}
      readOnly
    />
  );
}
