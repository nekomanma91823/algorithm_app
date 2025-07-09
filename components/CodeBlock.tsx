"use client";

import React, { useState, useRef } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Extract code content and language from children
  let codeContent = '';
  let language = '';

  // Children will be a React element, specifically the <code> tag
  if (React.isValidElement(children) && children.props.children) {
    codeContent = children.props.children;
    const className = children.props.className || '';
    const match = className.match(/language-(\w+)/);
    if (match && match[1]) {
      language = match[1];
    }
  }

  const handleCopy = () => {
    if (preRef.current) {
      navigator.clipboard.writeText(codeContent.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-md overflow-hidden">
      <div className="absolute top-2 right-2">
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-gray-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          )}
        </button>
      </div>
      <pre ref={preRef} className="p-4 text-sm text-white overflow-x-auto">
        <code className={`language-${language}`}>
          {codeContent}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;