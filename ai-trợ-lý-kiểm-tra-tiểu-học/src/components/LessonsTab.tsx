import React, { useState } from 'react';
import { LessonItem, Subject, Grade, ExamTerm } from '../types/curriculum';
import { Sparkles, Plus, Trash2, Edit2, Save, X, BookOpen, Clock, CheckCircle } from 'lucide-react';

interface Props {
  lessons: LessonItem[];
  setLessons: React.Dispatch<React.SetStateAction<LessonItem[]>>;
  subject: Subject;
  grade: Grade;
  term: ExamTerm;
  onAiSuggest: () => void;
  isLoading: boolean;
}

export const LessonsTab: React.FC<Props> = ({
  lessons,
  setLessons,
  subject,
  grade,
  term,
  onAiSuggest,
  isLoading,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<LessonItem>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newLesson, setNewLesson] = useState<Partial<LessonItem>>({
    topic: 'Số và phép tính',
    lessonName: '',
    periods: 4,
    coreKnowledge: '',
    requirements: '',
  });

  const handleStartEdit = (item: LessonItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSaveEdit = (id: string) => {
    setLessons((prev) =>
      prev.map((item) => (item.id === id ? ({ ...item, ...editForm } as LessonItem) : item))
    );
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Thầy/Cô có chắc chắn muốn xóa bài học này khỏi danh mục?')) {
      setLessons((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAdd = () => {
    if (!newLesson.lessonName) {
      alert('Vui lòng nhập tên bài học!');
      return;
    }
    const item: LessonItem = {
      id: `lesson_${Date.now()}`,
      topic: newLesson.topic || 'Số và phép tính',
      lessonName: newLesson.lessonName,
      periods: Number(newLesson.periods || 4),
      coreKnowledge: newLesson.coreKnowledge || '',
      requirements: newLesson.requirements || '',
    };
    setLessons((prev) => [...prev, item]);
    setIsAdding(false);
    setNewLesson({
      topic: 'Số và phép tính',
      lessonName: '',
      periods: 4,
      coreKnowledge: '',
      requirements: '',
    });
  };

  const totalPeriods = lessons.reduce((acc, cur) => acc + (cur.periods || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Info */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-600 text-white rounded-xl">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                1. Danh sách bài học & Mạch kiến thức GDPT 2018
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Môn <span className="font-semibold text-blue-700">{subject}</span> — Lớp{' '}
                <span className="font-semibold text-blue-700">{grade}</span> ({term}) • Bộ sách{' '}
                <span className="font-semibold text-indigo-700">Kết nối tri thức với cuộc sống</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Thêm bài học</span>
          </button>

          <button
            onClick={onAiSuggest}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-60"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang phân tích...' : 'AI Gợi ý bài học ngay'}</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 font-medium">Tổng số bài học</div>
          <div className="text-xl font-black text-blue-600 mt-1">{lessons.length} bài</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 font-medium">Tổng số tiết ôn/kiểm tra</div>
          <div className="text-xl font-black text-indigo-600 mt-1">{totalPeriods} tiết</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 font-medium">Mạch kiến thức bao phủ</div>
          <div className="text-xl font-black text-emerald-600 mt-1">
            {new Set(lessons.map((l) => l.topic)).size} mạch
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 font-medium">Khung chương trình</div>
          <div className="text-xl font-black text-purple-600 mt-1">Kết nối tri thức</div>
        </div>
      </div>

      {/* New Lesson Form */}
      {isAdding && (
        <div className="bg-white p-5 rounded-2xl border-2 border-blue-400 shadow-lg space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Thêm bài học mới vào danh mục
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mạch kiến thức</label>
              <input
                type="text"
                value={newLesson.topic}
                onChange={(e) => setNewLesson({ ...newLesson, topic: e.target.value })}
                placeholder="VD: Số và phép tính..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Tên bài học</label>
              <input
                type="text"
                value={newLesson.lessonName}
                onChange={(e) => setNewLesson({ ...newLesson, lessonName: e.target.value })}
                placeholder="VD: Bài 10: Số có sáu chữ số..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Số tiết</label>
              <input
                type="number"
                min="1"
                max="25"
                value={newLesson.periods}
                onChange={(e) => setNewLesson({ ...newLesson, periods: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kiến thức trọng tâm</label>
              <input
                type="text"
                value={newLesson.coreKnowledge}
                onChange={(e) => setNewLesson({ ...newLesson, coreKnowledge: e.target.value })}
                placeholder="Khái niệm, kỹ năng cốt lõi..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Yêu cầu cần đạt</label>
              <input
                type="text"
                value={newLesson.requirements}
                onChange={(e) => setNewLesson({ ...newLesson, requirements: e.target.value })}
                placeholder="Học sinh biết, hiểu hoặc làm được gì..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-600 hover:bg-slate-100"
            >
              Hủy
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs"
            >
              Lưu bài học
            </button>
          </div>
        </div>
      )}

      {/* Lesson List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 uppercase font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">STT</th>
                <th className="py-3 px-4 w-44">Mạch kiến thức</th>
                <th className="py-3 px-4 w-60">Tên bài học</th>
                <th className="py-3 px-4 w-20 text-center">Số tiết</th>
                <th className="py-3 px-4">Kiến thức cốt lõi</th>
                <th className="py-3 px-4">Yêu cầu cần đạt</th>
                <th className="py-3 px-4 w-24 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {lessons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500 italic">
                    Chưa có bài học nào trong danh mục. Nhấn <b>"AI Gợi ý bài học ngay"</b> hoặc <b>"Thêm bài học"</b>.
                  </td>
                </tr>
              ) : (
                lessons.map((item, index) => {
                  const isEditing = editingId === item.id;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isEditing ? 'bg-amber-50/60' : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-center font-bold text-slate-500">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 font-semibold text-indigo-900">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.topic || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, topic: e.target.value })
                            }
                            className="w-full px-2 py-1 rounded border border-amber-300 bg-white"
                          />
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-800">
                            {item.topic}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.lessonName || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, lessonName: e.target.value })
                            }
                            className="w-full px-2 py-1 rounded border border-amber-300 bg-white"
                          />
                        ) : (
                          item.lessonName
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={editForm.periods || 1}
                            onChange={(e) =>
                              setEditForm({ ...editForm, periods: Number(e.target.value) })
                            }
                            className="w-14 px-1 py-1 rounded border border-amber-300 bg-white text-center"
                          />
                        ) : (
                          <span className="font-semibold text-slate-700">{item.periods}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {isEditing ? (
                          <textarea
                            value={editForm.coreKnowledge || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, coreKnowledge: e.target.value })
                            }
                            rows={2}
                            className="w-full px-2 py-1 rounded border border-amber-300 bg-white"
                          />
                        ) : (
                          item.coreKnowledge
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {isEditing ? (
                          <textarea
                            value={editForm.requirements || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, requirements: e.target.value })
                            }
                            rows={2}
                            className="w-full px-2 py-1 rounded border border-amber-300 bg-white"
                          />
                        ) : (
                          item.requirements
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="p-1 rounded-md text-emerald-600 hover:bg-emerald-100"
                                title="Lưu"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-1 rounded-md text-slate-500 hover:bg-slate-200"
                                title="Hủy"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleStartEdit(item)}
                                className="p-1 rounded-md text-blue-600 hover:bg-blue-100"
                                title="Chỉnh sửa"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1 rounded-md text-rose-500 hover:bg-rose-100"
                                title="Xóa"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
