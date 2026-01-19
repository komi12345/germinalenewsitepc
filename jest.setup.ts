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

// Polyfill TextEncoder/TextDecoder for Next.js 13+ environment in Jest
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Polyfill Request/Response/Headers for Next.js 13+
if (typeof global.Headers === 'undefined') {
  // @ts-ignore
  global.Headers = class Headers {
    private map = new Map<string, string>();
    constructor(init?: any) {
      if (init) {
        Object.keys(init).forEach(key => this.map.set(key, init[key]));
      }
    }
    append(key: string, value: string) {
      this.map.set(key, value);
    }
    get(key: string) {
      return this.map.get(key) || null;
    }
    set(key: string, value: string) {
      this.map.set(key, value);
    }
    forEach(callback: (value: string, key: string) => void) {
      this.map.forEach(callback);
    }
  } as any;
}

if (typeof global.Request === 'undefined') {
  // @ts-ignore
  global.Request = class Request {
    url: string;
    method: string;
    headers: Headers;
    constructor(input: string | { url: string }, init?: any) {
      this.url = typeof input === 'string' ? input : input.url;
      this.method = init?.method || 'GET';
      this.headers = new Headers(init?.headers);
    }
  } as any;
}

if (typeof global.Response === 'undefined') {
  // @ts-ignore
  global.Response = class Response {
    status: number;
    ok: boolean;
    headers: Headers;
    constructor(body?: any, init?: any) {
      this.status = init?.status || 200;
      this.ok = this.status >= 200 && this.status < 300;
      this.headers = new Headers(init?.headers);
    }
    json() {
      return Promise.resolve({});
    }
  } as any;
}
