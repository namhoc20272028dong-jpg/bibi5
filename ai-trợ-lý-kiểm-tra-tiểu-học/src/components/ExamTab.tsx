import React, { useState } from 'react';
import { ExamVariant, QuestionItem, SchoolHeader, Subject, Grade, ReadingPassage } from '../types/curriculum';
import {
  FileText,
  Printer,
  Download,
  Eye,
  EyeOff,
  Edit2,
  Save,
  X,
  Sparkles,
  Plus,
  Trash2,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { exportExamToWord } from '../utils/examFormatter';

interface Props {
  exam: ExamVariant;
  setExam: (updated: ExamVariant) => void;
  header: SchoolHeader;
  subject: Subject;
  grade: Grade;
  readingPassage?: ReadingPassage;
  onGenerateNewExam: () => void;
  isLoading: boolean;
}

export const ExamTab: React.FC<Props> = ({
  exam,
  setExam,
  header,
  subject,
  grade,
  readingPassage,
  onGenerateNewExam,
  isLoading,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<QuestionItem>>({});

  const isLowerGrade = grade <= 3;

  const handleStartEdit = (q: QuestionItem) => {
    setEditingQuestionId(q.id);
    setEditForm({ ...q, options: q.options ? [...q.options] : [] });
  };

  const handleSaveEdit = (qId: string) => {
    const updatedQuestions = exam.questions.map((q) =>
      q.id === qId ? ({ ...q, ...editForm } as QuestionItem) : q
    );
    setExam({ ...exam, questions: updatedQuestions });
    setEditingQuestionId(null);
  };

  const handleScoreChange = (qId: string, newScore: number) => {
    const updatedQuestions = exam.questions.map((q) =>
      q.id === qId ? { ...q, score: newScore } : q
    );
    setExam({ ...exam, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (qId: string) => {
    if (confirm('Xóa câu hỏi này khỏi đề thi?')) {
      const filtered = exam.questions
        .filter((q) => q.id !== qId)
        .map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
      setExam({ ...exam, questions: filtered });
    }
  };

  const handleAddQuestion = () => {
    const nextNum = exam.questions.length + 1;
    const newQ: QuestionItem = {
      id: `q_new_${Date.now()}`,
      questionNumber: nextNum,
      score: 1.0,
      cognitiveLevel: 'M2',
      type: 'Tự luận',
      topic: 'Kiến thức trọng tâm',
      content: 'Nội dung câu hỏi mới...',
      answer: 'Đáp án chi tiết...',
      guide: 'Hướng dẫn chấm điểm...'
    };
    setExam({ ...exam, questions: [...exam.questions, newQ] });
  };

  const totalScore = exam.questions.reduce((sum, q) => sum + (Number(q.score) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Control Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-blue-100 text-blue-800 rounded-xl">
            <FileText className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Đề thi chính thức: <span className="text-blue-700">{exam.examCode}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Tổng số: <b>{exam.questions.length} câu</b> • Tổng điểm:{' '}
              <b className="text-blue-700">{totalScore.toFixed(1)} / 10 điểm</b>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle answers */}
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              showAnswers
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showAnswers ? 'Ẩn đáp án & Hướng dẫn chấm' : 'Hiện đáp án & Biểu điểm'}</span>
          </button>

          <button
            onClick={handleAddQuestion}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Thêm câu hỏi</span>
          </button>

          <button
            onClick={() => exportExamToWord(exam, header, showAnswers)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Xuất file Word (.doc)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In đề kiểm tra</span>
          </button>

          <button
            onClick={onGenerateNewExam}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer disabled:opacity-60"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang tạo...' : 'Tạo lại đề mới'}</span>
          </button>
        </div>
      </div>

      {/* Official Exam Sheet Container (Formatted exactly for print/display) */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-10 max-w-4xl mx-auto font-['Times_New_Roman',serif] text-slate-900 text-[15px] leading-relaxed print:p-0 print:border-none print:shadow-none">
        {/* Header Hành chính chuẩn */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-900 mb-4 text-center">
          <div className="col-span-5 flex flex-col justify-center">
            <div className="font-bold text-xs sm:text-sm uppercase tracking-wide">
              {header.deptName}
            </div>
            <div className="font-bold text-xs sm:text-sm uppercase border-b border-slate-900 inline-block mx-auto pb-0.5">
              {header.schoolName}
            </div>
            <div className="italic text-xs mt-1 text-slate-700">Mã đề: {exam.examCode}</div>
          </div>
          <div className="col-span-7 flex flex-col justify-center">
            <div className="font-bold text-sm sm:text-base uppercase tracking-wide">
              {header.title}
            </div>
            <div className="font-bold text-xs sm:text-sm uppercase">NĂM HỌC {header.academicYear}</div>
            <div className="font-bold text-xs sm:text-sm uppercase">
              MÔN: {header.subject} - LỚP {header.grade}
            </div>
            <div className="italic text-xs">(Thời gian làm bài: {header.durationMinutes} phút)</div>
          </div>
        </div>

        {/* Khung Thông tin Học sinh & Đánh giá theo Thông tư 27 */}
        <div className="border border-slate-900 mb-6 text-xs sm:text-sm">
          <div className="grid grid-cols-12 border-b border-slate-900">
            <div className="col-span-7 p-2.5 border-r border-slate-900 leading-normal">
              <div>
                Họ và tên học sinh: <span className="font-mono text-slate-400">....................................................................</span>
              </div>
              <div className="mt-1">
                Lớp: <span className="font-mono text-slate-400">..........</span> Trường: <span className="font-mono text-slate-400">................................................................</span>
              </div>
            </div>
            <div className="col-span-5 p-2.5 leading-normal">
              <div>
                Ngày kiểm tra: <span className="font-mono text-slate-400">..... / ..... / 202...</span>
              </div>
              <div className="mt-1">
                Giám thị (Ký, ghi rõ họ tên): <span className="font-mono text-slate-400">...................</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 text-center">
            <div className="col-span-4 p-2.5 border-r border-slate-900 flex flex-col justify-between min-h-[70px]">
              <div className="font-bold uppercase text-xs">ĐIỂM SỐ</div>
              <div className="text-xl font-bold text-slate-400">/ 10</div>
            </div>
            <div className="col-span-8 p-2.5 text-left flex flex-col justify-between">
              <div className="font-bold text-xs uppercase">
                NHẬN XÉT CỦA GIÁO VIÊN (Theo Thông tư 27/2020/TT-BGDĐT):
              </div>
              <div className="font-mono text-slate-300 text-xs">
                - Mức độ hoàn thành: ............................................................................<br />
                - Lời nhận xét: ......................................................................................
              </div>
            </div>
          </div>
        </div>

        {/* Tiếng Việt Reading Passage (Nếu môn Tiếng Việt) */}
        {subject === 'Tiếng Việt' && readingPassage && (
          <div className="mb-6 p-4 rounded-xl border border-blue-200 bg-blue-50/40 text-slate-800">
            <div className="text-center mb-3">
              <div className="font-bold text-base uppercase">{readingPassage.title}</div>
              {readingPassage.author && (
                <div className="italic text-xs text-slate-600">Theo {readingPassage.author}</div>
              )}
            </div>
            <div className="text-justify text-sm leading-relaxed whitespace-pre-line italic">
              {readingPassage.content}
            </div>
            <div className="text-right text-[11px] text-slate-500 mt-2">
              (Bài đọc ngoài SGK: khoảng {readingPassage.wordCount} chữ)
            </div>
          </div>
        )}

        {/* Danh sách câu hỏi */}
        <div className="space-y-6">
          {exam.questions.map((q) => {
            const isEditing = editingQuestionId === q.id;
            const scoreDisplay = ` (${q.score.toString().replace('.', ',')} điểm): `;

            return (
              <div
                key={q.id}
                className={`relative group rounded-xl transition-all ${
                  isEditing ? 'p-4 bg-amber-50/80 border-2 border-amber-400' : 'p-1 hover:bg-slate-50'
                }`}
              >
                {/* Action buttons on hover */}
                {!isEditing && (
                  <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg border border-slate-200 shadow-xs text-xs font-sans print:hidden z-10">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">
                      Mức: {q.cognitiveLevel}
                    </span>
                    {/* Score quick edit */}
                    <div className="flex items-center gap-1 border-r border-slate-200 pr-1.5">
                      <span className="text-[11px] text-slate-500">Sửa điểm:</span>
                      <select
                        value={q.score}
                        onChange={(e) => handleScoreChange(q.id, Number(e.target.value))}
                        className="px-1 py-0.5 text-xs font-bold text-blue-700 bg-slate-100 rounded border border-slate-300"
                      >
                        <option value={0.25}>0,25đ</option>
                        <option value={0.5}>0,5đ</option>
                        <option value={0.75}>0,75đ</option>
                        <option value={1.0}>1,0đ</option>
                        <option value={1.5}>1,5đ</option>
                        <option value={2.0}>2,0đ</option>
                        <option value={2.5}>2,5đ</option>
                        <option value={3.0}>3,0đ</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleStartEdit(q)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      title="Sửa nội dung câu hỏi"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1 text-rose-500 hover:bg-rose-100 rounded"
                      title="Xóa câu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Edit Form */}
                {isEditing ? (
                  <div className="space-y-3 font-sans text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-300">
                      <div className="font-bold text-amber-900">
                        Chỉnh sửa Câu {q.questionNumber} ({editForm.type})
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveEdit(q.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Lưu
                        </button>
                        <button
                          onClick={() => setEditingQuestionId(null)}
                          className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg"
                        >
                          <X className="w-3.5 h-3.5" /> Hủy
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="font-semibold block mb-0.5">Số điểm:</label>
                        <input
                          type="number"
                          step="0.25"
                          value={editForm.score || 0.5}
                          onChange={(e) =>
                            setEditForm({ ...editForm, score: Number(e.target.value) })
                          }
                          className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-0.5">Mức độ nhận thức:</label>
                        <select
                          value={editForm.cognitiveLevel || 'M1'}
                          onChange={(e) =>
                            setEditForm({ ...editForm, cognitiveLevel: e.target.value as any })
                          }
                          className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                        >
                          <option value="M1">Mức 1 (Biết)</option>
                          <option value="M2">Mức 2 (Hiểu)</option>
                          <option value="M3">Mức 3 (Vận dụng - Chỉ tự luận)</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold block mb-0.5">Dạng câu hỏi:</label>
                        <select
                          value={editForm.type || 'Nhiều lựa chọn'}
                          onChange={(e) =>
                            setEditForm({ ...editForm, type: e.target.value as any })
                          }
                          className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                        >
                          <option value="Nhiều lựa chọn">Nhiều lựa chọn</option>
                          <option value="Đúng - Sai">Đúng - Sai</option>
                          <option value="Nối cột">Nối cột</option>
                          <option value="Điền khuyết">Điền khuyết</option>
                          <option value="Tự luận">Tự luận</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-0.5">Nội dung câu hỏi (Chữ không đậm):</label>
                      <textarea
                        rows={2}
                        value={editForm.content || ''}
                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                      />
                    </div>

                    {editForm.options && editForm.options.length > 0 && (
                      <div className="space-y-1">
                        <label className="font-semibold block">Các phương án lựa chọn:</label>
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
                            className="w-full px-2 py-1 rounded border border-slate-300 bg-white mb-1"
                          />
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold block mb-0.5">Đáp án đúng:</label>
                        <input
                          type="text"
                          value={editForm.answer || ''}
                          onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                          className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-0.5">Hướng dẫn chấm & Barem:</label>
                        <input
                          type="text"
                          value={editForm.guide || ''}
                          onChange={(e) => setEditForm({ ...editForm, guide: e.target.value })}
                          className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard Display Mode (Strictly adheres to user instructions) */
                  <div>
                    {/* Quy tắc: Câu số (chữ đậm), điểm (chữ nghiêng và không đậm) liền câu số, câu hỏi (Chữ không đậm) */}
                    <div>
                      <span className="font-bold">Câu {q.questionNumber}</span>
                      <span className="italic font-normal">{scoreDisplay}</span>
                      <span className="font-normal whitespace-pre-line">{q.content}</span>
                    </div>

                    {/* Phương án lùi 1 tab (1cm ~ 28px) */}
                    {q.options && q.options.length > 0 && (
                      <div className="mt-2 ml-7 space-y-1 text-slate-800">
                        {q.options.map((opt, idx) => (
                          <div key={idx} className="font-normal">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Dạng đúng - sai */}
                    {q.trueFalseItems && q.trueFalseItems.length > 0 && (
                      <div className="mt-2 ml-7 space-y-1.5">
                        {q.trueFalseItems.map((tf, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-7 h-5 border border-slate-800 inline-block text-center text-xs"></span>
                            <span>{tf.statement}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Điền khuyết */}
                    {q.fillInTheBlank && (
                      <div className="mt-2 ml-7 italic text-slate-700">
                        {q.fillInTheBlank}
                      </div>
                    )}

                    {/* Đáp án & Hướng dẫn chấm (chỉ hiện khi bật xem hoặc in đáp án) */}
                    {showAnswers && (
                      <div className="mt-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs font-sans print:border print:border-slate-400">
                        <div className="flex items-center gap-1 font-bold text-blue-900 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Đáp án: {q.answer}</span>
                        </div>
                        <div className="italic text-slate-600">
                          <b>Hướng dẫn chấm:</b> {q.guide}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-10 pt-4 border-t border-slate-400 text-center italic text-xs text-slate-500">
          --------- HẾT ---------<br />
          (Cán bộ coi thi không giải thích gì thêm)
        </div>
      </div>
    </div>
  );
};
