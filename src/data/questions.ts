/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoordinateQuestion, QuestionSetMode } from '../types/game';

// ==========================================
// BỘ CÂU HỎI CHUẨN (GỐC THEO SGK VÀ BÀI TẬP BÀI 8 TOÁN 12)
// ==========================================

export const STANDARD_STAGE_1_QUESTIONS: CoordinateQuestion[] = [
  {
    id: 'std_s1_q1',
    stage: 1,
    taskNumber: 1,
    signalName: 'TÍN HIỆU 1 – VÍ DỤ 1 (Ý 1)',
    subtitle: 'Ví dụ 1 (SGK)',
    contextDesc: 'Trong không gian Oxyz, cho hai vectơ: a = (2; 1; 5), b = (2; 2; 1).',
    questionText: 'Tìm tọa độ của vectơ: a - b',
    difficulty: 'Nhận biết',
    defaultTimeSeconds: 180,
    points: 10,
    parts: [
      {
        id: 'std_s1_q1_p1',
        label: 'Tọa độ vectơ a - b:',
        expected: { x: 0, y: -1, z: 4 },
        points: 10,
        explanation: 'a - b = (2 - 2; 1 - 2; 5 - 1) = (0; -1; 4)',
      },
    ],
    hint: 'Sử dụng công thức hiệu hai vectơ: a - b = (x_a - x_b; y_a - y_b; z_a - z_b).',
    solution: `Vì a = (2; 1; 5) và b = (2; 2; 1) nên:
a - b = (2 - 2; 1 - 2; 5 - 1)
      = (0; -1; 4).
=> Kết quả: (0; -1; 4).`,
  },
  {
    id: 'std_s1_q2',
    stage: 1,
    taskNumber: 2,
    signalName: 'TÍN HIỆU 2 – VÍ DỤ 1 (Ý 2)',
    subtitle: 'Ví dụ 1 (SGK)',
    contextDesc: 'Vẫn sử dụng hai vectơ: a = (2; 1; 5), b = (2; 2; 1).',
    questionText: 'Tìm tọa độ của vectơ: 3a + 2b',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 180,
    points: 10,
    parts: [
      {
        id: 'std_s1_q2_p1',
        label: 'Tọa độ vectơ 3a + 2b:',
        expected: { x: 10, y: 7, z: 17 },
        points: 10,
        explanation: '3a = (6; 3; 15), 2b = (4; 4; 2) => 3a + 2b = (10; 7; 17)',
      },
    ],
    hint: 'Tính toạ độ của 3a = (3·2; 3·1; 3·5) và 2b = (2·2; 2·2; 2·1), sau đó cộng các toạ độ tương ứng.',
    solution: `Ta có:
3a = (3·2; 3·1; 3·5) = (6; 3; 15)
2b = (2·2; 2·2; 2·1) = (4; 4; 2)
Suy ra:
3a + 2b = (6 + 4; 3 + 4; 15 + 2)
        = (10; 7; 17).
=> Kết quả: (10; 7; 17).`,
  },
  {
    id: 'std_s1_q3',
    stage: 1,
    taskNumber: 3,
    signalName: 'TÍN HIỆU 3 – TỔ HỢP TƯƠNG TỰ',
    subtitle: 'Câu hỏi mới tương tự Ví dụ 1',
    contextDesc: 'Trong không gian Oxyz, cho: a = (1; -2; 3), b = (4; 1; -1).',
    questionText: 'Tìm tọa độ của vectơ: 2a - b',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 180,
    points: 10,
    parts: [
      {
        id: 'std_s1_q3_p1',
        label: 'Tọa độ vectơ 2a - b:',
        expected: { x: -2, y: -5, z: 7 },
        points: 10,
        explanation: '2a = (2; -4; 6) => 2a - b = (2-4; -4-1; 6-(-1)) = (-2; -5; 7)',
      },
    ],
    hint: 'Nhân hệ số 2 vào toạ độ a: 2a = (2·1; 2·(-2); 2·3) = (2; -4; 6), sau đó lấy toạ độ 2a trừ đi toạ độ b.',
    solution: `Ta có:
2a = (2·1; 2·(-2); 2·3) = (2; -4; 6)
Do đó:
2a - b = (2 - 4; -4 - 1; 6 - (-1))
       = (-2; -5; 7).
=> Kết quả: (-2; -5; 7).`,
  },
];

export const STANDARD_STAGE_2_QUESTIONS: CoordinateQuestion[] = [
  {
    id: 'std_s2_q1',
    stage: 2,
    taskNumber: 1,
    signalName: 'Ổ KHÓA 1 – PHÁ KHÓA BẢO MẬT BẬC 1',
    subtitle: 'Luyện tập 1 (SGK)',
    contextDesc: 'Trong không gian Oxyz, cho ba vectơ: u = (1; 8; 6), v = (-1; 3; -2), w = (0; 5; 4).',
    questionText: 'Tìm tọa độ của vectơ: u - 2v + w',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'std_s2_q1_p1',
        label: 'Tọa độ vectơ u - 2v + w:',
        expected: { x: 3, y: 7, z: 14 },
        points: 20,
        explanation: '-2v = (2; -6; 4) => u - 2v + w = (1 + 2 + 0; 8 - 6 + 5; 6 + 4 + 4) = (3; 7; 14)',
      },
    ],
    hint: 'Chú ý dấu trừ khi nhân toạ độ âm: -2v = (2; -6; 4), sau đó cộng với u và w.',
    solution: `Ta có:
-2v = (2; -6; 4)
Do đó:
u - 2v + w = (1 + 2 + 0; 8 - 6 + 5; 6 + 4 + 4)
           = (3; 7; 14).
=> Kết quả: (3; 7; 14).`,
  },
  {
    id: 'std_s2_q2',
    stage: 2,
    taskNumber: 2,
    signalName: 'Ổ KHÓA 2 – TỔ HỢP TUYẾN TÍNH 2a + b - c',
    subtitle: 'Bài 8: Phép toán vectơ',
    contextDesc: 'Trong không gian Oxyz, cho: a = (2; -1; 3), b = (1; 4; -2), c = (-3; 2; 1).',
    questionText: 'Tìm tọa độ của vectơ: 2a + b - c',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'std_s2_q2_p1',
        label: 'Tọa độ vectơ 2a + b - c:',
        expected: { x: 8, y: 0, z: 3 },
        points: 20,
        explanation: '2a = (4; -2; 6) => 2a + b - c = (4 + 1 - (-3); -2 + 4 - 2; 6 + (-2) - 1) = (8; 0; 3)',
      },
    ],
    hint: '2a = (4; -2; 6). Trừ đi c(-3; 2; 1) nghĩa là trừ đi số âm thành cộng: 4 + 1 - (-3) = 8.',
    solution: `Ta có:
2a = (4; -2; 6)
Do đó:
2a + b - c = (4 + 1 - (-3); -2 + 4 - 2; 6 + (-2) - 1)
           = (8; 0; 3).
=> Kết quả: (8; 0; 3).`,
  },
  {
    id: 'std_s2_q3',
    stage: 2,
    taskNumber: 3,
    signalName: 'Ổ KHÓA 3 – TỔ HỢP TUYẾN TÍNH p + 3q - 2r',
    subtitle: 'Bài 8: Phép toán vectơ',
    contextDesc: 'Trong không gian Oxyz, cho ba vectơ: p = (3; 0; -1), q = (-2; 5; 2), r = (1; -3; 4).',
    questionText: 'Tìm tọa độ của vectơ: p + 3q - 2r',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'std_s2_q3_p1',
        label: 'Tọa độ vectơ p + 3q - 2r:',
        expected: { x: -5, y: 21, z: -3 },
        points: 20,
        explanation: '3q = (-6; 15; 6), -2r = (-2; 6; -8) => (3 - 6 - 2; 0 + 15 + 6; -1 + 6 - 8) = (-5; 21; -3)',
      },
    ],
    hint: '3q = (-6; 15; 6) và 2r = (2; -6; 8). Khi đó p + 3q - 2r = (3 - 6 - 2; 0 + 15 - (-6); -1 + 6 - 8).',
    solution: `Ta có:
3q = (-6; 15; 6)
2r = (2; -6; 8)
Suy ra:
p + 3q - 2r = (3 - 6 - 2; 0 + 15 - (-6); -1 + 6 - 8)
            = (-5; 21; -3).
=> Kết quả: (-5; 21; -3).`,
  },
  {
    id: 'std_s2_q4',
    stage: 2,
    taskNumber: 4,
    signalName: 'Ổ KHÓA 4 – TỔ HỢP 3u - 2v + 4w',
    subtitle: 'Bài 8: Phép toán vectơ',
    contextDesc: 'Trong không gian Oxyz, cho: u = (4; -2; 1), v = (2; 3; -5), w = (-1; 1; 2).',
    questionText: 'Tìm tọa độ của vectơ: 3u - 2v + 4w',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'std_s2_q4_p1',
        label: 'Tọa độ vectơ 3u - 2v + 4w:',
        expected: { x: 4, y: -8, z: 21 },
        points: 20,
        explanation: '3u=(12;-6;3), -2v=(-4;-6;10), 4w=(-4;4;8) => (12-4-4; -6-6+4; 3+10+8) = (4; -8; 21)',
      },
    ],
    hint: '3u = (12; -6; 3), -2v = (-4; -6; 10), 4w = (-4; 4; 8). Cộng ba vectơ lại với nhau.',
    solution: `Ta có:
3u = (12; -6; 3)
-2v = (-4; -6; 10)
4w = (-4; 4; 8)
Do đó:
3u - 2v + 4w = (12 - 4 - 4; -6 - 6 + 4; 3 + 10 + 8)
             = (4; -8; 21).
=> Kết quả: (4; -8; 21).`,
  },
  {
    id: 'std_s2_q5',
    stage: 2,
    taskNumber: 5,
    signalName: 'Ổ KHÓA 5 – MỞ CÁNH CỬA BẢO MẬT CUỐI CÙNG',
    subtitle: 'Bài 8: Phá khóa trung tâm',
    contextDesc: 'Trong không gian Oxyz, cho: a = (-1; 4; 2), b = (3; -2; 5), c = (2; 1; -3).',
    questionText: 'Tìm tọa độ của vectơ: 4a + 2b - 3c',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'std_s2_q5_p1',
        label: 'Tọa độ vectơ 4a + 2b - 3c:',
        expected: { x: -4, y: 9, z: 27 },
        points: 20,
        explanation: '4a=(-4;16;8), 2b=(6;-4;10), -3c=(-6;-3;9) => (-4+6-6; 16-4-3; 8+10+9) = (-4; 9; 27)',
      },
    ],
    hint: '4a = (-4; 16; 8), 2b = (6; -4; 10), 3c = (6; 3; -9). Tính toạ độ từng trục x, y, z.',
    solution: `Ta có:
4a = (-4; 16; 8)
2b = (6; -4; 10)
3c = (6; 3; -9)
Suy ra:
4a + 2b - 3c = (-4 + 6 - 6; 16 - 4 - 3; 8 + 10 - (-9))
             = (-4; 9; 27).
=> Kết quả: (-4; 9; 27). Cửa bảo mật UFO đã mở hoàn toàn!`,
  },
];

export const STANDARD_STAGE_3_QUESTIONS: CoordinateQuestion[] = [
  {
    id: 'std_s3_q1',
    stage: 3,
    taskNumber: 1,
    signalName: 'MẬT MÃ 1 – XÁC ĐỊNH TRUNG ĐIỂM VÀ TRỌNG TÂM',
    subtitle: 'Ví dụ 2 (SGK)',
    contextDesc: 'Trong không gian Oxyz, cho ba điểm: A(1; 2; 3), B(3; 2; 1), C(2; -1; 5).',
    questionText: 'Tìm: a) Tọa độ trung điểm M của đoạn thẳng AB. b) Tọa độ trọng tâm G của tam giác ABC.',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 240,
    points: 20,
    parts: [
      {
        id: 'std_s3_q1_p1',
        label: 'a) Tọa độ trung điểm M của AB:',
        expected: { x: 2, y: 2, z: 2 },
        points: 10,
        explanation: 'M = ((1+3)/2; (2+2)/2; (3+1)/2) = (2; 2; 2)',
      },
      {
        id: 'std_s3_q1_p2',
        label: 'b) Tọa độ trọng tâm G của tam giác ABC:',
        expected: { x: 2, y: 1, z: 3 },
        points: 10,
        explanation: 'G = ((1+3+2)/3; (2+2-1)/3; (3+1+5)/3) = (2; 1; 3)',
      },
    ],
    hint: 'Trung điểm M lấy trung bình cộng 2 điểm A, B (chia 2). Trọng tâm G lấy trung bình cộng 3 điểm A, B, C (chia 3).',
    solution: `Vì M là trung điểm của đoạn thẳng AB nên toạ độ của điểm M là:
M = ((1 + 3)/2; (2 + 2)/2; (3 + 1)/2) = (2; 2; 2).
=> M(2; 2; 2).

Vì G là trọng tâm của tam giác ABC nên toạ độ của điểm G là:
G = ((1 + 3 + 2)/3; (2 + 2 + (-1))/3; (3 + 1 + 5)/3) = (6/3; 3/3; 9/3) = (2; 1; 3).
=> G(2; 1; 3).`,
  },
  {
    id: 'std_s3_q2',
    stage: 3,
    taskNumber: 2,
    signalName: 'MẬT MÃ 2 – XÁC ĐỊNH TỌA ĐỘ ĐIỂM C',
    subtitle: 'Luyện tập 2 (SGK)',
    contextDesc: 'Trong không gian Oxyz, cho: A(2; 9; -1), B(9; 4; 5) và điểm G(3; 0; 4).',
    questionText: 'Tìm tọa độ điểm C sao cho G là trọng tâm tam giác ABC.',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 240,
    points: 20,
    parts: [
      {
        id: 'std_s3_q2_p1',
        label: 'Tọa độ điểm C:',
        expected: { x: -2, y: -13, z: 8 },
        points: 20,
        explanation: 'x_C = 3·3 - 2 - 9 = -2; y_C = 3·0 - 9 - 4 = -13; z_C = 3·4 - (-1) - 5 = 8',
      },
    ],
    hint: 'Sử dụng công thức tọa độ trọng tâm: x_C = 3x_G - x_A - x_B; y_C = 3y_G - y_A - y_B; z_C = 3z_G - z_A - z_B.',
    solution: `Gọi C(x_C; y_C; z_C).
Theo công thức trọng tâm:
x_C = 3x_G - x_A - x_B = 3·3 - 2 - 9 = 9 - 11 = -2
y_C = 3y_G - y_A - y_B = 3·0 - 9 - 4 = 0 - 13 = -13
z_C = 3z_G - z_A - z_B = 3·4 - (-1) - 5 = 12 + 1 - 5 = 8
=> Kết quả: C(-2; -13; 8).`,
  },
  {
    id: 'std_s3_q3',
    stage: 3,
    taskNumber: 3,
    signalName: 'MẬT MÃ 3 – TỌA ĐỘ ĐỈNH HÌNH BÌNH HÀNH ABCD',
    subtitle: 'Giải cứu bạn học',
    contextDesc: 'Trong không gian Oxyz, cho ba điểm: A(1; -2; 3), B(3; 0; -1), C(2; 1; 4).',
    questionText: 'Tìm tọa độ điểm D sao cho tứ giác ABCD là hình bình hành (vectơ AB = vectơ DC).',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 240,
    points: 20,
    parts: [
      {
        id: 'std_s3_q3_p1',
        label: 'Tọa độ điểm D:',
        expected: { x: 0, y: -1, z: 8 },
        points: 20,
        explanation: 'AB = (2; 2; -4). DC = (2 - xD; 1 - yD; 4 - zD) = AB => xD = 0, yD = -1, zD = 8',
      },
    ],
    hint: 'Tứ giác ABCD là hình bình hành khi và chỉ khi vectơ AB = vectơ DC. Tính vectơ AB = (xB - xA; yB - yA; zB - zA), rồi cho bằng vectơ DC.',
    solution: `Ta có:
vectơ AB = (3 - 1; 0 - (-2); -1 - 3) = (2; 2; -4)
Gọi D(x_D; y_D; z_D). Khi đó vectơ DC = (2 - x_D; 1 - y_D; 4 - z_D).
Tứ giác ABCD là hình bình hành khi:
vectơ AB = vectơ DC
<=> 2 - x_D = 2  => x_D = 0
    1 - y_D = 2  => y_D = -1
    4 - z_D = -4 => z_D = 8
=> Kết quả: D(0; -1; 8).
Khoang cứu hộ đã giải mã thành công toàn bộ 3 mật mã! Hai bạn học sinh đã an toàn!`,
  },
];

// ==========================================
// BỘ CÂU HỎI TƯƠNG TỰ (DỰ PHÒNG LUYỆN TẬP)
// ==========================================

export const BACKUP_STAGE_1_QUESTIONS: CoordinateQuestion[] = [
  {
    id: 'bk_s1_q1',
    stage: 1,
    taskNumber: 1,
    signalName: 'TÍN HIỆU 1 (DỰ PHÒNG) – PHÉP CỘNG VECTOR',
    subtitle: 'Dự phòng Chặng 1',
    contextDesc: 'Trong không gian Oxyz, cho: p = (3; -1; 2), q = (1; 4; -2).',
    questionText: 'Tìm tọa độ của vectơ: p + q',
    difficulty: 'Nhận biết',
    defaultTimeSeconds: 180,
    points: 10,
    parts: [
      {
        id: 'bk_s1_q1_p1',
        label: 'Tọa độ vectơ p + q:',
        expected: { x: 4, y: 3, z: 0 },
        points: 10,
        explanation: 'p + q = (3 + 1; -1 + 4; 2 + (-2)) = (4; 3; 0)',
      },
    ],
    hint: 'Cộng từng thành phần tọa độ tương ứng: x_p + x_q; y_p + y_q; z_p + z_q.',
    solution: `Ta có:
p + q = (3 + 1; -1 + 4; 2 + (-2))
      = (4; 3; 0).
=> Kết quả: (4; 3; 0).`,
  },
  {
    id: 'bk_s1_q2',
    stage: 1,
    taskNumber: 2,
    signalName: 'TÍN HIỆU 2 (DỰ PHÒNG) – TỔ HỢP 2p - q',
    subtitle: 'Dự phòng Chặng 1',
    contextDesc: 'Trong không gian Oxyz, cho: p = (3; -1; 2), q = (1; 4; -2).',
    questionText: 'Tìm tọa độ của vectơ: 2p - q',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 180,
    points: 10,
    parts: [
      {
        id: 'bk_s1_q2_p1',
        label: 'Tọa độ vectơ 2p - q:',
        expected: { x: 5, y: -6, z: 6 },
        points: 10,
        explanation: '2p = (6; -2; 4) => 2p - q = (6-1; -2-4; 4-(-2)) = (5; -6; 6)',
      },
    ],
    hint: 'Tính 2p = (2·3; 2·(-1); 2·2) = (6; -2; 4), sau đó trừ toạ độ của q.',
    solution: `Ta có:
2p = (6; -2; 4)
Suy ra:
2p - q = (6 - 1; -2 - 4; 4 - (-2))
       = (5; -6; 6).
=> Kết quả: (5; -6; 6).`,
  },
  {
    id: 'bk_s1_q3',
    stage: 1,
    taskNumber: 3,
    signalName: 'TÍN HIỆU 3 (DỰ PHÒNG) – TỔ HỢP p - 2q',
    subtitle: 'Dự phòng Chặng 1',
    contextDesc: 'Trong không gian Oxyz, cho: p = (3; -1; 2), q = (1; 4; -2).',
    questionText: 'Tìm tọa độ của vectơ: p - 2q',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 180,
    points: 10,
    parts: [
      {
        id: 'bk_s1_q3_p1',
        label: 'Tọa độ vectơ p - 2q:',
        expected: { x: 1, y: -9, z: 6 },
        points: 10,
        explanation: '2q = (2; 8; -4) => p - 2q = (3-2; -1-8; 2-(-4)) = (1; -9; 6)',
      },
    ],
    hint: '2q = (2; 8; -4). Khi đó p - 2q = (3 - 2; -1 - 8; 2 - (-4)).',
    solution: `Ta có:
2q = (2; 8; -4)
Do đó:
p - 2q = (3 - 2; -1 - 8; 2 - (-4))
       = (1; -9; 6).
=> Kết quả: (1; -9; 6).`,
  },
];

export const BACKUP_STAGE_2_QUESTIONS: CoordinateQuestion[] = [
  {
    id: 'bk_s2_q1',
    stage: 2,
    taskNumber: 1,
    signalName: 'Ổ KHÓA 1 (DỰ PHÒNG) – TỔ HỢP 2p - q + r',
    subtitle: 'Dự phòng Chặng 2',
    contextDesc: 'Trong không gian Oxyz, cho: p = (2; -1; 3), q = (-1; 4; 2), r = (0; 3; -2).',
    questionText: 'Tìm tọa độ của vectơ: 2p - q + r',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'bk_s2_q1_p1',
        label: 'Tọa độ vectơ 2p - q + r:',
        expected: { x: 5, y: -3, z: 2 },
        points: 20,
        explanation: '2p = (4; -2; 6) => 2p - q + r = (4 - (-1) + 0; -2 - 4 + 3; 6 - 2 + (-2)) = (5; -3; 2)',
      },
    ],
    hint: 'Tính 2p = (4; -2; 6). Toạ độ x: 4 - (-1) + 0 = 5; toạ độ y: -2 - 4 + 3 = -3; toạ độ z: 6 - 2 - 2 = 2.',
    solution: `Ta có:
2p = (4; -2; 6)
Do đó:
2p - q + r = (4 - (-1) + 0; -2 - 4 + 3; 6 - 2 + (-2))
           = (4 + 1; -6 + 3; 4 - 2)
           = (5; -3; 2).
=> Kết quả: (5; -3; 2).`,
  },
  {
    id: 'bk_s2_q2',
    stage: 2,
    taskNumber: 2,
    signalName: 'Ổ KHÓA 2 (DỰ PHÒNG) – TỔ HỢP a + 2b - c',
    subtitle: 'Dự phòng Chặng 2',
    contextDesc: 'Trong không gian Oxyz, cho: a = (1; 2; -3), b = (-2; 1; 4), c = (3; -1; 2).',
    questionText: 'Tìm tọa độ của vectơ: a + 2b - c',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'bk_s2_q2_p1',
        label: 'Tọa độ vectơ a + 2b - c:',
        expected: { x: -6, y: 5, z: 3 },
        points: 20,
        explanation: '2b = (-4; 2; 8) => (1 - 4 - 3; 2 + 2 - (-1); -3 + 8 - 2) = (-6; 5; 3)',
      },
    ],
    hint: '2b = (-4; 2; 8). Khi đó toạ độ là (1 - 4 - 3; 2 + 2 + 1; -3 + 8 - 2).',
    solution: `Ta có:
2b = (-4; 2; 8)
Do đó:
a + 2b - c = (1 - 4 - 3; 2 + 2 - (-1); -3 + 8 - 2)
           = (-6; 5; 3).
=> Kết quả: (-6; 5; 3).`,
  },
  {
    id: 'bk_s2_q3',
    stage: 2,
    taskNumber: 3,
    signalName: 'Ổ KHÓA 3 (DỰ PHÒNG) – TỔ HỢP 3u - v + 2w',
    subtitle: 'Dự phòng Chặng 2',
    contextDesc: 'Trong không gian Oxyz, cho: u = (2; -3; 1), v = (1; 0; -2), w = (-1; 2; 3).',
    questionText: 'Tìm tọa độ của vectơ: 3u - v + 2w',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'bk_s2_q3_p1',
        label: 'Tọa độ vectơ 3u - v + 2w:',
        expected: { x: 3, y: -5, z: 11 },
        points: 20,
        explanation: '3u=(6;-9;3), 2w=(-2;4;6) => (6 - 1 - 2; -9 - 0 + 4; 3 - (-2) + 6) = (3; -5; 11)',
      },
    ],
    hint: '3u = (6; -9; 3), 2w = (-2; 4; 6). Cẩn thận với dấu của toạ độ z: 3 - (-2) + 6 = 11.',
    solution: `Ta có:
3u = (6; -9; 3)
2w = (-2; 4; 6)
Do đó:
3u - v + 2w = (6 - 1 - 2; -9 - 0 + 4; 3 - (-2) + 6)
            = (3; -5; 11).
=> Kết quả: (3; -5; 11).`,
  },
  {
    id: 'bk_s2_q4',
    stage: 2,
    taskNumber: 4,
    signalName: 'Ổ KHÓA 4 (DỰ PHÒNG) – TỔ HỢP 2p + 3q - r',
    subtitle: 'Dự phòng Chặng 2',
    contextDesc: 'Trong không gian Oxyz, cho: p = (0; 4; -1), q = (2; -1; 3), r = (-3; 2; 1).',
    questionText: 'Tìm tọa độ của vectơ: 2p + 3q - r',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'bk_s2_q4_p1',
        label: 'Tọa độ vectơ 2p + 3q - r:',
        expected: { x: 9, y: 3, z: 6 },
        points: 20,
        explanation: '2p=(0;8;-2), 3q=(6;-3;9) => (0 + 6 - (-3); 8 - 3 - 2; -2 + 9 - 1) = (9; 3; 6)',
      },
    ],
    hint: '2p = (0; 8; -2), 3q = (6; -3; 9). Trừ r(-3; 2; 1) => x = 0 + 6 - (-3) = 9.',
    solution: `Ta có:
2p = (0; 8; -2)
3q = (6; -3; 9)
Suy ra:
2p + 3q - r = (0 + 6 - (-3); 8 - 3 - 2; -2 + 9 - 1)
            = (9; 3; 6).
=> Kết quả: (9; 3; 6).`,
  },
  {
    id: 'bk_s2_q5',
    stage: 2,
    taskNumber: 5,
    signalName: 'Ổ KHÓA 5 (DỰ PHÒNG) – TỔ HỢP 2a - 3b + c',
    subtitle: 'Dự phòng Chặng 2',
    contextDesc: 'Trong không gian Oxyz, cho: a = (3; -2; 1), b = (-1; 3; 2), c = (2; -1; 4).',
    questionText: 'Tìm tọa độ của vectơ: 2a - 3b + c',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 150,
    points: 20,
    parts: [
      {
        id: 'bk_s2_q5_p1',
        label: 'Tọa độ vectơ 2a - 3b + c:',
        expected: { x: 11, y: -14, z: 0 },
        points: 20,
        explanation: '2a=(6;-4;2), -3b=(3;-9;-6) => (6 + 3 + 2; -4 - 9 - 1; 2 - 6 + 4) = (11; -14; 0)',
      },
    ],
    hint: '2a = (6; -4; 2), -3b = (3; -9; -6). Khi đó toạ độ là (6 + 3 + 2; -4 - 9 - 1; 2 - 6 + 4).',
    solution: `Ta có:
2a = (6; -4; 2)
-3b = (3; -9; -6)
Suy ra:
2a - 3b + c = (6 + 3 + 2; -4 - 9 - 1; 2 - 6 + 4)
            = (11; -14; 0).
=> Kết quả: (11; -14; 0).`,
  },
];

export const BACKUP_STAGE_3_QUESTIONS: CoordinateQuestion[] = [
  {
    id: 'bk_s3_q1',
    stage: 3,
    taskNumber: 1,
    signalName: 'MẬT MÃ 1 (DỰ PHÒNG) – TRUNG ĐIỂM VÀ TRỌNG TÂM',
    subtitle: 'Dự phòng Chặng 3',
    contextDesc: 'Trong không gian Oxyz, cho ba điểm: A(1; 2; 3), B(5; 4; 1), C(3; 0; 2).',
    questionText: 'Tìm: a) Tọa độ trung điểm M của đoạn thẳng AB. b) Tọa độ trọng tâm G của tam giác ABC.',
    difficulty: 'Thông hiểu',
    defaultTimeSeconds: 240,
    points: 20,
    parts: [
      {
        id: 'bk_s3_q1_p1',
        label: 'a) Tọa độ trung điểm M của AB:',
        expected: { x: 3, y: 3, z: 2 },
        points: 10,
        explanation: 'M = ((1+5)/2; (2+4)/2; (3+1)/2) = (3; 3; 2)',
      },
      {
        id: 'bk_s3_q1_p2',
        label: 'b) Tọa độ trọng tâm G của tam giác ABC:',
        expected: { x: 3, y: 2, z: 2 },
        points: 10,
        explanation: 'G = ((1+5+3)/3; (2+4+0)/3; (3+1+2)/3) = (3; 2; 2)',
      },
    ],
    hint: 'M = ((1+5)/2; (2+4)/2; (3+1)/2); G = ((1+5+3)/3; (2+4+0)/3; (3+1+2)/3).',
    solution: `Trung điểm M của AB:
M = ((1 + 5)/2; (2 + 4)/2; (3 + 1)/2) = (3; 3; 2).
=> M(3; 3; 2).

Trọng tâm G của tam giác ABC:
G = ((1 + 5 + 3)/3; (2 + 4 + 0)/3; (3 + 1 + 2)/3) = (9/3; 6/3; 6/3) = (3; 2; 2).
=> G(3; 2; 2).`,
  },
  {
    id: 'bk_s3_q2',
    stage: 3,
    taskNumber: 2,
    signalName: 'MẬT MÃ 2 (DỰ PHÒNG) – TÌM TỌA ĐỘ ĐIỂM C',
    subtitle: 'Dự phòng Chặng 3',
    contextDesc: 'Trong không gian Oxyz, cho: A(1; 2; 3), B(4; 1; 2) và trọng tâm G(3; 2; 4).',
    questionText: 'Tìm tọa độ điểm C sao cho G là trọng tâm tam giác ABC.',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 240,
    points: 20,
    parts: [
      {
        id: 'bk_s3_q2_p1',
        label: 'Tọa độ điểm C:',
        expected: { x: 4, y: 3, z: 7 },
        points: 20,
        explanation: 'C = 3G - A - B => x_C = 3·3 - 1 - 4 = 4; y_C = 3·2 - 2 - 1 = 3; z_C = 3·4 - 3 - 2 = 7',
      },
    ],
    hint: 'Sử dụng hệ thức: C = 3G - A - B.',
    solution: `Theo công thức tọa độ trọng tâm:
x_C = 3x_G - x_A - x_B = 3·3 - 1 - 4 = 9 - 5 = 4
y_C = 3y_G - y_A - y_B = 3·2 - 2 - 1 = 6 - 3 = 3
z_C = 3z_G - z_A - z_B = 3·4 - 3 - 2 = 12 - 5 = 7
=> Kết quả: C(4; 3; 7).`,
  },
  {
    id: 'bk_s3_q3',
    stage: 3,
    taskNumber: 3,
    signalName: 'MẬT MÃ 3 (DỰ PHÒNG) – TỌA ĐỘ ĐỈNH HÌNH BÌNH HÀNH',
    subtitle: 'Dự phòng Chặng 3',
    contextDesc: 'Trong không gian Oxyz, cho ba điểm: A(2; 1; -1), B(4; 3; 2), C(1; 5; 0).',
    questionText: 'Tìm tọa độ điểm D sao cho tứ giác ABCD là hình bình hành (vectơ AB = vectơ DC).',
    difficulty: 'Vận dụng',
    defaultTimeSeconds: 240,
    points: 20,
    parts: [
      {
        id: 'bk_s3_q3_p1',
        label: 'Tọa độ điểm D:',
        expected: { x: -1, y: 3, z: -3 },
        points: 20,
        explanation: 'AB = (2; 2; 3). DC = (1 - xD; 5 - yD; 0 - zD) = AB => xD = -1, yD = 3, zD = -3',
      },
    ],
    hint: 'vectơ AB = (4-2; 3-1; 2-(-1)) = (2; 2; 3). vectơ DC = (1-xD; 5-yD; 0-zD) = vectơ AB.',
    solution: `Ta có:
vectơ AB = (4 - 2; 3 - 1; 2 - (-1)) = (2; 2; 3)
Vì ABCD là hình bình hành nên:
vectơ DC = vectơ AB
<=> 1 - x_D = 2  => x_D = -1
    5 - y_D = 2  => y_D = 3
    0 - z_D = 3  => z_D = -3
=> Kết quả: D(-1; 3; -3).`,
  },
];

// Helper to retrieve questions based on active questionSetMode
export function getQuestionsForStage(stage: 1 | 2 | 3, mode: QuestionSetMode = 'standard'): CoordinateQuestion[] {
  if (mode === 'backup') {
    if (stage === 1) return BACKUP_STAGE_1_QUESTIONS;
    if (stage === 2) return BACKUP_STAGE_2_QUESTIONS;
    return BACKUP_STAGE_3_QUESTIONS;
  }
  if (stage === 1) return STANDARD_STAGE_1_QUESTIONS;
  if (stage === 2) return STANDARD_STAGE_2_QUESTIONS;
  return STANDARD_STAGE_3_QUESTIONS;
}
