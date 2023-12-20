'use client';
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

interface UIProviderProps {
  children: React.ReactNode;
}

export default function UIProvider({ children }: UIProviderProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
