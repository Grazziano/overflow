'use client';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';

interface UIProviderProps {
  children: React.ReactNode;
}

export default function UIProvider({ children }: UIProviderProps) {
  return (
    <NextUIProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </NextUIProvider>
  );
}
