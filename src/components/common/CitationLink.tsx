import React from 'react';
import { QuestionCitation } from '../../types/question';
import { ExternalLink, Award, FileText, Sparkles } from 'lucide-react';

interface CitationLinkProps {
  citation: QuestionCitation;
  className?: string;
}

export const CitationLink: React.FC<CitationLinkProps> = ({ citation, className = '' }) => {
  if (citation.sourceType === 'custom_stretch') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 ${className}`}>
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Custom Stretch Question</span>
      </span>
    );
  }

  const isUkmt = citation.sourceType === 'ukmt';

  return (
    <a
      href={citation.citationUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="View authentic source paper & official mark scheme"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        isUkmt 
          ? 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 hover:border-rose-300' 
          : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 hover:border-blue-300'
      } ${className}`}
    >
      {isUkmt ? (
        <Award className="w-3.5 h-3.5 text-rose-600" />
      ) : (
        <FileText className="w-3.5 h-3.5 text-blue-600" />
      )}
      <span className="font-semibold underline decoration-dotted underline-offset-2">
        {citation.sourceLabel}
      </span>
      <ExternalLink className="w-3 h-3 opacity-70" />
    </a>
  );
};
