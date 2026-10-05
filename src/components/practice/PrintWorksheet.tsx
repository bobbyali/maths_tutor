import React from 'react';
import { Question } from '../../types/question';
import { StudentProfile } from '../../types/student';
import { MathText } from '../common/MathText';
import { Printer, ArrowLeft } from 'lucide-react';

interface PrintWorksheetProps {
  questions: Question[];
  student: StudentProfile;
  topicTitle: string;
  onBack: () => void;
}

export const PrintWorksheet: React.FC<PrintWorksheetProps> = ({
  questions,
  student,
  topicTitle,
  onBack
}) => {
  const totalMarks = questions.reduce((sum, q) => sum + q.maxMarks, 0);

  return (
    <div className="bg-white min-h-screen p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Top Action Bar (hidden on print) */}
      <div className="no-print flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Interactive View
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md transition-all"
        >
          <Printer className="w-4 h-4" /> Print Worksheet (PDF / Paper)
        </button>
      </div>

      {/* Printable Worksheet Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              GCSE & Lateral Maths Stretch
            </h1>
            <p className="text-sm font-semibold text-slate-600">
              Topic: {topicTitle}
            </p>
          </div>

          <div className="text-right border border-slate-300 rounded-lg p-2.5 text-xs">
            <span className="block font-bold text-slate-500 uppercase tracking-wider">Total Marks</span>
            <span className="text-xl font-black text-slate-900">____ / {totalMarks}</span>
          </div>
        </div>

        {/* Student & Date metadata lines */}
        <div className="grid grid-cols-2 gap-8 mt-6 text-sm font-medium text-slate-700">
          <div className="border-b border-dotted border-slate-400 pb-1">
            <strong>Student:</strong> {student.name} (Year {student.yearGroup})
          </div>
          <div className="border-b border-dotted border-slate-400 pb-1">
            <strong>Date:</strong> ________________________
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-12">
        {questions.map((q, idx) => (
          <div key={q.id} className="page-break-inside-avoid space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <span className="font-bold text-slate-900 text-base">
                  Question {idx + 1}
                </span>
                <div className="text-slate-900 text-base leading-relaxed">
                  <MathText content={q.prompt} />
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-bold text-xs border border-slate-400 px-2.5 py-1 rounded">
                  [{q.maxMarks} marks]
                </span>
                <p className="text-[10px] text-slate-500 mt-1">
                  {q.calculatorAllowed ? 'Calculator' : 'Non-Calc'}
                </p>
              </div>
            </div>

            {/* Ruled / Blank box for handwritten working */}
            <div className="border border-dashed border-slate-300 rounded-xl h-48 w-full p-3 text-[11px] text-slate-400 flex flex-col justify-between">
              <span>Show your working clearly below:</span>
              <div className="self-end border-t border-slate-400 pt-1 w-48 text-right font-bold text-slate-700">
                Answer: __________________
              </div>
            </div>

            {/* Source attribution line */}
            <div className="text-[10px] text-slate-400 italic">
              Source: {q.citation.sourceLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
