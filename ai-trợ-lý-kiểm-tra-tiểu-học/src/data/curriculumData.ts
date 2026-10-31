import { Grade, Subject, ExamTerm, LessonItem, SpecRow, ExamVariant, SchoolHeader } from '../types/curriculum';

export const DEFAULT_SCHOOL_HEADER: SchoolHeader = {
  deptName: 'UBND XÃ XÍN MẦN',
  schoolName: 'TRƯỜNG PTDTBT TH CHÍ CÀ',
  title: 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I',
  academicYear: '2026 - 2027',
  subject: 'Toán',
  grade: 4,
  durationMinutes: 40,
  teacherName: 'Giáo viên phụ trách khối',
};

// Database of lessons for "Bộ sách Kết nối tri thức với cuộc sống" (Lớp 1 - 5)
export const KNTT_LESSONS: Record<Subject, Record<Grade, Record<ExamTerm, LessonItem[]>>> = {
  Toán: {
    1: {
      'Giữa học kì I': [
        {
          id: 't1_g1_1',
          topic: 'Số và phép tính',
          lessonName: 'Bài 1: Các số 0, 1, 2, 3, 4, 5',
          periods: 4,
          coreKnowledge: 'Nhận biết, đếm, đọc, viết các số từ 0 đến 5. So sánh các số trong phạm vi 5.',
          requirements: 'Đếm, đọc, viết thành thạo số từ 0 đến 5. So sánh, sắp xếp thứ tự các số trong phạm vi 5.'
        },
        {
          id: 't1_g1_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Bài 3: Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật',
          periods: 3,
          coreKnowledge: 'Nhận dạng và gọi đúng tên các hình phẳng cơ bản thông qua trực quan và lưới ô vuông.',
          requirements: 'Nhận diện được hình vuông, hình tròn, hình tam giác, hình chữ nhật trong thực tế.'
        },
        {
          id: 't1_g1_3',
          topic: 'Số và phép tính',
          lessonName: 'Bài 4: Các số 6, 7, 8, 9, 10',
          periods: 4,
          coreKnowledge: 'Hình thành khái niệm số từ 6 đến 10, cấu tạo số, so sánh các số đến 10.',
          requirements: 'Đếm, lập số, so sánh các số trong phạm vi 10 bằng các dấu =, <, >.'
        },
        {
          id: 't1_g1_4',
          topic: 'Số và phép tính',
          lessonName: 'Bài 5: Phép cộng trong phạm vi 10 (làm quen với dấu +)',
          periods: 5,
          coreKnowledge: 'Ý nghĩa của phép cộng (gộp lại), bảng cộng trong phạm vi 6.',
          requirements: 'Thực hiện được phép cộng trong phạm vi 6, vận dụng giải quyết tình huống thực tế đơn giản.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 't1_c1_1',
          topic: 'Số và phép tính',
          lessonName: 'Phép cộng, phép trừ trong phạm vi 10',
          periods: 12,
          coreKnowledge: 'Bảng cộng, bảng trừ trong phạm vi 10, mối quan hệ giữa phép cộng và phép trừ.',
          requirements: 'Thực hiện thành thạo cộng trừ trong phạm vi 10. Tìm thành phần chưa biết qua sơ đồ trực quan.'
        },
        {
          id: 't1_c1_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Hình khối: Khối lập phương, khối hộp chữ nhật',
          periods: 4,
          coreKnowledge: 'Nhận biết hình dạng khối hộp chữ nhật, khối lập phương qua đồ vật thực tế.',
          requirements: 'Gọi đúng tên khối hộp chữ nhật, khối lập phương trong cuộc sống.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 't1_g2_1',
          topic: 'Số và phép tính',
          lessonName: 'Các số đến 20. Phép cộng, trừ không nhớ trong phạm vi 20',
          periods: 10,
          coreKnowledge: 'Cấu tạo số gồm chục và đơn vị. Kỹ năng tính toán cộng trừ trong phạm vi 20.',
          requirements: 'Đọc, viết, so sánh số đến 20; cộng trừ không nhớ trong phạm vi 20.'
        },
        {
          id: 't1_g2_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Đo độ dài (đo bằng gang tay, bước chân, que tính, xăng-ti-mét)',
          periods: 4,
          coreKnowledge: 'Đơn vị đo độ dài cm, thước kẻ có vạch chia xăng-ti-mét.',
          requirements: 'Biết dùng thước kẻ để đo và vẽ đoạn thẳng có độ dài cho trước (cm).'
        }
      ],
      'Cuối năm học': [
        {
          id: 't1_cn_1',
          topic: 'Số và phép tính',
          lessonName: 'Các số đến 100. Phép cộng, phép trừ trong phạm vi 100',
          periods: 18,
          coreKnowledge: 'Cấu tạo thập phân của số đến 100. Kỹ năng đặt tính rồi tính không nhớ.',
          requirements: 'Thực hiện thành thạo cộng trừ không nhớ các số có hai chữ số.'
        },
        {
          id: 't1_cn_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Thời gian, giờ đúng, xem lịch tuần lễ',
          periods: 5,
          coreKnowledge: 'Đồng hồ kim, đọc giờ đúng; các ngày trong tuần lễ.',
          requirements: 'Xem đồng hồ khi kim phút chỉ số 12; xác định hôm nay, hôm qua, ngày mai.'
        }
      ]
    },
    2: {
      'Giữa học kì I': [
        {
          id: 't2_g1_1',
          topic: 'Số và phép tính',
          lessonName: 'Bài 6: Phép cộng có nhớ trong phạm vi 100',
          periods: 8,
          coreKnowledge: 'Kỹ thuật cộng có nhớ (qua 10) trong phạm vi 20 và cộng có nhớ trong phạm vi 100.',
          requirements: 'Thực hiện đúng phép tính, giải bài toán về nhiều hơn, ít hơn một số đơn vị.'
        },
        {
          id: 't2_g1_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Bài 9: Đề-xi-mét, mét, ki-lô-gam, lít',
          periods: 6,
          coreKnowledge: 'Biểu tượng về đại lượng đo dm, m, kg, l. Thực hiện phép tính với số đo.',
          requirements: 'Chuyển đổi đơn vị đo đơn giản và tính toán thực tế.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 't2_c1_1',
          topic: 'Số và phép tính',
          lessonName: 'Phép trừ có nhớ trong phạm vi 100',
          periods: 10,
          coreKnowledge: 'Kỹ năng tính trừ có nhớ, bài toán có lời văn một bước tính.',
          requirements: 'Vận dụng tính trừ có nhớ giải toán liên quan đến bớt, còn lại.'
        },
        {
          id: 't2_c1_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Đường thẳng, đoạn thẳng, đường cong, ba điểm thẳng hàng',
          periods: 4,
          coreKnowledge: 'Nhận biết đoạn thẳng, đường thẳng, tính độ dài đường gấp khúc.',
          requirements: 'Tính được độ dài đường gấp khúc khi biết độ dài các đoạn thẳng.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 't2_g2_1',
          topic: 'Số và phép tính',
          lessonName: 'Bảng nhân 2, 5; Bảng chia 2, 5',
          periods: 12,
          coreKnowledge: 'Hình thành phép nhân, phép chia; thuộc bảng nhân 2, 5 và bảng chia 2, 5.',
          requirements: 'Áp dụng tính nhẩm bảng nhân, chia và giải toán thực tiễn.'
        },
        {
          id: 't2_g2_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Khối trụ, khối cầu; Thực hành lắp ghép hình',
          periods: 4,
          coreKnowledge: 'Nhận dạng khối trụ, khối cầu trong đời sống.',
          requirements: 'Phân biệt hình học không gian đơn giản.'
        }
      ],
      'Cuối năm học': [
        {
          id: 't2_cn_1',
          topic: 'Số và phép tính',
          lessonName: 'Các số đến 1000. Phép cộng, trừ trong phạm vi 1000',
          periods: 16,
          coreKnowledge: 'Đọc, viết số có ba chữ số; cấu tạo trăm, chục, đơn vị; cộng trừ có nhớ một lần.',
          requirements: 'Thực hiện đặt tính rồi tính thành thạo trong phạm vi 1000.'
        },
        {
          id: 't2_cn_2',
          topic: 'Một số yếu tố thống kê và xác suất',
          lessonName: 'Thu thập, phân loại, kiểm đếm số liệu và biểu đồ tranh',
          periods: 4,
          coreKnowledge: 'Biểu diễn dữ liệu bằng biểu đồ tranh đơn giản.',
          requirements: 'Đọc và rút ra nhận xét từ biểu đồ tranh.'
        }
      ]
    },
    3: {
      'Giữa học kì I': [
        {
          id: 't3_g1_1',
          topic: 'Số và phép tính',
          lessonName: 'Bảng nhân 3, 4, 6, 7, 8, 9 và Bảng chia 3, 4, 6, 7, 8, 9',
          periods: 14,
          coreKnowledge: 'Học thuộc và vận dụng các bảng nhân, chia từ 3 đến 9.',
          requirements: 'Tính nhẩm nhanh, tìm một trong các phần bằng nhau của một số (1/2, 1/3, 1/4...).'
        },
        {
          id: 't3_g1_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Góc vuông, góc không vuông; Điểm ở giữa, trung điểm của đoạn thẳng',
          periods: 6,
          coreKnowledge: 'Sử dụng ê-ke kiểm tra góc vuông; xác định trung điểm đoạn thẳng.',
          requirements: 'Nhận biết góc vuông bằng ê-ke, xác định trung điểm chính xác.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 't3_c1_1',
          topic: 'Số và phép tính',
          lessonName: 'Nhân, chia số có hai, ba chữ số với số có một chữ số',
          periods: 12,
          coreKnowledge: 'Thuật toán nhân, chia có nhớ và không nhớ.',
          requirements: 'Thực hiện đúng phép nhân chia, giải bài toán có hai bước tính.'
        },
        {
          id: 't3_c1_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Chu vi hình tam giác, tứ giác, hình chữ nhật, hình vuông',
          periods: 6,
          coreKnowledge: 'Quy tắc tính chu vi hình chữ nhật và chu vi hình vuông.',
          requirements: 'Áp dụng công thức tính chu vi giải các tình huống thực tế.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 't3_g2_1',
          topic: 'Số và phép tính',
          lessonName: 'Các số trong phạm vi 10000; Phép cộng, trừ trong phạm vi 10000',
          periods: 12,
          coreKnowledge: 'Hàng nghìn, so sánh số có 4 chữ số, phép tính cộng trừ có nhớ.',
          requirements: 'Thành thạo cộng trừ đến 10000, giải toán về gấp, giảm số lần.'
        },
        {
          id: 't3_g2_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Tháng - năm; Tiền Việt Nam',
          periods: 5,
          coreKnowledge: 'Số ngày trong từng tháng, nhận biết mệnh giá tiền xu và giấy bạc.',
          requirements: 'Đọc lịch năm, tính toán chi tiêu đơn giản.'
        }
      ],
      'Cuối năm học': [
        {
          id: 't3_cn_1',
          topic: 'Số và phép tính',
          lessonName: 'Các số trong phạm vi 100000. Phép cộng, trừ, nhân, chia đến 100000',
          periods: 16,
          coreKnowledge: 'Làm tròn số, tính nhẩm, tính viết trong phạm vi 100 000.',
          requirements: 'Giải thành thạo bài toán phối hợp nhiều phép tính có đến 3 bước.'
        },
        {
          id: 't3_cn_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Diện tích hình chữ nhật, diện tích hình vuông. Đơn vị cm²',
          periods: 6,
          coreKnowledge: 'Khái niệm diện tích, công thức S = a x b, S = a x a.',
          requirements: 'Tính chính xác diện tích mặt sàn, mảnh bìa, ô vuông.'
        }
      ]
    },
    4: {
      'Giữa học kì I': [
        {
          id: 't4_g1_1',
          topic: 'Số và phép tính',
          lessonName: 'Số có nhiều chữ số. Lớp triệu và lớp đơn vị, hàng',
          periods: 10,
          coreKnowledge: 'Đọc viết số đến lớp triệu, cấu tạo số, làm tròn số đến hàng trăm nghìn, hàng triệu.',
          requirements: 'Đọc viết thành thạo số lớn; xác định giá trị chữ số theo hàng và lớp.'
        },
        {
          id: 't4_g1_2',
          topic: 'Số và phép tính',
          lessonName: 'Dãy số tự nhiên. So sánh các số có nhiều chữ số',
          periods: 4,
          coreKnowledge: 'Tính chất dãy số tự nhiên, sắp xếp thứ tự từ bé đến lớn.',
          requirements: 'So sánh và xếp thứ tự chính xác các số có đến 9 chữ số.'
        },
        {
          id: 't4_g1_3',
          topic: 'Hình học và đo lường',
          lessonName: 'Góc nhọn, góc tù, góc bẹt. Hai đường thẳng vuông góc, song song',
          periods: 6,
          coreKnowledge: 'Phân loại các loại góc, nhận biết đường thẳng vuông góc và song song bằng thước kẻ và ê-ke.',
          requirements: 'Nhận biết, vẽ hai đường thẳng vuông góc, song song trên lưới ô vuông.'
        },
        {
          id: 't4_g1_4',
          topic: 'Hình học và đo lường',
          lessonName: 'Yến, tạ, tấn. Giây, thế kỉ',
          periods: 4,
          coreKnowledge: 'Bảng đơn vị đo khối lượng và thời gian thế kỉ.',
          requirements: 'Đổi đơn vị đo yến, tạ, tấn, xác định năm thuộc thế kỉ nào.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 't4_c1_1',
          topic: 'Số và phép tính',
          lessonName: 'Cộng, trừ các số có nhiều chữ số. Tính chất giao hoán và kết hợp',
          periods: 12,
          coreKnowledge: 'Kỹ thuật cộng trừ nhiều chữ số, tính bằng cách thuận tiện nhất.',
          requirements: 'Tính đúng, nhanh và áp dụng tính chất thuận tiện.'
        },
        {
          id: 't4_c1_2',
          topic: 'Số và phép tính',
          lessonName: 'Nhân, chia với số có một và hai chữ số',
          periods: 14,
          coreKnowledge: 'Phép nhân với số có chữ số tận cùng là 0; phép chia có dư.',
          requirements: 'Thực hiện phép tính nhân chia thành thạo, giải bài toán tìm số trung bình cộng, tìm hai số khi biết tổng và hiệu.'
        },
        {
          id: 't4_c1_3',
          topic: 'Hình học và đo lường',
          lessonName: 'Đề-xi-mét vuông, mét vuông, mi-li-mét vuông',
          periods: 6,
          coreKnowledge: 'Hệ thống đơn vị đo diện tích dm², m², mm².',
          requirements: 'Chuyển đổi số đo và tính diện tích hình kết hợp.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 't4_g2_1',
          topic: 'Số và phép tính',
          lessonName: 'Phân số. Phân số bằng nhau. Rút gọn và quy đồng mẫu số',
          periods: 12,
          coreKnowledge: 'Khái niệm phân số, tính chất cơ bản của phân số, rút gọn về phân số tối giản.',
          requirements: 'Nhận biết tử số, mẫu số; quy đồng mẫu số hai phân số chính xác.'
        },
        {
          id: 't4_g2_2',
          topic: 'Số và phép tính',
          lessonName: 'Phép cộng và phép trừ phân số',
          periods: 8,
          coreKnowledge: 'Cộng, trừ phân số cùng mẫu và khác mẫu số.',
          requirements: 'Thực hiện thành thạo các phép tính cộng trừ phân số.'
        },
        {
          id: 't4_g2_3',
          topic: 'Hình học và đo lường',
          lessonName: 'Hình bình hành, hình thoi',
          periods: 6,
          coreKnowledge: 'Đặc điểm cạnh, góc; công thức tính diện tích hình bình hành, hình thoi.',
          requirements: 'Tính diện tích hình bình hành, hình thoi khi biết các kích thước.'
        }
      ],
      'Cuối năm học': [
        {
          id: 't4_cn_1',
          topic: 'Số và phép tính',
          lessonName: 'Phép nhân, phép chia phân số. Tìm phân số của một số',
          periods: 14,
          coreKnowledge: 'Nhân hai phân số, chia hai phân số bằng cách nhân đảo ngược; tìm giá trị phân số của một đại lượng.',
          requirements: 'Giải bài toán tìm phân số của một số, tìm hai số khi biết tổng và tỉ số.'
        },
        {
          id: 't4_cn_2',
          topic: 'Một số yếu tố thống kê và xác suất',
          lessonName: 'Dãy số liệu thống kê. Biểu đồ cột',
          periods: 5,
          coreKnowledge: 'Thu thập, xử lý số liệu, vẽ và phân tích biểu đồ cột.',
          requirements: 'Đọc hiểu thông tin, trả lời các câu hỏi so sánh từ biểu đồ cột.'
        }
      ]
    },
    5: {
      'Giữa học kì I': [
        {
          id: 't5_g1_1',
          topic: 'Số và phép tính',
          lessonName: 'Ôn tập và bổ sung về phân số. Hỗn số',
          periods: 8,
          coreKnowledge: 'Chuyển đổi hỗn số thành phân số; so sánh hỗn số.',
          requirements: 'Chuyển đổi và tính toán thuần thục với hỗn số.'
        },
        {
          id: 't5_g1_2',
          topic: 'Số và phép tính',
          lessonName: 'Khái niệm số thập phân. Hàng của số thập phân. So sánh số thập phân',
          periods: 12,
          coreKnowledge: 'Cấu tạo số thập phân (phần nguyên, phần thập phân), giá trị theo vị trí, so sánh số thập phân.',
          requirements: 'Đọc, viết, phân tích cấu tạo và so sánh số thập phân thành thạo.'
        },
        {
          id: 't5_g1_3',
          topic: 'Hình học và đo lường',
          lessonName: 'Bảng đơn vị đo độ dài, khối lượng, diện tích (héc-ta - ha)',
          periods: 6,
          coreKnowledge: 'Mối quan hệ giữa các đơn vị đo, viết số đo dưới dạng số thập phân.',
          requirements: 'Đổi các số đo đại lượng dưới dạng số thập phân chính xác.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 't5_c1_1',
          topic: 'Số và phép tính',
          lessonName: 'Các phép tính với số thập phân (Cộng, trừ, nhân, chia)',
          periods: 18,
          coreKnowledge: 'Kỹ thuật cộng trừ nhân chia số thập phân, nhân chia nhẩm với 10, 100, 0.1, 0.01.',
          requirements: 'Thực hiện chính xác 4 phép tính với số thập phân, tìm x, tính bằng cách thuận tiện.'
        },
        {
          id: 't5_c1_2',
          topic: 'Số và phép tính',
          lessonName: 'Tỉ số phần trăm và giải toán về tỉ số phần trăm',
          periods: 8,
          coreKnowledge: '3 bài toán cơ bản về tỉ số phần trăm (tìm tỉ số %, tìm giá trị %, tìm số ban đầu).',
          requirements: 'Vận dụng giải các bài toán thực tế về tiền lãi, tỉ lệ phần trăm giảm giá.'
        },
        {
          id: 't5_c1_3',
          topic: 'Hình học và đo lường',
          lessonName: 'Hình tam giác, hình thang. Diện tích hình tam giác, hình thang',
          periods: 8,
          coreKnowledge: 'Công thức S = (a x h)/2 và S = [(a + b) x h]/2.',
          requirements: 'Tính diện tích hình tam giác, hình thang, giải bài toán chia mảnh ruộng/thửa đất.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 't5_g2_1',
          topic: 'Hình học và đo lường',
          lessonName: 'Hình tròn, chu vi và diện tích hình tròn',
          periods: 6,
          coreKnowledge: 'Hằng số pi (3,14), C = d x 3,14 = r x 2 x 3,14; S = r x r x 3,14.',
          requirements: 'Tính chu vi và diện tích hình tròn trong các tình huống thực tiễn.'
        },
        {
          id: 't5_g2_2',
          topic: 'Hình học và đo lường',
          lessonName: 'Hình hộp chữ nhật, hình lập phương. Diện tích xung quanh, diện tích toàn phần, thể tích',
          periods: 12,
          coreKnowledge: 'Công thức Sxq, Stp, Thể tích V = a x b x c, V = a x a x a, đơn vị m³, dm³, cm³.',
          requirements: 'Tính diện tích sơn hộp, bể nước, dung tích thể tích chứa nước.'
        },
        {
          id: 't5_g2_3',
          topic: 'Số và phép tính',
          lessonName: 'Cộng, trừ, nhân, chia số đo thời gian',
          periods: 6,
          coreKnowledge: 'Chuyển đổi giờ, phút, giây; thực hiện phép tính với số đo thời gian.',
          requirements: 'Tính khoảng thời gian, thời điểm bắt đầu và kết thúc một sự kiện.'
        }
      ],
      'Cuối năm học': [
        {
          id: 't5_cn_1',
          topic: 'Số và phép tính',
          lessonName: 'Toán chuyển động đều (vận tốc, quãng đường, thời gian)',
          periods: 12,
          coreKnowledge: 'Công thức v = s : t, s = v x t, t = s : v; chuyển động cùng chiều, ngược chiều.',
          requirements: 'Giải thành thạo các bài toán chuyển động đều hai xe gặp nhau, đuổi kịp nhau.'
        },
        {
          id: 't5_cn_2',
          topic: 'Một số yếu tố thống kê và xác suất',
          lessonName: 'Biểu đồ hình quạt tròn',
          periods: 4,
          coreKnowledge: 'Đọc và phân tích thông tin từ biểu đồ hình quạt tròn có số liệu tỉ số phần trăm.',
          requirements: 'Tính số lượng phần tử ứng với từng quạt tròn biểu diễn.'
        }
      ]
    }
  },
  'Tiếng Việt': {
    1: {
      'Giữa học kì I': [
        {
          id: 'tv1_g1_1',
          topic: 'Đọc hiểu',
          lessonName: 'Đọc vần, từ ngữ, câu ứng dụng (Chủ đề Em là học sinh)',
          periods: 14,
          coreKnowledge: 'Nhận biết âm, vần, quy tắc chính tả c/k, g/gh, ng/ngh.',
          requirements: 'Đọc đúng vần, ghép tiếng, đọc trơn câu ngắn 5-7 chữ có hình ảnh minh họa.'
        },
        {
          id: 'tv1_g1_2',
          topic: 'Viết',
          lessonName: 'Viết chữ cái, chữ ghi tiếng, chữ ghi từ ngữ',
          periods: 10,
          coreKnowledge: 'Tọa độ con chữ, độ cao, khoảng cách giữa các con chữ.',
          requirements: 'Viết đúng nét, đúng cỡ chữ trên dòng kẻ ô ly.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'tv1_c1_1',
          topic: 'Đọc hiểu',
          lessonName: 'Đọc văn bản ngắn (Truyện tranh, thơ ngắn 50-70 chữ)',
          periods: 16,
          coreKnowledge: 'Đọc hiểu chi tiết trong bài đọc ngoài chương trình (90-130 chữ).',
          requirements: 'Trả lời đúng các câu hỏi trắc nghiệm M1, M2 và câu tự luận M3 liên hệ bản thân.'
        },
        {
          id: 'tv1_c1_2',
          topic: 'Viết',
          lessonName: 'Chính tả: Nghe - viết đoạn văn ngắn',
          periods: 8,
          coreKnowledge: 'Chữ viết hoa đầu câu, dấu chấm kết câu.',
          requirements: 'Viết đúng chính tả đoạn văn 25-30 chữ không mắc quá 3 lỗi.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'tv1_g2_1',
          topic: 'Đọc hiểu',
          lessonName: 'Chủ đề Thiên nhiên tươi đẹp (Văn bản miêu tả hoa quả, con vật)',
          periods: 14,
          coreKnowledge: 'Từ ngữ chỉ màu sắc, hình dáng, âm thanh con vật.',
          requirements: 'Đọc diễn cảm, nhận biết thông tin then chốt trong đoạn văn 100 chữ.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'tv1_cn_1',
          topic: 'Đọc hiểu và Luyện viết',
          lessonName: 'Tổng hợp kỹ năng Đọc hiểu và Viết đoạn 2-3 câu',
          periods: 18,
          coreKnowledge: 'Đọc hiểu văn bản 120 chữ; viết câu trọn vẹn diễn đạt ý nghĩ cá nhân.',
          requirements: 'Đọc lưu loát 35-40 tiếng/phút; trả lời đúng ý văn bản.'
        }
      ]
    },
    2: {
      'Giữa học kì I': [
        {
          id: 'tv2_g1_1',
          topic: 'Đọc hiểu văn bản',
          lessonName: 'Chủ đề: Em lớn lên từng ngày (Văn bản truyện ngoài CT 180-200 chữ)',
          periods: 12,
          coreKnowledge: 'Chi tiết nhân vật, lời nói, hành động của nhân vật trong câu chuyện.',
          requirements: 'Xác định đúng nhân vật chính, thứ tự sự việc diễn ra.'
        },
        {
          id: 'tv2_g1_2',
          topic: 'Kiến thức tiếng Việt',
          lessonName: 'Từ chỉ sự vật, hoạt động, đặc điểm. Câu giới thiệu, câu nêu hoạt động',
          periods: 8,
          coreKnowledge: 'Nhận biết danh từ, động từ, tính từ đơn giản; mẫu câu Ai là gì? Ai làm gì?',
          requirements: 'Đặt câu đúng mẫu, dùng dấu chấm, dấu phẩy chính xác.'
        },
        {
          id: 'tv2_g1_3',
          topic: 'Viết',
          lessonName: 'Nghe viết chính tả (khoảng 50 chữ) & Viết đoạn văn kể việc làm tốt (3-4 câu)',
          periods: 8,
          coreKnowledge: 'Kỹ năng viết câu hoàn chỉnh, liên kết ý thành đoạn ngắn.',
          requirements: 'Viết đoạn văn 3-4 câu kể về một hoạt động hàng ngày của bản thân.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'tv2_c1_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Chủ đề: Ngôi nhà thứ hai (Trường lớp, bạn bè, thầy cô)',
          periods: 16,
          coreKnowledge: 'Từ ngữ chỉ tình cảm, cảm xúc; câu nêu đặc điểm (Ai thế nào?).',
          requirements: 'Đọc hiểu đoạn văn 180 chữ, chọn đúng câu hỏi TN và tự luận trả lời ngắn.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'tv2_g2_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Chủ đề: Vẻ đẹp bốn mùa (Văn bản thông tin 110-140 chữ)',
          periods: 14,
          coreKnowledge: 'Dấu câu (dấu chấm than, dấu chấm hỏi), từ ngữ về thời tiết, cây cối.',
          requirements: 'Nắm được các thông tin chỉ thời gian mùa vụ, đặc điểm hoa lá.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'tv2_cn_1',
          topic: 'Đọc hiểu & Viết',
          lessonName: 'Văn bản miêu tả con vật/đồ vật (150-180 chữ) & Viết đoạn văn 4-5 câu',
          periods: 18,
          coreKnowledge: 'Mở rộng vốn từ về quê hương, đất nước; kỹ năng viết đoạn miêu tả.',
          requirements: 'Đọc đạt 50-60 tiếng/phút; viết bài tập làm văn rõ ràng, có cảm xúc.'
        }
      ]
    },
    3: {
      'Giữa học kì I': [
        {
          id: 'tv3_g1_1',
          topic: 'Đọc hiểu văn bản',
          lessonName: 'Chủ đề: Những búp măng non (Truyện đọc ngoài CT 200-250 chữ)',
          periods: 12,
          coreKnowledge: 'Đọc hiểu nội dung cốt truyện, bài học rút ra từ câu chuyện.',
          requirements: 'Hiểu ý nghĩa hành động của nhân vật, suy nghĩ tình cảm của tác giả.'
        },
        {
          id: 'tv3_g1_2',
          topic: 'Kiến thức tiếng Việt',
          lessonName: 'Biện pháp tu từ So sánh (Hình ảnh so sánh, từ so sánh)',
          periods: 8,
          coreKnowledge: 'Mô hình so sánh: Sự vật 1 - Từ so sánh - Sự vật 2.',
          requirements: 'Tìm được hình ảnh so sánh trong câu thơ, câu văn; đặt câu có hình ảnh so sánh.'
        },
        {
          id: 'tv3_g1_3',
          topic: 'Viết',
          lessonName: 'Nghe viết chính tả (khoảng 65-70 chữ) & Viết đoạn văn nêu tình cảm, cảm xúc (5-7 câu)',
          periods: 8,
          coreKnowledge: 'Cấu trúc đoạn văn có câu mở đầu, câu phát triển ý và câu kết luận.',
          requirements: 'Bày tỏ tình cảm yêu mến với người thân hoặc bạn bè bằng lời văn tự nhiên.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'tv3_c1_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Văn bản miêu tả cảnh vật (180-200 chữ) & Mở rộng vốn từ Nhà trường, Quê hương',
          periods: 14,
          coreKnowledge: 'Dấu gạch ngang, dấu hai chấm; từ đồng nghĩa gần gũi.',
          requirements: 'Phân tích đúng tác dụng của dấu gạch ngang và dấu hai chấm.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'tv3_g2_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Biện pháp nhân hóa (Nhân hóa bằng cách gọi, bằng hành động, lời nói)',
          periods: 14,
          coreKnowledge: '3 cách nhân hóa đồ vật, con vật, cây cối.',
          requirements: 'Nhận diện các chi tiết nhân hóa trong đoạn thơ, đoạn văn.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'tv3_cn_1',
          topic: 'Đọc hiểu & Viết văn',
          lessonName: 'Văn bản thông tin khoa học (120-150 chữ) & Viết đoạn văn miêu tả đồ vật/cây cối',
          periods: 18,
          coreKnowledge: 'Thu thập thông tin chính xác, viết bài văn miêu tả có sử dụng so sánh, nhân hóa.',
          requirements: 'Đọc đạt 70-80 tiếng/phút; viết bài văn biểu cảm, sinh động.'
        }
      ]
    },
    4: {
      'Giữa học kì I': [
        {
          id: 'tv4_g1_1',
          topic: 'Đọc hiểu văn bản',
          lessonName: 'Chủ điểm Mỗi người một vẻ / Trải nghiệm và khám phá (Truyện đọc 280-330 chữ)',
          periods: 12,
          coreKnowledge: 'Văn bản ngoài SGK giàu tính giáo dục nhân cách; nhận biết chủ đề, thông điệp bài đọc.',
          requirements: 'Hiểu nội dung chính, phẩm chất nhân vật; trả lời 4 câu TN (2đ) và 2 câu TL (2đ).'
        },
        {
          id: 'tv4_g1_2',
          topic: 'Kiến thức tiếng Việt',
          lessonName: 'Danh từ, Động từ, Tính từ. Danh từ chung và Danh từ riêng',
          periods: 8,
          coreKnowledge: 'Quy tắc viết hoa danh từ riêng cơ quan, tổ chức, tên người, địa danh.',
          requirements: 'Xác định từ loại chính xác trong ngữ cảnh; tìm từ ngữ cùng nghĩa/trái nghĩa.'
        },
        {
          id: 'tv4_g1_3',
          topic: 'Kiến thức tiếng Việt',
          lessonName: 'Dấu câu: Dấu gạch ngang, Dấu ngoặc kép',
          periods: 6,
          coreKnowledge: 'Tác dụng đánh dấu lời nói trực tiếp, lời giải thích hoặc trích dẫn từ ngữ đặc biệt.',
          requirements: 'Sử dụng đúng dấu gạch ngang và dấu ngoặc kép trong bài tập và đoạn văn.'
        },
        {
          id: 'tv4_g1_4',
          topic: 'Viết',
          lessonName: 'Viết bài văn thuật lại một sự việc đã chứng kiến hoặc tham gia (10 điểm)',
          periods: 8,
          coreKnowledge: 'Bố cục bài văn 3 phần: Mở bài, Thân bài, Kết bài; trình tự thời gian diễn biến sự việc.',
          requirements: 'Thuật lại câu chuyện rõ ràng, có điểm nhấn cảm xúc và bài học bản thân.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'tv4_c1_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Văn bản miêu tả cây cối (200-250 chữ) & Câu chủ đề của đoạn văn',
          periods: 16,
          coreKnowledge: 'Vị trí và vai trò của câu mở đoạn; liên kết các câu trong đoạn văn.',
          requirements: 'Nhận diện câu chủ đề; viết câu triển khai ý mạch lạc.'
        },
        {
          id: 'tv4_c1_2',
          topic: 'Viết',
          lessonName: 'Viết bài văn miêu tả con vật / cây cối',
          periods: 8,
          coreKnowledge: 'Kỹ năng quan sát bằng nhiều giác quan, sử dụng hình ảnh so sánh, nhân hóa.',
          requirements: 'Bài văn trọn vẹn, tả bao quát và chi tiết các bộ phận nổi bật.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'tv4_g2_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Chủ ngữ và Vị ngữ trong câu đơn. Trạng ngữ chỉ thời gian, nơi chốn',
          periods: 14,
          coreKnowledge: 'Xác định thành phần nòng cốt của câu; nhận diện trạng ngữ đứng đầu câu ngăn cách bởi dấu phẩy.',
          requirements: 'Phân tích cấu trúc ngữ pháp câu chuẩn xác.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'tv4_cn_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Biện pháp điệp từ, điệp ngữ. Văn bản thông tin về di tích lịch sử (150-180 chữ)',
          periods: 16,
          coreKnowledge: 'Tác dụng nhấn mạnh cảm xúc, nhịp điệu của phép điệp từ.',
          requirements: 'Hiểu bài đọc thông tin, nắm bắt số liệu và thông điệp lịch sử văn hóa.'
        },
        {
          id: 'tv4_cn_2',
          topic: 'Viết',
          lessonName: 'Viết bài văn miêu tả con vật / đồ vật em yêu thích',
          periods: 8,
          coreKnowledge: 'Hoàn thiện các kỹ năng miêu tả, lồng ghép tình cảm tự nhiên.',
          requirements: 'Bài viết có lời văn trau chuốt, sáng tạo, đúng chuẩn ngữ pháp.'
        }
      ]
    },
    5: {
      'Giữa học kì I': [
        {
          id: 'tv5_g1_1',
          topic: 'Đọc hiểu văn bản',
          lessonName: 'Chủ điểm: Khung trời tuổi thơ / Hương sắc trăm miền (Truyện đọc ngoài CT 300-350 chữ)',
          periods: 12,
          coreKnowledge: 'Đọc hiểu văn bản ngoài chương trình; xác định tư tưởng, nghệ thuật miêu tả tâm lý nhân vật.',
          requirements: 'Đọc hiểu sâu sắc nội dung văn bản (4 TN = 2đ; 2 TL = 2đ).'
        },
        {
          id: 'tv5_g1_2',
          topic: 'Kiến thức tiếng Việt',
          lessonName: 'Từ đồng nghĩa, Từ trái nghĩa, Từ đồng âm, Từ nhiều nghĩa',
          periods: 8,
          coreKnowledge: 'Phân biệt nghĩa gốc và nghĩa chuyển của từ nhiều nghĩa; nhận diện từ đồng âm khác nghĩa hoàn toàn.',
          requirements: 'Phân loại chính xác các hiện tượng từ vựng tiếng Việt trong ngữ cảnh.'
        },
        {
          id: 'tv5_g1_3',
          topic: 'Kiến thức tiếng Việt',
          lessonName: 'Đại từ và Kết từ (Từ nối)',
          periods: 6,
          coreKnowledge: 'Chức năng thay thế của đại từ và vai trò liên kết câu, vế câu của kết từ (và, nhưng, vì... nên...).',
          requirements: 'Sử dụng từ nối thích hợp để liên kết các câu văn tạo đoạn văn chặt chẽ.'
        },
        {
          id: 'tv5_g1_4',
          topic: 'Viết',
          lessonName: 'Viết bài văn tả cảnh thiên nhiên (cảnh buổi sáng, cánh đồng, dòng sông, cơn mưa)',
          periods: 8,
          coreKnowledge: 'Quan sát theo trình tự thời gian hoặc không gian; chọn lọc chi tiết đặc trưng mang hơi thở cuộc sống.',
          requirements: 'Bài văn đủ 3 phần, giàu hình ảnh gợi cảm và biểu cảm chân thật (10 điểm).'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'tv5_c1_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Văn bản miêu tả cảnh đẹp đất nước (200-250 chữ) & Điệp từ, điệp ngữ',
          periods: 14,
          coreKnowledge: 'Tác dụng gợi cảm xúc và tạo nhịp điệu của biện pháp điệp.',
          requirements: 'Chỉ rõ từ ngữ điệp lại và nêu được tác dụng tu từ.'
        },
        {
          id: 'tv5_c1_2',
          topic: 'Viết',
          lessonName: 'Viết bài văn tả người (thầy cô giáo, ông bà, người bạn thân)',
          periods: 8,
          coreKnowledge: 'Tả ngoại hình kết hợp cử chỉ, lời nói, tính tình và kỷ niệm gắn bó.',
          requirements: 'Khắc họa nổi bật nét riêng của nhân vật, thể hiện tình cảm quý mến.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'tv5_g2_1',
          topic: 'Kiến thức tiếng Việt',
          lessonName: 'Câu ghép và các cách nối các vế câu ghép',
          periods: 14,
          coreKnowledge: 'Nối trực tiếp bằng dấu câu (phẩy, chấm phẩy, hai chấm) hoặc nối bằng cặp từ hô ứng, cặp quan hệ từ.',
          requirements: 'Phân tích các vế trong câu ghép, thêm cặp quan hệ từ tạo câu ghép hoàn chỉnh.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'tv5_cn_1',
          topic: 'Đọc hiểu & KTTV',
          lessonName: 'Liên kết câu bằng cách lặp từ ngữ, thay thế từ ngữ, dùng từ nối. Văn bản thông tin 230 chữ',
          periods: 16,
          coreKnowledge: '3 phép liên kết câu phổ biến: phép lặp, phép thế, phép nối.',
          requirements: 'Chỉ ra từ ngữ liên kết và giải thích được mối liên hệ mạch lạc.'
        },
        {
          id: 'tv5_cn_2',
          topic: 'Viết',
          lessonName: 'Viết bài văn tả cảnh hoặc viết bài văn thể hiện cảm xúc về một kỷ niệm thời tiểu học',
          periods: 8,
          coreKnowledge: 'Tổng hợp mọi kỹ năng diễn đạt, lập dàn ý và phát triển ý sáng tạo.',
          requirements: 'Viết bài văn giàu cảm xúc, văn phong trong sáng, giàu nhạc điệu.'
        }
      ]
    }
  },
  'Tin học': {
    1: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    2: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    3: {
      'Giữa học kì I': [
        {
          id: 'th3_g1_1',
          topic: 'Máy tính và em',
          lessonName: 'Bài 1: Thông tin và quyết định. Bài 2: Khám phá máy tính',
          periods: 4,
          coreKnowledge: 'Khái niệm thông tin, thu nhận thông tin qua giác quan; các bộ phận cơ bản của máy tính để bàn.',
          requirements: 'Nhận biết thân máy, màn hình, bàn phím, chuột; biết thao tác bật/tắt máy đúng quy trình.'
        },
        {
          id: 'th3_g1_2',
          topic: 'Máy tính và em',
          lessonName: 'Bài 3: Sử dụng chuột máy tính và bàn phím',
          periods: 4,
          coreKnowledge: 'Các thao tác cơ bản với chuột: nhấp chuột, nhấp đúp, kéo thả; khu vực hàng phím cơ sở.',
          requirements: 'Thực hiện thuần thục thao tác cầm chuột và gõ phím cơ bản đúng ngón tay.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'th3_c1_1',
          topic: 'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
          lessonName: 'Thư mục và tệp trên máy tính. Cây thư mục',
          periods: 8,
          coreKnowledge: 'Khái niệm thư mục (folder), tệp (file); cấu trúc phân cấp cây thư mục.',
          requirements: 'Tạo, đổi tên và sắp xếp các tệp dữ liệu vào thư mục một cách khoa học.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'th3_g2_1',
          topic: 'Ứng dụng tin học',
          lessonName: 'Em tập vẽ với phần mềm Paint',
          periods: 8,
          coreKnowledge: 'Công cụ vẽ nét thẳng, hình chữ nhật, hình tròn; đổ màu tô.',
          requirements: 'Vẽ được bức tranh ngôi nhà, cây cối đơn giản và lưu tệp hình ảnh vào ổ đĩa.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'th3_cn_1',
          topic: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
          lessonName: 'Làm quen với các bước thực hiện công việc (Thuật toán đơn giản)',
          periods: 8,
          coreKnowledge: 'Khái niệm bước thực hiện tuần tự; nhận biết lỗi và sửa chữa các bước.',
          requirements: 'Mô tả được các bước thực hiện một công việc thường ngày bằng sơ đồ hoặc lời.'
        }
      ]
    },
    4: {
      'Giữa học kì I': [
        {
          id: 'th4_g1_1',
          topic: 'Máy tính và em',
          lessonName: 'Phần cứng và phần mềm máy tính. Thiết bị vào - ra',
          periods: 4,
          coreKnowledge: 'Phân biệt thiết bị vào (bàn phím, chuột, micro) và thiết bị ra (màn hình, loa, máy in).',
          requirements: 'Phân loại đúng các thiết bị ngoại vi và hiểu mối liên hệ phần cứng - phần mềm.'
        },
        {
          id: 'th4_g1_2',
          topic: 'Mạng máy tính và Internet',
          lessonName: 'Tìm kiếm thông tin trên Internet. An toàn trên không gian mạng',
          periods: 4,
          coreKnowledge: 'Sử dụng từ khóa tìm kiếm trên Google; nguyên tắc bảo vệ thông tin cá nhân trên mạng.',
          requirements: 'Tìm được hình ảnh và thông tin học tập, nhận biết các nguy cơ rò rỉ dữ liệu cá nhân.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'th4_c1_1',
          topic: 'Ứng dụng tin học',
          lessonName: 'Soạn thảo văn bản cơ bản (Microsoft Word / Google Docs)',
          periods: 10,
          coreKnowledge: 'Gõ tiếng Việt kiểu Telex/Vni; định dạng phông chữ, cỡ chữ, màu sắc, căn lề.',
          requirements: 'Soạn thảo và trình bày được một bài thơ ngắn 2-3 khổ với định dạng chuẩn.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'th4_g2_1',
          topic: 'Ứng dụng tin học',
          lessonName: 'Chèn hình ảnh, bảng biểu trong văn bản',
          periods: 8,
          coreKnowledge: 'Chèn bảng số cột, số dòng; chèn ảnh minh họa và chỉnh kích thước phù hợp.',
          requirements: 'Thiết kế được thời khóa biểu hoặc danh sách lớp học có hình minh họa.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'th4_cn_1',
          topic: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
          lessonName: 'Lập trình trực quan với Scratch (Tạo chuyển động cho nhân vật)',
          periods: 10,
          coreKnowledge: 'Khối lệnh di chuyển, lặp lại, phát âm thanh; sân khấu và nhân vật.',
          requirements: 'Lập trình cho nhân vật mèo di chuyển và vẽ hình vuông trên sân khấu.'
        }
      ]
    },
    5: {
      'Giữa học kì I': [
        {
          id: 'th5_g1_1',
          topic: 'Máy tính và em',
          lessonName: 'Máy tính trong đời sống. Bản quyền nội dung số',
          periods: 4,
          coreKnowledge: 'Tác quyền của tác giả; tôn trọng bản quyền khi sử dụng tài liệu, hình ảnh trên mạng.',
          requirements: 'Biết trích dẫn nguồn gốc tài liệu khi sử dụng trong bài thuyết trình.'
        },
        {
          id: 'th5_g1_2',
          topic: 'Mạng máy tính và Internet',
          lessonName: 'Thu thập và tổ chức dữ liệu. Thư điện tử (Email)',
          periods: 4,
          coreKnowledge: 'Địa chỉ email, gửi nhận thư kèm tệp đính kèm; phép lịch sự khi gửi email.',
          requirements: 'Biết soạn và gửi một email có tiêu đề, nội dung và tệp văn bản đính kèm.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'th5_c1_1',
          topic: 'Ứng dụng tin học',
          lessonName: 'Thiết kế bài trình chiếu PowerPoint / Canva',
          periods: 10,
          coreKnowledge: 'Bố cục trang chiếu, chọn mẫu trang trí (theme), thêm hiệu ứng chuyển trang và hiệu ứng nhân vật.',
          requirements: 'Thiết kế bài thuyết trình 4-5 trang chiếu về chủ đề bảo vệ môi trường.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'th5_g2_1',
          topic: 'Ứng dụng tin học',
          lessonName: 'Làm quen với bảng tính điện tử (Excel / Sheets)',
          periods: 8,
          coreKnowledge: 'Hàng, cột, ô tính; nhập dữ liệu số và chữ; sử dụng hàm SUM, AVERAGE đơn giản.',
          requirements: 'Tính tổng điểm và điểm trung bình cho bảng điểm tổ học tập.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'th5_cn_1',
          topic: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
          lessonName: 'Lập trình Scratch nâng cao: Biến số và Cấu trúc rẽ nhánh (Nếu... thì...)',
          periods: 10,
          coreKnowledge: 'Khái niệm biến điểm số, câu lệnh điều kiện nếu va chạm thì đổi hướng.',
          requirements: 'Tạo được một trò chơi hứng bóng hoặc mê cung đơn giản có tính điểm.'
        }
      ]
    }
  },
  'Khoa học': {
    1: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    2: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    3: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    4: {
      'Giữa học kì I': [
        {
          id: 'kh4_g1_1',
          topic: 'Chất',
          lessonName: 'Nước và tính chất của nước. Vòng tuần hoàn của nước trong tự nhiên',
          periods: 6,
          coreKnowledge: 'Nước là chất lỏng không màu, không mùi, không vị; các thể của nước (rắn, lỏng, khí).',
          requirements: 'Giải thích sơ đồ vòng tuần hoàn của nước; nêu các cách tiết kiệm và bảo vệ nguồn nước sạch.'
        },
        {
          id: 'kh4_g1_2',
          topic: 'Chất',
          lessonName: 'Không khí có ở đâu? Tính chất và thành phần của không khí',
          periods: 6,
          coreKnowledge: 'Thành phần không khí gồm khí oxy, nitơ, cacbonic; không khí trong suốt, không mùi, có thể bị nén lại.',
          requirements: 'Làm thí nghiệm chứng minh không khí cần cho sự cháy và sự sống.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'kh4_c1_1',
          topic: 'Năng lượng',
          lessonName: 'Ánh sáng và sự truyền ánh sáng. Âm thanh trong cuộc sống',
          periods: 10,
          coreKnowledge: 'Vật phát sáng và vật được chiếu sáng; sự lan truyền âm thanh qua các môi trường rắn, lỏng, khí.',
          requirements: 'Giải thích hiện tượng tạo bóng tối; nêu các biện pháp phòng chống ô nhiễm tiếng ồn.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'kh4_g2_1',
          topic: 'Thực vật và động vật',
          lessonName: 'Sự trao đổi chất ở thực vật và động vật',
          periods: 8,
          coreKnowledge: 'Thực vật quang hợp hút khí cacbonic thải khí oxy; động vật lấy thức ăn nước uống và thải chất cặn bã.',
          requirements: 'Vẽ sơ đồ chuỗi thức ăn đơn giản trong tự nhiên.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'kh4_cn_1',
          topic: 'Con người và sức khỏe',
          lessonName: 'Các nhóm chất dinh dưỡng và chế độ ăn uống cân bằng',
          periods: 10,
          coreKnowledge: 'Nhóm chất bột đường, chất đạm, chất béo, vitamin và khoáng chất; phòng tránh bệnh do thừa/thiếu chất.',
          requirements: 'Xây dựng thực đơn bữa ăn gia đình đủ 4 nhóm chất.'
        }
      ]
    },
    5: {
      'Giữa học kì I': [
        {
          id: 'kh5_g1_1',
          topic: 'Chất',
          lessonName: 'Sự biến đổi của chất (Biến đổi vật lý và biến đổi hóa học)',
          periods: 8,
          coreKnowledge: 'Phân biệt sự biến đổi vật lý (chỉ thay đổi hình dạng, thể) và biến đổi hóa học (tạo ra chất mới).',
          requirements: 'Nhận biết hiện tượng gỉ sét, đốt cháy củi than là biến đổi hóa học qua các dấu hiệu quan sát.'
        },
        {
          id: 'kh5_g1_2',
          topic: 'Năng lượng',
          lessonName: 'Năng lượng mặt trời, năng lượng gió và năng lượng nước chảy',
          periods: 6,
          coreKnowledge: 'Nguồn năng lượng tái tạo và vai trò trong giảm phát thải khí nhà kính.',
          requirements: 'Kể tên các ứng dụng thực tế của pin mặt trời, tua bin gió tại địa phương.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'kh5_c1_1',
          topic: 'Năng lượng & Điện',
          lessonName: 'Sử dụng năng lượng điện an toàn và tiết kiệm',
          periods: 8,
          coreKnowledge: 'Mạch điện đơn giản; vật dẫn điện và vật cách điện; quy tắc an toàn điện trong gia đình.',
          requirements: 'Lắp ráp mạch điện thắp sáng bóng đèn pin; nêu các hành động sử dụng điện tiết kiệm.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'kh5_g2_1',
          topic: 'Thực vật và động vật',
          lessonName: 'Sự sinh sản của thực vật có hoa và động vật',
          periods: 10,
          coreKnowledge: 'Cơ quan sinh sản nhụy và nhị; thụ phấn, thụ tinh; động vật đẻ trứng và đẻ con.',
          requirements: 'Chỉ các bộ phận của hoa trên sơ đồ; phân loại động vật theo hình thức sinh sản.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'kh5_cn_1',
          topic: 'Môi trường và tài nguyên thiên nhiên',
          lessonName: 'Bảo vệ môi trường và đa dạng sinh học',
          periods: 10,
          coreKnowledge: 'Hậu quả của ô nhiễm môi trường đất, nước, không khí; các giải pháp phát triển bền vững.',
          requirements: 'Tuyên truyền và thực hiện hành động cụ thể giữ gìn vệ sinh trường lớp, không xả rác thải nhựa.'
        }
      ]
    }
  },
  'Lịch sử và Địa lí': {
    1: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    2: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    3: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    4: {
      'Giữa học kì I': [
        {
          id: 'ls4_g1_1',
          topic: 'Vùng Trung du và miền núi Bắc Bộ',
          lessonName: 'Thiên nhiên, con người và hoạt động sản xuất vùng Trung du và miền núi Bắc Bộ',
          periods: 8,
          coreKnowledge: 'Địa hình đồi núi hiểm trở, ruộng bậc thang; lễ hội Lồng tồng, chợ phiên vùng cao.',
          requirements: 'Xác định vị trí trên lược đồ; mô tả nét văn hóa truyền thống của đồng bào Tày, Nùng, Mông, Dao.'
        },
        {
          id: 'ls4_g1_2',
          topic: 'Lịch sử hào hùng',
          lessonName: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền',
          periods: 4,
          coreKnowledge: 'Kế sách cắm cọc nhọn trên sông Bạch Đằng đánh tan quân Nam Hán; ý nghĩa chấm dứt hơn 1000 năm Bắc thuộc.',
          requirements: 'Trình bày diễn biến chính của trận Bạch Đằng và công lao của Ngô Quyền.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'ls4_c1_1',
          topic: 'Vùng Đồng bằng Bắc Bộ',
          lessonName: 'Thiên nhiên và con người vùng Đồng bằng Bắc Bộ. Thăng Long - Hà Nội ngàn năm văn hiến',
          periods: 10,
          coreKnowledge: 'Đặc điểm đất phù sa màu mỡ sông Hồng; hệ thống đê điều; Văn Miếu - Quốc Tử Giám.',
          requirements: 'Giải thích tác dụng của hệ thống đê sông Hồng; tự hào về truyền thống hiếu học của dân tộc.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'ls4_g2_1',
          topic: 'Vùng Duyên hải miền Trung',
          lessonName: 'Vùng Duyên hải miền Trung. Cố đô Huế và Phố cổ Hội An',
          periods: 8,
          coreKnowledge: 'Khí hậu khắc nghiệt, bão lũ; tiềm năng đánh bắt và du lịch biển; di sản văn hóa thế giới.',
          requirements: 'Nêu các giá trị kiến trúc, văn hóa của quần thể di tích Cố đô Huế và Hội An.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'ls4_cn_1',
          topic: 'Vùng Nam Bộ và Biển đảo Việt Nam',
          lessonName: 'Vùng Nam Bộ trù phú. Biển, đảo Việt Nam và chủ quyền Hoàng Sa, Trường Sa',
          periods: 12,
          coreKnowledge: 'Đồng bằng sông Cửu Long vựa lúa lớn nhất nước; chợ nổi; chủ quyền thiêng liêng hai quần đảo Hoàng Sa và Trường Sa.',
          requirements: 'Khẳng định chủ quyền biển đảo của Việt Nam; trân trọng tài nguyên biển quê hương.'
        }
      ]
    },
    5: {
      'Giữa học kì I': [
        {
          id: 'ls5_g1_1',
          topic: 'Đất nước buổi đầu độc lập đến thời cận đại',
          lessonName: 'Triều Lý dời đô về Thăng Long. Kháng chiến chống quân xâm lược Tống',
          periods: 6,
          coreKnowledge: 'Chiếu dời đô của Lý Công Uẩn năm 1010; phòng tuyến sông Như Nguyệt và bài thơ thần Nam quốc sơn hà.',
          requirements: 'Hiểu tầm nhìn chiến lược của vua Lý Thái Tổ; trình bày ý nghĩa bài thơ thần.'
        },
        {
          id: 'ls5_g1_2',
          topic: 'Địa lý tự nhiên Việt Nam',
          lessonName: 'Vị trí địa lý, địa hình, khoáng sản và khí hậu Việt Nam',
          periods: 6,
          coreKnowledge: 'Hình chữ S, đường bờ biển dài 3260 km; 3/4 diện tích là đồi núi; khí hậu nhiệt đới gió mùa.',
          requirements: 'Chỉ ranh giới tiếp giáp của Việt Nam trên bản đồ địa lý tự nhiên.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'ls5_c1_1',
          topic: 'Ba lần kháng chiến chống quân Mông - Nguyên thời Trần',
          lessonName: 'Hào khí Đông A thời nhà Trần. Hội nghị Diên Hồng và Bình Than',
          periods: 8,
          coreKnowledge: 'Tinh thần toàn dân đánh giặc "Sát Thát", sự đoàn kết vua tôi nhà Trần, tài thao lược của Trần Hưng Đạo.',
          requirements: 'Nêu các tấm gương tiêu biểu: Trần Quốc Toản bóp nát quả cam, Trần Bình Trọng tuẫn tiết.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'ls5_g2_1',
          topic: 'Việt Nam từ năm 1858 đến Cách mạng tháng Tám 1945',
          lessonName: 'Phong trào Cần Vương. Bác Hồ ra đi tìm đường cứu nước năm 1911',
          periods: 8,
          coreKnowledge: 'Ý chí yêu nước của người thanh niên Nguyễn Tất Thành tại bến cảng Nhà Rồng; thành lập Đảng năm 1930.',
          requirements: 'Trình bày ý nghĩa lịch sử ngày Bác Hồ ra đi tìm đường cứu nước.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'ls5_cn_1',
          topic: 'Cách mạng tháng Tám và Chiến thắng Điện Biên Phủ',
          lessonName: 'Bản Tuyên ngôn Độc lập 2/9/1945. Chiến thắng Điện Biên Phủ "Lừng lẫy năm châu"',
          periods: 10,
          coreKnowledge: 'Ý nghĩa khai sinh nước VNDCCH; ý nghĩa chiến dịch Điện Biên Phủ 1954 chấm dứt ách đô hộ của thực dân Pháp.',
          requirements: 'Phân tích vì sao chiến thắng Điện Biên Phủ là mốc son chói lọi trong lịch sử dân tộc.'
        }
      ]
    }
  },
  'Công nghệ': {
    1: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    2: { 'Giữa học kì I': [], 'Cuối học kì I': [], 'Giữa học kì II': [], 'Cuối năm học': [] },
    3: {
      'Giữa học kì I': [
        {
          id: 'cn3_g1_1',
          topic: 'Công nghệ và đời sống',
          lessonName: 'Tự nhiên và công nghệ. Sử dụng đèn học, quạt điện an toàn',
          periods: 6,
          coreKnowledge: 'Phân biệt sản phẩm công nghệ với vật trong tự nhiên; thao tác bật, tắt, điều chỉnh độ sáng, cấp gió.',
          requirements: 'Thực hành sử dụng đèn học đúng khoảng cách, bảo vệ thị giác học đường.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'cn3_c1_1',
          topic: 'Thủ công kỹ thuật',
          lessonName: 'Làm đồ dùng học tập: Thước kẻ, ống cắm bút bằng bìa cứng',
          periods: 8,
          coreKnowledge: 'Kỹ thuật gấp, cắt, dán giấy thủ công chính xác theo kích thước.',
          requirements: 'Tạo ra sản phẩm ống cắm bút chắc chắn, thẩm mỹ từ vật liệu tái chế.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'cn3_g2_1',
          topic: 'Công nghệ và đời sống',
          lessonName: 'Sử dụng máy thu thanh (Radio), máy thu hình (Tivi)',
          periods: 6,
          coreKnowledge: 'Lựa chọn kênh truyền hình giáo dục; thời gian xem tivi hợp lý tránh mỏi mắt.',
          requirements: 'Điều khiển remote tivi chọn đúng kênh và mức âm lượng phù hợp.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'cn3_cn_1',
          topic: 'Thủ công kỹ thuật',
          lessonName: 'Làm đồ chơi dân gian (chong chóng, máy bay giấy)',
          periods: 8,
          coreKnowledge: 'Nguyên lý chuyển động nhờ sức gió của chong chóng.',
          requirements: 'Làm được chong chóng quay tít trong gió từ que gỗ và giấy màu.'
        }
      ]
    },
    4: {
      'Giữa học kì I': [
        {
          id: 'cn4_g1_1',
          topic: 'Công nghệ và đời sống',
          lessonName: 'Hoa và cây cảnh trong đời sống. Trồng hoa trong chậu',
          periods: 6,
          coreKnowledge: 'Lợi ích thanh lọc không khí của cây cảnh; kỹ thuật chuẩn bị giá thể đất và bón phân.',
          requirements: 'Thực hành trồng một cây hoa cảnh nhỏ vào chậu và tưới ẩm chăm sóc.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'cn4_c1_1',
          topic: 'Thủ công kỹ thuật',
          lessonName: 'Lắp ghép mô hình kỹ thuật: Mô hình cái đu, bập bênh',
          periods: 8,
          coreKnowledge: 'Các chi tiết thanh thẳng, thanh chữ U, ốc vít; cách vặn siết đai ốc bằng cờ-lê.',
          requirements: 'Lắp ráp mô hình chuyển động nhịp nhàng, đúng khớp nối.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'cn4_g2_1',
          topic: 'Công nghệ và đời sống',
          lessonName: 'Chăm sóc hoa và cây cảnh (bắt sâu, tỉa lá úa, tưới nước)',
          periods: 6,
          coreKnowledge: 'Kỹ thuật tưới phun sương nhẹ vào buổi sáng sớm hoặc chiều mát.',
          requirements: 'Biết bảo dưỡng cây xanh trong khuôn viên trường học.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'cn4_cn_1',
          topic: 'Thủ công kỹ thuật',
          lessonName: 'Lắp ghép mô hình xe đua có động cơ chạy bằng dây thun',
          periods: 8,
          coreKnowledge: 'Lực đàn hồi của dây thun tạo chuyển động quay cho trục bánh xe.',
          requirements: 'Xe chạy thẳng và đi được quãng đường trên 2 mét.'
        }
      ]
    },
    5: {
      'Giữa học kì I': [
        {
          id: 'cn5_g1_1',
          topic: 'Công nghệ và đời sống',
          lessonName: 'Thiết kế kỹ thuật: Từ ý tưởng đến bản vẽ phác thảo',
          periods: 6,
          coreKnowledge: 'Các bước thiết kế sản phẩm; vẽ phác thảo có ghi kích thước ước lượng.',
          requirements: 'Phác thảo ý tưởng một ngôi nhà thông minh hoặc đồ dùng tiện ích trên giấy.'
        }
      ],
      'Cuối học kì I': [
        {
          id: 'cn5_c1_1',
          topic: 'Thủ công kỹ thuật',
          lessonName: 'Lắp ghép mô hình robot hoặc cần cẩu sử dụng ròng rọc',
          periods: 8,
          coreKnowledge: 'Nguyên lý ròng rọc cố định và ròng rọc động giảm lực kéo.',
          requirements: 'Vận hành cần cẩu nâng hạ tải trọng nhỏ an toàn.'
        }
      ],
      'Giữa học kì II': [
        {
          id: 'cn5_g2_1',
          topic: 'Công nghệ và đời sống',
          lessonName: 'Nhà thông minh và thiết bị công nghệ hiện đại',
          periods: 6,
          coreKnowledge: 'Cảm biến chuyển động, đèn tự động bật tắt, rèm cửa thông minh.',
          requirements: 'Nêu lợi ích tiết kiệm điện năng và an toàn của hệ thống smarthome.'
        }
      ],
      'Cuối năm học': [
        {
          id: 'cn5_cn_1',
          topic: 'Thủ công kỹ thuật',
          lessonName: 'Lắp ghép mô hình thuyền buồm hoặc máy bay thám hiểm',
          periods: 8,
          coreKnowledge: 'Khí động học và cân bằng trọng lực vật thể.',
          requirements: 'Hoàn thiện sản phẩm tinh xảo, phối màu hài hòa.'
        }
      ]
    }
  }
};

// Preset standard 10-Question Math Specification for Grade 4 (Midterm 1)
export const INITIAL_SPEC_ROWS_MATH_G4: SpecRow[] = [
  {
    id: 'sp_1',
    tt: 1,
    machKienThuc: 'Số và phép tính',
    noiDung: 'Số có nhiều chữ số. Hàng và lớp. Giá trị theo hàng',
    yeuCauCanDat: 'Nhận biết số có nhiều chữ số, xác định đúng hàng và lớp, giá trị của chữ số trong một số.',
    soTiet: 8,
    tiLe: 25,
    soDiemCanDat: 2.5,
    nhieuLuaChon: { biet: 2, hieu: 1, vd: 0 },
    dungSai: { biet: 1, hieu: 0, vd: 0 },
    noiCot: { biet: 0, hieu: 0, vd: 0 },
    dienKhuyet: { biet: 1, hieu: 0, vd: 0 },
    tuLuan1: { biet: 1, hieu: 0, vd: 0 },
    tuLuan2: { biet: 0, hieu: 0, vd: 0 },
    tuLuan3: { biet: 0, hieu: 0, vd: 0 },
    tongSoCau: 4,
    diemTungBai: 2.5,
    cauSo: 'Câu 1, 2, 3, 7'
  },
  {
    id: 'sp_2',
    tt: 2,
    machKienThuc: 'Số và phép tính',
    noiDung: 'So sánh số. Làm tròn số đến hàng trăm nghìn. Phép tính',
    yeuCauCanDat: 'So sánh các số có nhiều chữ số; làm tròn số đến hàng trăm nghìn; đặt tính và tính đúng.',
    soTiet: 12,
    tiLe: 45,
    soDiemCanDat: 4.5,
    nhieuLuaChon: { biet: 1, hieu: 2, vd: 0 },
    dungSai: { biet: 0, hieu: 1, vd: 0 },
    noiCot: { biet: 0, hieu: 0, vd: 0 },
    dienKhuyet: { biet: 0, hieu: 0, vd: 0 },
    tuLuan1: { biet: 0, hieu: 0, vd: 0 },
    tuLuan2: { biet: 0, hieu: 1, vd: 0 },
    tuLuan3: { biet: 0, hieu: 0, vd: 1 },
    tongSoCau: 4,
    diemTungBai: 4.5,
    cauSo: 'Câu 4, 5, 8, 10'
  },
  {
    id: 'sp_3',
    tt: 3,
    machKienThuc: 'Đại lượng và hình học',
    noiDung: 'Góc nhọn, góc tù, góc bẹt. Hai đường thẳng vuông góc, song song',
    yeuCauCanDat: 'Nhận biết các loại góc; nhận biết và vẽ đường thẳng vuông góc, song song trên lưới ô vuông.',
    soTiet: 8,
    tiLe: 15,
    soDiemCanDat: 1.5,
    nhieuLuaChon: { biet: 1, hieu: 1, vd: 0 },
    dungSai: { biet: 0, hieu: 0, vd: 0 },
    noiCot: { biet: 0, hieu: 0, vd: 0 },
    dienKhuyet: { biet: 0, hieu: 0, vd: 0 },
    tuLuan1: { biet: 0, hieu: 0, vd: 0 },
    tuLuan2: { biet: 0, hieu: 0, vd: 0 },
    tuLuan3: { biet: 0, hieu: 0, vd: 0 },
    tongSoCau: 1,
    diemTungBai: 1.5,
    cauSo: 'Câu 6'
  },
  {
    id: 'sp_4',
    tt: 4,
    machKienThuc: 'Đại lượng và hình học',
    noiDung: 'Yến, tạ, tấn. Giây, thế kỉ',
    yeuCauCanDat: 'Chuyển đổi số đo khối lượng và thời gian; giải toán thực tế liên quan đến thế kỉ và tạ, tấn.',
    soTiet: 6,
    tiLe: 15,
    soDiemCanDat: 1.5,
    nhieuLuaChon: { biet: 0, hieu: 0, vd: 0 },
    dungSai: { biet: 0, hieu: 0, vd: 0 },
    noiCot: { biet: 0, hieu: 0, vd: 0 },
    dienKhuyet: { biet: 0, hieu: 0, vd: 0 },
    tuLuan1: { biet: 0, hieu: 0, vd: 0 },
    tuLuan2: { biet: 0, hieu: 1, vd: 0 },
    tuLuan3: { biet: 0, hieu: 0, vd: 0 },
    tongSoCau: 1,
    diemTungBai: 1.5,
    cauSo: 'Câu 9'
  }
];

// Seed sample 10 Exam Variants for instant loading
export function generateSeedExamVariants(subject: string, grade: Grade, term: string): ExamVariant[] {
  const isLower = grade <= 3;
  const letters = isLower ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];

  const variants: ExamVariant[] = [];

  for (let i = 1; i <= 10; i++) {
    const code = `Đề ${i < 10 ? '0' + i : i}`;
    const delta = (i - 1) * 2;

    const questions = [
      {
        id: `q_${code}_1`,
        questionNumber: 1,
        score: 0.5,
        cognitiveLevel: 'M1' as const,
        type: 'Nhiều lựa chọn' as const,
        topic: 'Số và phép tính',
        content: `Số gồm ${5 + (i % 3)} trăm nghìn, 8 chục nghìn, 4 trăm và 6 đơn vị được viết là:`,
        options: [
          `A. ${5 + (i % 3)}80 406`,
          `B. ${5 + (i % 3)}84 006`,
          `C. ${5 + (i % 3)}08 406`,
          ...(!isLower ? [`D. ${5 + (i % 3)}84 060`] : [])
        ],
        answer: `A. ${5 + (i % 3)}80 406`,
        guide: 'Khoanh đúng vào phương án A được 0,5 điểm.'
      },
      {
        id: `q_${code}_2`,
        questionNumber: 2,
        score: 0.5,
        cognitiveLevel: 'M1' as const,
        type: 'Nhiều lựa chọn' as const,
        topic: 'Số và phép tính',
        content: `Chữ số 7 trong số ${370000 + delta * 1000 + 452} thuộc hàng nào, lớp nào?`,
        options: [
          'A. Hàng chục nghìn, lớp nghìn',
          'B. Hàng trăm nghìn, lớp nghìn',
          'C. Hàng nghìn, lớp nghìn',
          ...(!isLower ? ['D. Hàng chục, lớp đơn vị'] : [])
        ],
        answer: 'A. Hàng chục nghìn, lớp nghìn',
        guide: 'Khoanh đúng phương án A được 0,5 điểm.'
      },
      {
        id: `q_${code}_3`,
        questionNumber: 3,
        score: 0.5,
        cognitiveLevel: 'M1' as const,
        type: 'Nhiều lựa chọn' as const,
        topic: 'Đại lượng và hình học',
        content: `Hình tam giác nào sau đây có một góc vuông?`,
        options: [
          'A. Tam giác có hai góc nhọn và một góc 90 độ',
          'B. Tam giác có ba góc nhọn',
          'C. Tam giác có một góc tù',
          ...(!isLower ? ['D. Tam giác có một góc bẹt'] : [])
        ],
        answer: 'A. Tam giác có hai góc nhọn và một góc 90 độ',
        guide: 'Khoanh đúng phương án A được 0,5 điểm.'
      },
      {
        id: `q_${code}_4`,
        questionNumber: 4,
        score: 0.5,
        cognitiveLevel: 'M1' as const,
        type: 'Đúng - Sai' as const,
        topic: 'Số và phép tính',
        content: `Điền Đ (Đúng) hoặc S (Sai) vào ô trống thích hợp:`,
        trueFalseItems: [
          { statement: `a) Năm 2026 thuộc thế kỉ XXI.`, correct: true },
          { statement: `b) ${3 + (i % 2)} tạ = ${30 + (i % 2) * 10} kg.`, correct: false }
        ],
        answer: 'a) Đ ; b) S',
        guide: 'Điền đúng mỗi ý được 0,25 điểm (tổng 0,5 điểm).'
      },
      {
        id: `q_${code}_5`,
        questionNumber: 5,
        score: 0.5,
        cognitiveLevel: 'M2' as const,
        type: 'Nhiều lựa chọn' as const,
        topic: 'Số và phép tính',
        content: `Làm tròn số ${458700 + delta * 100} đến hàng trăm nghìn ta được số:`,
        options: [
          'A. 500 000',
          'B. 400 000',
          'C. 460 000',
          ...(!isLower ? ['D. 450 000'] : [])
        ],
        answer: 'A. 500 000',
        guide: 'Khoanh đúng phương án A được 0,5 điểm.'
      },
      {
        id: `q_${code}_6`,
        questionNumber: 6,
        score: 0.5,
        cognitiveLevel: 'M2' as const,
        type: 'Điền khuyết' as const,
        topic: 'Đại lượng và hình học',
        content: `Điền số hoặc từ thích hợp vào chỗ chấm:`,
        fillInTheBlank: `Đoạn thẳng MN vuông góc với đoạn thẳng PQ tạo thành ... góc vuông.`,
        answer: '4',
        guide: 'Điền đúng từ/số được 0,5 điểm.'
      },
      {
        id: `q_${code}_7`,
        questionNumber: 7,
        score: 1.0,
        cognitiveLevel: 'M1' as const,
        type: 'Tự luận' as const,
        topic: 'Số và phép tính',
        content: `Đặt tính rồi tính:
a) ${124350 + delta * 120} + ${365420 - delta * 50}
b) ${987650 + delta * 100} - ${423120 + delta * 30}`,
        answer: `a) ${124350 + delta * 120 + (365420 - delta * 50)} ; b) ${987650 + delta * 100 - (423120 + delta * 30)}`,
        guide: 'Đặt tính thẳng cột và tính đúng kết quả mỗi phép tính được 0,5 điểm (tổng 1,0 điểm).'
      },
      {
        id: `q_${code}_8`,
        questionNumber: 8,
        score: 1.0,
        cognitiveLevel: 'M2' as const,
        type: 'Tự luận' as const,
        topic: 'Số và phép tính',
        content: `Tính bằng cách thuận tiện nhất:
${1350 + delta * 10} + ${4680} + ${650 - delta * 10} + ${320}`,
        answer: `= (${1350 + delta * 10} + ${650 - delta * 10}) + (4680 + 320) = 2000 + 5000 = 7000`,
        guide: 'Nhóm đúng các số tròn nghìn được 0,5 điểm; tính đúng kết quả cuối cùng được 0,5 điểm.'
      },
      {
        id: `q_${code}_9`,
        questionNumber: 9,
        score: 2.0,
        cognitiveLevel: 'M2' as const,
        type: 'Tự luận' as const,
        topic: 'Đại lượng và hình học',
        content: `Một cửa hàng ngày thứ nhất bán được ${250 + delta * 5} kg gạo. Ngày thứ hai bán được nhiều hơn ngày thứ nhất ${50} kg gạo. Hỏi cả hai ngày cửa hàng đó bán được bao nhiêu tạ gạo?`,
        answer: `Bài giải:
Ngày thứ hai cửa hàng bán được số ki-lô-gam gạo là:
${250 + delta * 5} + 50 = ${300 + delta * 5} (kg)
Cả hai ngày cửa hàng bán được số ki-lô-gam gạo là:
${250 + delta * 5} + ${300 + delta * 5} = ${550 + delta * 10} (kg)
Đổi ${550 + delta * 10} kg = ${(550 + delta * 10) / 100} tạ.
Đáp số: ${(550 + delta * 10) / 100} tạ gạo.`,
        guide: 'Tính đúng ngày thứ hai được 0,75đ; tính tổng 2 ngày được 0,75đ; đổi đúng đơn vị ra tạ và đáp số được 0,5đ.'
      },
      {
        id: `q_${code}_10`,
        questionNumber: 10,
        score: 1.5,
        cognitiveLevel: 'M3' as const,
        type: 'Tự luận' as const,
        topic: 'Số và phép tính',
        content: `Một thửa ruộng hình chữ nhật có chu vi là ${120 + delta * 4} m. Biết chiều dài hơn chiều rộng ${20} m. Tính diện tích của thửa ruộng đó.`,
        answer: `Bài giải:
Nửa chu vi thửa ruộng là:
${120 + delta * 4} : 2 = ${60 + delta * 2} (m)
Chiều dài thửa ruộng là:
(${60 + delta * 2} + 20) : 2 = ${(60 + delta * 2 + 20) / 2} (m)
Chiều rộng thửa ruộng là:
${(60 + delta * 2 + 20) / 2} - 20 = ${(60 + delta * 2 - 20) / 2} (m)
Diện tích thửa ruộng là:
${(60 + delta * 2 + 20) / 2} x ${(60 + delta * 2 - 20) / 2} = ${((60 + delta * 2 + 20) / 2) * ((60 + delta * 2 - 20) / 2)} (m²)
Đáp số: ${((60 + delta * 2 + 20) / 2) * ((60 + delta * 2 - 20) / 2)} m².`,
        guide: 'Tìm nửa chu vi được 0,25đ; tìm chiều dài 0,5đ; tìm chiều rộng 0,25đ; tính diện tích và đáp số đúng được 0,5đ.'
      }
    ];

    variants.push({
      examCode: code,
      questions
    });
  }

  return variants;
}
