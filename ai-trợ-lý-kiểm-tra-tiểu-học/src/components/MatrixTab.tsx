import React from 'react';
import { Subject, Grade, ExamTerm, SpecRow } from '../types/curriculum';
import { LayoutGrid, Sparkles, PieChart, ShieldAlert, CheckCircle, Info } from 'lucide-react';

interface Props {
  specRows: SpecRow[];
  subject: Subject;
  grade: Grade;
  term: ExamTerm;
  onAiSuggestMatrix: () => void;
  isLoading: boolean;
}

export const MatrixTab: React.FC<Props> = ({
  specRows,
  subject,
  grade,
  term,
  onAiSuggestMatrix,
  isLoading,
}) => {
  // Aggregate stats from specRows
  let totalPoints = 0;
  let totalQuestions = 0;
  let tnPoints = 0;
  let tlPoints = 0;
  let m1Points = 0;
  let m2Points = 0;
  let m3Points = 0;

  specRows.forEach((r) => {
    totalPoints += r.diemTungBai || 0;
    totalQuestions += r.tongSoCau || 0;

    // TN
    const tnScore =
      r.nhieuLuaChon.biet * 0.5 +
      r.nhieuLuaChon.hieu * 0.5 +
      r.dungSai.biet * 0.25 +
      r.dungSai.hieu * 0.25 +
      r.noiCot.biet * 0.25 +
      r.noiCot.hieu * 0.25 +
      r.dienKhuyet.biet * 0.25 +
      r.dienKhuyet.hieu * 0.25;

    // TL
    const tlScore =
      r.tuLuan1.biet * 0.5 +
      r.tuLuan2.hieu * 1.0 +
      r.tuLuan3.vd * (r.tuLuan3.vd > 0 ? (r.diemTungBai - tnScore - r.tuLuan1.biet * 0.5 - r.tuLuan2.hieu * 1.0 > 0 ? r.diemTungBai - tnScore - r.tuLuan1.biet * 0.5 - r.tuLuan2.hieu * 1.0 : 1.5) : 0);

    tnPoints += tnScore;
    tlPoints += r.diemTungBai - tnScore;

    // Levels
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

    const m3 = r.diemTungBai - m1 - m2;

    m1Points += m1;
    m2Points += m2;
    m3Points += m3 > 0 ? m3 : 0;
  });

  const displayTotal = totalPoints > 0 ? totalPoints : 10;
  const m1Pct = Math.round((m1Points / displayTotal) * 100);
  const m2Pct = Math.round((m2Points / displayTotal) * 100);
  const m3Pct = Math.round((m3Points / displayTotal) * 100);

  const tnPct = Math.round((tnPoints / displayTotal) * 100);
  const tlPct = Math.round((tlPoints / displayTotal) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-600 text-white rounded-xl">
              <LayoutGrid className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                3. Ma trận Đề kiểm tra chuẩn Thông tư 27/2020/TT-BGDĐT
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Môn <span className="font-semibold text-purple-800">{subject}</span> — Lớp{' '}
                <span className="font-semibold text-purple-800">{grade}</span> ({term}) • Phân bổ mức
                độ nhận thức và hình thức kiểm tra
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onAiSuggestMatrix}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20 transition-all cursor-pointer disabled:opacity-60"
        >
          <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Đang cân bằng...' : 'AI Cân bằng ma trận chuẩn'}</span>
        </button>
      </div>

      {/* Rules Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold">QUY TẮC MA TRẬN CHUẨN TIỂU HỌC GDPT 2018:</div>
          <ul className="list-disc list-inside space-y-0.5 text-amber-800">
            <li>
              <b>Tỉ lệ mức độ nhận thức:</b> Mức 1 (Biết) ~ 50% • Mức 2 (Hiểu) ~ 30% • Mức 3 (Vận
              dụng) ~ 20%.
            </li>
            <li>
              <b>QUY TẮC CỐT LÕI:</b> <span className="underline font-bold">KHÔNG TẠO CÂU HỎI TRẮC NGHIỆM Ở MỨC VẬN DỤNG</span>. Mức 3 hoàn toàn thuộc phần Tự luận.
            </li>
            <li>
              <b>Hình thức kiểm tra:</b> Trắc nghiệm chiếm 60% - 70% (tùy môn/lớp) • Tự luận chiếm
              30% - 40%.
            </li>
            <li>
              <b>Quy chuẩn môn Toán:</b> Tổng 10 câu, 10 điểm (HS làm bài 40 phút).
            </li>
          </ul>
        </div>
      </div>

      {/* Visual Ratios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cognitive Levels */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" />
              <span>Phân bổ 3 Mức độ nhận thức (Hiện tại: {m1Pct}% - {m2Pct}% - {m3Pct}%)</span>
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
              Chuẩn 50 - 30 - 20%
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-700">Mức 1 (Biết) - 0.5đ/ý</span>
                <span>{m1Points.toFixed(1)} điểm ({m1Pct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, m1Pct)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Mức 2 (Hiểu) - 1.0đ/ý</span>
                <span>{m2Points.toFixed(1)} điểm ({m2Pct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, m2Pct)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">Mức 3 (Vận dụng) - 1.0 - 2.0đ</span>
                <span>{m3Points.toFixed(1)} điểm ({m3Pct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, m3Pct)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Type Ratio */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              <span>Hình thức: Trắc nghiệm vs Tự luận ({tnPct}% - {tlPct}%)</span>
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              Tổng 10 điểm
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-indigo-700">Trắc nghiệm khách quan (NLC, ĐS, NC, ĐK)</span>
                <span>{tnPoints.toFixed(1)} điểm ({tnPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, tnPct)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-700">Tự luận (Trình bày bài giải, giải toán)</span>
                <span>{tlPoints.toFixed(1)} điểm ({tlPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, tlPct)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 italic">
              * Không ghi tiêu đề "Phần trắc nghiệm", "Phần tự luận" trong đề thi của học sinh.
            </div>
          </div>
        </div>
      </div>

      {/* Summary Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase">
            Bảng ma trận tổng hợp theo Mạch kiến thức
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center" rowSpan={2}>STT</th>
                <th className="py-2.5 px-4" rowSpan={2}>Chủ đề / Mạch kiến thức</th>
                <th className="py-2.5 px-3 text-center" colSpan={2}>Mức 1 (Biết)</th>
                <th className="py-2.5 px-3 text-center" colSpan={2}>Mức 2 (Hiểu)</th>
                <th className="py-2.5 px-3 text-center" colSpan={2}>Mức 3 (Vận dụng)</th>
                <th className="py-2.5 px-3 text-center" colSpan={2}>Tổng cộng</th>
              </tr>
              <tr className="bg-slate-100/90 text-slate-600 text-[11px]">
                <th className="py-1.5 px-2 text-center">TN</th>
                <th className="py-1.5 px-2 text-center">TL</th>
                <th className="py-1.5 px-2 text-center">TN</th>
                <th className="py-1.5 px-2 text-center">TL</th>
                <th className="py-1.5 px-2 text-center text-slate-400">TN (0)</th>
                <th className="py-1.5 px-2 text-center">TL</th>
                <th className="py-1.5 px-2 text-center font-bold">Số câu</th>
                <th className="py-1.5 px-2 text-center font-bold">Điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {specRows.map((r, i) => {
                const tnM1 = r.nhieuLuaChon.biet + r.dungSai.biet + r.noiCot.biet + r.dienKhuyet.biet;
                const tlM1 = r.tuLuan1.biet;
                const tnM2 = r.nhieuLuaChon.hieu + r.dungSai.hieu + r.noiCot.hieu + r.dienKhuyet.hieu;
                const tlM2 = r.tuLuan2.hieu;
                const tlM3 = r.tuLuan3.vd;

                return (
                  <tr key={r.id || i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-500">{i + 1}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      <div>{r.machKienThuc}</div>
                      <div className="text-[11px] font-normal text-slate-500 truncate max-w-xs">{r.noiDung}</div>
                    </td>
                    <td className="py-2.5 px-2 text-center font-medium">{tnM1 || '-'}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{tlM1 || '-'}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{tnM2 || '-'}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{tlM2 || '-'}</td>
                    <td className="py-2.5 px-2 text-center text-slate-300 font-medium">0</td>
                    <td className="py-2.5 px-2 text-center font-medium">{tlM3 || '-'}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-blue-700">{r.tongSoCau}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-indigo-700">{r.diemTungBai}đ</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
              <tr>
                <td colSpan={2} className="py-3 px-4 text-right uppercase">Tổng cộng:</td>
                <td colSpan={2} className="py-3 px-2 text-center text-blue-700">{m1Points.toFixed(1)}đ ({m1Pct}%)</td>
                <td colSpan={2} className="py-3 px-2 text-center text-emerald-700">{m2Points.toFixed(1)}đ ({m2Pct}%)</td>
                <td colSpan={2} className="py-3 px-2 text-center text-amber-700">{m3Points.toFixed(1)}đ ({m3Pct}%)</td>
                <td className="py-3 px-2 text-center text-slate-900">{totalQuestions} câu</td>
                <td className="py-3 px-2 text-center text-indigo-700">{displayTotal} điểm</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
