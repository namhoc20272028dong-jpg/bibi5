import React, { useState } from 'react';
import { SpecRow, SchoolHeader, Subject, Grade, ExamTerm } from '../types/curriculum';
import { FileSpreadsheet, Sparkles, Plus, Trash2, Edit3, Save, Check, RefreshCw } from 'lucide-react';
import { exportSpecificationToExcel } from '../utils/excelExporter';

interface Props {
  specRows: SpecRow[];
  setSpecRows: React.Dispatch<React.SetStateAction<SpecRow[]>>;
  header: SchoolHeader;
  subject: Subject;
  grade: Grade;
  term: ExamTerm;
  onAiSuggestSpec: () => void;
  isLoading: boolean;
}

export const SpecificationTab: React.FC<Props> = ({
  specRows,
  setSpecRows,
  header,
  subject,
  grade,
  term,
  onAiSuggestSpec,
  isLoading,
}) => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);

  // Compute column totals
  let sumSoTiet = 0;
  let sumTiLe = 0;
  let sumDiemCanDat = 0;
  let sumTongSoCau = 0;
  let sumDiemTungBai = 0;

  const colTotals = {
    nlc: { b: 0, h: 0, vd: 0 },
    ds: { b: 0, h: 0, vd: 0 },
    nc: { b: 0, h: 0, vd: 0 },
    dk: { b: 0, h: 0, vd: 0 },
    tl1: { b: 0, h: 0, vd: 0 },
    tl2: { b: 0, h: 0, vd: 0 },
    tl3: { b: 0, h: 0, vd: 0 },
  };

  specRows.forEach((r) => {
    sumSoTiet += Number(r.soTiet || 0);
    sumTiLe += Number(r.tiLe || 0);
    sumDiemCanDat += Number(r.soDiemCanDat || 0);
    sumTongSoCau += Number(r.tongSoCau || 0);
    sumDiemTungBai += Number(r.diemTungBai || 0);

    colTotals.nlc.b += r.nhieuLuaChon.biet;
    colTotals.nlc.h += r.nhieuLuaChon.hieu;
    colTotals.nlc.vd += r.nhieuLuaChon.vd;

    colTotals.ds.b += r.dungSai.biet;
    colTotals.ds.h += r.dungSai.hieu;
    colTotals.ds.vd += r.dungSai.vd;

    colTotals.nc.b += r.noiCot.biet;
    colTotals.nc.h += r.noiCot.hieu;
    colTotals.nc.vd += r.noiCot.vd;

    colTotals.dk.b += r.dienKhuyet.biet;
    colTotals.dk.h += r.dienKhuyet.hieu;
    colTotals.dk.vd += r.dienKhuyet.vd;

    colTotals.tl1.b += r.tuLuan1.biet;
    colTotals.tl1.h += r.tuLuan1.hieu;
    colTotals.tl1.vd += r.tuLuan1.vd;

    colTotals.tl2.b += r.tuLuan2.biet;
    colTotals.tl2.h += r.tuLuan2.hieu;
    colTotals.tl2.vd += r.tuLuan2.vd;

    colTotals.tl3.b += r.tuLuan3.biet;
    colTotals.tl3.h += r.tuLuan3.hieu;
    colTotals.tl3.vd += r.tuLuan3.vd;
  });

  const m1Score =
    colTotals.nlc.b * 0.5 +
    colTotals.ds.b * 0.25 +
    colTotals.nc.b * 0.25 +
    colTotals.dk.b * 0.25 +
    colTotals.tl1.b * 0.5;

  const m2Score =
    colTotals.nlc.h * 0.5 +
    colTotals.ds.h * 0.25 +
    colTotals.nc.h * 0.25 +
    colTotals.dk.h * 0.25 +
    colTotals.tl2.h * 1.0;

  const m3Score = colTotals.tl3.vd * 1.5;

  const m1Count =
    colTotals.nlc.b +
    colTotals.ds.b +
    colTotals.nc.b +
    colTotals.dk.b +
    colTotals.tl1.b;

  const m2Count =
    colTotals.nlc.h +
    colTotals.ds.h +
    colTotals.nc.h +
    colTotals.dk.h +
    colTotals.tl2.h;

  const m3Count = colTotals.tl3.vd;

  const handleExport = () => {
    exportSpecificationToExcel(specRows, header, {
      totalQuestions: sumTongSoCau,
      totalPoints: sumDiemTungBai || 10,
      m1Score,
      m2Score,
      m3Score,
      m1Count,
      m2Count,
      m3Count,
    });
  };

  const handleAddRow = () => {
    const newRow: SpecRow = {
      id: `spec_${Date.now()}`,
      tt: specRows.length + 1,
      machKienThuc: 'Số và phép tính',
      noiDung: 'Nội dung kiến thức mới',
      yeuCauCanDat: 'Mô tả yêu cầu cần đạt...',
      soTiet: 4,
      tiLe: 10,
      soDiemCanDat: 1.0,
      nhieuLuaChon: { biet: 1, hieu: 0, vd: 0 },
      dungSai: { biet: 0, hieu: 0, vd: 0 },
      noiCot: { biet: 0, hieu: 0, vd: 0 },
      dienKhuyet: { biet: 0, hieu: 0, vd: 0 },
      tuLuan1: { biet: 0, hieu: 0, vd: 0 },
      tuLuan2: { biet: 0, hieu: 0, vd: 0 },
      tuLuan3: { biet: 0, hieu: 0, vd: 0 },
      tongSoCau: 1,
      diemTungBai: 1.0,
      cauSo: `Câu ${sumTongSoCau + 1}`,
    };
    setSpecRows([...specRows, newRow]);
  };

  const handleDeleteRow = (id: string) => {
    if (confirm('Xóa dòng đặc tả này?')) {
      setSpecRows(specRows.filter((r) => r.id !== id));
    }
  };

  const updateField = (id: string, field: keyof SpecRow, val: any) => {
    setSpecRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: val } : r))
    );
  };

  const updateNestedCount = (
    id: string,
    category: 'nhieuLuaChon' | 'dungSai' | 'noiCot' | 'dienKhuyet' | 'tuLuan1' | 'tuLuan2' | 'tuLuan3',
    level: 'biet' | 'hieu' | 'vd',
    val: number
  ) => {
    setSpecRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updatedCat = { ...r[category], [level]: val };
        return {
          ...r,
          [category]: updatedCat,
        };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-white/20 rounded-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wide">
                4. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                Môn {subject} — Lớp {grade} ({term}) • {header.deptName} — {header.schoolName}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddRow}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm dòng đặc tả</span>
          </button>

          <button
            onClick={onAiSuggestSpec}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-md shadow-amber-900/20 transition-all cursor-pointer disabled:opacity-60"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang tạo...' : 'AI Gợi ý đặc tả'}</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-white text-emerald-800 hover:bg-emerald-50 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>XUẤT FILE EXCEL (.XLSX)</span>
          </button>
        </div>
      </div>

      {/* Main Spec Table */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[75vh]">
          <table className="w-full border-collapse text-[11px] text-slate-800">
            {/* Table Header with 3 tiers */}
            <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0 z-20 shadow-2xs">
              {/* Row 1 */}
              <tr className="border-b border-slate-300 text-center">
                <th rowSpan={3} className="border border-slate-300 p-2 w-8">TT</th>
                <th rowSpan={3} className="border border-slate-300 p-2 w-36">Mạch kiến thức</th>
                <th rowSpan={3} className="border border-slate-300 p-2 w-48">Nội dung/đơn vị kiến thức</th>
                <th rowSpan={3} className="border border-slate-300 p-2 min-w-[200px]">Yêu cầu cần đạt</th>
                <th rowSpan={3} className="border border-slate-300 p-1 w-10">Số tiết</th>
                <th rowSpan={3} className="border border-slate-300 p-1 w-12">Tỉ lệ (%)</th>
                <th rowSpan={3} className="border border-slate-300 p-1 w-14">Điểm cần đạt</th>
                <th colSpan={12} className="border border-slate-300 p-2 bg-blue-100/80 text-blue-900">
                  Trắc nghiệm (0,5đ/ý NLC; 0,25đ/ý ĐS, NC, ĐK)
                </th>
                <th colSpan={9} className="border border-slate-300 p-2 bg-amber-100/80 text-amber-900">
                  Tự luận (Biết: 0,5đ; Hiểu: 1,0đ; VD: 1,0 - 2,0đ)
                </th>
                <th rowSpan={3} className="border border-slate-300 p-1 w-14 bg-indigo-50 font-black">Tổng số câu/ý</th>
                <th rowSpan={3} className="border border-slate-300 p-1 w-14 bg-indigo-50 font-black">Điểm từng bài</th>
                <th rowSpan={3} className="border border-slate-300 p-2 w-20">Câu số</th>
                <th rowSpan={3} className="border border-slate-300 p-1 w-10">Sửa</th>
              </tr>

              {/* Row 2 */}
              <tr className="border-b border-slate-300 text-center text-[10px]">
                <th colSpan={3} className="border border-slate-300 p-1 bg-blue-50">Nhiều lựa chọn</th>
                <th colSpan={3} className="border border-slate-300 p-1 bg-blue-50">Đúng-Sai</th>
                <th colSpan={3} className="border border-slate-300 p-1 bg-blue-50">Nối cột</th>
                <th colSpan={3} className="border border-slate-300 p-1 bg-blue-50">Điền khuyết</th>
                <th colSpan={3} className="border border-slate-300 p-1 bg-amber-50">Tự luận 1</th>
                <th colSpan={3} className="border border-slate-300 p-1 bg-amber-50">Tự luận 2</th>
                <th colSpan={3} className="border border-slate-300 p-1 bg-amber-50">Tự luận 3</th>
              </tr>

              {/* Row 3 */}
              <tr className="border-b-2 border-slate-400 text-center text-[10px] bg-slate-200/90 font-semibold">
                <th className="border border-slate-300 p-1 w-7">Biết</th>
                <th className="border border-slate-300 p-1 w-7">Hiểu</th>
                <th className="border border-slate-300 p-1 w-7 text-slate-400">VD</th>
                <th className="border border-slate-300 p-1 w-7">Biết</th>
                <th className="border border-slate-300 p-1 w-7">Hiểu</th>
                <th className="border border-slate-300 p-1 w-7 text-slate-400">VD</th>
                <th className="border border-slate-300 p-1 w-7">Biết</th>
                <th className="border border-slate-300 p-1 w-7">Hiểu</th>
                <th className="border border-slate-300 p-1 w-7 text-slate-400">VD</th>
                <th className="border border-slate-300 p-1 w-7">Biết</th>
                <th className="border border-slate-300 p-1 w-7">Hiểu</th>
                <th className="border border-slate-300 p-1 w-7 text-slate-400">VD</th>

                <th className="border border-slate-300 p-1 w-7">Biết</th>
                <th className="border border-slate-300 p-1 w-7">Hiểu</th>
                <th className="border border-slate-300 p-1 w-7">VD</th>
                <th className="border border-slate-300 p-1 w-7">Biết</th>
                <th className="border border-slate-300 p-1 w-7">Hiểu</th>
                <th className="border border-slate-300 p-1 w-7">VD</th>
                <th className="border border-slate-300 p-1 w-7">Biết</th>
                <th className="border border-slate-300 p-1 w-7">Hiểu</th>
                <th className="border border-slate-300 p-1 w-7">VD</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {specRows.map((r, idx) => {
                const isEditing = editingRowId === r.id;
                return (
                  <tr
                    key={r.id || idx}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      isEditing ? 'bg-amber-50/70' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="border border-slate-300 p-1 text-center font-bold">{idx + 1}</td>
                    <td className="border border-slate-300 p-1.5 font-semibold text-slate-900">
                      {isEditing ? (
                        <input
                          type="text"
                          value={r.machKienThuc}
                          onChange={(e) => updateField(r.id, 'machKienThuc', e.target.value)}
                          className="w-full px-1 py-0.5 border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        r.machKienThuc
                      )}
                    </td>
                    <td className="border border-slate-300 p-1.5 font-medium">
                      {isEditing ? (
                        <input
                          type="text"
                          value={r.noiDung}
                          onChange={(e) => updateField(r.id, 'noiDung', e.target.value)}
                          className="w-full px-1 py-0.5 border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        r.noiDung
                      )}
                    </td>
                    <td className="border border-slate-300 p-1.5 text-slate-600 leading-snug">
                      {isEditing ? (
                        <textarea
                          value={r.yeuCauCanDat}
                          onChange={(e) => updateField(r.id, 'yeuCauCanDat', e.target.value)}
                          rows={2}
                          className="w-full px-1 py-0.5 border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        r.yeuCauCanDat
                      )}
                    </td>
                    <td className="border border-slate-300 p-1 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={r.soTiet}
                          onChange={(e) => updateField(r.id, 'soTiet', Number(e.target.value))}
                          className="w-8 text-center border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        r.soTiet
                      )}
                    </td>
                    <td className="border border-slate-300 p-1 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={r.tiLe}
                          onChange={(e) => updateField(r.id, 'tiLe', Number(e.target.value))}
                          className="w-10 text-center border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        `${r.tiLe}%`
                      )}
                    </td>
                    <td className="border border-slate-300 p-1 text-center font-bold text-blue-700">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.5"
                          value={r.soDiemCanDat}
                          onChange={(e) => updateField(r.id, 'soDiemCanDat', Number(e.target.value))}
                          className="w-12 text-center border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        r.soDiemCanDat
                      )}
                    </td>

                    {/* Nhiều lựa chọn */}
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'nhieuLuaChon', 'biet', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'nhieuLuaChon', 'hieu', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center text-slate-300 bg-slate-50">0</td>

                    {/* Đúng sai */}
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'dungSai', 'biet', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'dungSai', 'hieu', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center text-slate-300 bg-slate-50">0</td>

                    {/* Nối cột */}
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'noiCot', 'biet', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'noiCot', 'hieu', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center text-slate-300 bg-slate-50">0</td>

                    {/* Điền khuyết */}
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'dienKhuyet', 'biet', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'dienKhuyet', 'hieu', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center text-slate-300 bg-slate-50">0</td>

                    {/* Tự luận 1 */}
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan1', 'biet', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan1', 'hieu', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan1', 'vd', isEditing, updateNestedCount)}</td>

                    {/* Tự luận 2 */}
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan2', 'biet', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan2', 'hieu', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan2', 'vd', isEditing, updateNestedCount)}</td>

                    {/* Tự luận 3 */}
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan3', 'biet', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center">{renderCell(r, 'tuLuan3', 'hieu', isEditing, updateNestedCount)}</td>
                    <td className="border border-slate-300 p-0.5 text-center font-bold text-amber-700 bg-amber-50/50">{renderCell(r, 'tuLuan3', 'vd', isEditing, updateNestedCount)}</td>

                    {/* Tổng số câu */}
                    <td className="border border-slate-300 p-1 text-center font-black bg-indigo-50/40 text-indigo-900">
                      {isEditing ? (
                        <input
                          type="number"
                          value={r.tongSoCau}
                          onChange={(e) => updateField(r.id, 'tongSoCau', Number(e.target.value))}
                          className="w-8 text-center border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        r.tongSoCau
                      )}
                    </td>

                    {/* Điểm từng bài */}
                    <td className="border border-slate-300 p-1 text-center font-black bg-indigo-50/40 text-blue-700">
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.25"
                          value={r.diemTungBai}
                          onChange={(e) => updateField(r.id, 'diemTungBai', Number(e.target.value))}
                          className="w-10 text-center border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        `${r.diemTungBai}đ`
                      )}
                    </td>

                    {/* Câu số */}
                    <td className="border border-slate-300 p-1 text-center font-medium">
                      {isEditing ? (
                        <input
                          type="text"
                          value={r.cauSo}
                          onChange={(e) => updateField(r.id, 'cauSo', e.target.value)}
                          className="w-16 text-center border border-amber-400 bg-white rounded"
                        />
                      ) : (
                        r.cauSo
                      )}
                    </td>

                    <td className="border border-slate-300 p-1 text-center">
                      {isEditing ? (
                        <button
                          onClick={() => setEditingRowId(null)}
                          className="p-1 text-emerald-600 hover:bg-emerald-100 rounded"
                          title="Xong"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setEditingRowId(r.id)}
                            className="p-0.5 text-blue-600 hover:bg-blue-100 rounded"
                            title="Sửa nhanh"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRow(r.id)}
                            className="p-0.5 text-rose-500 hover:bg-rose-100 rounded"
                            title="Xóa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {/* FOOTER ROW 1: Tổng số câu */}
              <tr className="bg-slate-200 font-bold border-t-2 border-slate-400">
                <td colSpan={4} className="border border-slate-300 p-1.5 text-right uppercase">
                  Tổng số câu:
                </td>
                <td className="border border-slate-300 p-1 text-center">{sumSoTiet}</td>
                <td className="border border-slate-300 p-1 text-center">{sumTiLe}%</td>
                <td className="border border-slate-300 p-1 text-center text-blue-800">{sumDiemCanDat}</td>
                {/* 12 TN */}
                <td className="border border-slate-300 p-1 text-center">{colTotals.nlc.b || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.nlc.h || 0}</td>
                <td className="border border-slate-300 p-1 text-center text-slate-300">0</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.ds.b || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.ds.h || 0}</td>
                <td className="border border-slate-300 p-1 text-center text-slate-300">0</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.nc.b || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.nc.h || 0}</td>
                <td className="border border-slate-300 p-1 text-center text-slate-300">0</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.dk.b || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.dk.h || 0}</td>
                <td className="border border-slate-300 p-1 text-center text-slate-300">0</td>
                {/* 9 TL */}
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl1.b || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl1.h || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl1.vd || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl2.b || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl2.h || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl2.vd || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl3.b || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl3.h || 0}</td>
                <td className="border border-slate-300 p-1 text-center">{colTotals.tl3.vd || 0}</td>
                <td className="border border-slate-300 p-1 text-center text-indigo-900 bg-indigo-100/70 font-black">
                  {sumTongSoCau}
                </td>
                <td className="border border-slate-300 p-1 text-center text-blue-900 bg-indigo-100/70 font-black">
                  {sumDiemTungBai}
                </td>
                <td colSpan={2} className="border border-slate-300"></td>
              </tr>

              {/* FOOTER ROW 2: Điểm từng mức độ */}
              <tr className="bg-slate-100 font-bold">
                <td colSpan={7} className="border border-slate-300 p-1.5 text-right">
                  Điểm từng mức độ:
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center text-blue-700">
                  {((colTotals.nlc.b + colTotals.nlc.h) * 0.5).toFixed(1)}đ
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center text-blue-700">
                  {((colTotals.ds.b + colTotals.ds.h) * 0.25).toFixed(2)}đ
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center text-blue-700">
                  {((colTotals.nc.b + colTotals.nc.h) * 0.25).toFixed(2)}đ
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center text-blue-700">
                  {((colTotals.dk.b + colTotals.dk.h) * 0.25).toFixed(2)}đ
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center text-amber-700">
                  {(colTotals.tl1.b * 0.5).toFixed(1)}đ
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center text-amber-700">
                  {(colTotals.tl2.h * 1.0).toFixed(1)}đ
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center text-amber-700">
                  {(colTotals.tl3.vd * 1.5).toFixed(1)}đ
                </td>
                <td colSpan={3} className="border border-slate-300 p-1 text-center font-black text-indigo-800">
                  {sumDiemTungBai} điểm
                </td>
                <td className="border border-slate-300"></td>
              </tr>

              {/* FOOTER ROW 3: Tỉ lệ */}
              <tr className="bg-slate-50 font-bold">
                <td colSpan={7} className="border border-slate-300 p-1.5 text-right">
                  Tỉ lệ:
                </td>
                <td colSpan={12} className="border border-slate-300 p-1 text-center text-blue-800">
                  Trắc nghiệm: {Math.round(((sumDiemTungBai - m3Score - colTotals.tl2.h * 1.0 - colTotals.tl1.b * 0.5) / (sumDiemTungBai || 10)) * 100)}%
                </td>
                <td colSpan={9} className="border border-slate-300 p-1 text-center text-amber-800">
                  Tự luận: {Math.round(((m3Score + colTotals.tl2.h * 1.0 + colTotals.tl1.b * 0.5) / (sumDiemTungBai || 10)) * 100)}%
                </td>
                <td colSpan={4} className="border border-slate-300 p-1 text-center text-emerald-800 font-black">
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scoring Guide Footnotes Box */}
        <div className="bg-slate-50/80 p-4 border-t border-slate-300 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1 text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span>ĐƠN GIÁ ĐIỂM CHUẨN ĐẶC TẢ:</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              <div>• Điểm 1 câu nhiều lựa chọn: <b>0,5 đ / ý</b></div>
              <div>• Điểm 1 câu đúng sai: <b>0,25 đ / ý</b></div>
              <div>• Điểm 1 câu nối cột: <b>0,25 đ / ý</b></div>
              <div>• Điểm 1 câu điền khuyết: <b>0,25 đ / ý</b></div>
              <div>• Điểm 1 câu tự luận 1 (Biết): <b>0,5 đ / ý</b></div>
              <div>• Điểm 1 câu tự luận 2 (Hiểu): <b>1,0 đ / ý</b></div>
              <div>• Điểm 1 câu tự luận 3 (Vận dụng): <b>1,0 - 2,0 đ / ý</b></div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 text-[11px]">TỔNG HỢP MỨC ĐỘ ĐÁNH GIÁ (TT 27):</div>
            <div className="flex items-center justify-between text-[11px] pt-1">
              <div>
                <span className="text-slate-500">Biết (M1):</span> <b>{m1Count} câu</b> — <span className="text-blue-700 font-bold">{m1Score.toFixed(1)}đ</span> ({Math.round((m1Score / (sumDiemTungBai || 10)) * 100)}%)
              </div>
              <div>
                <span className="text-slate-500">Hiểu (M2):</span> <b>{m2Count} câu</b> — <span className="text-emerald-700 font-bold">{m2Score.toFixed(1)}đ</span> ({Math.round((m2Score / (sumDiemTungBai || 10)) * 100)}%)
              </div>
              <div>
                <span className="text-slate-500">VD (M3):</span> <b>{m3Count} câu</b> — <span className="text-amber-700 font-bold">{m3Score.toFixed(1)}đ</span> ({Math.round((m3Score / (sumDiemTungBai || 10)) * 100)}%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderCell(
  row: SpecRow,
  cat: 'nhieuLuaChon' | 'dungSai' | 'noiCot' | 'dienKhuyet' | 'tuLuan1' | 'tuLuan2' | 'tuLuan3',
  level: 'biet' | 'hieu' | 'vd',
  isEditing: boolean,
  updateFn: any
) {
  const val = row[cat][level];
  if (isEditing) {
    return (
      <input
        type="number"
        min="0"
        max="10"
        value={val}
        onChange={(e) => updateFn(row.id, cat, level, Number(e.target.value))}
        className="w-6 text-center border border-amber-400 bg-white rounded p-0 text-[10px]"
      />
    );
  }
  return val > 0 ? <span className="font-bold text-slate-800">{val}</span> : <span className="text-slate-300">-</span>;
}
