"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !ref.current) return;

    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
    });

    mermaid.run({
      nodes: [ref.current],
    });
  }, [chart, isMounted]);

  // サーバーサイドではプレースホルダーを表示
  if (!isMounted) {
    return (
      <div className="mermaid-placeholder bg-gray-100 dark:bg-gray-700 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
        <div className="text-gray-500 dark:text-gray-400">
          図解を読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div className="mermaid" ref={ref}>
      {chart}
    </div>
  );
};

export default Mermaid;
