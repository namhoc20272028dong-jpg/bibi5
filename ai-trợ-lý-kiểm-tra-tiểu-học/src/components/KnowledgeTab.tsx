import React from 'react';
import { LessonItem, Subject, Grade, ExamTerm } from '../types/curriculum';
import { Sparkles, CheckCircle2, BookmarkCheck, Lightbulb, Compass, Award } from 'lucide-react';

interface Props {
  lessons: LessonItem[];
  subject: Subject;
  grade: Grade;
  term: ExamTerm;
  onAiSuggest: () => void;
  isLoading: boolean;
}

export const KnowledgeTab: React.FC<Props> = ({
  lessons,
  subject,
  grade,
  term,
  onAiSuggest,
  isLoading,
}) => {
  // Group lessons by topic (mạch kiến thức)
  const groupedLessons = lessons.reduce((acc, lesson) => {
    const topic = lesson.topic || 'Kiến thức chung';
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(lesson);
    return acc;
  }, {} as Record<string, LessonItem[]>);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-600 text-white rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                2. Kiến thức trọng tâm & Yêu cầu cần đạt chuẩn GDPT 2018
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Môn <span className="font-semibold text-emerald-800">{subject}</span> — Lớp{' '}
                <span className="font-semibold text-emerald-800">{grade}</span> ({term}) • Bộ sách{' '}
                <span className="font-semibold text-teal-800">Kết nối tri thức với cuộc sống</span>
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onAiSuggest}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-60"
        >
          <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Đang cập nhật...' : 'AI Tối ưu Yêu cầu cần đạt'}</span>
        </button>
      </div>

      {/* Topics Display */}
      <div className="space-y-6">
        {Object.entries(groupedLessons).map(([topic, items], idx) => {
          const topicPeriods = items.reduce((s, it) => s + (it.periods || 0), 0);
          return (
            <div
              key={topic}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                    Mạch: <span className="text-emerald-700">{topic}</span>
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                  {items.length} bài học • {topicPeriods} tiết
                </span>
              </div>

              <div className="p-5 divide-y divide-slate-100 space-y-4">
                {items.map((item, itemIdx) => (
                  <div key={item.id} className={`${itemIdx > 0 ? 'pt-4' : ''}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <BookmarkCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{item.lessonName}</span>
                      </h4>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 shrink-0">
                        {item.periods} tiết
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60">
                        <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          <span>Kiến thức trọng tâm:</span>
                        </div>
                        <p className="text-xs text-amber-950 leading-relaxed font-medium">
                          {item.coreKnowledge}
                        </p>
                      </div>

                      <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200/60">
                        <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
                          <Compass className="w-3.5 h-3.5 text-blue-600" />
                          <span>Yêu cầu cần đạt (GDPT 2018):</span>
                        </div>
                        <p className="text-xs text-blue-950 leading-relaxed font-medium">
                          {item.requirements}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
