import { ExamVariant, QuestionItem, SchoolHeader } from '../types/curriculum';

export function formatQuestionHTML(q: QuestionItem): string {
  const scoreText = ` (${q.score.toString().replace('.', ',')} điểm): `;
  let html = `<div class="mb-5 text-slate-800 text-[15px] leading-relaxed">
    <div class="font-normal">
      <span class="font-bold">Câu ${q.questionNumber}</span><span class="italic font-normal">${scoreText}</span>${q.content}
    </div>`;

  if (q.options && q.options.length > 0) {
    html += `<div class="mt-2 ml-7 space-y-1">`;
    q.options.forEach((opt) => {
      html += `<div class="font-normal">${opt}</div>`;
    });
    html += `</div>`;
  }

  if (q.trueFalseItems && q.trueFalseItems.length > 0) {
    html += `<div class="mt-2 ml-7 space-y-1">`;
    q.trueFalseItems.forEach((tf) => {
      html += `<div class="flex items-center gap-2"><span>[   ]</span> <span>${tf.statement}</span></div>`;
    });
    html += `</div>`;
  }

  if (q.fillInTheBlank) {
    html += `<div class="mt-2 ml-7 italic text-slate-700">${q.fillInTheBlank}</div>`;
  }

  html += `</div>`;
  return html;
}

export function exportExamToWord(
  exam: ExamVariant,
  header: SchoolHeader,
  includeAnswers: boolean = false
) {
  let content = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset="utf-8">
    <title>${header.title}</title>
    <style>
      body { font-family: "Times New Roman", Times, serif; font-size: 13pt; line-height: 1.4; color: #000; }
      table { width: 100%; border-collapse: collapse; }
      .header-table td { vertical-align: top; }
      .bold { font-weight: bold; }
      .italic { font-style: italic; }
      .center { text-align: center; }
      .tab-1cm { margin-left: 1cm; padding-left: 1cm; }
      .question-block { margin-bottom: 14pt; }
      .answer-box { border: 1px solid #333; padding: 8pt; margin-top: 10pt; background-color: #f9f9f9; }
      .score-box { border: 1px solid #000; padding: 6pt; }
    </style>
  </head>
  <body>
    <table class="header-table" style="margin-bottom: 15pt;">
      <tr>
        <td style="width: 45%; text-align: center;">
          <div class="bold">${header.deptName.toUpperCase()}</div>
          <div class="bold" style="border-bottom: 1px solid #000; display: inline-block; padding-bottom: 2px;">${header.schoolName.toUpperCase()}</div>
          <div class="italic" style="margin-top: 4pt;">Mã đề: ${exam.examCode}</div>
        </td>
        <td style="width: 55%; text-align: center;">
          <div class="bold" style="font-size: 14pt;">${header.title.toUpperCase()}</div>
          <div class="bold">NĂM HỌC ${header.academicYear}</div>
          <div class="bold">MÔN: ${header.subject.toUpperCase()} - LỚP ${header.grade}</div>
          <div class="italic">(Thời gian làm bài: ${header.durationMinutes} phút)</div>
        </td>
      </tr>
    </table>

    <table style="width: 100%; border: 1px solid #000; margin-bottom: 15pt;">
      <tr>
        <td style="padding: 6pt; border: 1px solid #000; width: 60%;">
          Họ và tên học sinh: ....................................................................<br>
          Lớp: .......... Trường: ................................................................
        </td>
        <td style="padding: 6pt; border: 1px solid #000; width: 40%; vertical-align: top;">
          Ngày kiểm tra: ...... / ...... / 202...<br>
          Giáo viên coi thi: .......................................
        </td>
      </tr>
      <tr>
        <td style="padding: 10pt; border: 1px solid #000; text-align: center;">
          <div class="bold">ĐIỂM SỐ</div>
          <div style="height: 30pt;"></div>
        </td>
        <td style="padding: 6pt; border: 1px solid #000; vertical-align: top;">
          <div class="bold">NHẬN XÉT CỦA GIÁO VIÊN (Theo TT 27):</div>
          <div style="height: 30pt;">...........................................................................</div>
        </td>
      </tr>
    </table>

    <div style="margin-bottom: 10pt;" class="bold">BÀI LÀM:</div>
  `;

  exam.questions.forEach((q) => {
    const scoreStr = ` (${q.score.toString().replace('.', ',')} điểm): `;
    content += `
      <div class="question-block">
        <div><span class="bold">Câu ${q.questionNumber}</span><span class="italic">${scoreStr}</span>${q.content.replace(/\n/g, '<br>')}</div>
    `;

    if (q.options && q.options.length > 0) {
      content += `<div style="margin-left: 28px; margin-top: 4pt;">`;
      q.options.forEach((opt) => {
        content += `<div>${opt}</div>`;
      });
      content += `</div>`;
    }

    if (q.trueFalseItems && q.trueFalseItems.length > 0) {
      content += `<div style="margin-left: 28px; margin-top: 4pt;">`;
      q.trueFalseItems.forEach((tf) => {
        content += `<div>[   ] ${tf.statement}</div>`;
      });
      content += `</div>`;
    }

    if (q.fillInTheBlank) {
      content += `<div style="margin-left: 28px; margin-top: 4pt; font-style: italic;">${q.fillInTheBlank}</div>`;
    }

    if (includeAnswers) {
      content += `
        <div class="answer-box">
          <div class="bold" style="color: #0d6efd;">Đáp án: ${q.answer}</div>
          <div class="italic" style="color: #555;">Hướng dẫn chấm: ${q.guide}</div>
        </div>
      `;
    }

    content += `</div>`;
  });

  if (includeAnswers) {
    content += `
      <div style="margin-top: 30pt; page-break-before: always;">
        <h3 class="center bold">HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM CHI TIẾT - ${exam.examCode}</h3>
        <table style="width: 100%; border: 1px solid #000;">
          <tr style="background: #e9ecef;">
            <th style="border: 1px solid #000; padding: 4pt; width: 10%;">Câu</th>
            <th style="border: 1px solid #000; padding: 4pt; width: 15%;">Mức độ</th>
            <th style="border: 1px solid #000; padding: 4pt; width: 15%;">Điểm</th>
            <th style="border: 1px solid #000; padding: 4pt; width: 60%;">Đáp án & Hướng dẫn chấm</th>
          </tr>
          ${exam.questions
            .map(
              (q) => `
            <tr>
              <td style="border: 1px solid #000; padding: 4pt; text-align: center; font-weight: bold;">Câu ${q.questionNumber}</td>
              <td style="border: 1px solid #000; padding: 4pt; text-align: center;">${q.cognitiveLevel}</td>
              <td style="border: 1px solid #000; padding: 4pt; text-align: center;">${q.score}đ</td>
              <td style="border: 1px solid #000; padding: 4pt;">
                <b>${q.answer}</b><br>
                <small>${q.guide}</small>
              </td>
            </tr>
          `
            )
            .join('')}
        </table>
      </div>
    `;
  }

  content += `</body></html>`;

  const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `De_kiem_tra_${header.subject}_Lop${header.grade}_${exam.examCode}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
