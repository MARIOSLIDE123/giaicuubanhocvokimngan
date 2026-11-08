/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Settings, Volume2, 
  Shuffle, Award, RotateCcw, AlertTriangle, Check, BookOpen, Eye, Sparkles
} from 'lucide-react';
import { GameSettings, Team, QuestionSetMode } from '../types/game';
import { soundEngine } from '../utils/sound';
import { 
  STANDARD_STAGE_1_QUESTIONS, STANDARD_STAGE_2_QUESTIONS, STANDARD_STAGE_3_QUESTIONS,
  BACKUP_STAGE_1_QUESTIONS, BACKUP_STAGE_2_QUESTIONS, BACKUP_STAGE_3_QUESTIONS 
} from '../data/questions';

interface TeacherSettingsModalProps {
  settings: GameSettings;
  teams: Team[];
  onUpdateSettings: (newSettings: GameSettings) => void;
  onUpdateTeams: (newTeams: Team[]) => void;
  onResetGame: () => void;
  onClose: () => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  settings,
  teams,
  onUpdateSettings,
  onUpdateTeams,
  onResetGame,
  onClose,
}) => {
  const [localSettings, setLocalSettings] = useState<GameSettings>({ ...settings });
  const [localTeams, setLocalTeams] = useState<Team[]>([...teams]);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleSave = () => {
    soundEngine.playUnlock();
    soundEngine.setMuted(!localSettings.soundEnabled);
    soundEngine.setVolume(localSettings.soundVolume);
    onUpdateSettings(localSettings);
    onUpdateTeams(localTeams);
    onClose();
  };

  const handleScoreChange = (teamId: string, newScore: number) => {
    setLocalTeams(prev => prev.map(t => t.id === teamId ? { ...t, score: Math.max(0, newScore) } : t));
  };

  const previewQuestions =
    localSettings.questionSetMode === 'backup'
      ? [
          { stage: 1, list: BACKUP_STAGE_1_QUESTIONS, name: 'Chặng 1: Truy vết UFO (Dự phòng)' },
          { stage: 2, list: BACKUP_STAGE_2_QUESTIONS, name: 'Chặng 2: Đột nhập UFO (Dự phòng)' },
          { stage: 3, list: BACKUP_STAGE_3_QUESTIONS, name: 'Chặng 3: Giải cứu bạn học (Dự phòng)' },
        ]
      : [
          { stage: 1, list: STANDARD_STAGE_1_QUESTIONS, name: 'Chặng 1: Truy vết UFO (Theo Slide SGK)' },
          { stage: 2, list: STANDARD_STAGE_2_QUESTIONS, name: 'Chặng 2: Đột nhập UFO (Theo Slide SGK)' },
          { stage: 3, list: STANDARD_STAGE_3_QUESTIONS, name: 'Chặng 3: Giải cứu bạn học (Theo Slide SGK)' },
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[#071B49] border-2 border-[#1769D2] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#1769D2]/30 border border-[#27DFFF]/40 text-[#27DFFF]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CÀI ĐẶT DÀNH CHO GIÁO VIÊN</h2>
              <p className="text-xs text-slate-400">Chọn bộ câu hỏi, âm thanh và điều chỉnh điểm số lớp học</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-5 text-sm max-h-[60vh] overflow-y-auto pr-1">
          {/* Question Set Selection (Standard vs Backup) */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#27DFFF] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FFC83D]" />
                BỘ CÂU HỎI CHIẾN DỊCH (TOÁN 12 - BÀI 8)
              </h3>
              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="px-3 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước đề bài & đáp án</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label
                onClick={() => setLocalSettings(p => ({ ...p, questionSetMode: 'standard' }))}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  localSettings.questionSetMode === 'standard'
                    ? 'bg-blue-950/80 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-white text-xs sm:text-sm">BỘ CÂU HỎI GỐC</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-400/50">
                    Theo Slide SGK
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Sử dụng các bài tập chuẩn: Ví dụ 1 (a - b, 3a + 2b), Luyện tập 1 (u - 2v + w), Ví dụ 2 (M, G) và Luyện tập 2 (Điểm C).
                </p>
              </label>

              <label
                onClick={() => setLocalSettings(p => ({ ...p, questionSetMode: 'backup' }))}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  localSettings.questionSetMode === 'backup'
                    ? 'bg-purple-950/80 border-purple-400 shadow-[0_0_15px_rgba(217,70,239,0.25)] ring-1 ring-purple-400'
                    : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-white text-xs sm:text-sm">BỘ CÂU HỎI DỰ PHÒNG</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-400/50">
                    Luyện tập chơi lại
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Sử dụng bộ số liệu tương tự (p + q, 2p - q, 2p - q + r, M & G mới, Điểm C mới) giúp học sinh không chỉ học thuộc lòng đáp án.
                </p>
              </label>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#27DFFF] flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#FFC83D]" />
              ÂM THANH HIỆU ỨNG TRÒ CHƠI
            </h3>

            <div className="grid grid-cols-1 gap-4 pt-1">
              {/* Sound FX Toggle */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700 cursor-pointer">
                <span className="text-slate-200 font-medium">Bật / Tắt hiệu ứng âm thanh (nhạc nền, đúng/sai, phá khóa, chiến thắng)</span>
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => setLocalSettings(p => ({ ...p, soundEnabled: e.target.checked }))}
                  className="w-5 h-5 accent-[#27DFFF] rounded cursor-pointer"
                />
              </label>
            </div>

            {/* Volume slider */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Âm lượng hiệu ứng</span>
                <span className="font-mono">{Math.round(localSettings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={localSettings.soundVolume}
                onChange={(e) => setLocalSettings(p => ({ ...p, soundVolume: parseFloat(e.target.value) }))}
                className="w-full accent-[#27DFFF] cursor-pointer"
              />
            </div>
          </div>

          {/* Randomization */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#27DFFF] flex items-center gap-2">
              <Shuffle className="w-4 h-4 text-[#FFC83D]" />
              XÁO TRỘN CÂU HỎI
            </h3>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700 cursor-pointer">
              <span className="text-slate-200">Đảo thứ tự các câu hỏi trong Chặng 1</span>
              <input
                type="checkbox"
                checked={localSettings.shuffleQuestions}
                onChange={(e) => setLocalSettings(p => ({ ...p, shuffleQuestions: e.target.checked }))}
                className="w-5 h-5 accent-[#27DFFF] rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Quick Manual Score Adjustment for all teams */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#27DFFF] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFC83D]" />
              ĐIỀU CHỈNH ĐIỂM SỐ CÁC ĐỘI TRỰC TIẾP
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {localTeams.map((team) => (
                <div key={team.id} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700">
                  <div className="text-xs font-bold truncate mb-1.5" style={{ color: team.accentColor }}>
                    {team.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={team.score}
                      onChange={(e) => handleScoreChange(team.id, parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-center font-mono font-bold text-[#FFC83D]"
                    />
                    <span className="text-xs text-slate-400">đ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-700">
          <button
            onClick={() => setShowConfirmReset(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-800 border border-red-700 text-red-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET TOÀN BỘ GAME MỚI</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              HỦY BỎ
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs tracking-wider shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 text-slate-950" />
              <span>LƯU CÀI ĐẶT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Reset Dialog */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4">
          <div className="bg-slate-900 border border-red-500/60 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 flex items-center justify-center mx-auto border border-red-500/50">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Xác nhận đặt lại trò chơi?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Thao tác này sẽ đưa tất cả điểm số, tiến trình chặng và đội chơi về trạng thái ban đầu.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                HỦY
              </button>
              <button
                onClick={() => {
                  setShowConfirmReset(false);
                  onResetGame();
                  onClose();
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg"
              >
                ĐẶT LẠI NGAY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Questions & Answers Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#050e26] border-2 border-cyan-400 rounded-3xl max-w-3xl w-full p-6 text-left space-y-4 my-auto max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  XEM TRƯỚC ĐỀ BÀI & ĐÁP ÁN ({localSettings.questionSetMode === 'backup' ? 'BỘ DỰ PHÒNG' : 'BỘ GỐC'})
                </h3>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-200">
              {previewQuestions.map((group) => (
                <div key={group.stage} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-3">
                  <span className="font-black text-cyan-300 uppercase block tracking-wider">
                    {group.name} ({group.list.length} câu)
                  </span>
                  <div className="space-y-3">
                    {group.list.map((q) => (
                      <div key={q.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                        <div className="flex justify-between items-center text-amber-300 font-bold">
                          <span>{q.signalName}</span>
                          <span className="font-mono">+{q.points} điểm</span>
                        </div>
                        <p className="text-slate-300">{q.contextDesc}</p>
                        <p className="font-bold text-white">{q.questionText}</p>
                        <div className="p-2 rounded-lg bg-[#03152e] border border-cyan-500/30 text-cyan-200 font-mono">
                          {q.parts.map((p) => (
                            <div key={p.id} className="flex justify-between py-0.5">
                              <span>{p.label}</span>
                              <strong className="text-emerald-400">
                                ({p.expected.x}; {p.expected.y}; {p.expected.z})
                              </strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                ĐÓNG XEM TRƯỚC
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
