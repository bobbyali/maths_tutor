import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathText: React.FC<MathTextProps> = ({ content, className = '', block = false }) => {
  const html = useMemo(() => {
    if (!content) return '';

    // First process block math: $$...$$ or \[...\]
    let processed = content;

    // Pattern for block math: $$ math $$
    processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
      try {
        return `<div class="katex-block-wrapper my-3 text-center overflow-x-auto">${katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        })}</div>`;
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    // Pattern for LaTeX \[ ... \]
    processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
      try {
        return `<div class="katex-block-wrapper my-3 text-center overflow-x-auto">${katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        })}</div>`;
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    // Pattern for inline math: $ math $ or \( math \)
    processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    // Convert newlines to breaks where appropriate (preserving markdown structure)
    // Replace double newlines with paragraph breaks, single newlines with <br/>
    const lines = processed.split('\n');
    return lines.join('<br/>');
  }, [content]);

  return (
    <span
      className={`math-content ${block ? 'block' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
