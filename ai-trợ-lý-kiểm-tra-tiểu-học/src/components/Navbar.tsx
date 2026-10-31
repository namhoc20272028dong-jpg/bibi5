import React from 'react';
import { Grade, Subject, ExamTerm } from '../types/curriculum';
import {
  GraduationCap,
  Sparkles,
  Printer,
  FileSpreadsheet,
  Settings2,
  BookOpen,
  LayoutGrid,
  FileText,
  CheckCircle2,
  Layers,
  HelpCircle,
  FileBox
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSubject: Subject;
  setSelectedSubject: (subj: Subject) => void;
  selectedGrade: Grade;
  setSelectedGrade: (grade: Grade) => void;
  selectedTerm: ExamTerm;
  setSelectedTerm: (term: ExamTerm) => void;
  onOpenHeaderModal: () => void;
  onExportExcel: () => void;
  onPrint: () => void;
  onAutoSuggestAll: () => void;
  isLoading: boolean;
}

const SUBJECTS: Subject[] = [
  'Toán',
  'Tiếng Việt',
  'Tin học',
  'Khoa học',
  'Lịch sử và Địa lí',
  'Công nghệ'
];

const GRADES: Grade[] = [1, 2, 3, 4, 5];

const TERMS: ExamTerm[] = [
  'Giữa học kì I',
  'Cuối học kì I',
  'Giữa học kì II',
  'Cuối năm học'
];

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  selectedSubject,
  setSelectedSubject,
  selectedGrade,
  setSelectedGrade,
  selectedTerm,
  setSelectedTerm,
  onOpenHeaderModal,
  onExportExcel,
  onPrint,
  onAutoSuggestAll,
  isLoading,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 uppercase">
                App Tạo Đề, Ma Trận & Đề Kiểm Tra Tiểu Học
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                GDPT 2018
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Bộ sách Kết nối tri thức với cuộc sống • Thông tư 27/2020/TT-BGDĐT • Tạo 10 mã đề
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHeaderModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
            title="Đổi tên trường, UBND Xã, Năm học"
          >
            <Settings2 className="w-4 h-4 text-slate-600" />
            <span className="hidden md:inline">Tiêu đề đề thi</span>
          </button>

          <button
            onClick={onExportExcel}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            title="Xuất bản đặc tả ra file Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Xuất Excel</span>
          </button>

          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
            title="In đề kiểm tra ra máy in hoặc lưu PDF"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">In đề / PDF</span>
          </button>

          <button
            onClick={onAutoSuggestAll}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-60"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang tạo...' : 'AI Gợi ý ngay'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Grade / Subject Bar */}
      <div className="bg-slate-50/90 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Grade selection */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="font-semibold text-slate-500 mr-1">Khối lớp:</span>
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>

          {/* Subject selection */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="font-semibold text-slate-500 mr-1">Môn học:</span>
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSubject === s
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Term selection */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500 mr-1">Kỳ thi:</span>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value as ExamTerm)}
              className="bg-white border border-slate-300 text-slate-800 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {TERMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 7 Core Tabs */}
      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none" aria-label="Tabs">
            {[
              { id: 'lessons', label: '1. Danh sách bài học', icon: BookOpen },
              { id: 'knowledge', label: '2. Kiến thức & YCCĐ', icon: CheckCircle2 },
              { id: 'matrix', label: '3. Ma trận đề', icon: LayoutGrid },
              { id: 'spec', label: '4. Bản đặc tả (Excel)', icon: FileSpreadsheet },
              { id: 'exam', label: '5. Đề & Đáp án (Đề 01)', icon: FileText },
              { id: 'variants', label: '6. Bộ 10 đề & Sửa điểm', icon: Layers, highlight: true },
              { id: 'summary', label: '7. Tổng hợp quy chuẩn', icon: FileBox },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  } ${tab.highlight && !isActive ? 'text-indigo-600 font-bold' : ''}`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{tab.label}</span>
                  {tab.highlight && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                      10 Đề
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
