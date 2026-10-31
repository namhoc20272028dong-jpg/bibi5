import React, { useState } from 'react';
import { Subject, Grade, ExamTerm } from '../types/curriculum';
import {
  FileBox,
  Sparkles,
  BookOpen,
  Scale,
  Award,
  Layers,
  CheckCircle,
  HelpCircle,
  Cpu
} from 'lucide-react';

interface Props {
  subject: Subject;
  grade: Grade;
  term: ExamTerm;
  onAskAiPedagogy: (question: string) => void;
  isLoading: boolean;
}

export const SummaryTab: React.FC<Props> = ({
  subject,
  grade,
  term,
  onAskAiPedagogy,
  isLoading,
}) => {
  const [pedagogyQuestion, setPedagogyQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const handleAsk = () => {
    if (!pedagogyQuestion.trim()) return;
    onAskAiPedagogy(pedagogyQuestion);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-500/20 rounded-xl text-blue-300">
              <FileBox className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wide">
                7. TỔNG HỢP QUY CHUẨN ĐÁNH GIÁ & MA TRẬN GDPT 2018
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Toàn bộ quy định từ Lớp 1 đến Lớp 5 • Thông tư 27/2020/TT-BGDĐT • Sách Kết nối tri thức với cuộc sống
              </p>
            </div>
          </div>
        </div>

        <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Chuyên gia thẩm định GDPT 2018
        </span>
      </div>

      {/* Grid of Standard Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Thời lượng & Tỉ lệ Mạch kiến thức Môn Toán */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              I. MÔN TOÁN: Thời lượng & Tỉ lệ Mạch nội dung
            </h3>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2 border border-slate-200">Khối lớp</th>
                  <th className="p-2 border border-slate-200 text-center">Số tiết</th>
                  <th className="p-2 border border-slate-200 text-center">Số & Phép tính</th>
                  <th className="p-2 border border-slate-200 text-center">Hình học & ĐL</th>
                  <th className="p-2 border border-slate-200 text-center">Thống kê & XS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 1</td>
                  <td className="p-2 border border-slate-200 text-center">105 tiết</td>
                  <td className="p-2 border border-slate-200 text-center">80%</td>
                  <td className="p-2 border border-slate-200 text-center">15% - 20%</td>
                  <td className="p-2 border border-slate-200 text-center">0%</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 2</td>
                  <td className="p-2 border border-slate-200 text-center">175 tiết</td>
                  <td className="p-2 border border-slate-200 text-center">75% - 70%</td>
                  <td className="p-2 border border-slate-200 text-center">17% - 20%</td>
                  <td className="p-2 border border-slate-200 text-center">3% - 10%</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 3</td>
                  <td className="p-2 border border-slate-200 text-center">175 tiết</td>
                  <td className="p-2 border border-slate-200 text-center">70%</td>
                  <td className="p-2 border border-slate-200 text-center">22% - 25%</td>
                  <td className="p-2 border border-slate-200 text-center">3% - 10%</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 4</td>
                  <td className="p-2 border border-slate-200 text-center">175 tiết</td>
                  <td className="p-2 border border-slate-200 text-center">70% - 75%</td>
                  <td className="p-2 border border-slate-200 text-center">16% - 25%</td>
                  <td className="p-2 border border-slate-200 text-center">4% - 10%</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 5</td>
                  <td className="p-2 border border-slate-200 text-center">175 tiết</td>
                  <td className="p-2 border border-slate-200 text-center">50% - 60%</td>
                  <td className="p-2 border border-slate-200 text-center">40%</td>
                  <td className="p-2 border border-slate-200 text-center">5% - 10%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl">
            <div>• <b>Quy định đề thi Toán:</b> 10 câu, 10 điểm, tỉ lệ M1 (50%) - M2 (30%) - M3 (20%).</div>
            <div>• <b>Vẽ hình:</b> Vẽ hình trên lưới ô vuông (từ Lớp 1 đến Lớp 5).</div>
          </div>
        </div>

        {/* Card 2: Quy định bài đọc và số chữ Môn Tiếng Việt */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              II. MÔN TIẾNG VIỆT: Quy định Độ dài Văn bản Đọc hiểu ngoài SGK
            </h3>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2 border border-slate-200">Lớp</th>
                  <th className="p-2 border border-slate-200">Truyện / Kịch bản</th>
                  <th className="p-2 border border-slate-200">Miêu tả</th>
                  <th className="p-2 border border-slate-200">Thơ</th>
                  <th className="p-2 border border-slate-200">Thông tin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 1</td>
                  <td className="p-2 border border-slate-200" colSpan={2}>90 - 130 chữ (có tranh)</td>
                  <td className="p-2 border border-slate-200">50 - 70 chữ</td>
                  <td className="p-2 border border-slate-200">-</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 2</td>
                  <td className="p-2 border border-slate-200">180 - 200 chữ</td>
                  <td className="p-2 border border-slate-200">150 - 180 chữ</td>
                  <td className="p-2 border border-slate-200">70 - 90 chữ</td>
                  <td className="p-2 border border-slate-200">110 - 140 chữ</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 3</td>
                  <td className="p-2 border border-slate-200">200 - 250 chữ</td>
                  <td className="p-2 border border-slate-200">180 - 200 chữ</td>
                  <td className="p-2 border border-slate-200">80 - 100 chữ</td>
                  <td className="p-2 border border-slate-200">120 - 150 chữ</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 4</td>
                  <td className="p-2 border border-slate-200">280 - 330 chữ</td>
                  <td className="p-2 border border-slate-200">200 - 250 chữ</td>
                  <td className="p-2 border border-slate-200">100 - 120 chữ</td>
                  <td className="p-2 border border-slate-200">150 - 180 chữ</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 font-bold">Lớp 5</td>
                  <td className="p-2 border border-slate-200">300 - 350 chữ</td>
                  <td className="p-2 border border-slate-200">200 - 250 chữ</td>
                  <td className="p-2 border border-slate-200">110 - 130 chữ</td>
                  <td className="p-2 border border-slate-200">khoảng 230 chữ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
            • <b>Cơ cấu điểm Lớp 4-5:</b> Đọc thành tiếng: 3đ; Đọc hiểu: 7đ (11 câu: 4 câu TN ĐH = 2đ; 2 TL ĐH = 2đ; 4 TN KTTV = 2đ; 1 TL KTTV = 1đ). Viết đoạn/bài văn: 10 điểm.
          </div>
        </div>

        {/* Card 3: Môn Tin học */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="p-1.5 bg-purple-100 text-purple-800 rounded-lg">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              III. MÔN TIN HỌC: Cơ cấu Lí thuyết & Thực hành
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200">
              <div className="font-bold text-purple-900">Lớp 3: Lí thuyết 7 điểm – Thực hành 3 điểm</div>
              <div>Thống nhất: Trắc nghiệm 6 câu – Tự luận 4 câu (Cuối kì I: TL 4; Cuối năm: TL 2, TH 1).</div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200">
              <div className="font-bold text-purple-900">Lớp 4: Lí thuyết 6 điểm – Thực hành 4 điểm</div>
              <div>Thống nhất: Trắc nghiệm 6 câu – Tự luận 4 câu (Tự luận 2 câu, Thực hành 2 câu).</div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200">
              <div className="font-bold text-purple-900">Lớp 5: Lí thuyết 5 điểm – Thực hành 5 điểm</div>
              <div>Thống nhất: Trắc nghiệm 5 câu – Tự luận 5 câu (Cuối kì I: TL 3, TH 2; Cuối năm: TL 2, TH 3).</div>
            </div>
            <div className="text-[11px] font-bold text-rose-700 pt-1">
              * LƯU Ý BẮT BUỘC: KHÔNG TẠO CÂU HỎI TRẮC NGHIỆM Ở MỨC VẬN DỤNG.
            </div>
          </div>
        </div>

        {/* Card 4: Khoa học, LS&ĐL, Công nghệ */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              IV. CÁC MÔN: KHOA HỌC • LỊCH SỬ & ĐỊA LÍ • CÔNG NGHỆ
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="font-bold text-amber-900">Môn Lịch sử và Địa lí (Lớp 4, 5):</div>
              <div>Mức độ: 50% (Biết) – 30% (Hiểu) – 20% (Vận dụng) • Tỉ lệ TN 60% – TL 40%.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="font-bold text-amber-900">Môn Khoa học (Lớp 4, 5):</div>
              <div>Mức độ: 50% (Biết) – 30% (Hiểu) – 20% (Vận dụng) • Tỉ lệ TN 60% – TL 40%.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="font-bold text-amber-900">Môn Công nghệ (Lớp 3, 4, 5):</div>
              <div>Mức độ: 50% (Biết) – 30% (Hiểu) – 20% (Vận dụng) • Tỉ lệ TN 60% – TL 40%.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
