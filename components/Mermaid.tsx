'use client';

import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    if (ref.current) {
        mermaid.run({
            nodes: [ref.current]
        });
    }
  }, [chart]);

  return <div className="mermaid" ref={ref}>{chart}</div>;
};

export default Mermaid;
