/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Radar, CheckCircle2, HelpCircle, 
  Sparkles, ArrowRight, Eye, X, Compass, ChevronRight, ChevronLeft
} from 'lucide-react';
import { Team, CoordinateQuestion, QuestionSetMode } from '../types/game';
import { getQuestionsForStage } from '../data/questions';
import { soundEngine } from '../utils/sound';
import { StageSidebar } from './StageSidebar';
import { CoordinateInputBox } from './CoordinateInputBox';

interface Stage1Props {
  teams: Team[];
  activeTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
  onAwardPoints: (teamId: string, pts: number) => void;
  onAdjustPoints: (teamId: string, delta: number) => void;
  onResetAllScores: () => void;
  onCompleteStage1: () => void;
  onBackToMap: () => void;
  shuffleQuestions?: boolean;
  questionSetMode?: QuestionSetMode;
}

export const Stage1Tracking: React.FC<Stage1Props> = ({
  teams,
  activeTeamId,
  onSelectTeam,
  onAwardPoints,
  onAdjustPoints,
  onResetAllScores,
  onCompleteStage1,
  onBackToMap,
  shuffleQuestions = false,
  questionSetMode = 'standard',
}) => {
  const questionsList: CoordinateQuestion[] = useMemo(() => {
    const list = [...getQuestionsForStage(1, questionSetMode)];
    if (shuffleQuestions) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list;
  }, [shuffleQuestions, questionSetMode]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [completedDetails, setCompletedDetails] = useState<{
    [partId: string]: { teamName: string; coords: string };
  }>({});
  const [isSolutionShown, setIsSolutionShown] = useState(false);
  const [isHintShown, setIsHintShown] = useState(false);

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

  const allCompleted = questionsList.every((q) => completedTaskIds.includes(q.id));

  const handleTaskPartSuccess = (partId: string, teamId: string, coordsStr: string) => {
    const t = teams.find((team) => team.id === teamId);
    setCompletedDetails((prev) => ({
      ...prev,
      [partId]: { teamName: t ? t.name : 'Đội', coords: coordsStr },
    }));

    if (!completedTaskIds.includes(currentQ.id)) {
      const nextCompleted = [...completedTaskIds, currentQ.id];
      setCompletedTaskIds(nextCompleted);

      if (nextCompleted.length === questionsList.length) {
        soundEngine.playFanfare();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
        });
      }
    }
  };

  const radarSignals = [
    { top: '30%', left: '68%', label: 'Tín hiệu 1' },
    { top: '65%', left: '32%', label: 'Tín hiệu 2' },
    { top: '42%', left: '25%', label: 'Tín hiệu 3' },
  ];

  return (
    <div className="relative h-[calc(100vh-58px)] max-h-[calc(100vh-58px)] flex flex-col justify-between p-2 sm:p-3 xl:p-4 w-full mx-auto z-10 overflow-hidden select-none">
      {/* Main 2-Column Full Widescreen 16:9 Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-stretch flex-1 min-h-0 overflow-hidden">
        {/* Left Mission Area: 9 cols */}
        <div className="xl:col-span-9 flex flex-col justify-between panel-cosmic rounded-2xl p-3 sm:p-4 border border-cyan-500/40 shadow-2xl min-h-0 overflow-hidden">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-cyan-500/30 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider">
                <Radar className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>CHẶNG 1: TRUY VẾT TÀU UFO (9 PHÚT)</span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-400/50 text-[11px] text-amber-300 font-mono">
                  {completedTaskIds.length}/{questionsList.length} TÍN HIỆU
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                {currentQ.signalName}
              </h2>
            </div>

            {/* 3 Task Selector Tabs */}
            <div className="flex items-center gap-2">
              {questionsList.map((q, idx) => {
                const isDone = completedTaskIds.includes(q.id);
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
                        ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_#22d3ee] scale-105'
                        : isDone
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-cyan-400'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    <span>Tín hiệu {idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Content: Radar (3 cols) & Big Question (9 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch flex-1 min-h-0 my-2 overflow-hidden">
            {/* Visual Radar Screen (3.5 cols) */}
            <div className="lg:col-span-4 2xl:col-span-3 panel-cosmic rounded-xl border border-cyan-500/30 p-3 flex flex-col justify-between items-center text-center shadow-lg min-h-0">
              <div className="w-full flex items-center justify-between text-[11px] text-slate-300 font-bold">
                <span className="text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  RADAR KHÔNG GIAN
                </span>
                <span className="bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700 text-amber-300 font-mono text-[11px]">
                  {completedTaskIds.length}/3
                </span>
              </div>

              {/* Circular Hologram Radar */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 xl:w-48 xl:h-48 rounded-full border-2 border-cyan-400/50 bg-[#020716] overflow-hidden my-auto shadow-[0_0_25px_rgba(34,211,238,0.25)] shrink-0">
                <div className="absolute inset-3 rounded-full border border-cyan-400/20" />
                <div className="absolute inset-7 rounded-full border border-cyan-400/25" />
                <div className="absolute inset-12 rounded-full border border-cyan-400/30" />
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-400/30" />
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-400/30" />

                {/* Sweep */}
                <div
                  className="absolute inset-0 animate-radar origin-center pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg at 50% 50%, rgba(34, 211, 238, 0.45) 0deg, transparent 65deg, transparent 360deg)',
                  }}
                />

                {/* 3 Coordinate Signal Blips */}
                {questionsList.map((q, idx) => {
                  const isDone = completedTaskIds.includes(q.id);
                  const isCur = idx === currentIndex;
                  const pos = radarSignals[idx] || { top: '50%', left: '50%' };
                  return (
                    <div
                      key={q.id}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => setCurrentIndex(idx)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                        isDone ? 'scale-125' : isCur ? 'scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 shadow-lg ${
                          isDone
                            ? 'bg-emerald-400 border-white text-slate-950 animate-pulse shadow-[0_0_15px_#10b981]'
                            : isCur
                              ? 'bg-cyan-400 border-white text-slate-950 animate-ping shadow-[0_0_15px_#22d3ee]'
                              : 'bg-red-500/80 border-red-300 text-white'
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trajectory Status */}
              <div className="w-full p-2 rounded-lg bg-slate-950/80 border border-slate-700 text-left text-[11px] text-slate-300 space-y-0.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Trạng thái:</span>
                  <span className={allCompleted ? 'text-emerald-400 font-black' : 'text-cyan-300 font-bold'}>
                    {allCompleted ? '✓ Đã khóa UFO' : 'Đang quét sóng'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tọa độ giải mã:</span>
                  <span className="text-amber-300 font-mono font-bold">
                    {completedTaskIds.length} / 3 Vectơ
                  </span>
                </div>
              </div>
            </div>

            {/* BIG Question & Coordinate Inputs (8.5 cols) */}
            <div className="lg:col-span-8 2xl:col-span-9 panel-cosmic rounded-xl border border-cyan-500/40 p-4 flex flex-col justify-between shadow-xl min-h-0 overflow-y-auto">
              <div className="space-y-3">
                {/* Badge & Points */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-lg bg-blue-950 border border-cyan-400/50 text-cyan-300 font-black text-xs sm:text-sm uppercase tracking-wider">
                    {currentQ.subtitle || `Tín hiệu ${currentIndex + 1} / 3`}
                  </span>
                  <span className="text-xs sm:text-sm font-black font-mono text-amber-300 bg-amber-950/80 border border-amber-500/50 px-3.5 py-1 rounded-lg">
                    +{currentQ.points} ĐIỂM
                  </span>
                </div>

                {/* LARGE Question Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-950/40 border-2 border-cyan-400/50 space-y-2 shadow-inner">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-cyan-200">
                    📌 {currentQ.contextDesc}
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white text-high-contrast leading-snug drop-shadow">
                    {currentQ.questionText}
                  </h3>
                </div>

                {/* Coordinate Input Box */}
                {currentQ.parts.map((part) => {
                  const isDone = completedTaskIds.includes(currentQ.id);
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
                      onSuccess={() =>
                        handleTaskPartSuccess(
                          part.id,
                          activeTeamId || '',
                          `(${part.expected.x}; ${part.expected.y}; ${part.expected.z})`
                        )
                      }
                    />
                  );
                })}
              </div>

              {/* Bottom Mission Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-2 border-t border-cyan-500/30 shrink-0">
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
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem lời giải</span>
                  </button>
                </div>

                {/* Advance Buttons */}
                <div className="flex items-center gap-2">
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
                      <span>Tín hiệu {currentIndex}</span>
                    </button>
                  )}

                  {currentIndex < questionsList.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentIndex(currentIndex + 1);
                      }}
                      className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>Tín hiệu {currentIndex + 2}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playUnlock();
                      onCompleteStage1();
                    }}
                    className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                      allCompleted
                        ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse'
                        : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>SANG CHẶNG 2: ĐỘT NHẬP (5 Ổ KHÓA)</span>
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
            initialTimeSeconds={540} // 9 minutes
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
            nextButtonLabel="Tín hiệu tiếp"
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
                GỢI Ý TÍN HIỆU {currentIndex + 1}
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
          <div className="panel-cosmic max-w-2xl w-full p-6 rounded-2xl border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(34,211,238,0.5)] space-y-4 animate-scaleUp max-h-[90vh] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cyan-500/40 pb-2 shrink-0">
              <span className="text-sm font-black text-cyan-300 uppercase flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                LỜI GIẢI CHI TIẾT DÀNH CHO GIÁO VIÊN
              </span>
              <button
                onClick={() => setIsSolutionShown(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-sm sm:text-base text-slate-100 whitespace-pre-line leading-relaxed overflow-y-auto max-h-[60vh]">
              {currentQ.solution}
            </div>
            <div className="text-right shrink-0">
              <button
                onClick={() => setIsSolutionShown(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                ĐÓNG LỜI GIẢI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
