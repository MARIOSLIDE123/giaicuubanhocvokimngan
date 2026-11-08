/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Shield, Unlock, Lock, HelpCircle, 
  Sparkles, Check, ArrowRight, Eye, AlertTriangle, Key
} from 'lucide-react';
import { Team, CoordinateQuestion, QuestionSetMode } from '../types/game';
import { getQuestionsForStage } from '../data/questions';
import { soundEngine } from '../utils/sound';
import { StageSidebar } from './StageSidebar';
import { StageVideoModal } from './StageVideoModal';
import { CoordinateInputBox } from './CoordinateInputBox';

interface Stage2Props {
  teams: Team[];
  activeTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
  onAwardPoints: (teamId: string, pts: number) => void;
  onAdjustPoints: (teamId: string, delta: number) => void;
  onResetAllScores: () => void;
  onCompleteStage2: () => void;
  onBackToMap: () => void;
  questionSetMode?: QuestionSetMode;
}

export const Stage2Infiltration: React.FC<Stage2Props> = ({
  teams,
  activeTeamId,
  onSelectTeam,
  onAwardPoints,
  onAdjustPoints,
  onResetAllScores,
  onCompleteStage2,
  onBackToMap,
  questionSetMode = 'standard',
}) => {
  const questionsList: CoordinateQuestion[] = useMemo(() => {
    return getQuestionsForStage(2, questionSetMode);
  }, [questionSetMode]);

  const currentQ = questionsList[0];
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [completedDetail, setCompletedDetail] = useState<{ teamName: string; coords: string } | null>(null);
  const [isSolutionShown, setIsSolutionShown] = useState(false);
  const [isHintShown, setIsHintShown] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  // Background audio
  useEffect(() => {
    soundEngine.playStageBGM();
    return () => {
      soundEngine.pauseStageBGM();
    };
  }, []);

  const handleDoorBreachSuccess = (partId: string) => {
    const t = teams.find((team) => team.id === activeTeamId);
    const expected = currentQ.parts[0].expected;
    const coordsStr = `(${expected.x}; ${expected.y}; ${expected.z})`;

    setCompletedDetail({
      teamName: t ? t.name : 'Đội',
      coords: coordsStr,
    });
    setIsUnlocked(true);

    soundEngine.playUnlock();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col justify-between p-3 sm:p-5 xl:p-6 w-full max-w-[1780px] mx-auto z-10">
      {/* Intro Briefing Modal */}
      {isIntroModalOpen && (
        <StageVideoModal
          stage={2}
          onClose={() => setIsIntroModalOpen(false)}
        />
      )}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch flex-1">
        {/* Left Infiltration Vault Area (8 cols) */}
        <div className="xl:col-span-8 flex flex-col justify-between gap-4 panel-cosmic rounded-3xl p-4 sm:p-6 border border-purple-500/40 shadow-2xl">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-500/30">
            <div>
              <div className="flex items-center gap-2 text-purple-300 text-xs font-black uppercase tracking-wider">
                <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>CHẶNG 2: ĐỘT NHẬP TÀU UFO (12 PHÚT)</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-400/50 text-[10px] text-amber-300">
                  {isUnlocked ? '1/1 ĐÃ PHÁ KHÓA' : '0/1 ĐANG KHÓA'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-1">
                {currentQ.signalName}
              </h2>
            </div>

            {/* Lock Status Pill */}
            <div
              className={`px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 border transition-all ${
                isUnlocked
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                  : 'bg-red-950/80 border-red-500 text-red-300 shadow animate-pulse'
              }`}
            >
              {isUnlocked ? (
                <>
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span>CỬA BẢO MẬT ĐÃ MỞ</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>KHÓA BẢO MẬT ÁP SUẤT CAO</span>
                </>
              )}
            </div>
          </div>

          {/* Center Content: Vault Graphic (4 cols) & Coordinate Problem (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1">
            {/* UFO Cybernetic Security Door (4 cols) */}
            <div className="lg:col-span-4 panel-cosmic rounded-2xl border border-purple-500/30 p-4 flex flex-col justify-between items-center text-center shadow-xl">
              <div className="w-full flex items-center justify-between text-xs text-slate-300 font-bold mb-2">
                <span className="text-purple-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-purple-400" />
                  HỆ THỐNG CỬA UFO
                </span>
                <span className="bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 text-amber-300 font-mono text-xs">
                  {isUnlocked ? 'ĐÃ MỞ' : 'LỚP KHÓA 1/1'}
                </span>
              </div>

              {/* Armored Cyber Vault Visual */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 xl:w-60 xl:h-60 rounded-3xl border-4 border-purple-500/60 bg-[#09021a] overflow-hidden my-auto flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                {/* Vault Outer Rings */}
                <div className="absolute inset-2 rounded-2xl border border-purple-500/30 pointer-events-none" />
                <div className="absolute inset-6 rounded-xl border border-purple-400/20 pointer-events-none" />

                {/* Central Mechanism */}
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-700 ${
                    isUnlocked
                      ? 'border-emerald-400 bg-emerald-950/80 shadow-[0_0_35px_#10b981] scale-110'
                      : 'border-purple-400 bg-purple-950/60 shadow-[0_0_25px_#d946ef] animate-pulse'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Unlock className="w-12 h-12 text-emerald-400 animate-bounce" />
                      <span className="text-[10px] font-black text-emerald-300 mt-1 uppercase tracking-wider">
                        ĐÃ MỞ CỬA
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-12 h-12 text-purple-300" />
                      <span className="text-[10px] font-black text-amber-300 mt-1 uppercase tracking-wider">
                        ĐANG KHÓA
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Door Breach Status */}
              <div className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-left text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Áp suất khoang:</span>
                  <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-purple-300 font-mono font-bold'}>
                    {isUnlocked ? 'Cân bằng an toàn' : '1.450 PSI'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Khóa điện tử:</span>
                  <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-amber-300 font-bold'}>
                    {isUnlocked ? 'Vô hiệu hóa thành công' : 'Chờ giải mã vectơ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Coordinate Problem & Interactive Input (8 cols) */}
            <div className="lg:col-span-8 panel-cosmic rounded-2xl border border-purple-500/40 p-4 xl:p-5 flex flex-col justify-between shadow-xl space-y-4">
              <div className="space-y-3">
                {/* Badge & Context */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-purple-950 border border-purple-400/50 text-purple-300 font-black text-xs uppercase tracking-wider">
                    {currentQ.subtitle || 'Luyện tập 1 (SGK)'}
                  </span>
                  <span className="text-xs font-black font-mono text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3 py-1 rounded-lg">
                    +{currentQ.points} ĐIỂM
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1.5">
                  <p className="text-xs text-purple-200 font-medium">
                    📌 {currentQ.contextDesc}
                  </p>
                  <h3 className="text-sm sm:text-base font-black text-white text-high-contrast">
                    {currentQ.questionText}
                  </h3>
                </div>

                {/* Coordinate Input Box */}
                {currentQ.parts.map((part) => (
                  <CoordinateInputBox
                    key={part.id}
                    id={part.id}
                    label={part.label}
                    expected={part.expected}
                    points={part.points}
                    teams={teams}
                    activeTeamId={activeTeamId}
                    onSelectTeam={onSelectTeam}
                    onAwardPoints={onAwardPoints}
                    isCompleted={isUnlocked}
                    completedInfo={completedDetail || undefined}
                    onSuccess={() => handleDoorBreachSuccess(part.id)}
                  />
                ))}

                {/* Hint Box */}
                {isHintShown && (
                  <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs sm:text-sm font-medium animate-fadeIn">
                    <strong className="text-amber-300 block mb-1">💡 GỢI Ý PHÁ KHÓA:</strong>
                    {currentQ.hint}
                  </div>
                )}

                {/* Solution Box */}
                {isSolutionShown && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-purple-400/60 text-slate-100 text-xs sm:text-sm font-mono whitespace-pre-line leading-relaxed shadow-xl animate-fadeIn">
                    <strong className="text-purple-300 block mb-1.5 font-sans font-black uppercase">
                      📖 LỜI GIẢI CHI TIẾT DÀNH CHO GIÁO VIÊN:
                    </strong>
                    {currentQ.solution}
                  </div>
                )}
              </div>

              {/* Bottom Mission Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-500/30">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIsHintShown(!isHintShown);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{isHintShown ? 'Ẩn gợi ý' : 'Gợi ý'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIsSolutionShown(!isSolutionShown);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{isSolutionShown ? 'Ẩn lời giải' : 'Hiện lời giải'}</span>
                  </button>
                </div>

                {/* Advance to Stage 3 Button */}
                {isUnlocked && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playUnlock();
                      onCompleteStage2();
                    }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-sm tracking-wider shadow-[0_0_30px_rgba(217,70,239,0.8)] animate-pulse flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>TIẾN VÀO CHẶNG 3: GIẢI CỨU BẠN HỌC</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Stage Sidebar: Timer, Scoreboard & Adjustment (4 cols) */}
        <div className="xl:col-span-4 flex flex-col justify-between">
          <StageSidebar
            teams={teams}
            activeTeamId={activeTeamId}
            onSelectTeam={onSelectTeam}
            onAdjustPoints={onAdjustPoints}
            onResetAllScores={onResetAllScores}
            initialTimeSeconds={720} // 12 minutes
            onToggleShowSolution={() => setIsSolutionShown(!isSolutionShown)}
            isSolutionShown={isSolutionShown}
            onToggleShowHint={() => setIsHintShown(!isHintShown)}
            isHintShown={isHintShown}
            onBackToMap={onBackToMap}
          />
        </div>
      </div>
    </div>
  );
};
