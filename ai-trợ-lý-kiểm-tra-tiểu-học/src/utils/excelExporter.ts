import * as XLSX from 'xlsx';
import { SpecRow, SchoolHeader } from '../types/curriculum';

export function exportSpecificationToExcel(
  specRows: SpecRow[],
  header: SchoolHeader,
  summary: {
    totalQuestions: number;
    totalPoints: number;
    m1Score: number;
    m2Score: number;
    m3Score: number;
    m1Count: number;
    m2Count: number;
    m3Count: number;
  }
) {
  const wb = XLSX.utils.book_new();

  // Prepare 2D array for the Excel sheet
  const rows: any[][] = [];

  // Title rows
  rows.push([header.deptName.toUpperCase()]);
  rows.push([header.schoolName.toUpperCase()]);
  rows.push([`BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ - NĂM HỌC ${header.academicYear}`]);
  rows.push([`Môn: ${header.subject} - Lớp ${header.grade} (Bộ sách Kết nối tri thức với cuộc sống)`]);
  rows.push([`Thời gian làm bài: ${header.durationMinutes} phút`]);
  rows.push([]); // Empty row

  // Table Headers (3 rows structure)
  // Row 1 of header
  rows.push([
    'TT',
    'Mạch kiến thức',
    'Nội dung/đơn vị kiến thức',
    'Yêu cầu cần đạt',
    'Số tiết',
    'Tỉ lệ (%)',
    'Số điểm cần đạt',
    'Trắc nghiệm', '', '', '', '', '', '', '', '', '', '', '', // 12 columns
    'Tự luận', '', '', '', '', '', '', '', '', // 9 columns
    'Tổng số câu/ý',
    'Điểm từng bài',
    'Câu số'
  ]);

  // Row 2 of header
  rows.push([
    '', '', '', '', '', '', '',
    'Nhiều lựa chọn', '', '',
    'Đúng-Sai', '', '',
    'Nối cột', '', '',
    'Điền khuyết', '', '',
    'Tự luận 1 (Biết: 0.5đ)', '', '',
    'Tự luận 2 (Hiểu: 1.0đ)', '', '',
    'Tự luận 3 (VD: 1.0-2.0đ)', '', '',
    '', '', ''
  ]);

  // Row 3 of header
  rows.push([
    '', '', '', '', '', '', '',
    'Biết', 'Hiểu', 'VD',
    'Biết', 'Hiểu', 'VD',
    'Biết', 'Hiểu', 'VD',
    'Biết', 'Hiểu', 'VD',
    'Biết', 'Hiểu', 'VD',
    'Biết', 'Hiểu', 'VD',
    'Biết', 'Hiểu', 'VD',
    '', '', ''
  ]);

  // Calculate column-wise sums
  let sumSoTiet = 0;
  let sumTiLe = 0;
  let sumDiemCanDat = 0;
  let sumTongSoCau = 0;
  let sumDiemTungBai = 0;

  const colSums = {
    nlc: { b: 0, h: 0, vd: 0 },
    ds: { b: 0, h: 0, vd: 0 },
    nc: { b: 0, h: 0, vd: 0 },
    dk: { b: 0, h: 0, vd: 0 },
    tl1: { b: 0, h: 0, vd: 0 },
    tl2: { b: 0, h: 0, vd: 0 },
    tl3: { b: 0, h: 0, vd: 0 },
  };

  specRows.forEach((row, index) => {
    sumSoTiet += Number(row.soTiet || 0);
    sumTiLe += Number(row.tiLe || 0);
    sumDiemCanDat += Number(row.soDiemCanDat || 0);
    sumTongSoCau += Number(row.tongSoCau || 0);
    sumDiemTungBai += Number(row.diemTungBai || 0);

    colSums.nlc.b += row.nhieuLuaChon.biet;
    colSums.nlc.h += row.nhieuLuaChon.hieu;
    colSums.nlc.vd += row.nhieuLuaChon.vd;

    colSums.ds.b += row.dungSai.biet;
    colSums.ds.h += row.dungSai.hieu;
    colSums.ds.vd += row.dungSai.vd;

    colSums.nc.b += row.noiCot.biet;
    colSums.nc.h += row.noiCot.hieu;
    colSums.nc.vd += row.noiCot.vd;

    colSums.dk.b += row.dienKhuyet.biet;
    colSums.dk.h += row.dienKhuyet.hieu;
    colSums.dk.vd += row.dienKhuyet.vd;

    colSums.tl1.b += row.tuLuan1.biet;
    colSums.tl1.h += row.tuLuan1.hieu;
    colSums.tl1.vd += row.tuLuan1.vd;

    colSums.tl2.b += row.tuLuan2.biet;
    colSums.tl2.h += row.tuLuan2.hieu;
    colSums.tl2.vd += row.tuLuan2.vd;

    colSums.tl3.b += row.tuLuan3.biet;
    colSums.tl3.h += row.tuLuan3.hieu;
    colSums.tl3.vd += row.tuLuan3.vd;

    rows.push([
      index + 1,
      row.machKienThuc,
      row.noiDung,
      row.yeuCauCanDat,
      row.soTiet,
      row.tiLe,
      row.soDiemCanDat,
      row.nhieuLuaChon.biet || '',
      row.nhieuLuaChon.hieu || '',
      row.nhieuLuaChon.vd || '',
      row.dungSai.biet || '',
      row.dungSai.hieu || '',
      row.dungSai.vd || '',
      row.noiCot.biet || '',
      row.noiCot.hieu || '',
      row.noiCot.vd || '',
      row.dienKhuyet.biet || '',
      row.dienKhuyet.hieu || '',
      row.dienKhuyet.vd || '',
      row.tuLuan1.biet || '',
      row.tuLuan1.hieu || '',
      row.tuLuan1.vd || '',
      row.tuLuan2.biet || '',
      row.tuLuan2.hieu || '',
      row.tuLuan2.vd || '',
      row.tuLuan3.biet || '',
      row.tuLuan3.hieu || '',
      row.tuLuan3.vd || '',
      row.tongSoCau,
      row.diemTungBai,
      row.cauSo
    ]);
  });

  // Summary Rows according to teacher's format
  rows.push([
    'Tổng số câu', '', '', '',
    sumSoTiet,
    `${sumTiLe}%`,
    sumDiemCanDat,
    colSums.nlc.b, colSums.nlc.h, colSums.nlc.vd,
    colSums.ds.b, colSums.ds.h, colSums.ds.vd,
    colSums.nc.b, colSums.nc.h, colSums.nc.vd,
    colSums.dk.b, colSums.dk.h, colSums.dk.vd,
    colSums.tl1.b, colSums.tl1.h, colSums.tl1.vd,
    colSums.tl2.b, colSums.tl2.h, colSums.tl2.vd,
    colSums.tl3.b, colSums.tl3.h, colSums.tl3.vd,
    sumTongSoCau,
    sumDiemTungBai,
    ''
  ]);

  // Row: Điểm từng mức độ
  const diemNLC_B = colSums.nlc.b * 0.5;
  const diemNLC_H = colSums.nlc.h * 0.5;
  const diemDS_B = colSums.ds.b * 0.25;
  const diemDS_H = colSums.ds.h * 0.25;
  const diemNC_B = colSums.nc.b * 0.25;
  const diemNC_H = colSums.nc.h * 0.25;
  const diemDK_B = colSums.dk.b * 0.25;
  const diemDK_H = colSums.dk.h * 0.25;
  const diemTL1_B = colSums.tl1.b * 0.5;
  const diemTL2_H = colSums.tl2.h * 1.0;
  const diemTL3_VD = colSums.tl3.vd * 1.5;

  rows.push([
    'Điểm từng mức độ', '', '', '', '', '', '',
    diemNLC_B, diemNLC_H, 0,
    diemDS_B, diemDS_H, 0,
    diemNC_B, diemNC_H, 0,
    diemDK_B, diemDK_H, 0,
    diemTL1_B, 0, 0,
    0, diemTL2_H, 0,
    0, 0, diemTL3_VD,
    '', sumDiemTungBai, ''
  ]);

  // Row: Tỉ lệ
  const totalPt = sumDiemTungBai || 10;
  const m1Total = diemNLC_B + diemDS_B + diemNC_B + diemDK_B + diemTL1_B;
  const m2Total = diemNLC_H + diemDS_H + diemNC_H + diemDK_H + diemTL2_H;
  const m3Total = diemTL3_VD;

  rows.push([
    'Tỉ lệ (%)', '', '', '', '', '', '',
    `${Math.round((m1Total / totalPt) * 100)}% (Mức 1)`, '', '',
    `${Math.round((m2Total / totalPt) * 100)}% (Mức 2)`, '', '',
    `${Math.round((m3Total / totalPt) * 100)}% (Mức 3)`, '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', ''
  ]);

  rows.push([]); // blank

  // Barem quy định chuẩn điểm theo yêu cầu
  rows.push(['', '', 'Điểm 1 câu nhiều lựa chọn: 0,5 đ/ý']);
  rows.push(['', '', 'Điểm 1 câu đúng sai: 0,25 đ/ý']);
  rows.push(['', '', 'Điểm 1 câu nối cột: 0,25 đ/ý']);
  rows.push(['', '', 'Điểm 1 câu điền khuyết: 0,25 đ/ý']);
  rows.push(['', '', 'Điểm 1 câu tự luận 1 (Biết): 0,5 đ/câu/ý']);
  rows.push(['', '', 'Điểm 1 câu tự luận 2 (Hiểu): 1,0 đ/câu/ý']);
  rows.push(['', '', 'Điểm 1 câu tự luận 3 (Vận dụng): 1,0 - 2,0 đ/câu/ý']);
  rows.push([]);

  // Bảng tổng hợp mức độ
  rows.push(['', '', 'Mức độ đánh giá', 'Biết (M1)', 'Hiểu (M2)', 'Vận dụng (M3)', 'Tổng cộng']);
  rows.push(['', '', 'Số câu/ý', summary.m1Count, summary.m2Count, summary.m3Count, summary.totalQuestions]);
  rows.push(['', '', 'Điểm từng phần', summary.m1Score, summary.m2Score, summary.m3Score, summary.totalPoints]);
  rows.push(['', '', 'Tỉ lệ %', `${Math.round((summary.m1Score / (summary.totalPoints || 10)) * 100)}%`, `${Math.round((summary.m2Score / (summary.totalPoints || 10)) * 100)}%`, `${Math.round((summary.m3Score / (summary.totalPoints || 10)) * 100)}%`, '100%']);

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws['!cols'] = [
    { wch: 5 },   // TT
    { wch: 22 },  // Mạch kiến thức
    { wch: 30 },  // Nội dung
    { wch: 45 },  // Yêu cầu cần đạt
    { wch: 8 },   // Số tiết
    { wch: 8 },   // Tỉ lệ
    { wch: 10 },  // Điểm cần đạt
    // 12 cols TN
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    // 9 cols TL
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    { wch: 6 }, { wch: 6 }, { wch: 6 },
    // tổng
    { wch: 12 },  // Tổng số câu
    { wch: 12 },  // Điểm từng bài
    { wch: 15 }   // Câu số
  ];

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Bản đặc tả');

  // Generate filename
  const safeSubject = header.subject.replace(/\s+/g, '_');
  const filename = `Ban_dac_ta_Lop_${header.grade}_${safeSubject}_${header.academicYear.replace(/\s+/g, '')}.xlsx`;

  // Write and trigger download in browser
  XLSX.writeFile(wb, filename);
}
