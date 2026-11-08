/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  KeyRound, Unlock, Lock, HelpCircle, 
  Trophy, Sparkles, Check, ArrowRight, Eye, ShieldCheck, HeartHandshake
} from 'lucide-react';
import { Team, CoordinateQuestion, QuestionSetMode } from '../types/game';
import { getQuestionsForStage } from '../data/questions';
import { soundEngine } from '../utils/sound';
import { StageSidebar } from './StageSidebar';
import { UfoRescueIllustration } from './UfoRescueIllustration';
import { StageVideoModal } from './StageVideoModal';
import { CoordinateInputBox } from './CoordinateInputBox';

interface Stage3Props {
  teams: Team[];
  activeTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
  onAwardPoints: (teamId: string, pts: number) => void;
  onAdjustPoints: (teamId: string, delta: number) => void;
  onResetAllScores: () => void;
  onCompleteStage3: () => void;
  onBackToMap: () => void;
  questionSetMode?: QuestionSetMode;
}

export const Stage3Rescue: React.FC<Stage3Props> = ({
  teams,
  activeTeamId,
  onSelectTeam,
  onAwardPoints,
  onAdjustPoints,
  onResetAllScores,
  onCompleteStage3,
  onBackToMap,
  questionSetMode = 'standard',
}) => {
  const questionsList: CoordinateQuestion[] = useMemo(() => {
    return getQuestionsForStage(3, questionSetMode);
  }, [questionSetMode]);

  const [activeCodeIdx, setActiveCodeIdx] = useState(0);
  const [completedPartIds, setCompletedPartIds] = useState<string[]>([]);
  const [completedDetails, setCompletedDetails] = useState<{
    [partId: string]: { teamName: string; coords: string };
  }>({});
  const [isSolutionShown, setIsSolutionShown] = useState(false);
  const [isHintShown, setIsHintShown] = useState(false);
  const [isRescueCelebrationOpen, setIsRescueCelebrationOpen] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);

  const currentQ = questionsList[activeCodeIdx] || questionsList[0];

  // Background audio
  useEffect(() => {
    soundEngine.playStageBGM();
    return () => {
      soundEngine.pauseStageBGM();
    };
  }, []);

  // Reset hint/solution when changing question
  useEffect(() => {
    setIsSolutionShown(false);
    setIsHintShown(false);
  }, [activeCodeIdx]);

  // Lock 1 (Câu 5) is unlocked when both parts (M and G) are completed
  const isLock1Unlocked =
    completedPartIds.includes(questionsList[0]?.parts[0]?.id) &&
    completedPartIds.includes(questionsList[0]?.parts[1]?.id);

  // Lock 2 (Câu 6) is unlocked when part (C) is completed
  const isLock2Unlocked = completedPartIds.includes(questionsList[1]?.parts[0]?.id);

  const allRescued = isLock1Unlocked && isLock2Unlocked;

  const handlePartSuccess = (partId: string, coordsStr: string) => {
    const t = teams.find((team) => team.id === activeTeamId);
    setCompletedDetails((prev) => ({
      ...prev,
      [partId]: { teamName: t ? t.name : 'Đội', coords: coordsStr },
    }));

    if (!completedPartIds.includes(partId)) {
      const nextParts = [...completedPartIds, partId];
      setCompletedPartIds(nextParts);

      // Check if both locks completed
      const lock1Done =
        nextParts.includes(questionsList[0]?.parts[0]?.id) &&
        nextParts.includes(questionsList[0]?.parts[1]?.id);
      const lock2Done = nextParts.includes(questionsList[1]?.parts[0]?.id);

      if (lock1Done && lock2Done) {
        setIsRescueCelebrationOpen(true);
        soundEngine.playFanfare();
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4 },
        });
      } else {
        soundEngine.playUnlock();
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col justify-between p-3 sm:p-5 xl:p-6 w-full max-w-[1780px] mx-auto z-10">
      {/* Intro Briefing Modal */}
      {isIntroModalOpen && (
        <StageVideoModal
          stage={3}
          onClose={() => setIsIntroModalOpen(false)}
        />
      )}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch flex-1">
        {/* Left Mission Rescue Area (8 cols) */}
        <div className="xl:col-span-8 flex flex-col justify-between gap-4 panel-cosmic rounded-3xl p-4 sm:p-6 border border-amber-500/40 shadow-2xl">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-500/30">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
                <KeyRound className="w-4 h-4 text-amber-400 animate-spin" />
                <span>CHẶNG 3: GIẢI CỨU BẠN HỌC (11 PHÚT)</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-400/50 text-[10px] text-amber-300">
                  {allRescued ? '2/2 Ổ KHÓA ĐÃ MỞ' : isLock1Unlocked ? '1/2 Ổ KHÓA ĐÃ MỞ' : '0/2 Ổ KHÓA'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-1">
                {currentQ.signalName}
              </h2>
            </div>

            {/* 2 Task Tabs */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCodeIdx(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCodeIdx === 0
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_#f59e0b] scale-105'
                    : isLock1Unlocked
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-amber-400'
                }`}
              >
                {isLock1Unlocked ? <Unlock className="w-3.5 h-3.5 text-white" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Ổ Khóa 1 (Ví dụ 2)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCodeIdx(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeCodeIdx === 1
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_#f59e0b] scale-105'
                    : isLock2Unlocked
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-amber-400'
                }`}
              >
                {isLock2Unlocked ? <Unlock className="w-3.5 h-3.5 text-white" /> : <Lock className="w-3.5 h-3.5" />}
                <span>Ổ Khóa 2 (Luyện tập 2)</span>
              </button>
            </div>
          </div>

          {/* Center Content: Rescue Chamber Visual (4 cols) & Coordinate Problem (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1">
            {/* Rescue Chamber Visual (4 cols) */}
            <div className="lg:col-span-4 panel-cosmic rounded-2xl border border-amber-500/30 p-4 flex flex-col justify-between items-center text-center shadow-xl">
              <div className="w-full flex items-center justify-between text-xs text-slate-300 font-bold mb-2">
                <span className="text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  KHOANG CỨU HỘ UFO
                </span>
                <span className="bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 text-amber-300 font-mono text-xs">
                  {allRescued ? 'GIẢI CỨU THÀNH CÔNG' : 'CẦN MỞ 2 Ổ KHÓA'}
                </span>
              </div>

              {/* 3D UFO Trapped Students Illustration */}
              <div className="relative w-full max-w-[240px] my-auto flex items-center justify-center p-2">
                <UfoRescueIllustration
                  state={allRescued ? 'saved' : 'trapped'}
                  className="w-full h-auto drop-shadow-[0_15px_35px_rgba(245,158,11,0.4)] transition-all duration-700"
                />
              </div>

              {/* 2 Locks Progress Indicators */}
              <div className="w-full p-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-left text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Ổ khóa 1 (M & G):</span>
                  <span className={isLock1Unlocked ? 'text-emerald-400 font-black flex items-center gap-1' : 'text-amber-300 font-bold flex items-center gap-1'}>
                    {isLock1Unlocked ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                    {isLock1Unlocked ? 'ĐÃ MỞ' : 'Chờ giải mã M & G'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Ổ khóa 2 (Điểm C):</span>
                  <span className={isLock2Unlocked ? 'text-emerald-400 font-black flex items-center gap-1' : 'text-amber-300 font-bold flex items-center gap-1'}>
                    {isLock2Unlocked ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                    {isLock2Unlocked ? 'ĐÃ MỞ' : 'Chờ giải mã điểm C'}
                  </span>
                </div>
              </div>
            </div>

            {/* Coordinate Problem & Interactive Input (8 cols) */}
            <div className="lg:col-span-8 panel-cosmic rounded-2xl border border-amber-500/40 p-4 xl:p-5 flex flex-col justify-between shadow-xl space-y-4">
              <div className="space-y-3">
                {/* Badge & Context */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-amber-950 border border-amber-400/50 text-amber-300 font-black text-xs uppercase tracking-wider">
                    {currentQ.subtitle || `Ổ Khóa ${activeCodeIdx + 1} / 2`}
                  </span>
                  <span className="text-xs font-black font-mono text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3 py-1 rounded-lg">
                    +{currentQ.points} ĐIỂM TỔNG
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1.5">
                  <p className="text-xs text-amber-200 font-medium">
                    📌 {currentQ.contextDesc}
                  </p>
                  <h3 className="text-sm sm:text-base font-black text-white text-high-contrast">
                    {currentQ.questionText}
                  </h3>
                </div>

                {/* Coordinate Input Boxes (1 or 2 parts) */}
                <div className="space-y-3">
                  {currentQ.parts.map((part) => {
                    const isPartDone = completedPartIds.includes(part.id);
                    const detail = completedDetails[part.id];
                    return (
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
                        isCompleted={isPartDone}
                        completedInfo={detail}
                        onSuccess={() =>
                          handlePartSuccess(
                            part.id,
                            `(${part.expected.x}; ${part.expected.y}; ${part.expected.z})`
                          )
                        }
                      />
                    );
                  })}
                </div>

                {/* Hint Box */}
                {isHintShown && (
                  <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs sm:text-sm font-medium animate-fadeIn">
                    <strong className="text-amber-300 block mb-1">💡 GỢI Ý MỞ KHÓA KHOANG CỨU HỘ:</strong>
                    {currentQ.hint}
                  </div>
                )}

                {/* Solution Box */}
                {isSolutionShown && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-400/60 text-slate-100 text-xs sm:text-sm font-mono whitespace-pre-line leading-relaxed shadow-xl animate-fadeIn">
                    <strong className="text-amber-300 block mb-1.5 font-sans font-black uppercase">
                      📖 LỜI GIẢI CHI TIẾT DÀNH CHO GIÁO VIÊN:
                    </strong>
                    {currentQ.solution}
                  </div>
                )}
              </div>

              {/* Bottom Mission Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-500/30">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIsHintShown(!isHintShown);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
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
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{isSolutionShown ? 'Ẩn lời giải' : 'Hiện lời giải'}</span>
                  </button>
                </div>

                {/* Navigation and Completion Buttons */}
                <div className="flex items-center gap-2">
                  {activeCodeIdx === 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveCodeIdx(0);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>← Về Ổ Khóa 1 (Câu 5)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveCodeIdx(1);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer"
                    >
                      <span>Sang Ổ Khóa 2 (Câu 6)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playFanfare();
                      onCompleteStage3();
                    }}
                    className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                      allRescued
                        ? 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-slate-950 shadow-[0_0_35px_rgba(245,158,11,1)] animate-bounce'
                        : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>XEM BẢNG VINH DANH</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
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
            initialTimeSeconds={660} // 11 minutes
            onToggleShowSolution={() => setIsSolutionShown(!isSolutionShown)}
            isSolutionShown={isSolutionShown}
            onToggleShowHint={() => setIsHintShown(!isHintShown)}
            isHintShown={isHintShown}
            onBackToMap={onBackToMap}
            onNextQuestion={() => {
              if (activeCodeIdx < questionsList.length - 1) {
                setActiveCodeIdx(activeCodeIdx + 1);
              }
            }}
            showNextButton={activeCodeIdx < questionsList.length - 1}
            nextButtonLabel="Ổ khóa tiếp"
          />
        </div>
      </div>

      {/* Victory Celebration Modal when both locks are solved */}
      {isRescueCelebrationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-[#051133] border-2 border-amber-400 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-center space-y-6 shadow-[0_0_60px_rgba(245,158,11,0.6)]">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-[0_0_30px_#f59e0b] animate-bounce">
              <HeartHandshake className="w-10 h-10 text-slate-950" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-950 text-amber-300 border border-amber-400/50">
                🛸 CHIẾN DỊCH HOÀN TẤT XUẤT SẮC
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                HAI BẠN HỌC SINH ĐÃ ĐƯỢC GIẢI CỨU AN TOÀN!
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                Tất cả các ổ khóa mã hóa tọa độ không gian Oxyz của tàu UFO đã bị giải mã hoàn toàn. Các phi hành đoàn đã hoàn thành xuất sắc nhiệm vụ!
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsRescueCelebrationOpen(false);
                onCompleteStage3();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-base tracking-wider hover:brightness-110 shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5 text-slate-950" />
              <span>XEM BẢNG XẾP HẠNG VÀ TRAO THƯỞNG</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
