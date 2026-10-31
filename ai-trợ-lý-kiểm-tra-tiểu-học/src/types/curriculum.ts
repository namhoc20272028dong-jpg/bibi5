export type Grade = 1 | 2 | 3 | 4 | 5;

export type Subject =
  | 'Toán'
  | 'Tiếng Việt'
  | 'Tin học'
  | 'Khoa học'
  | 'Lịch sử và Địa lí'
  | 'Công nghệ';

export type ExamTerm =
  | 'Giữa học kì I'
  | 'Cuối học kì I'
  | 'Giữa học kì II'
  | 'Cuối năm học';

export type CognitiveLevel = 'Biết' | 'Hiểu' | 'Vận dụng';

export interface LessonItem {
  id: string;
  topic: string; // Mạch kiến thức
  lessonName: string; // Tên bài học / đơn vị kiến thức
  periods: number; // Số tiết
  coreKnowledge: string; // Kiến thức trọng tâm
  requirements: string; // Yêu cầu cần đạt
}

export interface SpecLevelCount {
  biet: number;
  hieu: number;
  vd: number; // Vận dụng (lưu ý: trắc nghiệm luôn là 0 theo quy định)
}

export interface SpecRow {
  id: string;
  tt: number;
  machKienThuc: string;
  noiDung: string;
  yeuCauCanDat: string;
  soTiet: number;
  tiLe: number; // %
  soDiemCanDat: number;
  // Trắc nghiệm
  nhieuLuaChon: SpecLevelCount;
  dungSai: SpecLevelCount;
  noiCot: SpecLevelCount;
  dienKhuyet: SpecLevelCount;
  // Tự luận
  tuLuan1: SpecLevelCount; // Thường M1: 0.5đ
  tuLuan2: SpecLevelCount; // Thường M2: 1.0đ
  tuLuan3: SpecLevelCount; // Thường M3: 1.0 - 2.0đ
  tongSoCau: number;
  diemTungBai: number;
  cauSo: string; // Ví dụ: "Câu 1, 2" hoặc "Câu 3"
}

export interface SchoolHeader {
  deptName: string; // Ví dụ: UBND XÃ XÍN MẦN
  schoolName: string; // Ví dụ: TRƯỜNG PTDTBT TH CHÍ CÀ
  title: string; // ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I
  academicYear: string; // NĂM HỌC 2026 - 2027
  subject: string;
  grade: Grade;
  durationMinutes: number;
  teacherName?: string;
  examinerNotes?: string;
}

export interface QuestionItem {
  id: string;
  questionNumber: number;
  score: number; // Điểm của câu (có thể sửa)
  cognitiveLevel: 'M1' | 'M2' | 'M3'; // M1: Biết, M2: Hiểu, M3: Vận dụng
  type: 'Nhiều lựa chọn' | 'Đúng - Sai' | 'Nối cột' | 'Điền khuyết' | 'Tự luận';
  topic: string;
  content: string; // Chữ không đậm
  options?: string[]; // A, B, C (Lớp 1-3) hoặc A, B, C, D (Lớp 4-5)
  matchingPairs?: { left: string; right: string }[];
  trueFalseItems?: { statement: string; correct: boolean }[];
  fillInTheBlank?: string;
  answer: string; // Đáp án đúng / bài giải
  guide: string; // Hướng dẫn chấm chi tiết
}

export interface ExamVariant {
  examCode: string; // Đề 01, Đề 02, ..., Đề 10
  questions: QuestionItem[];
}

export interface ReadingPassage {
  title: string;
  author?: string;
  genre: 'Truyện' | 'Đoạn văn miêu tả' | 'Thơ' | 'Văn bản thông tin';
  wordCount: number;
  content: string;
}
