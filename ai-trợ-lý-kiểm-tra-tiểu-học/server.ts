import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Suggest Lessons & Requirements
app.post('/api/ai/suggest-lessons', async (req: Request, res: Response) => {
  try {
    const { grade, subject, semester, termName } = req.body;
    const prompt = `Bạn là Chuyên gia tiểu học GDPT 2018 và thẩm định chương trình sách giáo khoa "Kết nối tri thức với cuộc sống".
Hãy lập danh sách bài học, mạch kiến thức, nội dung trọng tâm và Yêu cầu cần đạt cho:
- Lớp: ${grade}
- Môn: ${subject}
- Kì thi / Thời điểm: ${termName || semester} (Bộ sách Kết nối tri thức với cuộc sống)

Trả về JSON có cấu trúc sau:
{
  "lessons": [
    {
      "id": "b1",
      "topic": "Tên mạch kiến thức (Ví dụ: Số và phép tính / Hình học và đo lường)",
      "lessonName": "Tên bài học",
      "periods": 3,
      "coreKnowledge": "Nội dung kiến thức cốt lõi",
      "requirements": "Yêu cầu cần đạt chi tiết theo chuẩn GDPT 2018"
    }
  ]
}
Chỉ trả về JSON thuần túy, không có định dạng markdown xung quanh.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text || '{}';
    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error suggesting lessons:', error);
    res.status(500).json({ error: error.message || 'Lỗi khi gợi ý danh sách bài học' });
  }
});

// AI Generate Specification & Matrix
app.post('/api/ai/suggest-specification', async (req: Request, res: Response) => {
  try {
    const { grade, subject, semester, termName, selectedLessons, customNotes } = req.body;
    const isPrimaryLower = Number(grade) <= 3;

    const prompt = `Bạn là Chuyên gia ra đề kiểm tra tiểu học, xây dựng ma trận và bản đặc tả theo Thông tư 27/2020/TT-BGDĐT và chương trình GDPT 2018 (bộ sách Kết nối tri thức).
Thiết lập Bản đặc tả ma trận đề kiểm tra chuẩn cho:
- Môn: ${subject}
- Lớp: ${grade} (${isPrimaryLower ? 'Trắc nghiệm 3 phương án A, B, C' : 'Trắc nghiệm 4 phương án A, B, C, D'})
- Kỳ kiểm tra: ${termName || semester}
- Danh sách bài học/nội dung trọng tâm: ${JSON.stringify(selectedLessons || [])}
- Ghi chú thêm: ${customNotes || ''}

QUY TẮC BẮT BUỘC:
1. Mức độ nhận thức gồm 3 mức: Mức 1 (Biết), Mức 2 (Hiểu), Mức 3 (Vận dụng). Tỉ lệ chuẩn 50% - 30% - 20%.
2. KHÔNG TẠO CÂU TRẮC NGHIỆM Ở MỨC VẬN DỤNG! Mức vận dụng CHỈ dành cho Tự luận.
3. Điểm trắc nghiệm nhiều lựa chọn: 0,5 đ/ý. Trắc nghiệm Đúng-Sai, Nối cột, Điền khuyết: 0,25 đ/ý.
4. Điểm tự luận: Biết: 0,5 đ/câu/ý; Hiểu: 1,0 đ/câu/ý; Vận dụng: từ 1,0 - 2,0 đ/câu/ý.
5. Tổng điểm: 10 điểm. Tổng số câu: khoảng 8 đến 11 câu (chuẩn 10 câu 10 điểm cho môn Toán).
6. Bảng đặc tả phải có đầy đủ các cột:
- TT (1, 2, 3...)
- machKienThuc (Số và phép tính, Đại lượng và hình học, Thống kê và xác suất...)
- noiDung (Tên bài học hoặc nội dung đơn vị kiến thức)
- yeuCauCanDat (Chi tiết yêu cầu cần đạt)
- soTiet (Số tiết dự kiến)
- tiLe (Tỉ lệ % điểm)
- soDiemCanDat (Số điểm)
- Trắc nghiệm:
  + nhieuLuaChon: { biet: số câu, hieu: số câu, vd: 0 }
  + dungSai: { biet: số câu, hieu: số câu, vd: 0 }
  + noiCot: { biet: số câu, hieu: số câu, vd: 0 }
  + dienKhuyet: { biet: số câu, hieu: số câu, vd: 0 }
- Tự luận:
  + tuLuan1: { biet: số câu, hieu: số câu, vd: số câu } (Thường Biết 0.5đ)
  + tuLuan2: { biet: số câu, hieu: số câu, vd: số câu } (Thường Hiểu 1.0đ)
  + tuLuan3: { biet: 0, hieu: 0, vd: số câu } (Vận dụng 1.0 - 2.0đ)
- tongSoCau (Tổng số câu/ý của dòng này)
- diemTungBai (Tổng điểm của dòng này)
- cauSo (Ví dụ: "Câu 1, 2" hoặc "Câu 5"...)

Trả về JSON:
{
  "matrixSummary": {
    "tnPercent": 60,
    "tlPercent": 40,
    "m1Percent": 50,
    "m2Percent": 30,
    "m3Percent": 20,
    "totalPoints": 10,
    "totalQuestions": 10
  },
  "specRows": [
    ...
  ]
}
Chỉ trả về JSON hợp lệ.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating specification:', error);
    res.status(500).json({ error: error.message || 'Lỗi khi tạo bản đặc tả' });
  }
});

// AI Generate 10 Exam Variants with Answers
app.post('/api/ai/generate-10-exams', async (req: Request, res: Response) => {
  try {
    const {
      grade,
      subject,
      semester,
      termName,
      schoolHeader,
      specRows,
      durationMinutes,
      totalQuestions = 10,
      readingPassageLengthNote,
    } = req.body;

    const isPrimaryLower = Number(grade) <= 3;
    const optionCount = isPrimaryLower ? 3 : 4;

    const prompt = `Bạn là Chuyên gia ra đề kiểm tra tiểu học hàng đầu Việt Nam, am hiểu GDPT 2018 bộ sách Kết nối tri thức với cuộc sống và Thông tư 27/2020/TT-BGDĐT.
Nhiệm vụ: Dựa trên bản đặc tả và yêu cầu sư phạm, hãy tạo ra 1 đề kiểm tra gốc CHUẨN MỰC và BỘ 10 MÃ ĐỀ (hoặc 10 đề thi khác nhau Đề 1 -> Đề 10) tương đương về độ khó, cùng bám sát bản đặc tả nhưng thay đổi số liệu, ngữ cảnh hoặc câu chữ để học sinh không chép bài được!

THÔNG TIN BÀI KIỂM TRA:
- Đơn vị: ${schoolHeader?.deptName || 'UBND XÃ XÍN MẦN'}
- Trường: ${schoolHeader?.schoolName || 'TRƯỜNG PTDTBT TH CHÍ CÀ'}
- Đề kiểm tra: ${termName || 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I'}
- Năm học: ${schoolHeader?.year || '2026 - 2027'}
- Môn: ${subject}
- Lớp: ${grade}
- Thời gian làm bài: ${durationMinutes || 40} phút

QUY TẮC TRÌNH BÀY BẮT BUỘC THEO QUY ĐỊNH CỦA GIÁO VIÊN:
1. Cấu trúc:
   - Thứ tự câu: Đánh số liên tục từ Câu 1 đến hết đề kiểm tra.
   - TUYỆT ĐỐI KHÔNG GHI tiêu đề "Phần trắc nghiệm", "Phần tự luận" trong đề kiểm tra!
   - Sắp xếp câu hỏi từ Trắc nghiệm đến Tự luận.
   - Trắc nghiệm: Xếp theo mức độ: Mức 1 (Biết) xếp trước -> Mức 2 (Hiểu) xếp sau:
     + Biết nhiều lựa chọn -> Biết đúng sai -> Biết nối cột -> Biết điền khuyết
     + Hiểu nhiều lựa chọn -> Hiểu đúng sai -> Hiểu nối cột -> Hiểu điền khuyết
   - Tự luận: Lần lượt từ Biết -> Hiểu -> Vận dụng (học sinh tư duy từ dễ đến khó).
   - KHÔNG ghép câu thuộc 2 chủ đề/bài học/mạch kiến thức với nhau.
   - KHÔNG TẠO CÂU TRẮC NGHIỆM Ở MỨC VẬN DỤNG! Chỉ câu tự luận mới có Mức 3 (Vận dụng).
2. Cách trình bày văn bản:
   - "Câu số" (chữ đậm), "điểm" (chữ nghiêng và không đậm) liền câu số, "câu hỏi" (chữ không đậm).
     Ví dụ chuẩn: "Câu 1 (0,5 điểm): CÂU HỎI ĐỂ CHỮ KHÔNG ĐẬM..."
   - Câu số và ý (a, b...) bằng lề - không tab.
   - Phương án (A, B, C, D) lùi vào 1 tab (1cm).
   - Số phương án trắc nghiệm:
     + Lớp 1, 2, 3: Gồm 3 phương án (A, B, C).
     + Lớp 4, 5: Gồm 4 phương án (A, B, C, D).
   - Điểm số:
     + TN nhiều lựa chọn: 0,5 đ / ý.
     + TN đúng sai, nối cột, điền khuyết: 0,25 đ / ý.
     + Tự luận Biết (M1): 0,5 đ / câu hoặc ý.
     + Tự luận Hiểu (M2): 1,0 đ / câu hoặc ý.
     + Tự luận Vận dụng (M3): 1,0 - 2,0 đ / câu hoặc ý.
3. Nếu là Môn Tiếng Việt:
   - Nếu có Đọc hiểu văn bản: TẠO MỘT BÀI ĐỌC NGOÀI CHƯƠNG TRÌNH HỌC (truyện, đoạn văn miêu tả hoặc thơ giàu ý nghĩa nhân văn, giáo dục tình cảm gia đình, quê hương, bảo vệ môi trường).
   - Độ dài văn bản theo đúng chuẩn: Lớp 1 (90-130 chữ), Lớp 2 (180-200 chữ), Lớp 3 (200-250 chữ), Lớp 4 (280-330 chữ), Lớp 5 (300-350 chữ).
   - Ghi rõ phần Đọc thầm và trả lời câu hỏi, sau đó là phần Viết (Nghe viết / Tập làm văn) nếu có.
4. Tạo BỘ 10 ĐỀ KHÁC NHAU:
   - Tạo đề gốc Đề 1 đầy đủ chi tiết với đáp án và biểu điểm chi tiết (Hướng dẫn chấm).
   - Và tạo thêm các biến thể Đề 2 đến Đề 10 (mỗi đề có danh sách các câu hỏi tương ứng đã thay đổi số liệu, đổi thứ tự câu/phương án hoặc câu hỏi tương đương, kèm đáp án tóm tắt).

Trả về định dạng JSON:
{
  "testHeader": {
    "deptName": "${schoolHeader?.deptName || 'UBND XÃ XÍN MẦN'}",
    "schoolName": "${schoolHeader?.schoolName || 'TRƯỜNG PTDTBT TH CHÍ CÀ'}",
    "title": "${termName || 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I'}",
    "academicYear": "${schoolHeader?.year || '2026 - 2027'}",
    "subject": "${subject}",
    "grade": "${grade}",
    "durationMinutes": ${durationMinutes || 40}
  },
  "readingPassage": {
    "title": "Tên bài đọc (nếu môn Tiếng Việt)",
    "author": "Tác giả",
    "content": "Nội dung bài đọc nếu có..."
  },
  "primaryExam": {
    "examCode": "Đề 01",
    "questions": [
      {
        "questionNumber": 1,
        "score": 0.5,
        "cognitiveLevel": "M1",
        "type": "Nhiều lựa chọn", // "Nhiều lựa chọn" | "Đúng - Sai" | "Nối cột" | "Điền khuyết" | "Tự luận"
        "content": "Nội dung câu hỏi (chữ thường, không đậm)",
        "options": ["A. ...", "B. ...", "C. ..."], // hoặc 4 phương án cho lớp 4-5
        "matchingPairs": [ {"left": "1...", "right": "a..."} ], // nếu là nối cột
        "trueFalseItems": [ {"statement": "...", "correct": true} ], // nếu là đúng sai
        "fillInTheBlank": "Nếu là điền khuyết...",
        "answer": "Phương án đúng hoặc lời giải chi tiết",
        "guide": "Hướng dẫn chấm và biểu điểm chi tiết"
      }
    ]
  },
  "allTenVariants": [
    {
      "examCode": "Đề 01",
      "questions": [ ... các câu hỏi như trên ... ]
    },
    {
      "examCode": "Đề 02",
      "questions": [ ... các câu hỏi tương đương ... ]
    },
    ... (cho đến Đề 10)
  ]
}
Chỉ xuất JSON, không bọc markdown. Đảm bảo JSON hợp lệ, đầy đủ 10 đề (hoặc ít nhất 5-10 đề phong phú).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating 10 exams:', error);
    res.status(500).json({ error: error.message || 'Lỗi khi tạo 10 đề kiểm tra' });
  }
});

// Vite middleware mounting in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
