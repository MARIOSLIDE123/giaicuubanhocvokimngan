/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, HelpCircle, BookOpen, Award, CheckCircle, Sparkles } from 'lucide-react';

interface HelpRulesModalProps {
  onClose: () => void;
}

export const HelpRulesModal: React.FC<HelpRulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[#071B49] border-2 border-[#27DFFF] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1769D2]/30 border border-[#27DFFF]/40 text-[#27DFFF]">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">HƯỚNG DẪN CHIẾN DỊCH GIẢI CỨU</h2>
              <p className="text-xs text-[#27DFFF]">UFO RESCUE MISSION · TOÁN 12 THPT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-sm text-slate-200">
          {/* Mission Story */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFC83D] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFC83D]" />
              1. CỐT TRUYỆN CHIẾN DỊCH
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hai bạn học sinh trường THPT bất ngờ bị một tàu du hành UFO kim loại bạc bắt giữ đưa vào không gian. Đội cứu hộ Trái Đất nhận lệnh khẩn cấp, vượt qua 3 chặng thử thách toán học cam go để giải cứu an toàn hai bạn trở về!
            </p>
          </div>

          {/* 3 Stages */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#27DFFF] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#27DFFF]" />
              2. BA CHẶNG HÀNH TRÌNH
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-[#27DFFF]/30 space-y-1">
                <span className="font-bold text-[#27DFFF] block">CHẶNG 1: TRUY VẾT TÀU UFO</span>
                <p className="text-slate-300">
                  ZORAX để lại 3 tín hiệu tọa độ. Các đội giải mã các biểu thức vectơ để xác định đường bay của UFO (9 phút).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-[#7139B9]/50 space-y-1">
                <span className="font-bold text-[#D946EF] block">CHẶNG 2: ĐỘT NHẬP UFO</span>
                <p className="text-slate-300">
                  Phá giải khóa bảo mật cánh cửa UFO bằng bài toán biểu thức tọa độ gồm ba vectơ (12 phút).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-[#FFC83D]/40 space-y-1">
                <span className="font-bold text-[#FFC83D] block">CHẶNG 3: GIẢI CỨU BẠN HỌC</span>
                <p className="text-slate-300">
                  Mở 2 ổ khóa khoang cứu hộ qua các bài toán tọa độ trung điểm, trọng tâm và tọa độ đỉnh C (11 phút).
                </p>
              </div>
            </div>
          </div>

          {/* Scoring system */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFC83D] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFC83D]" />
              3. CƠ CHẾ TÍNH ĐIỂM VÀ CƯỚP LƯỢT
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400">Chặng 1: Câu 1, 2, 3</div>
                <div className="text-base font-bold text-emerald-400 font-mono">+10 điểm / câu</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400">Chặng 2: Câu 4 (Phá khóa)</div>
                <div className="text-base font-bold text-emerald-400 font-mono">+20 điểm</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400">Chặng 3: Câu 5 (M & G)</div>
                <div className="text-base font-bold text-emerald-400 font-mono">+10 điểm / ý</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400">Chặng 3: Câu 6 (Điểm C)</div>
                <div className="text-base font-bold text-[#27DFFF] font-mono">+20 điểm</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400">Cướp lượt đúng (đội khác sai)</div>
                <div className="text-base font-bold text-[#FFC83D] font-mono">+5 điểm thưởng</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400">Trả lời sai</div>
                <div className="text-base font-bold text-slate-400 font-mono">0 điểm</div>
              </div>
            </div>
          </div>

          {/* Quick Math Summary */}
          <div className="p-4 rounded-2xl bg-[#071B49] border border-[#27DFFF]/40 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#27DFFF]">
              4. CẨM NANG TOÁN 12: BÀI 8: BIỂU THỨC TOẠ ĐỘ CỦA CÁC PHÉP TOÁN VECTOR
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside leading-relaxed">
              <li>
                <strong className="text-white">Cộng, trừ hai vectơ:</strong> Cho vectơ a = (x1; y1; z1), vectơ b = (x2; y2; z2):
                <br />
                • a + b = (x1 + x2; y1 + y2; z1 + z2)
                <br />
                • a - b = (x1 - x2; y1 - y2; z1 - z2)
              </li>
              <li>
                <strong className="text-white">Nhân vectơ với một số k:</strong>
                <br />
                • k·a = (k·x1; k·y1; k·z1)
              </li>
              <li>
                <strong className="text-white">Toạ độ vectơ qua hai điểm:</strong> Với A(xA; yA; zA) và B(xB; yB; zB):
                <br />
                • Vectơ AB = (xB - xA; yB - yA; zB - zA)
              </li>
              <li>
                <strong className="text-white">Toạ độ trung điểm M của đoạn thẳng AB:</strong>
                <br />
                • xM = (xA + xB) / 2; yM = (yA + yB) / 2; zM = (zA + zB) / 2
              </li>
              <li>
                <strong className="text-white">Toạ độ trọng tâm G của tam giác ABC:</strong>
                <br />
                • xG = (xA + xB + xC) / 3; yG = (yA + yB + yC) / 3; zG = (zA + zB + zC) / 3
              </li>
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1769D2] to-[#27DFFF] text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            ĐÃ HIỂU LUẬT CHƠI
          </button>
        </div>
      </div>
    </div>
  );
};
