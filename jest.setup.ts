import '@testing-library/jest-dom';
import React from 'react';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return React.createElement('img', props);
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ 
    children, 
    href, 
    ...props 
  }: { 
    children: React.ReactNode; 
    href: string; 
    [key: string]: unknown;
  }) {
    return React.createElement('a', { href, ...props }, children);
  },
}));
