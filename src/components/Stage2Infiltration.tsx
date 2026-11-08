/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Shield, Unlock, Lock, HelpCircle, 
  Sparkles, CheckCircle2, ArrowRight, Eye, Key, X, ChevronLeft, ChevronRight, Film
} from 'lucide-react';
import { Team, CoordinateQuestion, QuestionSetMode } from '../types/game';
import { getQuestionsForStage } from '../data/questions';
import { soundEngine } from '../utils/sound';
import { StageSidebar } from './StageSidebar';
import { CoordinateInputBox } from './CoordinateInputBox';
import { StageVideoModal } from './StageVideoModal';

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLockIds, setCompletedLockIds] = useState<string[]>([]);
  const [completedDetails, setCompletedDetails] = useState<{
    [partId: string]: { teamName: string; coords: string };
  }>({});
  const [isSolutionShown, setIsSolutionShown] = useState(false);
  const [isHintShown, setIsHintShown] = useState(false);
  const [isDoorOpenModal, setIsDoorOpenModal] = useState(false);

  const currentQ = questionsList[currentIndex] || questionsList[0];

  useEffect(() => {
    soundEngine.playStageBGM();
    return () => {
      soundEngine.pauseStageBGM();
    };
  }, []);

  useEffect(() => {
    setIsSolutionShown(false);
    setIsHintShown(false);
  }, [currentIndex]);

  const allLocksBreached = questionsList.every((q) => completedLockIds.includes(q.id));

  const handleDoorBreachSuccess = (partId: string) => {
    const t = teams.find((team) => team.id === activeTeamId);
    const expected = currentQ.parts[0].expected;
    const coordsStr = `(${expected.x}; ${expected.y}; ${expected.z})`;

    setCompletedDetails((prev) => ({
      ...prev,
      [partId]: { teamName: t ? t.name : 'Đội', coords: coordsStr },
    }));

    if (!completedLockIds.includes(currentQ.id)) {
      const nextCompleted = [...completedLockIds, currentQ.id];
      setCompletedLockIds(nextCompleted);

      if (nextCompleted.length === questionsList.length) {
        soundEngine.playFanfare();
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.45 },
        });
        setIsDoorOpenModal(true);
      } else {
        soundEngine.playUnlock();
      }
    }
  };

  return (
    <div className="relative h-[calc(100vh-58px)] max-h-[calc(100vh-58px)] flex flex-col justify-between p-2 sm:p-3 xl:p-4 w-full mx-auto z-10 overflow-hidden select-none">
      {/* Main 2-Column Full Widescreen 16:9 Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-stretch flex-1 min-h-0 overflow-hidden">
        {/* Left Mission Area: 9 cols */}
        <div className="xl:col-span-9 flex flex-col justify-between panel-cosmic rounded-2xl p-3 sm:p-4 border border-purple-500/40 shadow-2xl min-h-0 overflow-hidden">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-purple-500/30 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-purple-300 text-xs font-black uppercase tracking-wider">
                <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>CHẶNG 2: ĐỘT NHẬP TÀU UFO (12 PHÚT)</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-400/50 text-[11px] text-amber-300 font-mono">
                  {completedLockIds.length}/{questionsList.length} Ổ KHÓA ĐÃ PHÁ
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                {currentQ.signalName}
              </h2>
            </div>

            {/* 5 Lock Selector Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {questionsList.map((q, idx) => {
                const isDone = completedLockIds.includes(q.id);
                const isCur = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setCurrentIndex(idx);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCur
                        ? 'bg-purple-400 text-slate-950 shadow-[0_0_15px_#c084fc] scale-105'
                        : isDone
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-purple-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-purple-300" />
                    )}
                    <span>Khóa {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Content: Vault Graphic (3.5 cols) & Big Question (8.5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch flex-1 min-h-0 my-2 overflow-hidden">
            {/* UFO Cybernetic Security Door (3.5 cols) */}
            <div className="lg:col-span-4 2xl:col-span-3 panel-cosmic rounded-xl border border-purple-500/30 p-3 flex flex-col justify-between items-center text-center shadow-lg min-h-0">
              <div className="w-full flex items-center justify-between text-[11px] text-slate-300 font-bold">
                <span className="text-purple-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-purple-400" />
                  HỆ THỐNG 5 Ổ KHÓA
                </span>
                <span className="bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 text-amber-300 font-mono text-[11px]">
                  {completedLockIds.length}/5 Khóa
                </span>
              </div>

              {/* Central Mechanism with 5 Lock Indicators */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 xl:w-52 xl:h-52 rounded-full border-4 border-purple-500/60 bg-[#09021a] overflow-hidden my-auto flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.3)] shrink-0">
                {/* 5 Small Lock Status Lights arranged around the circle */}
                {questionsList.map((q, idx) => {
                  const angle = (idx * 360) / 5 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const radius = 64; // distance from center
                  const isDone = completedLockIds.includes(q.id);
                  const isCur = idx === currentIndex;
                  return (
                    <div
                      key={q.id}
                      style={{
                        transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)`,
                      }}
                      onClick={() => setCurrentIndex(idx)}
                      className={`absolute w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-black cursor-pointer transition-all shadow-md z-10 ${
                        isDone
                          ? 'bg-emerald-500 border-white text-slate-950 shadow-[0_0_15px_#10b981]'
                          : isCur
                            ? 'bg-purple-400 border-white text-slate-950 animate-ping shadow-[0_0_15px_#c084fc]'
                            : 'bg-slate-900 border-purple-400/60 text-purple-300'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}

                {/* Central Core Lock */}
                <div
                  className={`w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-700 z-0 ${
                    allLocksBreached
                      ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_35px_#10b981] scale-110'
                      : 'border-purple-400 bg-purple-950/70 shadow-[0_0_20px_#d946ef]'
                  }`}
                >
                  {allLocksBreached ? (
                    <>
                      <Unlock className="w-8 h-8 text-emerald-400 animate-bounce" />
                      <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wider">
                        ĐÃ MỞ
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-8 h-8 text-purple-300" />
                      <span className="text-[9px] font-black text-amber-300 uppercase tracking-wider">
                        {completedLockIds.length}/5
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="w-full p-2 rounded-lg bg-slate-950/80 border border-slate-700 text-left text-[11px] text-slate-300 space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Trạng thái cửa:</span>
                  <span className={allLocksBreached ? 'text-emerald-400 font-bold' : 'text-purple-300 font-bold'}>
                    {allLocksBreached ? '✓ Cửa mở hoàn toàn' : 'Đang khóa 5 cấp'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Áp suất khoang:</span>
                  <span className="text-amber-300 font-mono font-bold">
                    {allLocksBreached ? '0 PSI (Cân bằng)' : `${1500 - completedLockIds.length * 300} PSI`}
                  </span>
                </div>
              </div>
            </div>

            {/* BIG Question & Coordinate Inputs (8.5 cols) */}
            <div className="lg:col-span-8 2xl:col-span-9 panel-cosmic rounded-xl border border-purple-500/40 p-4 flex flex-col justify-between shadow-xl min-h-0 overflow-y-auto">
              <div className="space-y-3">
                {/* Badge & Points */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-lg bg-purple-950 border border-purple-400/50 text-purple-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                    {currentQ.subtitle || `Ổ Khóa ${currentIndex + 1} / 5`}
                  </span>
                  <span className="text-xs sm:text-sm font-black font-mono text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3.5 py-1 rounded-lg">
                    +{currentQ.points} ĐIỂM
                  </span>
                </div>

                {/* LARGE Question Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-purple-950/40 border-2 border-purple-400/50 space-y-2 shadow-inner">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-purple-200">
                    📌 {currentQ.contextDesc}
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white text-high-contrast leading-snug drop-shadow">
                    {currentQ.questionText}
                  </h3>
                </div>

                {/* Coordinate Input Box */}
                {currentQ.parts.map((part) => {
                  const isDone = completedLockIds.includes(currentQ.id);
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
                      isCompleted={isDone}
                      completedInfo={detail}
                      onSuccess={() => handleDoorBreachSuccess(part.id)}
                    />
                  );
                })}
              </div>

              {/* Bottom Mission Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-2 border-t border-purple-500/30 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIsHintShown(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Gợi ý</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setIsSolutionShown(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/40 text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem lời giải</span>
                  </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      onBackToMap();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    <span>VỀ BẢN ĐỒ</span>
                  </button>

                  {currentIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentIndex(currentIndex - 1);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Khóa {currentIndex}</span>
                    </button>
                  )}

                  {currentIndex < questionsList.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentIndex(currentIndex + 1);
                      }}
                      className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>Khóa {currentIndex + 2}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  {allLocksBreached && (
                    <button
                      type="button"
                      onClick={() => setIsDoorOpenModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-400/60 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Film className="w-4 h-4 text-amber-300" />
                      <span>XEM VIDEO ĐỘT NHẬP</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (allLocksBreached) {
                        setIsDoorOpenModal(true);
                      } else {
                        soundEngine.playUnlock();
                        onCompleteStage2();
                      }
                    }}
                    className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                      allLocksBreached
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white shadow-[0_0_25px_rgba(217,70,239,0.9)] animate-pulse'
                        : 'bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/40'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>SANG CHẶNG 3: GIẢI CỨU (3 MẬT MÃ)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Stage Sidebar: 3 cols */}
        <div className="xl:col-span-3 flex flex-col justify-between min-h-0 overflow-hidden">
          <StageSidebar
            teams={teams}
            activeTeamId={activeTeamId}
            onSelectTeam={onSelectTeam}
            onAdjustPoints={onAdjustPoints}
            onResetAllScores={onResetAllScores}
            initialTimeSeconds={720} // 12 minutes
            onToggleShowSolution={() => setIsSolutionShown(true)}
            isSolutionShown={isSolutionShown}
            onToggleShowHint={() => setIsHintShown(true)}
            isHintShown={isHintShown}
            onBackToMap={onBackToMap}
            onNextQuestion={() => {
              if (currentIndex < questionsList.length - 1) {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            showNextButton={currentIndex < questionsList.length - 1}
            nextButtonLabel="Khóa tiếp"
          />
        </div>
      </div>

      {/* Floating Modal for Hint */}
      {isHintShown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="panel-cosmic max-w-lg w-full p-6 rounded-2xl border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.5)] space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-amber-500/40 pb-2">
              <span className="text-sm font-black text-amber-300 uppercase flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                GỢI Ý PHÁ KHÓA {currentIndex + 1}
              </span>
              <button
                onClick={() => setIsHintShown(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {currentQ.hint}
            </p>
            <div className="text-right">
              <button
                onClick={() => setIsHintShown(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                ĐÃ HIỂU
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Modal for Solution */}
      {isSolutionShown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="panel-cosmic max-w-2xl w-full p-6 rounded-2xl border-2 border-purple-400/80 shadow-[0_0_40px_rgba(217,70,239,0.5)] space-y-4 animate-scaleUp max-h-[90vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-purple-500/40 pb-2 shrink-0">
              <span className="text-sm font-black text-purple-300 uppercase flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                LỜI GIẢI CHI TIẾT DÀNH CHO GIÁO VIÊN
              </span>
              <button
                onClick={() => setIsSolutionShown(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 font-mono text-sm sm:text-base text-slate-100 whitespace-pre-line leading-relaxed overflow-y-auto max-h-[60vh]">
              {currentQ.solution}
            </div>
            <div className="text-right shrink-0">
              <button
                onClick={() => setIsSolutionShown(false)}
                className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs"
              >
                ĐÓNG LỜI GIẢI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2 Complete Video Modal */}
      <StageVideoModal
        isOpen={isDoorOpenModal}
        onClose={() => setIsDoorOpenModal(false)}
        badge="CHIẾN CÔNG ĐỢT 2 · ĐỘT NHẬP THÀNH CÔNG VÀO TÀU UFO"
        title="CỬA ÁP SUẤT ĐÃ MỞ – ĐỘT NHẬP TÀU UFO!"
        description="Tuyệt vời! Cả 5 lớp khóa an ninh bảo mật áp suất đã bị các phi hành đoàn hóa giải hoàn toàn! Buồng cứu hộ hai bạn học sinh đã hiện ra trước mắt. Mời các phi hành đoàn xem đoạn phim đột nhập trước khi tiến vào giải cứu!"
        videoUrl="https://drive.google.com/file/d/1JwjVNfsSEpSDLiTBd0JL_XxW8loYNu5u/preview"
        themeColor="purple"
        onBackToMap={onBackToMap}
        onNextStage={() => {
          setIsDoorOpenModal(false);
          soundEngine.playUnlock();
          onCompleteStage2();
        }}
        nextStageButtonText="TIẾN VÀO CHẶNG 3: GIẢI CỨU (3 MẬT MÃ)"
      />
    </div>
  );
};
