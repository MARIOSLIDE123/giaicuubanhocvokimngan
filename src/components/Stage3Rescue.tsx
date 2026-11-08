/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  KeyRound, Unlock, Lock, HelpCircle, 
  Sparkles, CheckCircle2, ArrowRight, Eye, Trophy, Users, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Team, CoordinateQuestion, QuestionSetMode } from '../types/game';
import { getQuestionsForStage } from '../data/questions';
import { soundEngine } from '../utils/sound';
import { StageSidebar } from './StageSidebar';
import { UfoRescueIllustration } from './UfoRescueIllustration';
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

  const currentQ = questionsList[activeCodeIdx] || questionsList[0];

  useEffect(() => {
    soundEngine.playStageBGM();
    return () => {
      soundEngine.pauseStageBGM();
    };
  }, []);

  useEffect(() => {
    setIsSolutionShown(false);
    setIsHintShown(false);
  }, [activeCodeIdx]);

  // Check if a question (cipher) has all its parts solved
  const isQuestionDone = (q: CoordinateQuestion) => {
    return q.parts.every((p) => completedPartIds.includes(p.id));
  };

  const isLock1Unlocked = isQuestionDone(questionsList[0]);
  const isLock2Unlocked = questionsList[1] ? isQuestionDone(questionsList[1]) : false;
  const isLock3Unlocked = questionsList[2] ? isQuestionDone(questionsList[2]) : false;

  const allRescued = questionsList.every((q) => isQuestionDone(q));

  const handlePartSuccess = (partId: string, coordsStr: string) => {
    const t = teams.find((team) => team.id === activeTeamId);
    setCompletedDetails((prev) => ({
      ...prev,
      [partId]: { teamName: t ? t.name : 'Đội', coords: coordsStr },
    }));

    if (!completedPartIds.includes(partId)) {
      const nextParts = [...completedPartIds, partId];
      setCompletedPartIds(nextParts);

      // Check if all questions are now complete
      const allDone = questionsList.every((q) =>
        q.parts.every((p) => nextParts.includes(p.id))
      );

      if (allDone) {
        setIsRescueCelebrationOpen(true);
        soundEngine.playFanfare();
        confetti({
          particleCount: 160,
          spread: 100,
          origin: { y: 0.4 },
        });
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
        <div className="xl:col-span-9 flex flex-col justify-between panel-cosmic rounded-2xl p-3 sm:p-4 border border-amber-500/40 shadow-2xl min-h-0 overflow-hidden">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-amber-500/30 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
                <KeyRound className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>CHẶNG 3: GIẢI CỨU BẠN HỌC (11 PHÚT)</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-400/50 text-[11px] text-amber-300 font-mono">
                  {(isLock1Unlocked ? 1 : 0) + (isLock2Unlocked ? 1 : 0) + (isLock3Unlocked ? 1 : 0)}/3 MẬT MÃ GIẢI MÃ
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                {currentQ.signalName}
              </h2>
            </div>

            {/* 3 Cipher Selector Tabs */}
            <div className="flex items-center gap-2">
              {questionsList.map((q, idx) => {
                const isDone = isQuestionDone(q);
                const isCur = idx === activeCodeIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveCodeIdx(idx);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCur
                        ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_#facc15] scale-105'
                        : isDone
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-amber-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-amber-300" />
                    )}
                    <span>Mật mã {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Content: Pod Graphic (3.5 cols) & Big Question (8.5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch flex-1 min-h-0 my-2 overflow-hidden">
            {/* UFO Trapped Cockpit / Rescue Chamber (3.5 cols) */}
            <div className="lg:col-span-4 2xl:col-span-3 panel-cosmic rounded-xl border border-amber-500/30 p-3 flex flex-col justify-between items-center text-center shadow-lg min-h-0">
              <div className="w-full flex items-center justify-between text-[11px] text-slate-300 font-bold">
                <span className="text-amber-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  KHOANG CỨU HỘ
                </span>
                <span className="bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 text-amber-300 font-mono text-[11px]">
                  {(isLock1Unlocked ? 1 : 0) + (isLock2Unlocked ? 1 : 0) + (isLock3Unlocked ? 1 : 0)}/3 Mật mã
                </span>
              </div>

              {/* Central Rescue Pod Graphic */}
              <div className="relative flex items-center justify-center p-1 my-auto shrink-0">
                <UfoRescueIllustration
                  state={allRescued ? 'rescued' : 'trapped'}
                  className="w-36 sm:w-44 xl:w-48 h-auto drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                />
              </div>

              {/* 3 Cipher Lights */}
              <div className="w-full grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-slate-950/80 border border-slate-700 text-center">
                <div className={`p-1 rounded-md text-[10px] font-bold border ${isLock1Unlocked ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-700'}`}>
                  Mã 1: {isLock1Unlocked ? '✓' : 'Khóa'}
                </div>
                <div className={`p-1 rounded-md text-[10px] font-bold border ${isLock2Unlocked ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-700'}`}>
                  Mã 2: {isLock2Unlocked ? '✓' : 'Khóa'}
                </div>
                <div className={`p-1 rounded-md text-[10px] font-bold border ${isLock3Unlocked ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-700'}`}>
                  Mã 3: {isLock3Unlocked ? '✓' : 'Khóa'}
                </div>
              </div>
            </div>

            {/* BIG Question & Coordinate Inputs (8.5 cols) */}
            <div className="lg:col-span-8 2xl:col-span-9 panel-cosmic rounded-xl border border-amber-500/40 p-4 flex flex-col justify-between shadow-xl min-h-0 overflow-y-auto">
              <div className="space-y-3">
                {/* Badge & Points */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-lg bg-amber-950 border border-amber-400/50 text-amber-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                    {currentQ.subtitle || `Mật Mã ${activeCodeIdx + 1} / 3`}
                  </span>
                  <span className="text-xs sm:text-sm font-black font-mono text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3.5 py-1 rounded-lg">
                    +{currentQ.points} ĐIỂM TỔNG
                  </span>
                </div>

                {/* LARGE Question Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/40 border-2 border-amber-400/50 space-y-2 shadow-inner">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-amber-200">
                    📌 {currentQ.contextDesc}
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white text-high-contrast leading-snug drop-shadow">
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
              </div>

              {/* Bottom Mission Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-2 border-t border-amber-500/30 shrink-0">
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
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem lời giải</span>
                  </button>
                </div>

                {/* Navigation and Completion Buttons */}
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

                  {activeCodeIdx > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveCodeIdx(activeCodeIdx - 1);
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Mã {activeCodeIdx}</span>
                    </button>
                  )}

                  {activeCodeIdx < questionsList.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveCodeIdx(activeCodeIdx + 1);
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>Mã {activeCodeIdx + 2}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playFanfare();
                      onCompleteStage3();
                    }}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
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

        {/* Right Stage Sidebar: 3 cols */}
        <div className="xl:col-span-3 flex flex-col justify-between min-h-0 overflow-hidden">
          <StageSidebar
            teams={teams}
            activeTeamId={activeTeamId}
            onSelectTeam={onSelectTeam}
            onAdjustPoints={onAdjustPoints}
            onResetAllScores={onResetAllScores}
            initialTimeSeconds={660} // 11 minutes
            onToggleShowSolution={() => setIsSolutionShown(true)}
            isSolutionShown={isSolutionShown}
            onToggleShowHint={() => setIsHintShown(true)}
            isHintShown={isHintShown}
            onBackToMap={onBackToMap}
            onNextQuestion={() => {
              if (activeCodeIdx < questionsList.length - 1) {
                setActiveCodeIdx(activeCodeIdx + 1);
              }
            }}
            showNextButton={activeCodeIdx < questionsList.length - 1}
            nextButtonLabel="Mật mã tiếp"
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
                GỢI Ý MẬT MÃ {activeCodeIdx + 1}
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
          <div className="panel-cosmic max-w-2xl w-full p-6 rounded-2xl border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.5)] space-y-4 animate-scaleUp max-h-[90vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-amber-500/40 pb-2 shrink-0">
              <span className="text-sm font-black text-amber-300 uppercase flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-400" />
                LỜI GIẢI CHI TIẾT DÀNH CHO GIÁO VIÊN
              </span>
              <button
                onClick={() => setIsSolutionShown(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 font-mono text-sm sm:text-base text-slate-100 whitespace-pre-line leading-relaxed overflow-y-auto max-h-[60vh]">
              {currentQ.solution}
            </div>
            <div className="text-right shrink-0">
              <button
                onClick={() => setIsSolutionShown(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                ĐÓNG LỜI GIẢI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rescue Pod Celebration Popup */}
      {isRescueCelebrationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="panel-cosmic max-w-lg w-full p-8 rounded-3xl border-2 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.6)] text-center space-y-5 animate-scaleUp">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 mx-auto flex items-center justify-center shadow-lg">
              <Unlock className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white text-high-contrast">
                GIẢI CỨU THÀNH CÔNG!
              </h2>
              <p className="text-sm text-slate-200 font-medium">
                Cả 3 mật mã đã được giải mã chính xác! Hai bạn học sinh đã thoát khỏi khoang cứu hộ an toàn!
              </p>
            </div>

            <button
              onClick={() => {
                setIsRescueCelebrationOpen(false);
                onCompleteStage3();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-slate-950 font-black text-base shadow-xl hover:brightness-110 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>XEM BẢNG TỔNG KẾT & VINH DANH</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
