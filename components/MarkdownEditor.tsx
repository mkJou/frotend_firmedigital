'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

export default function MarkdownEditor({ initialValue = '' }) {
  const [value, setValue]: any = useState(initialValue);

  return (
    <div data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={setValue}
        preview="live"
        className="w-full"
      />
    </div>
  );
}