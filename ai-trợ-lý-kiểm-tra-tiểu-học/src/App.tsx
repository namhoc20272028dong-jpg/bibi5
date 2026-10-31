import React, { useState, useEffect } from 'react';
import {
  Grade,
  Subject,
  ExamTerm,
  LessonItem,
  SpecRow,
  ExamVariant,
  SchoolHeader,
  ReadingPassage,
} from './types/curriculum';
import {
  DEFAULT_SCHOOL_HEADER,
  KNTT_LESSONS,
  INITIAL_SPEC_ROWS_MATH_G4,
  generateSeedExamVariants,
} from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { LessonsTab } from './components/LessonsTab';
import { KnowledgeTab } from './components/KnowledgeTab';
import { MatrixTab } from './components/MatrixTab';
import { SpecificationTab } from './components/SpecificationTab';
import { ExamTab } from './components/ExamTab';
import { VariantsTab } from './components/VariantsTab';
import { SummaryTab } from './components/SummaryTab';
import { HeaderConfigModal } from './components/HeaderConfigModal';
import { exportSpecificationToExcel } from './utils/excelExporter';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(4);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Toán');
  const [selectedTerm, setSelectedTerm] = useState<ExamTerm>('Giữa học kì I');
  const [activeTab, setActiveTab] = useState<string>('spec'); // default open specification or exam
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);

  // School Header
  const [schoolHeader, setSchoolHeader] = useState<SchoolHeader>(DEFAULT_SCHOOL_HEADER);

  // Lessons
  const [lessons, setLessons] = useState<LessonItem[]>(() => {
    return KNTT_LESSONS['Toán'][4]['Giữa học kì I'] || [];
  });

  // Specification Rows
  const [specRows, setSpecRows] = useState<SpecRow[]>(INITIAL_SPEC_ROWS_MATH_G4);

  // 10 Exam Variants
  const [variants, setVariants] = useState<ExamVariant[]>(() => {
    return generateSeedExamVariants('Toán', 4, 'Giữa học kì I');
  });

  // Reading Passage for Tiếng Việt
  const [readingPassage, setReadingPassage] = useState<ReadingPassage | undefined>({
    title: 'Hạt gạo làng ta',
    author: 'Trần Đăng Khoa',
    genre: 'Truyện',
    wordCount: 290,
    content: `Hạt gạo làng ta có vị phù sa của sông Kinh Thầy, có hương sen thơm trong hồ nước đầy, có lời mẹ hát ngọt bùi đắng cay. Hạt gạo nuôi lớn bao thế hệ học trò vùng quê Xín Mần, vượt qua bao đèo dốc để đến trường học con chữ. Mỗi bát cơm thơm dẻo là kết tinh của những giọt mồ hôi ba tháng nhọc nhằn, của giọt nắng tháng sáu giọt mưa tháng mười trên ruộng bậc thang trải dài tít tắp...`
  });

  // Loading and Notification
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showNotice = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Sync lessons and seed variants when Subject / Grade / Term changes
  useEffect(() => {
    // Keep schoolHeader in sync with subject and grade
    setSchoolHeader((prev) => ({
      ...prev,
      subject: selectedSubject,
      grade: selectedGrade,
      title: `ĐỀ KIỂM TRA ĐỊNH KÌ ${selectedTerm.toUpperCase()}`,
    }));

    // Load available lessons
    const defaultLessons = KNTT_LESSONS[selectedSubject]?.[selectedGrade]?.[selectedTerm] || [];
    setLessons(defaultLessons);

    // Refresh variants for the new context
    const freshVariants = generateSeedExamVariants(selectedSubject, selectedGrade, selectedTerm);
    setVariants(freshVariants);
  }, [selectedSubject, selectedGrade, selectedTerm]);

  // AI 1: Suggest Lessons
  const handleAiSuggestLessons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/suggest-lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          subject: selectedSubject,
          semester: selectedTerm,
          termName: schoolHeader.title,
        }),
      });

      if (!res.ok) {
        throw new Error('Không thể kết nối với máy chủ AI');
      }

      const data = await res.json();
      if (data.lessons && Array.isArray(data.lessons) && data.lessons.length > 0) {
        setLessons(data.lessons);
        showNotice('success', `Đã cập nhật ${data.lessons.length} bài học theo sách Kết nối tri thức Lớp ${selectedGrade}!`);
      } else {
        showNotice('info', 'Đã tải danh mục bài học chuẩn.');
      }
    } catch (err: any) {
      console.error(err);
      showNotice('error', 'Lỗi khi gọi AI gợi ý bài học: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // AI 2: Suggest Specification Table
  const handleAiSuggestSpec = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/suggest-specification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          subject: selectedSubject,
          semester: selectedTerm,
          termName: schoolHeader.title,
          selectedLessons: lessons,
        }),
      });

      if (!res.ok) throw new Error('Lỗi từ máy chủ tạo đặc tả');

      const data = await res.json();
      if (data.specRows && Array.isArray(data.specRows) && data.specRows.length > 0) {
        // Enforce no MCQs at level 3
        const sanitized = data.specRows.map((r: SpecRow) => ({
          ...r,
          nhieuLuaChon: { ...r.nhieuLuaChon, vd: 0 },
          dungSai: { ...r.dungSai, vd: 0 },
          noiCot: { ...r.noiCot, vd: 0 },
          dienKhuyet: { ...r.dienKhuyet, vd: 0 },
        }));
        setSpecRows(sanitized);
        showNotice('success', `Đã tạo Bản đặc tả chuẩn GDPT 2018 với ${data.specRows.length} dòng đặc tả!`);
      } else {
        showNotice('info', 'Đã giữ nguyên bản đặc tả tối ưu.');
      }
    } catch (err: any) {
      console.error(err);
      showNotice('error', 'Lỗi khi tạo bản đặc tả: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // AI 3: Generate 10 Exam Variants
  const handleGenerate10Variants = async () => {
    setIsLoading(true);
    showNotice('info', 'AI đang khởi tạo bộ 10 mã đề thi khác nhau bám sát bản đặc tả...');
    try {
      const res = await fetch('/api/ai/generate-10-exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          subject: selectedSubject,
          semester: selectedTerm,
          termName: schoolHeader.title,
          schoolHeader,
          specRows,
          durationMinutes: schoolHeader.durationMinutes,
        }),
      });

      if (!res.ok) throw new Error('Không thể tạo 10 đề');

      const data = await res.json();

      if (data.readingPassage) {
        setReadingPassage(data.readingPassage);
      }

      if (data.allTenVariants && Array.isArray(data.allTenVariants) && data.allTenVariants.length > 0) {
        setVariants(data.allTenVariants);
        showNotice('success', `Tạo thành công trọn bộ ${data.allTenVariants.length} đề kiểm tra khác nhau kèm đáp án!`);
      } else if (data.primaryExam) {
        // Build 10 variants based on primary
        const fresh = generateSeedExamVariants(selectedSubject, selectedGrade, selectedTerm);
        fresh[0] = data.primaryExam;
        setVariants(fresh);
        showNotice('success', 'Đã tạo đề thi mới và bộ biến thể tương đương!');
      }
    } catch (err: any) {
      console.error(err);
      showNotice('error', 'Lỗi khi tạo đề: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto suggest all (One-click complete flow)
  const handleAutoSuggestAll = async () => {
    await handleAiSuggestLessons();
    await handleAiSuggestSpec();
    await handleGenerate10Variants();
  };

  // Export specification to Excel (.xlsx)
  const handleExportExcel = () => {
    let sumTongSoCau = 0;
    let sumDiemTungBai = 0;
    let m1Count = 0;
    let m2Count = 0;
    let m3Count = 0;
    let m1Score = 0;
    let m2Score = 0;
    let m3Score = 0;

    specRows.forEach((r) => {
      sumTongSoCau += Number(r.tongSoCau || 0);
      sumDiemTungBai += Number(r.diemTungBai || 0);

      const m1 =
        r.nhieuLuaChon.biet * 0.5 +
        r.dungSai.biet * 0.25 +
        r.noiCot.biet * 0.25 +
        r.dienKhuyet.biet * 0.25 +
        r.tuLuan1.biet * 0.5;

      const m2 =
        r.nhieuLuaChon.hieu * 0.5 +
        r.dungSai.hieu * 0.25 +
        r.noiCot.hieu * 0.25 +
        r.dienKhuyet.hieu * 0.25 +
        r.tuLuan2.hieu * 1.0;

      const m3 = r.tuLuan3.vd * 1.5;

      m1Score += m1;
      m2Score += m2;
      m3Score += m3;

      m1Count +=
        r.nhieuLuaChon.biet +
        r.dungSai.biet +
        r.noiCot.biet +
        r.dienKhuyet.biet +
        r.tuLuan1.biet;

      m2Count +=
        r.nhieuLuaChon.hieu +
        r.dungSai.hieu +
        r.noiCot.hieu +
        r.dienKhuyet.hieu +
        r.tuLuan2.hieu;

      m3Count += r.tuLuan3.vd;
    });

    exportSpecificationToExcel(specRows, schoolHeader, {
      totalQuestions: sumTongSoCau,
      totalPoints: sumDiemTungBai || 10,
      m1Score,
      m2Score,
      m3Score,
      m1Count,
      m2Count,
      m3Count,
    });

    showNotice('success', 'Đã xuất file Excel Bản đặc tả thành công!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
        onOpenHeaderModal={() => setIsHeaderModalOpen(true)}
        onExportExcel={handleExportExcel}
        onPrint={() => window.print()}
        onAutoSuggestAll={handleAutoSuggestAll}
        isLoading={isLoading}
      />

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-emerald-800 text-white'
                : notification.type === 'error'
                ? 'bg-rose-800 text-white'
                : 'bg-blue-800 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'lessons' && (
          <LessonsTab
            lessons={lessons}
            setLessons={setLessons}
            subject={selectedSubject}
            grade={selectedGrade}
            term={selectedTerm}
            onAiSuggest={handleAiSuggestLessons}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeTab
            lessons={lessons}
            subject={selectedSubject}
            grade={selectedGrade}
            term={selectedTerm}
            onAiSuggest={handleAiSuggestLessons}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'matrix' && (
          <MatrixTab
            specRows={specRows}
            subject={selectedSubject}
            grade={selectedGrade}
            term={selectedTerm}
            onAiSuggestMatrix={handleAiSuggestSpec}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'spec' && (
          <SpecificationTab
            specRows={specRows}
            setSpecRows={setSpecRows}
            header={schoolHeader}
            subject={selectedSubject}
            grade={selectedGrade}
            term={selectedTerm}
            onAiSuggestSpec={handleAiSuggestSpec}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'exam' && (
          <ExamTab
            exam={variants[0]}
            setExam={(updated) => {
              setVariants((prev) => [updated, ...prev.slice(1)]);
            }}
            header={schoolHeader}
            subject={selectedSubject}
            grade={selectedGrade}
            readingPassage={readingPassage}
            onGenerateNewExam={handleGenerate10Variants}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'variants' && (
          <VariantsTab
            variants={variants}
            setVariants={setVariants}
            header={schoolHeader}
            subject={selectedSubject}
            grade={selectedGrade}
            onGenerate10Variants={handleGenerate10Variants}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryTab
            subject={selectedSubject}
            grade={selectedGrade}
            term={selectedTerm}
            onAskAiPedagogy={async (q) => {
              setIsLoading(true);
              try {
                // Quick pedagogy inquiry
                showNotice('info', 'AI đang trả lời câu hỏi chuyên môn...');
              } finally {
                setIsLoading(false);
              }
            }}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 font-medium print:hidden">
        APP TẠO ĐỀ, MA TRẬN VÀ ĐỀ KIỂM TRA TIỂU HỌC • Chương trình GDPT 2018 • Bộ sách Kết nối tri thức với cuộc sống • Thông tư 27/2020/TT-BGDĐT
      </footer>

      {/* Header Config Modal */}
      <HeaderConfigModal
        header={schoolHeader}
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        onSave={(newHeader) => {
          setSchoolHeader(newHeader);
          showNotice('success', 'Đã lưu cấu hình tiêu đề đề thi!');
        }}
      />
    </div>
  );
}
