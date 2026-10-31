import React, { useState } from 'react';
import { ExamVariant, QuestionItem, SchoolHeader, Subject, Grade } from '../types/curriculum';
import {
  Layers,
  Sparkles,
  Edit3,
  Check,
  X,
  Plus,
  Trash2,
  Download,
  Printer,
  Eye,
  EyeOff,
  Coins,
  CheckCircle2
} from 'lucide-react';
import { exportExamToWord } from '../utils/examFormatter';

interface Props {
  variants: ExamVariant[];
  setVariants: React.Dispatch<React.SetStateAction<ExamVariant[]>>;
  header: SchoolHeader;
  subject: Subject;
  grade: Grade;
  onGenerate10Variants: () => void;
  isLoading: boolean;
}

export const VariantsTab: React.FC<Props> = ({
  variants,
  setVariants,
  header,
  subject,
  grade,
  onGenerate10Variants,
  isLoading,
}) => {
  const [activeCode, setActiveCode] = useState<string>('Đề 01');
  const [showAnswers, setShowAnswers] = useState(false);
  const [editingQId, setEditingQId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<QuestionItem>>({});

  const currentExam = variants.find((v) => v.examCode === activeCode) || variants[0];

  const handleScoreChange = (qId: string, newScore: number) => {
    setVariants((prev) =>
      prev.map((v) => {
        if (v.examCode !== activeCode) return v;
        return {
          ...v,
          questions: v.questions.map((q) => (q.id === qId ? { ...q, score: newScore } : q)),
        };
      })
    );
  };

  const handleStartEdit = (q: QuestionItem) => {
    setEditingQId(q.id);
    setEditForm({ ...q, options: q.options ? [...q.options] : [] });
  };

  const handleSaveEdit = (qId: string) => {
    setVariants((prev) =>
      prev.map((v) => {
        if (v.examCode !== activeCode) return v;
        return {
          ...v,
          questions: v.questions.map((q) =>
            q.id === qId ? ({ ...q, ...editForm } as QuestionItem) : q
          ),
        };
      })
    );
    setEditingQId(null);
  };

  const handleDeleteQuestion = (qId: string) => {
    if (confirm('Xóa câu hỏi này khỏi ' + activeCode + '?')) {
      setVariants((prev) =>
        prev.map((v) => {
          if (v.examCode !== activeCode) return v;
          const filtered = v.questions
            .filter((q) => q.id !== qId)
            .map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
          return { ...v, questions: filtered };
        })
      );
    }
  };

  const handleAddQuestion = () => {
    if (!currentExam) return;
    const nextNum = currentExam.questions.length + 1;
    const newQ: QuestionItem = {
      id: `q_${activeCode}_${Date.now()}`,
      questionNumber: nextNum,
      score: 1.0,
      cognitiveLevel: 'M2',
      type: 'Tự luận',
      topic: 'Kiến thức trọng tâm',
      content: 'Nội dung câu hỏi mới...',
      answer: 'Đáp án chi tiết...',
      guide: 'Hướng dẫn chấm điểm...',
    };

    setVariants((prev) =>
      prev.map((v) => {
        if (v.examCode !== activeCode) return v;
        return { ...v, questions: [...v.questions, newQ] };
      })
    );
  };

  const handleExportAll = () => {
    // Export each variant
    variants.forEach((v, idx) => {
      setTimeout(() => {
        exportExamToWord(v, header, showAnswers);
      }, idx * 300);
    });
  };

  const totalScore = (currentExam?.questions || []).reduce(
    (acc, q) => acc + (Number(q.score) || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-white/20 rounded-xl">
              <Layers className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wide">
                6. BỘ 10 ĐỀ THI KHÁC NHAU & CHỈNH SỬA / SỬA ĐIỂM
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 font-medium">
                Mỗi lần tạo ra 10 đề thi khác nhau bám sát ma trận • Tùy chỉnh câu hỏi và điểm số từng câu linh hoạt
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            title="Tải về toàn bộ 10 đề thi"
          >
            <Download className="w-4 h-4" />
            <span>Tải trọn bộ 10 mã đề</span>
          </button>

          <button
            onClick={onGenerate10Variants}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-md shadow-amber-950/20 transition-all cursor-pointer disabled:opacity-60"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang tạo 10 đề...' : 'AI Tạo lại 10 đề mới'}</span>
          </button>
        </div>
      </div>

      {/* 10 Exam Selector Pill Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between gap-3 mb-2 px-1">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span>CHỌN MÃ ĐỀ ĐỂ XEM & CHỈNH SỬA:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1"
            >
              {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showAnswers ? 'Ẩn đáp án' : 'Hiện đáp án'}</span>
            </button>
            <button
              onClick={() => exportExamToWord(currentExam, header, showAnswers)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-200"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tải đề này (.doc)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {variants.map((v) => {
            const isSelected = v.examCode === activeCode;
            const qCount = v.questions.length;
            const scoreSum = v.questions.reduce((s, q) => s + (Number(q.score) || 0), 0);

            return (
              <button
                key={v.examCode}
                onClick={() => setActiveCode(v.examCode)}
                className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/30 ring-2 ring-purple-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="text-xs font-black">{v.examCode}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                  {qCount} câu • {scoreSum.toFixed(1)}đ
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Exam Editor Card */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-8">
        {/* Banner of active exam */}
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-200 mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 font-black text-sm">
                {currentExam?.examCode}
              </span>
              <h3 className="font-bold text-slate-900 text-base">
                {header.title} — Môn {header.subject} Lớp {header.grade}
              </h3>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Thời gian: <b>{header.durationMinutes} phút</b> • Tổng điểm:{' '}
              <b className="text-purple-700">{totalScore.toFixed(1)} điểm</b> (Chuẩn 10 điểm)
            </div>
          </div>

          <button
            onClick={handleAddQuestion}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm câu hỏi mới</span>
          </button>
        </div>

        {/* Questions list with interactive score editors */}
        <div className="space-y-5 font-['Times_New_Roman',serif] text-[15px]">
          {currentExam?.questions.map((q) => {
            const isEditing = editingQId === q.id;
            const scoreDisplay = ` (${q.score.toString().replace('.', ',')} điểm): `;

            return (
              <div
                key={q.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isEditing
                    ? 'bg-amber-50/80 border-amber-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header of question: score edit badge */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100 font-sans text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">Câu {q.questionNumber}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {q.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        q.cognitiveLevel === 'M1'
                          ? 'bg-blue-100 text-blue-800'
                          : q.cognitiveLevel === 'M2'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {q.cognitiveLevel === 'M1'
                        ? 'Biết (M1)'
                        : q.cognitiveLevel === 'M2'
                        ? 'Hiểu (M2)'
                        : 'Vận dụng (M3)'}
                    </span>
                  </div>

                  {/* Sửa điểm trực tiếp (Requirement 8) */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-semibold text-amber-900 text-[11px]">Sửa điểm:</span>
                      <select
                        value={q.score}
                        onChange={(e) => handleScoreChange(q.id, Number(e.target.value))}
                        className="bg-white border border-amber-300 font-bold text-amber-900 text-xs rounded px-1.5 py-0.5 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value={0.25}>0,25 đ</option>
                        <option value={0.5}>0,50 đ</option>
                        <option value={0.75}>0,75 đ</option>
                        <option value={1.0}>1,00 đ</option>
                        <option value={1.25}>1,25 đ</option>
                        <option value={1.5}>1,50 đ</option>
                        <option value={2.0}>2,00 đ</option>
                        <option value={2.5}>2,50 đ</option>
                        <option value={3.0}>3,00 đ</option>
                      </select>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => handleStartEdit(q)}
                        className="p-1 rounded text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Chỉnh sửa câu hỏi"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1 rounded text-rose-500 hover:bg-rose-100 transition-colors"
                      title="Xóa câu hỏi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                {isEditing ? (
                  <div className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="font-semibold block mb-1">Nội dung câu hỏi:</label>
                      <textarea
                        rows={2}
                        value={editForm.content || ''}
                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    {editForm.options && editForm.options.length > 0 && (
                      <div>
                        <label className="font-semibold block mb-1">Các lựa chọn:</label>
                        {editForm.options.map((opt, oIdx) => (
                          <input
                            key={oIdx}
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...(editForm.options || [])];
                              newOpts[oIdx] = e.target.value;
                              setEditForm({ ...editForm, options: newOpts });
                            }}
                            className="w-full px-2.5 py-1 rounded border border-slate-300 bg-white mb-1"
                          />
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold block mb-1">Đáp án:</label>
                        <input
                          type="text"
                          value={editForm.answer || ''}
                          onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                          className="w-full px-2.5 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Hướng dẫn chấm:</label>
                        <input
                          type="text"
                          value={editForm.guide || ''}
                          onChange={(e) => setEditForm({ ...editForm, guide: e.target.value })}
                          className="w-full px-2.5 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingQId(null)}
                        className="px-3 py-1 rounded border border-slate-300 text-slate-600"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={() => handleSaveEdit(q.id)}
                        className="px-4 py-1 rounded bg-emerald-600 text-white font-bold"
                      >
                        Lưu câu hỏi
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Quy cách đề: Câu số (chữ đậm), điểm (chữ nghiêng và không đậm) liền câu số, câu hỏi (Chữ không đậm) */}
                    <div>
                      <span className="font-bold">Câu {q.questionNumber}</span>
                      <span className="italic font-normal">{scoreDisplay}</span>
                      <span className="font-normal whitespace-pre-line">{q.content}</span>
                    </div>

                    {/* Phương án lùi 1 tab (1cm ~ 28px) */}
                    {q.options && q.options.length > 0 && (
                      <div className="mt-2 ml-7 space-y-1">
                        {q.options.map((opt, idx) => (
                          <div key={idx} className="font-normal text-slate-800">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    {q.trueFalseItems && q.trueFalseItems.length > 0 && (
                      <div className="mt-2 ml-7 space-y-1">
                        {q.trueFalseItems.map((tf, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-6 h-4 border border-slate-600 inline-block text-center text-xs"></span>
                            <span>{tf.statement}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.fillInTheBlank && (
                      <div className="mt-2 ml-7 italic text-slate-700">{q.fillInTheBlank}</div>
                    )}

                    {/* Đáp án nếu bật */}
                    {showAnswers && (
                      <div className="mt-3 p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs font-sans">
                        <div className="font-bold text-purple-900 mb-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                          <span>Đáp án: {q.answer}</span>
                        </div>
                        <div className="italic text-slate-600">Hướng dẫn chấm: {q.guide}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
