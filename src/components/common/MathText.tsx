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

    // If the entire content is a pure LaTeX equation without delimiters (e.g. from solution step)
    const hasDelimiters = /(\$\$|\\\[|\$|\\\()/.test(content);
    const hasLatexCommands = /(\\frac|\\sqrt|\\times|\\pm|\\implies|\\approx|\\neq|\\leq|\\geq|\\in|_|\^)/.test(content);

    const baseOptions = {
      throwOnError: false,
      output: 'html' as const, // Only generate HTML spans, prevents MathML duplication
      minRuleThickness: 0.05,  // Prevents thin lines, fraction bars, and square roots from disappearing
    };

    if (!hasDelimiters && (block || hasLatexCommands)) {
      try {
        return katex.renderToString(content.trim(), {
          ...baseOptions,
          displayMode: block,
        });
      } catch (err) {
        // Fallback to text parsing
      }
    }

    let processed = content;

    // Pattern for block math: $$ math $$
    processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
      try {
        return `<div class="katex-block-wrapper my-3 text-center overflow-x-auto">${katex.renderToString(math.trim(), {
          ...baseOptions,
          displayMode: true,
        })}</div>`;
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    // Pattern for LaTeX \[ ... \]
    processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
      try {
        return `<div class="katex-block-wrapper my-3 text-center overflow-x-auto">${katex.renderToString(math.trim(), {
          ...baseOptions,
          displayMode: true,
        })}</div>`;
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    // Pattern for inline math: $ math $
    processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          ...baseOptions,
          displayMode: false,
        });
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    // Pattern for inline math: \( math \)
    processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          ...baseOptions,
          displayMode: false,
        });
      } catch (err) {
        return `<code>${math}</code>`;
      }
    });

    // Convert newlines to breaks
    const lines = processed.split('\n');
    return lines.join('<br/>');
  }, [content, block]);

  return (
    <span
      className={`math-content ${block ? 'block' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
